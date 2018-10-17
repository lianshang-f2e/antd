<template>
  <div id='detail-status'>
    <a-row>
      <a-col class='header-status' :span='18'>
        <span class='left-name'>询价单号：{{ detailData.requestInquiryId }}<div class="base-price" v-if="detailData.hasBaseItem === 1">基</div></span>
        <span class='left-name style11' v-show="detailData.originRequestInquiryId !== 0">原询价单：
           <router-link :to="'/index/RequestInquiry/detail/' + detailData.originRequestInquiryId">{{detailData.originRequestInquiryId }}
        </router-link></span>
        <span class='left-name style11' v-show="detailData.packingSlipId">码单号：
          <router-link :to="'/index/PackingSlip/detail/' + detailData.packingSlipId">{{detailData.packingSlipId}}</router-link>
        </span>
        <span class='left-name style11' v-show="detailData.tradeId && detailData.tradeId !== 0">订单号：
           <router-link :to="'/index/Declaration/detail/' + detailData.tradeId">{{detailData.tradeId }}
        </router-link></span>
      </a-col>
      <a-col class='header-status-right' :span='6'>
        <span class='status-name'>状态</span>
        <span class='status-val'>{{detailData.statusName}}</span>
        <span class='data-name'>生成日期</span>
        <span class='data-val'>{{ detailData.createTime }}</span>
      </a-col>
    </a-row>
  </div>
</template>
<script>
// import Vue from 'vue'
import {mapState} from 'vuex'
import moduleName from '../../store'
// import {Col, Row} from 'ant-design-vue'

// Vue.component(Col.name, Col)
// Vue.component(Row.name, Row)
export default {
  data () {
    return {
    }
  },
  // props: [],
  computed: {
    ...mapState(moduleName, {
      currentPageId: state => state.currentPageId,
      pageData: state => state.pageData
    }),
    detailData: state => state.pageData[state.currentPageId].detailData
  },
  methods: {
    requestInquiryStatus: detailDataStatus => {
      var requestInquiryStatus
      switch (detailDataStatus) {
        case 1:
          requestInquiryStatus = '代开码单'
          break
        case 2:
          requestInquiryStatus = '已开码单'
          break
        case 3:
          requestInquiryStatus = '已失效'
          break
        default:
          requestInquiryStatus = '已过期'
      }
      return requestInquiryStatus
    }
  },
  created () {
  }
}
</script>
<style scoped>
#detail-status {
  width: 100%;
  margin-bottom: 10px;
}
.header-status span{
  vertical-align: middle;
}
.left-name, .left-num{
  font-size: 18px;
  color: #333333;
  line-height: 26px;
}
.style11{
  font-size: 14px;
  letter-spacing: 0;
  line-height: 21px;
  margin-left: 15px;
}
.center-name, .right-name{
  color: #666666;
}
.center-num, .right-num{
  color: #108EE9;
}
.center-num, .right-num, .left-num{
  margin-right: 15px;
}
.header-status-right{
  text-align: right;
}
.status-name, .data-name{
  font-size: 12px;
  color: #999999;
  line-height: 18px;
}
.status-val, .data-val{
  margin-right: 15px;
  font-size: 12px;
  color: #2A2A2A;
  line-height: 18px;
}
.status-val{
  margin-right: 15px;
}
.base-price {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #4CAF50;
  color: #fff;
  line-height: 20px;
  font-weight: normal;
  font-size: 12px;
  margin: 0 5px;
  display: inline-block;
  text-align: center;
}
</style>
