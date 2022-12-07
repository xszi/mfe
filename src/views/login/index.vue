<template>
  <div class="login-panel">
    <div class="panel-cont">
      <div class="logo-wrap">
        <img :src="src" class="logo" alt="">
      </div>
      <div class="login-wrap">
        <p>hi，86</p>
        <el-form ref="loginForm" :model="form" :rules="rules">
          <el-form-item label="" prop="loginName">
            <i class="el-icon-user" />
            <el-input v-model="form.loginName" placeholder="" />
          </el-form-item>
          <el-form-item label="" prop="password">
            <i class="el-icon-unlock" />
            <el-input v-model="form.password" type="password" placeholder="" />
          </el-form-item>
          <el-form-item label="" prop="code">
            <i class="el-icon-picture-outline" />
            <el-input v-model="form.code" placeholder="" :maxlength="4" />
            <img
              v-if="captchaUrl"
              id="codeImg"
              :src="captchaUrl"
              class="captcha"
              @click="reloadCaptcha"
            >
          </el-form-item>
        </el-form>
      </div>
      <el-button type="primary" @click="handleSubmit">登录</el-button>
    </div>
  </div>
</template>

<script>
import md5 from 'blueimp-md5'
import { serviceLogin } from '@/api/user'
// import request from '@/utils/request'
// import axios from 'axios'
export default {
  data() {
    return {
      src: require('../../assets/favicon.png'),
      captchaUrl: 'http://localhost:7000/api/captcha/',
      form: {
        loginName: '',
        password: '',
        verifyPassword: ''
      },
      rules: {
        loginName: [
          { required: true, message: '请输入用户名' }
        ],
        password: [
          { required: true, message: '请输入密码' }
        ],
        code: [
          { required: true, message: '请输入验证码' }
        ]
      }
    }
  },
  computed: {
    // captchaUrl() {
    //   return 'http://localhost:7000/api/captcha'
    // }
  },
  methods: {
    reloadCaptcha() {
      this.captchaUrl = 'http://localhost:7000/api/captcha?t=' + new Date().getTime()
    },
    async handleSubmit() {
      try {
        this.$refs['loginForm'].validate((valid) => {
          if (valid) {
            const params = {
              loginName: this.form.loginName.trim(),
              password: md5(this.form.password.trim()),
              code: this.form.code.trim().toLowerCase()
            }
            serviceLogin(params)
              .then(res => {
                if (res.code === 0) {
                  sessionStorage.setItem('sign_frame_token', 'dasdkasdkap')
                  this.$router.push('/home')
                  console.log('验证码正确。')
                } else {
                  // 使用dom操作更新验证码
                  document.getElementById('codeImg')?.click()
                }
              })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      } catch (err) {
        console.log(err)
      } finally {
        // setLoading(false)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.login-panel {
  width: 100%;
  height: 100%;
  text-align: center;
  padding: 100px 0px;
  display: flex;
  justify-content: center;
  .panel-cont {
    width: 500px;
    .logo-wrap {
      width: 500px;
      img {
        width: 200px;
      }
    }
    .login-wrap {
      width: 500px;
    }
  }
  ::v-deep .el-form-item__content {
    position: relative;
    display: flex;
    i {
      position: absolute;
      z-index: 100;
      top: 13px;
      left: 20px;
      color: #ccc;
    }
    input {
      padding-left: 50px;
    }
    .captcha {
      border: 1px #DCDFE6 solid;
      border-left: none;
      border-radius: 4px;
      cursor: pointer;
    }
  }
}
</style>
