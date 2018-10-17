<template>
  <div class="login" :style="{backgroundImage: 'url(' + loginbg + ')' }">
    <!-- logo -->
    <div class="logo">
      <img :src="logo" alt="" style="width: 400px; padding: 20px 0;">
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
    <div class="login-footer">sunflower.lianshang.com ©2018 Created by 链尚信息科技（上海）有限公司</div>
  </div>
</template>

<script>
import loginbg from '@/assets/login/1.jpg'
import logo from '@/assets/logo.png'
import contentbg from '@/assets/login/bg-white-lock.png'
// import Vue from 'vue'
// import { Input, Button, Icon } from 'ant-design-vue'
import moduleName from './store'
import { mapState, mapActions, mapGetters } from 'vuex'

// Vue.component(Icon.name, Icon)
// Vue.component(Input.name, Input)
// Vue.component(Button.name, Button)

export default {
  name: 'login',
  data () {
    return {
      loginbg: loginbg,
      contentbg: contentbg,
      logo: logo
    }
  },
  computed: {
    ...mapGetters(moduleName, [
    ]),
    ...mapState(moduleName, {
      isLogin: state => state.isLogin,
      loginFrom: state => state.loginFrom
    })
  },
  methods: {
    ...mapActions(moduleName, [
      'goLogin'
    ]),
    clearUserName () {
      this.loginFrom.mobile = ''
    },
    clearPassWord () {
      this.loginFrom.password = ''
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
