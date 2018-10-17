<template>
  <a-layout-header class="header">
    <!-- logo -->
    <div class="logo">
      <img :src="logo" alt="">
    </div>
    <!-- 右边 -->
    <div class="header-right">
      <!-- 帐号信息 -->
      <a-dropdown :trigger="['hover']">
        <div class="avatar-box">
          <a-avatar class="avatar" icon="user" />
          {{ userInfo.realName || '我的' }}
        </div>
        <a-menu slot="overlay">
          <a-menu-item key="logout">
            <a href="javascript:;" @click="logout">退出登录</a>
          </a-menu-item>
        </a-menu>
      </a-dropdown>
    </div>
    <!-- nav -->
    <a-menu
      theme="dark"
      mode="horizontal"
      :defaultSelectedKeys="['1']"
      :style="{ lineHeight: '64px' }"
      @click="handleClick"
    >
      <a-menu-item key="home">首页</a-menu-item>
      <a-sub-menu>
        <span slot="title">工作台</span>
        <a-menu-item key="RequestInquiry/list">
          <a-icon type="pie-chart" />
          <span>询价单</span>
        </a-menu-item>
        <a-menu-item key="PackingSlip/list">
          <a-icon type="appstore" />
          <span>码单</span>
        </a-menu-item>
        <a-menu-item key="Order/list">
          <a-icon type="solution" />
          <span>订单</span>
        </a-menu-item>
      </a-sub-menu>
    </a-menu>
  </a-layout-header>
</template>

<script>
import logo from '@/assets/logo.png'

export default {
  data () {
    return {
      logo
    }
  },
  computed: {
    userInfo: function (self) {
      return self.$store.state.global.userInfo
    }
  },
  components: {
  },
  methods: {
    handleClick (e) {
      if (e.key) {
        let url = '/index/' + e.key
        this.$router.push(url)
      }
    },
    // 退出登录
    logout () {
      let url = '/wxlogin?status=logout'
      var date = new Date(+new Date() - 100000000)
      window.document.cookie = 'token' + '=' + ' ' + ';expires=' + date.toUTCString()
      window.location.href = url
    }
  }
}
</script>

<style scoped>
.avatar-box{
  float: left;
  color: #ffffff;
  font-size: 14px;
}
.avatar{
  background-color: #87d068;
  vertical-align: -10px;
  margin-right: 5px;
}
.logo {
  width: 120px;
  float: left;
  margin-right: 56px;
}
.logo img{
  width: 100px;
}
.header .ant-menu-item{
  padding: 0 50px;
}
.header-right {
  float: right;
  line-height: 40px;
  padding: 11px 0;
}
</style>
