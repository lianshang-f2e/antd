<template>
  <div class="home">
    <div class="home-top">
      <a-row type="flex" :gutter="16">
        <a-col :span="8">
          <router-link :to="'/index/RequestInquiry/list?dateType=today&userId='+ userInfo.id">
            <div class="home-box" :style="{backgroundImage: 'url(' + xunjiabg + ')' }">
              <p class="p1">今日询价单</p>
              <p class="p2"> {{ homeStatistics.todayInquiry }} &nbsp;</p>
              <p class="p1">您有 {{ homeStatistics.pastInquiry }} 张，往期待反馈</p>
            </div>
          </router-link>
        </a-col>
        <a-col :span="8">
          <router-link :to="'/index/PackingSlip/list?dateType=today&userId='+ userInfo.id">
            <div class="home-box" :style="{backgroundImage: 'url(' + madanbg + ')' }">
              <p class="p1">今日码单</p>
              <p class="p2"> {{ homeStatistics.todayPackingSlip }} &nbsp;</p>
              <p class="p1">您有 {{ homeStatistics.todayPendingPs }} 张，往期待开码单</p>
            </div>
          </router-link>
        </a-col>
        <a-col :span="8">
          <router-link :to="'/index/Order/list?dateType=today&userId='+ userInfo.id ">
            <div class="home-box" :style="{backgroundImage: 'url(' + dingdanbg + ')' }">
              <p class="p1">今日订单</p>
              <p class="p2"> {{ homeStatistics.todayOrder }} &nbsp;</p>
              <p class="p1">您有 {{ homeStatistics.unpayOrder }} 张，往期待付款</p>
            </div>
          </router-link>
        </a-col>
      </a-row>
    </div>
    <h4 class="home-content-title">快速通道</h4>
    <div class="home-content">
      <a-row type="flex" :gutter="16">
        <a-col :span="6">
          <router-link :to="'/index/RequestInquiry/list?status=50&userId='+ userInfo.id">
            <div class="home-ks">
              <div class="home-ks-left-border col1"></div>
              <h4>
                待反馈询价单
                <a-icon type="right" style="float: right; line-height: 24px;"></a-icon>
              </h4>
              <p>{{ homeStatistics.toFeedbackInquiry }}</p>
            </div>
          </router-link>
        </a-col>
        <a-col :span="6">
          <router-link :to="'/index/RequestInquiry/list?status=10&userId='+ userInfo.id">
            <div class="home-ks">
              <div class="home-ks-left-border col2"></div>
              <h4>
                待开码单
                <a-icon type="right" style="float: right; line-height: 24px;"></a-icon>
              </h4>
              <p>{{ homeStatistics.allPendingPs }}</p>
            </div>
          </router-link>
        </a-col>
        <a-col :span="6">
          <div class="home-ks">
            <div class="home-ks-left-border col3"></div>
            <h4>
              催单
              <a-icon type="right" style="float: right; line-height: 24px;"></a-icon>
            </h4>
            <p>{{ homeStatistics.urgeInquiryCount }}</p>
          </div>
        </a-col>
        <a-col :span="6">
            <div class="home-ks">
              <div class="home-ks-left-border col4"></div>
              <h4>
                待报单
                <a-icon type="right" style="float: right; line-height: 24px;"></a-icon>
              </h4>
              <p>{{ homeStatistics.pendingDeclaration }}</p>
            </div>
        </a-col>
        <a-col :span="6">
          <!-- <router-link to="/login"> -->
            <div class="home-ks">
              <div class="home-ks-left-border col5"></div>
              <h4>
                待处理售中
                <a-icon type="right" style="float: right; line-height: 24px;"></a-icon>
              </h4>
              <p>{{ homeStatistics.pendingOnSale }}</p>
            </div>
          <!-- </router-link> -->
        </a-col>
        <a-col :span="6">
          <!-- <router-link to="/login"> -->
            <div class="home-ks">
              <div class="home-ks-left-border col1"></div>
              <h4>
                待处理售后
                <a-icon type="right" style="float: right; line-height: 24px;"></a-icon>
              </h4>
              <p>{{ homeStatistics.pendingAfterSale }}</p>
            </div>
          <!-- </router-link> -->
        </a-col>
        <a-col :span="6">
          <router-link :to="'/index/Order/list?status=1&userId='+ userInfo.id">
            <div class="home-ks">
              <div class="home-ks-left-border col2"></div>
              <h4>
                待付款
                <a-icon type="right" style="float: right; line-height: 24px;"></a-icon>
              </h4>
              <p>{{ homeStatistics.pendingPayTradeCount }}</p>
            </div>
          </router-link>
        </a-col>
      </a-row>
    </div>
    <!-- address -->
    <!-- <address-list pid="" @change="newhange"></address-list> -->
  </div>
</template>

<script>
// import Vue from 'vue'
// import { Row, Col } from 'ant-design-vue'
import moduleName from './store'
import { mapState, mapActions } from 'vuex'
import dingdanbg from '@/assets/home/img_dingdan.png'
import madanbg from '@/assets/home/img_madan.png'
import xunjiabg from '@/assets/home/img_xunjia.png'
// import addressList from '@/components/addressList'

// Vue.component(Row.name, Row)
// Vue.component(Col.name, Col)

export default {
  name: 'home',
  components: {
  // addressList
  },
  data () {
    return {
      dingdanbg,
      madanbg,
      xunjiabg
    }
  },
  computed: {
    ...mapState(moduleName, {
      homeStatistics: state => state.homeStatistics
    }),
    userInfo: function (state) {
      return this.$store.state.global.userInfo
    }
  },
  methods: {
    ...mapActions(moduleName, [
      'getHomeStatistics'
    ]),
    newhange () {
      console.log(arguments)
    }
  },
  created () {
    this.getHomeStatistics()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.home{
  padding: 30px 20px;
  min-width: 980px;
  margin: 0 auto;
  max-width: 1080px;
}
.home-content-title{
  font-size: 14px;
  font-weight: 400;
  color: #666666;
  margin: 35px 0 15px;
}
.home-box{
  background-size: cover;
  width: 295px;
  height: 160px;
  padding: 15px;
}
.home-box:hover{
  opacity: .9;
  box-shadow: 0 5px 10px rgba(0,0,0,.1);
}
.p1{
  color: #ffffff;
  font-size: 16px;
  font-weight: 400;
  margin-bottom: 0;
  text-align: left;
}
.p2{
  font-size: 48px;
  font-weight: 400;
  line-height: 80px;
  color: #ffffff;
  margin-bottom: 0;
  text-align: left;
}
.p3{
  color: #ffffff;
}
.home-ks{
  width: 220px;
  height: 130px;
  background: #ffffff;
  padding: 20px 20px 0 30px;
  position: relative;
  z-index: 0;
  border-radius: 0 4px 4px 0;
  margin-bottom: 25px;
}
.home-ks:hover {
  box-shadow: 0 5px 10px rgba(0,0,0,.1);
}
.home-ks-left-border{
  width: 7px;
  position: absolute;
  z-index: 1;
  left: 0;
  top: 0;
  bottom: 0;
}
.home-ks h4{
  font-size: 16px;
  color: #666666;
  margin-bottom: 10px;
  font-weight: 400;
}
.home-ks p{
  font-size: 48px;
  line-height: 60px;
  margin-bottom: 0;
  color: #666666;
}
.col1{
  /* background: linear-gradient( left top, #60D04A, #B2EB5F); */
  background: -webkit-gradient( linear, left top, right bottom, from(#60D04A), to(#B2EB5F));
}
.col2{
  /* background: linear-gradient( left top, #F7964A, #F9B526); */
  background: -webkit-gradient( linear, left top, right bottom, from(#F7964A), to(#F9B526));
}
.col3{
  /* background: linear-gradient( left top, #F5515F, #E22541); */
  background: -webkit-gradient( linear, left top, right bottom, from(#F5515F), to(#E22541));
}
.col4{
  /* background: linear-gradient( left top, #7140F0, #515FEE); */
  background: -webkit-gradient( linear, left top, right bottom, from(#7140F0), to(#515FEE));
}
.col5{
  /* background: linear-gradient( left top, #F7964A, #F9B526); */
  background: -webkit-gradient( linear, left top, right bottom, from(#F7964A), to(#F9B526));
}
.col6{
  /* background: linear-gradient( left top, #60D04A, #B2EB5F); */
  background: -webkit-gradient( linear, left top, right bottom, from(#60D04A), to(#B2EB5F));
}
</style>
