<template>
  <div class="requestInquiry-detail">
    <!-- header -->
    <a-affix :offsetTop="65">
      <div class='content-head'>
        <detail-status></detail-status>
        <div class='content-head-status'>
          <div>
            <supplier-pull></supplier-pull>
            <item-pull></item-pull>
          </div>
          <detail-todo></detail-todo>
        </div>
      </div>
    </a-affix>
    <!-- content -->
    <div class="rqdetail qidetail">
      <div class="mask" v-if="(detailData.status === 50 && detailData.contactSupplierStatus === 0)">
        <div style="text-align: center;">
          <a-icon type="unlock" />
          <p>请先联系供应商，再反馈询价单</p>
        </div>
      </div>
      <a-tabs :defaultActiveKey="defaultActiveKey">
        <a-tab-pane tab="询价详情" key="1">
          <detail-card></detail-card>
        </a-tab-pane>
        <a-tab-pane tab="其他信息" key="2">
          <div id="request-detail-other">
            <detail-other>
            </detail-other>
          </div>
        </a-tab-pane>
        <a-tab-pane tab="沟通" key="3">
          <i-m :biz-id="detailData.requestInquiryId" biz-type="1"></i-m>
        </a-tab-pane>
        <a-tab-pane key="4">
          <span slot="tab">
            评价
            <span class="rating-tips" v-if="ratingStatus.canRating">快去评论吧</span>
          </span>
          <rating
          :businessId="detailData.requestInquiryId"
          :businessType="businessType"
          :businessStatus='detailData.status'
          :ratingStatus="ratingStatus || {}"
          :ratingTypes="ratingTypes"
          :doNextFunction='nextRequestInquiry'
          cannotRatingAndIsNotRatedTitle="尚未开码单，无法评价"></rating>
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>
<script>
// import Vue from 'vue'
import { mapState, mapActions, mapMutations } from 'vuex'
import moduleName from './store'
import LayoutVuex from './../../../Layout/newIndex/store'
// import { Button, Tabs, Affix, Icon } from 'ant-design-vue'
import detailStatus from './components/detail/detail-status'
import detailTodo from './components/detail/detail-todo'
import supplierPull from './components/detail/supplier-pull'
import itemPull from './components/detail/item-pull'
import detailCard from './components/detail/detail-card'
import rating from '@/components/rating/rating'
import detailOther from './components/detail/detail-other'
import supplierBankinfo from './components/supplier-bankinfo/supplier-bankinfo'
import IM from '@/components/IM/index'

// Vue.component(Button.name, Button)
// Vue.component(Tabs.name, Tabs)
// Vue.component(Icon.name, Icon)
// Vue.component(Tabs.TabPane.name, Tabs.TabPane)
// Vue.component(Affix.name, Affix)

export default {
  name: 'requestInquiry-detail',
  components: {
    detailStatus,
    detailTodo,
    supplierPull,
    itemPull,
    rating,
    detailCard,
    detailOther,
    supplierBankinfo,
    IM
  },
  data () {
    return {
      defaultActiveKey: '1',
      businessType: 10,
      ratingTypes: [
        {
          ratingType: 10,
          score: 0,
          title: '销售态度'
        },
        {
          ratingType: 20,
          score: 0,
          title: '销售回复速度'
        },
        {
          ratingType: 30,
          score: 0,
          title: '总体评价'
        }
      ]
    }
  },
  computed: {
    ...mapState(moduleName, {
      currentPageId: state => state.currentPageId,
      pageData: state => state.pageData
    }),
    detailData: state => state.pageData[state.currentPageId].detailData,
    ratingStatus: state => state.pageData[state.currentPageId].detailData.ratingStatus
  },
  methods: {
    ...mapMutations(moduleName, [
      'createdPageData'
    ]),
    ...mapActions(moduleName, [
      'inquiryDetail',
      'nextRequestInquiry'
    ]),
    ...mapActions(LayoutVuex, [
      'initIndexRightSider',
      'deleteIndexRightSider'
    ])
  },
  beforeCreate () {
    // var id = this.$route.params.id
    // this.$store.commit(moduleName + '/' + 'createdPageData', id)
    // this.$store.dispatch(moduleName + '/' + 'inquiryDetail', id)
  },
  created () {
    var requestInquiryId = this.$route.params.id
    this.createdPageData(requestInquiryId)
    this.inquiryDetail(requestInquiryId)
    this.deleteIndexRightSider({'businessId': requestInquiryId, 'businessType': 10}).then(data => {
      if (data && data.code === 200) {
        this.initIndexRightSider()
      }
    })
    if (this.$route.query.tabKey) {
      this.defaultActiveKey = this.$route.query.tabKey
    }
  },
  inject: ['reload'],
  watch: {
    '$route' (to, from) {
      this.reload()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .requestInquiry-detail{
    width: 100%;
    overflow: hidden;
  }
  .content-head{
    background: #fff;
    padding: 20px;
    border-radius: 5px;
    border: 1px solid #E9E9E9;
  }
  .content-head-status {
    display: flex;
    justify-content: space-between;
  }
  .rqdetail{
    background: #fff;
    padding: 0;
    margin-top: 15px;
    border-radius: 5px;
  }
  #request-detail{
    display: flex;
  }
  .qidetail{
    position: relative;
    z-index: 0;
  }
  .qidetail .mask{
    position: absolute;
    z-index: 99999;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0,0,0,.8);
    color: #fff;
    font-size: 40px;
    display: -webkit-flex;
    display: flex;
    -webkit-align-items: center;
    align-items: center;
    -webkit-justify-content: center;
    justify-content: center;
  }
  .qidetail .anticon{
    font-size: 80px;
  }
  .qidetail p{
    font-size: 30px;
  }
  .rating-tips {
    font-size: 12px;
    color: #F5A623;
    border: 1px solid #F5A623;
    padding: 0 5px;
    height: 18px;
    line-height: 18px;
    border-radius: 9px;
    vertical-align: super;
  }
</style>
