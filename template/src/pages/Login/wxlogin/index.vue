<template>
  <div class="wxlogin" :style="{backgroundImage: 'url(' + loginbg + ')' }">
    <!-- logo -->
    <div class="logo">
      <img :src="logo" alt="" style="width: 480px;">
    </div>
    <!-- 提示框 -->
    <div class="content">
      <a href="javascript:;" @click="goWxLoginForClick">
        <img :src="wxlogo" alt=""> <br />
        <span>微信登录</span>
      </a>
    </div>
    <!-- 底部 -->
    <div class="login-footer">lianshang.com ©2018 Created by 链尚信息科技（上海）有限公司</div>
  </div>
</template>

<script>
import loginbg from '@/assets/login/1.jpg'
import logo from '@/assets/logo.png'
import wxlogo from '@/assets/wechat.png'
import { ssoHost } from '@/config/env'
import axios from '@/components/axios'
import { Message } from 'ant-design-vue'

export default {
  name: 'wxlogin',
  data () {
    return {
      loginbg,
      logo,
      wxlogo,
      status: null
    }
  },
  methods: {
    goWxLogin () {
      if (this.status) {
        return false
      }
      var origin = window.location.origin
      var pathname = window.location.pathname
      var wxloginUrl = ssoHost + '/sso/oauth2/authorize?redirect_uri=' + encodeURIComponent(origin + pathname) + '&t=' + (+new Date())
      if (this.$route.query.code) {
        axios.get('/web/user/wxlogin?code=' + this.$route.query.code).then(data => {
          if (data.code === 200) {
            if (data.data.client_identify) {
              Message.warning('微信登录失败，请用帐号登录')
              this.$router.push('/login')
            } else {
              document.cookie = 'token=' + data.data.token
              Message.success('登录成功')
              window.location.href = '/index/home'
            }
          }
        })
      } else {
        window.location.href = wxloginUrl
      }
    },
    goWxLoginForClick () {
      if (this.status) {
        this.status = null
      }
      this.goWxLogin()
    }
  },
  created () {
    var status = this.$route.query.status
    this.status = status
    this.goWxLogin()
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
