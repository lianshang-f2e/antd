<template>
  <div class="login" :style="{backgroundImage: 'url(' + loginbg + ')' }">
    <!-- logo -->
    <div class="logo">
      <img :src="logo" alt="">
    </div>
    <!-- 提示框 -->
    <div class="content" :style="{backgroundImage: 'url(' + contentbg + ')' }">
      <!-- 标题 -->
      <h3 class="form-title">Login to your account</h3>

      <!-- 用户名框 -->
      <a-input placeholder="用户名" v-model="loginFrom.mobile" size="large">
        <a-icon slot="prefix" type="user" />
        <a-icon v-if="loginFrom.mobile" slot="suffix" type="close-circle" class="gray" @click="clearUserName" />
      </a-input>

      <!-- 密码框 -->
      <a-input placeholder="密码" v-model="loginFrom.password" size="large" type="password" style="margin-top: 20px;">
        <a-icon slot="prefix" type="key" />
        <a-icon v-if="loginFrom.password" slot="suffix" type="close-circle" class="gray" @click="clearPassWord" />
      </a-input>

      <!-- 登录按钮 -->
      <a-button type="primary" size="large" icon="login" class="login-btn" :loading="isLogin" @click="goLogin">登录</a-button>
    </div>
    <!-- 底部 -->
    <div class="login-footer">yb.lianshang.com ©2018 Created by 链尚信息科技（上海）有限公司</div>
  </div>
</template>

<script>
import loginbg from '@/assets/login/1.jpg'
import logo from '@/assets/logo.png'
import contentbg from '@/assets/login/bg-white-lock.png'
import server from '../server'
import { domainName } from '@/config/env'

export default {
  name: 'login',
  data () {
    return {
      loginbg: loginbg,
      contentbg: contentbg,
      logo: logo,
      loginFrom: {}
    }
  },
  methods: {
    clearUserName () {
      this.loginFrom.mobile = ''
    },
    clearPassWord () {
      this.loginFrom.password = ''
    },
    goLogin () {
      let params = {
        appId: 5,
        domainName: domainName,
        mobile: this.loginFrom.mobile,
        password: this.loginFrom.password,
        loginType: 2
      }
      if (!(/^1[3|4|5|6|7|8][0-9]\d{8}$/.test(this.loginFrom.mobile))) {
        this.$message.info('请正确客户手机号码')
        return false
      }
      console.log(123)
      server.loginForAccount(params).then((res) => {
        console.log(res)
        if (res.code === 200) {
          window.localStorage.setItem('token', res.data.token)
          // this.$router.push('/index/home')
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login {
  text-align: center;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-size: cover;
  float: left;
}
.login .logo {
    margin: 60px auto 20px auto;
    padding: 15px;
    text-align: center;
}
.login .content {
    width: 550px;
    min-height: 400px;
    margin: 0 auto;
    margin-bottom: 0px;
    padding: 30px;
    padding-top: 20px;
    padding-bottom: 15px;
    text-align: left;
}
.form-title {
  font-weight: 300;
  margin-bottom: 25px;
  margin-top: 20px;
  color: #eeeeee;
  font-size: 24px;
}
.login-btn{
  float: right;
  margin-top: 40px;
}
.login-footer{
  text-align: center;
  margin: 0 auto;
  padding: 10px;
  color: #eee;
  font-size: 13px;
}
.gray{
  color: #999999;
  font-size: 15px;
  cursor: pointer;
}
</style>
