### 使用 qiankun 改造的 vue2 微前端主应用

#### 主要功能改造

1. iframe 路由映射 ———— 创建独立路由的 Iframe 页面
2. 登陆状态共享（验证码登录）———— 父应用通过 props 传递登录信息到子应用
3. 跨应用跳转 ———— 父应用向子应用传递 Vue-router 实例， this.$parRouter
4. 标签导航共享 ———— 父子应用的 visitedViews 统一缓存在 sessionStorage, 使用 GlobalState 触发监听更新
5. nginx 配置入口，缓存

- 跨域 ———— Access-Control-Allow-Origin
- HTTP 缓存 ———— Cache-Control no-cache，不使用强制缓存(tag / last-modified)
  **注：**
  > 如果什么缓存策略都没设置，浏览器会采用一个启发式的算法，通常会取响应头中的 Date 减去 Last-Modified 值的 10% 作为缓存时间。
  > 重新部署后，router.onError 监听页面跳转失败刷新页面，拉取最新 js 静态文件

6. 子应用为 vite 启动（待实现）
7. 跨应用页面缓存 keep-alive（待实现）
8. 公共依赖复用（待实现）
9. 项目间组件复用（待实现）
10. 嵌套子子应用（待实现）
11. 嵌入 blink-mind react 子应用（待实现）

#### UMD 格式打包

[可能是最详细的 UMD 模块入门指南](https://juejin.cn/post/6844903927104667662)

#### 缓存问题

- Q1. 每次重新部署代码后需要强制刷新清缓存后才能加载到最新的代码。

**解决办法：**

```
  server {
      listen       8080;
      location / {
          root   /usr/share/nginx/html; # 前端静态资源入口地址
          index  index.html; # 前端静态资源入口文件
          add_header Cache-Control no-cache; # 响应头去掉强制缓存，子应用也要去掉
          try_files $uri $uri/ /index.html; # 使用路由history模式时需要配置
      }
  }
```

- Q2. 打开的页面没有关闭，此阶段有重新部署新代码，会导致点击跳转没反应，打印报错。

**解决办法：**

```js
router.onError((error) => {
  console.error("error----------", error);
  const pattern = /Loading chunk (\d)+ failed/g;
  console.error("router.onError---------------------------");
  const isChunkLoadFailed = error.message.match(pattern);
  console.error("isChunkLoadFailed", isChunkLoadFailed);
  const targetPath = router.history.pending.fullPath;
  console.error("targetPath", targetPath);
  if (isChunkLoadFailed) {
    router.replace(targetPath);
  }
  window.location.reload();
});
```
