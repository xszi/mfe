### 使用 qiankun 改造的 vue2 微前端主应用

#### 主要功能改造

1. iframe 路由映射
2. 登陆状态共享（验证码登录）
3. 跨应用跳转
4. 标签导航共享
5. nginx 配置入口，缓存
6. 跨应用页面缓存（未实现）
7. 本地开发库模式 / 链接模式 （未实现）

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
