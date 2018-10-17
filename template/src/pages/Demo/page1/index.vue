<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>url取值id：{{ id }}</h2>
    <h2>url取值type：{{ type }}</h2>
    <h2>store取值status：{{ status }}</h2>
    <h2>store取值userId：{{ userId }}</h2>
    <button @click="changeStatus">changeStatus</button>
    <button @click="getUserInfo">getUserInfo</button>
    <show-user-info></show-user-info>
    <upload></upload>
    <!-- <websocket></websocket> -->
  </div>
</template>

<script>
// import Vue from 'vue'
// import { Button } from 'ant-design-vue'

import { mapState, mapMutations, mapActions } from 'vuex'
import moduleName from './store'

import showUserInfo from './components/showUserInfo'
import upload from '@/components/upload'
import axios from '@/components/axios'
// import websocket from '@/components/websocket'

axios.get('/mockapi/login').then((res) => {
})

// Vue.component(Button.name, Button)

export default {
  name: 'demo',
  data () {
    return {
      msg: 'demo页面'
    }
  },
  components: {
    showUserInfo,
    upload
  },
  computed: {
    ...mapState({
      id: state => state.route.params.id,
      type: state => state.route.query.type
    }),
    ...mapState(moduleName, {
      status: state => state.status,
      userId: state => state.userId
    })
  },
  methods: {
    ...mapMutations(moduleName, [
      'changeStatus'
    ]),
    ...mapActions(moduleName, [
      'getUserInfo'
    ])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
