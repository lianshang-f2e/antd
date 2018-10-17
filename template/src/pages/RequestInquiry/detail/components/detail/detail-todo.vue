<template>
  <div id='detail-todo'>
    <span class='wait-for-sheet' v-show='detailData.status === 60'>等待销售开码单</span>
    <a-button type="primary"
      v-show='operations.canContactSupplier'
      @click="startContactSupplier">开始联系供应商</a-button>
    <a-button type="primary" v-show='operations.canFeedback' @click="feedback">反馈询价单</a-button>
    <a-button type="primary" v-show='operations.canStartPackingSlip' @click="startPackingSlip">开码单</a-button>
    <a-button type="primary" v-show='operations.canAddBusinessPending' @click="addBusinessPending">加入记事本</a-button>
    <a-button type="primary" v-show='operations.canNext' @click="next">处理下一个</a-button>
    <!-- 记事本弹出框 -->
    <a-modal
      title="记事本备注"
      v-model="isShowPending"
      @ok="addPending"
    >
      <template slot="footer">
        <a-button key="back" @click="pendingCancel">取消</a-button>
        <a-button key="submit" type="primary" :loading="loadingForPending" @click="addPending">
          确认
        </a-button>
      </template>
      <div class="pending-content">
        <a-row>
          <a-col :span="4"><i style="color: red;">＊</i>备注：</a-col>
          <a-col :span="20">
            <a-dropdown>
              <a-menu slot="overlay" @click="changeMark">
                <a-menu-item key="等待供应商回复">等待供应商回复</a-menu-item>
                <a-menu-item key="等待销售回复">等待销售回复</a-menu-item>
                <a-menu-item key="暂时搁置">暂时搁置</a-menu-item>
              </a-menu>
              <div class="mark">
                <a-input placeholder="请输入备注信息" read-only v-model="mark"></a-input>
              </div>
            </a-dropdown>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="4">定时提醒</a-col>
          <a-col :span="20">
            <a-radio-group name="radioGroup" v-model="remindTimeType">
              <a-radio :value="10">3分钟</a-radio>
              <a-radio :value="20">5分钟</a-radio>
              <a-radio :value="30">10分钟</a-radio>
            </a-radio-group>
          </a-col>
        </a-row>
      </div>
    </a-modal>
  </div>
</template>
<script>
// import Vue from 'vue'
import {mapState, mapActions} from 'vuex'
import moduleName from './../../store'
import LayoutVuex from './../../../../../Layout/newIndex/store'
import server from './../../../server'
// import {button, Modal, Row, Col, Dropdown, Menu, TimePicker, Input, notification, message} from 'ant-design-vue'

// Vue.component(button.name, name)
// Vue.component(Modal.name, Modal)
// Vue.component(TimePicker.name, TimePicker)
// Vue.component(Input.name, Input)
// Vue.component(Menu.name, Menu)
// Vue.component(Menu.Item.name, Menu.Item)
// Vue.component(Dropdown.name, Dropdown)
// Vue.component(Row.name, Row)
// Vue.component(Col.name, Col)
export default {
  data () {
    return {
      mark: null,
      remindTimeType: null,
      isShowPending: false,
      loadingForPending: false
    }
  },
  computed: {
    ...mapState(moduleName, {
      currentPageId: state => state.currentPageId,
      pageData: state => state.pageData
    }),
    detailData: state => state.pageData[state.currentPageId].detailData,
    operations: state => state.pageData[state.currentPageId].operations
  },
  methods: {
    ...mapActions(moduleName, [
      'startContactSupplier',
      'nextRequestInquiry',
      // 'addBusinessPending',
      'feedback',
      'saveDraft'
    ]),
    ...mapActions(LayoutVuex, [
      'initIndexRightSider'
    ]),
    startPackingSlip () {
      this.$router.push('/index/PackingSlip/detail/null?requestInquiryId=' + this.detailData.requestInquiryId)
    },
    addBusinessPending (payload) {
      var comparedDraft = this.$store.getters[moduleName + '/comparedDraft']
      var self = this
      if (comparedDraft) {
        this.$confirm({
          title: '温馨提示',
          content: '系统检测到您对当前询价单有改动，是否保存为草稿',
          okText: '确定',
          cancelText: '取消',
          maskClosable: true,
          onOk (close) {
            return self.$store.dispatch(moduleName + '/saveDraft', self.showPending)
          },
          onCancel () {
            self.showPending()
          }
        })
      } else {
        this.showPending()
      }
    },
    showPending () {
      this.isShowPending = true
    },
    pendingCancel () {
      this.mark = null
      this.remindTimeType = null
      this.isShowPending = false
    },
    next () {
      var comparedDraft = this.$store.getters[moduleName + '/comparedDraft']
      var self = this
      if (comparedDraft) {
        this.$confirm({
          title: '温馨提示',
          content: '系统检测到您对当前询价单有改动，是否保存为草稿',
          okText: '确定',
          cancelText: '取消',
          maskClosable: true,
          onOk (close) {
            return self.$store.dispatch(moduleName + '/saveDraft', self.nextRequestInquiry)
          },
          onCancel () {
            self.nextRequestInquiry()
          }
        })
      } else {
        this.nextRequestInquiry()
      }
    },
    addPending (closeFunc) {
      if (!this.mark) {
        this.$notification.info({
          message: '温馨提示',
          description: '请输入备注'
        })
        return false
      }
      this.loadingForPending = true
      var params = {
        businessId: this.detailData.requestInquiryId,
        businessType: 10,
        remindTimeType: this.remindTimeType,
        memo: this.mark
      }
      server.addPending(params).then((resp) => {
        if (resp.code === 200) {
          this.loadingForPending = false
          this.$message.success('已成功加入记事本')
          this.initIndexRightSider()
          if (typeof closeFunc === 'function') {
            closeFunc()
          }
          this.pendingCancel()
        }
      })
    },
    changeMark (obj) {
      this.mark = obj.key
    }
  },
  created () {
  }
}
</script>
<style scoped>
#detail-todo{
  max-width: 50%;
  min-width: 20%;
  float: right;
}
#detail-todo button{
  font-size: 12px;
  line-height: 28px;
}
.wait-for-sheet{
  font-size: 12px;
  color: #108EE9;
}
.pending-content{
  line-height: 32px;
  padding: 20px 20px 5px;
}
.pending-content .ant-row{
  margin-bottom: 15px;
}
.pending-content .ant-time-picker{
  width: 168px;
}
.mark{
  width: 168px;
}
</style>
