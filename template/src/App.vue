<template>
  <router-view></router-view>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'PingFangSC-Regular' ,'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
html, body {
  background: #f0f2f5;
}
.ant-table-pagination.ant-pagination{
  float: initial;
  text-align: center;
}
a:active,a:visited,a:link  {
  text-decoration: none!important;
}
</style>
