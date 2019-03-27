<template>
  <div class="wxlogin" :style="{backgroundImage: 'url(' + loginbg + ')' }">
    <!-- logo -->
    <div class="logo">
      <img :src="logo" alt="" style="width: 142px;">
    </div>
    <!-- 提示框 -->
    <div class="content">
      <a href="javascript:;" @click="goLogin">
        <img :src="wxlogo" alt=""> <br />
        <span>微信登录</span>
      </a>
    </div>
    <!-- 底部 -->
    <div class="login-footer">yb.lianshang.com ©2018 Created by 链尚信息科技（上海）有限公司</div>
  </div>
</template>

<script>
import loginbg from '@/assets/login/1.jpg'
import logo from '@/assets/logo.png'
import wxlogo from '@/assets/wechat.png'
import { ssoHost } from '@/config/env'
// import server from '../server'

export default {
  name: 'wxlogin',
  data () {
    return {
      loginbg,
      logo,
      wxlogo
    }
  },
  methods: {
    goLogin () {
      var origin = window.location.origin
      var pathname = '/wxlogin'
      window.location.href = ssoHost + '/wxwork/oauth2/authorize?appId=5&type=2&redirect_uri=' + encodeURIComponent(origin + pathname) + '&t=' + (+new Date())
      // server.getLoginWay().then((res) => {
      //   if (res.code === 200) {
      //     if (res.data.way === 'up') {
      //       // sso账号登录
      //       this.$router.push('/login')
      //     } else {
      //        // 企微登录
      //        window.location.href = ssoHost + '/wxwork/oauth2/authorize?appId=5&type=2&redirect_uri=' + encodeURIComponent(origin + pathname) + '&t=' + (+new Date())
      //     }
      //   }
      // })
    }
  },
  created () {
    var token = this.$route.query.token
    if (token) {
      window.localStorage.setItem('token', token)
      this.$router.push('/index/home')
    } else {
      this.goLogin()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.wxlogin {
  text-align: center;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-size: cover;
  float: left;
}
.wxlogin .logo {
    margin: 60px auto 20px auto;
    padding: 15px;
    text-align: center;
}
.login-footer{
  text-align: center;
  margin: 0 auto;
  padding: 10px;
  color: #eee;
  font-size: 13px;
}
.content{
  margin-top: 150px;
}
.content img{
  width: 80px;
}
.content a{
  line-height: 50px;
  font-size: 18px;
  display: block;
  color: #ffffff;
}
.content a:hover{
  opacity: .8;
}
</style>
