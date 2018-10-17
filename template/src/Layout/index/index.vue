<template>
  <a-layout id="Layout">
    <!-- 头部 -->
    <a-affix>
      <index-header></index-header>
    </a-affix>
    <a-layout style="padding: 0 60px">
      <!-- 面包屑导航 -->
      <index-breadcrumb></index-breadcrumb>
      <!-- 内容区域 -->
      <a-layout-content :style="{ margin: 0, minHeight: '280px' }">
        <!-- Spin 加载中 -->
        <a-spin tip="数据加载中..." :spinning="isLoading > 0" size="large">
          <div class="spin-content">
            <!-- 路由 -->
            <router-view v-if="isRouterAlive"></router-view>
          </div>
        </a-spin>
      </a-layout-content>
    </a-layout>
    <!-- 页面底部 -->
    <index-footer></index-footer>
    <!-- 返回顶部 -->
    <a-back-top>
      <div class="ant-back-top-content">
        <div class="ant-back-top-icon">
          <a-icon type="arrow-up"></a-icon>
        </div>
      </div>
    </a-back-top>
  </a-layout>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import moduleName from './store'

const lazy = (path) => () => import(`${path}`)
const indexHeader = lazy('./components/index-header')
const indexBreadcrumb = lazy('./components/index-breadcrumb')
const indexFooter = lazy('./components/index-footer')
export default {
  name: 'layout',
  components: {
    indexHeader,
    indexBreadcrumb,
    indexFooter
  },
  provide () {
    return {
      reload: this.reload
    }
  },
  data () {
    return {
      isRouterAlive: true
    }
  },
  methods: {
    ...mapActions(moduleName, [
      'loadPermissions',
      'loadUserInfo'
    ]),
    reload () {
      this.isRouterAlive = false
      this.$nextTick(function () {
        this.isRouterAlive = true
      })
    }
  },
  computed: {
    ...mapState({
      isLoading: state => state.global.isLoading
    })
  },
  created () {
    this.loadPermissions()
    this.loadUserInfo()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
