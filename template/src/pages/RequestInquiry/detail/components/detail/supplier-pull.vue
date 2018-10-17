<template>
  <a-collapse>
    <a-collapse-panel id='supplier-box' header="供应商信息" key="1" :disabled='false' >
        <a-row style="height:38px;">
          <a-col :span="24" class='weight1'>{{supplierInfo.supplierName}}</a-col>
        </a-row>
        <a-row>
          <a-col :span="8" >联系人：</a-col>
          <a-col :span="16" >{{supplierInfo.supplierContact}}</a-col>
        </a-row>
        <a-row>
          <a-col :span="8" >联系电话：</a-col>
          <a-col :span="16" >{{supplierInfo.supplierContactMobile}}</a-col>
        </a-row>
        <a-row>
          <a-col :span="8" >供应商ID：</a-col>
          <a-col :span="16" >{{supplierInfo.supplierId}}</a-col>
        </a-row>
        <a-row v-if="supplierInfo.supplierBankAccount">
          <a-col :span="8" >银行卡帐号：</a-col>
          <a-col :span="16" >{{supplierInfo.supplierBankAccount?supplierInfo.supplierBankAccount.accountNo:''}}</a-col>
        </a-row>
        <a-row v-if="supplierInfo.supplierBankAccount">
          <a-col :span="8" >账号收款人：</a-col>
          <a-col :span="16" >{{supplierInfo.supplierBankAccount?supplierInfo.supplierBankAccount.accountOwner:''}}</a-col>
        </a-row>
        <a-row v-if="supplierInfo.supplierBankAccount">
          <a-col :span="8" >银行信息：</a-col>
          <a-col :span="16" >{{supplierInfo.supplierBankAccount?supplierInfo.supplierBankAccount.bankFullname:''}}</a-col>
        </a-row>
        <a-row >
          <supplier-bankinfo :supplierId='supplierInfo.supplierId' :supplierBankAccount='supplierInfo.supplierBankAccount' v-show="supplierInfo.supplierId && detailData.status===10"/>
        </a-row>
    </a-collapse-panel>
  </a-collapse>
</template>
<script>
// import Vue from 'vue'
import {mapState} from 'vuex'
// import {Collapse} from 'ant-design-vue'
import moduleName from '../../store'
import supplierBankinfo from '../supplier-bankinfo/supplier-bankinfo'

// Vue.component(Collapse.name, Collapse)
// Vue.component(Collapse.Panel.name, Collapse.Panel)
export default {
  data () {
    return {
    }
  },
  components: {
    supplierBankinfo
  },
  computed: {
    ...mapState(moduleName, {
      currentPageId: state => state.currentPageId,
      pageData: state => state.pageData
    }),
    detailData: state => state.pageData[state.currentPageId].detailData,
    supplierInfo: state => (state.pageData[state.currentPageId].detailData.supplierInfo || {supplierBankAccount: {}})
  },
  methods: {
  },
  created () {
  }
}
</script>
<style>
 #supplier-box .ant-collapse-header {
  display: inline-block;
  padding: 0 14px;
  padding-right: 30px;
  width: 100%;
  min-width: 162px;
  height: 32px;
  line-height: 32px;
  color: #666;
  background: #f0f2f5;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
}
#supplier-box .ant-collapse-header .arrow{
  top: -6px;
  left: auto;
  right: 10px;
  margin-left: 57px;
}
#supplier-box .ant-collapse-content{
  padding: 0;
}
#supplier-box .ant-collapse-content-box {
  padding: 14px;
}
#supplier-box .ant-collapse-content-box p{
  margin-bottom: 0;
  padding-bottom: 0;
}
</style>
<style scoped>
.ant-collapse{
  display: inline-block;
  font-size: 14px;
}
.weight1{
  font-weight: 700;
}
.ant-col-8{
  width: 6em;
  line-height: 27px;
}
</style>
