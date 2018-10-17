<template>
  <div class='card-box'>
    <a-row>
      <a-col :span="12" class="card-cont" v-for='(requestInquiryDetailQuerySkuResponse, index) in requestInquiryDetailQuerySkuResponseList' :key='index' >
        <div class='detail-card' >
          <div class='detail-card-head'>
            <a-row>
              <a-col :span='5' v-if="itemInfo.rootCategoryId === 1 && requestInquiryDetailQuerySkuResponse.itemColorDTO.id">色号：{{requestInquiryDetailQuerySkuResponse.colorNo}}</a-col>
              <a-col :span='5' v-if="itemInfo.rootCategoryId === 1 && !requestInquiryDetailQuerySkuResponse.itemColorDTO.id">色号：{{requestInquiryDetailQuerySkuResponse.itemColorDTO.colorNo}}</a-col>
              <a-col :span='5' v-if="itemInfo.rootCategoryId === 2 && requestInquiryDetailQuerySkuResponse.itemSpecificationDTO.id">规格：{{requestInquiryDetailQuerySkuResponse.itemSpecificationDTO.specification}}</a-col>
              <a-col :span='5' v-if="itemInfo.rootCategoryId === 2 && !requestInquiryDetailQuerySkuResponse.itemSpecificationDTO.id">规格：{{requestInquiryDetailQuerySkuResponse.specification}}</a-col>
              <a-col :span='5'>颜色：{{requestInquiryDetailQuerySkuResponse.colorName}}</a-col>
              <a-col :span='7'>意向价：{{requestInquiryDetailQuerySkuResponse.intentionalPrice}}元/{{requestInquiryDetailQuerySkuResponse.measurementUnit}}</a-col>
              <a-col :span='7'>数量：{{requestInquiryDetailQuerySkuResponse.amount}}{{requestInquiryDetailQuerySkuResponse.measurementUnit}}</a-col>
            </a-row>
          </div>
          <div class='detail-card-color'>
            <div class='card-color-bg' :style="{ 'background': (requestInquiryDetailQuerySkuResponse.colorName==='' || requestInquiryDetailQuerySkuResponse.colorName=='花版')?'url(' + realPics[0] + ') 100% 100%':'rgb(' + ((requestInquiryDetailQuerySkuResponse.itemColorDTO && requestInquiryDetailQuerySkuResponse.itemColorDTO.rgb)?requestInquiryDetailQuerySkuResponse.itemColorDTO.rgb:'255,255,255') + ')' }">
              <div class="card-img-info" v-if="(requestInquiryDetailQuerySkuResponse.colorName==='' || requestInquiryDetailQuerySkuResponse.colorName=='花版') && realPics[0]">
                <a :href="realPics[0]" target="_blank"><img :src="realPics[0]" style="width: 100%; height: 200px;" alt=""></a>
              </div>
              <div class='card-color-info' v-if="itemInfo.rootCategoryId === 1">
                <a-row>
                  <a-col :span='12'>样布链尚价：{{requestInquiryDetailQuerySkuResponse.itemColorDTO.originSwatchPrice}}元/{{itemInfo.swatchMeasurementUnit}}</a-col>
                  <a-col :span='12'>大货链尚价：{{requestInquiryDetailQuerySkuResponse.itemColorDTO.originLargeCargoPrice}}元/{{itemInfo.swatchMeasurementUnit}}</a-col>
                </a-row>
                <a-row>
                  <a-col :span='12'>样布采购价：{{requestInquiryDetailQuerySkuResponse.itemColorDTO.originSwatchProcurementPrice}}元/{{itemInfo.largeCargoMeasurementUnit}}</a-col>
                  <a-col :span='12'>大货采购价：{{requestInquiryDetailQuerySkuResponse.itemColorDTO.originLargeCargoProcurementPrice}}元/{{itemInfo.largeCargoMeasurementUnit}}</a-col>
                </a-row>
              </div>
              <div class='card-color-info' v-if="itemInfo.rootCategoryId === 2 && requestInquiryDetailQuerySkuResponse.itemSpecificationDTO">
                <a-row>
                  <a-col :span='12'>样布链尚价：{{requestInquiryDetailQuerySkuResponse.itemSpecificationDTO.originSwatchPrice}}元/{{itemInfo.swatchMeasurementUnit}}</a-col>
                  <a-col :span='12'>大货链尚价：{{requestInquiryDetailQuerySkuResponse.itemSpecificationDTO.originLargeCargoPrice}}元/{{itemInfo.swatchMeasurementUnit}}</a-col>
                </a-row>
                <a-row>
                  <a-col :span='12'>样布采购价：{{requestInquiryDetailQuerySkuResponse.itemSpecificationDTO.originSwatchProcurementPrice}}元/{{itemInfo.largeCargoMeasurementUnit}}</a-col>
                  <a-col :span='12'>大货采购价：{{requestInquiryDetailQuerySkuResponse.itemSpecificationDTO.originLargeCargoProcurementPrice}}元/{{itemInfo.largeCargoMeasurementUnit}}</a-col>
                </a-row>
              </div>
            </div>
          </div>
          <div class='detail-card-content' v-if="itemInfo.rootCategoryId === 1">
            <div class='card-content-stock'>
              <a-row>
                <a-col :span='4' class='stock-situ'>库存情况：</a-col>
                <a-col :span='20' v-show="itemInfo.rootCategoryId === 1">
                  <a-radio-group name="radioGroup" v-model="requestInquiryDetailQuerySkuResponse.itemColorDTO.inventoryStatus" :disabled="!canEdit">
                    <a-radio :value="0">无货</a-radio>
                    <a-radio :value="2">足货</a-radio>
                    <a-radio :value="1">有货</a-radio>
                    <span v-show='requestInquiryDetailQuerySkuResponse.itemColorDTO.inventoryStatus === 1'>
                      <a-input-number placeholder="请输入库存数量"  class='stock-situ-input' :disabled="!canEdit" v-model="requestInquiryDetailQuerySkuResponse.itemColorDTO.inventory" />
                      {{itemInfo.largeCargoMeasurementUnit}}
                    </span>
                  </a-radio-group>
                </a-col>
              </a-row>
            </div>
            <div class='card-content-info'>
              <a-row class='card-content-row'>
                <a-col :span='4' class='lh28'>样布链尚价：</a-col>
                <a-col :span='5'><a-input class='ls-price' :disabled="!canEdit" v-model="requestInquiryDetailQuerySkuResponse.itemColorDTO.swatchPrice"/></a-col>
                <a-col :span='3'><span class='pl10'>元/{{itemInfo.swatchMeasurementUnit}}</span></a-col>
                <a-col :span='4' class='lh28'>大货链尚价：</a-col>
                <a-col :span='5'><a-input class='ls-price' :disabled="!canEdit" v-model="requestInquiryDetailQuerySkuResponse.itemColorDTO.largeCargoPrice"/></a-col>
                <a-col :span='3'><span class='pl10'>元/{{itemInfo.largeCargoMeasurementUnit}}</span></a-col>
              </a-row>
              <a-row class='card-content-row'>
                <a-col :span='4' class='lh28'>样布采购价：</a-col>
                <a-col :span='5'><a-input class='ls-price' :disabled="!canEdit" v-model="requestInquiryDetailQuerySkuResponse.itemColorDTO.swatchProcurementPrice"/></a-col>
                <a-col :span='3'><span class='pl10'>元/{{itemInfo.swatchMeasurementUnit}}</span></a-col>
                <a-col :span='4' class='lh28'>大货采购价：</a-col>
                <a-col :span='5'><a-input class='ls-price' :disabled="!canEdit" v-model="requestInquiryDetailQuerySkuResponse.itemColorDTO.largeCargoProcurementPrice"/></a-col>
                <a-col :span='3'><span class='pl10'>元/{{itemInfo.largeCargoMeasurementUnit}}</span></a-col>
              </a-row>
            </div>
          </div>
          <div class='detail-card-content' v-if="itemInfo.rootCategoryId === 2">
            <div class='card-content-stock'>
              <a-row>
                <a-col :span='4' class='stock-situ'>库存情况：</a-col>
                <a-col :span='20'>
                  <a-radio-group name="radioGroup" :disabled="!canEdit"  v-model="requestInquiryDetailQuerySkuResponse.itemSpecificationDTO.inventoryStatus">
                    <a-radio :value="0">无货</a-radio>
                    <a-radio :value="2">足货</a-radio>
                    <a-radio :value="1">有货</a-radio>
                    <span v-show='requestInquiryDetailQuerySkuResponse.itemSpecificationDTO.inventoryStatus === 1'><a-input-number placeholder="请输入库存数量"  class='stock-situ-input' v-model="requestInquiryDetailQuerySkuResponse.itemSpecificationDTO.inventory"/>{{itemInfo.largeCargoMeasurementUnit}}</span>
                  </a-radio-group>
                </a-col>
              </a-row>
            </div>
            <div class='card-content-info'>
              <a-row class='card-content-row'>
                <a-col :span='4' class='lh28'>样布链尚价：</a-col>
                <a-col :span='5'><a-input class='ls-price' :disabled="!canEdit"  v-model="requestInquiryDetailQuerySkuResponse.itemSpecificationDTO.swatchPrice"/></a-col>
                <a-col :span='3'><span class='pl10'>元/{{itemInfo.swatchMeasurementUnit}}</span></a-col>
                <a-col :span='4' class='lh28'>大货链尚价：</a-col>
                <a-col :span='5'><a-input class='ls-price' :disabled="!canEdit" v-model="requestInquiryDetailQuerySkuResponse.itemSpecificationDTO.largeCargoPrice"/></a-col>
                <a-col :span='3'><span class='pl10'>元/{{itemInfo.largeCargoMeasurementUnit}}</span></a-col>
              </a-row>
              <a-row class='card-content-row'>
                <a-col :span='4' class='lh28'>样布采购价：</a-col>
                <a-col :span='5'><a-input class='ls-price' :disabled="!canEdit" v-model="requestInquiryDetailQuerySkuResponse.itemSpecificationDTO.swatchProcurementPrice"/></a-col>
                <a-col :span='3'><span class='pl10'>元/{{itemInfo.swatchMeasurementUnit}}</span></a-col>
                <a-col :span='4' class='lh28'>大货采购价：</a-col>
                <a-col :span='5'><a-input class='ls-price' :disabled="!canEdit" v-model="requestInquiryDetailQuerySkuResponse.itemSpecificationDTO.largeCargoProcurementPrice"/></a-col>
                <a-col :span='3'><span class='pl10'>元/{{itemInfo.largeCargoMeasurementUnit}}</span></a-col>
              </a-row>
            </div>
          </div>
        </div>
      </a-col>
    </a-row>
  </div>
</template>
<script>
// import Vue from 'vue'
import {mapState} from 'vuex'
// import {Input, InputNumber, Radio} from 'ant-design-vue'
import moduleName from '../../store'
// Vue.component(Input.name, Input)
// Vue.component(Radio.name, Radio)
// Vue.component(Radio.Group.name, Radio.Group)
// Vue.component(InputNumber.name, InputNumber)
export default {
  data () {
    return {
    }
  },
  computed: {
    ...mapState(moduleName, {
      currentPageId: state => state.currentPageId,
      pageData: state => state.pageData
    }),
    requestInquiryDetailQuerySkuResponseList: state => state.pageData[state.currentPageId].detailData.requestInquiryDetailQuerySkuResponseList,
    itemInfo: state => state.pageData[state.currentPageId].detailData.itemInfo,
    realPics: state => state.pageData[state.currentPageId].detailData.realPics,
    canEdit: state => state.pageData[state.currentPageId].operations.canEdit
  },
  methods: {
  },
  created () {
  }
}
</script>
<style scoped>
.card-box{
  width: 100%;
  padding-right: 10px;
  font-size: 14px;
  color: #666;
  padding: 20px;
}
.color-input{
  width: 45px;
  height: 26px;
}
.card-cont{
  padding: 10px;
}
.detail-card{
  width: 100%;
  border: 1px solid #E9E9E9;
  border-radius: 4px;
}
.detail-card-head{
  height: 32px;
  padding: 0 14px;
  line-height: 32px;
  background: #f0f2f5;
}
.detail-card-color{
  width: 100%;
  padding: 10px;
}
.card-color-bg{
  position: relative;
  width: 100%;
  min-height: 110px;
  overflow: hidden;
  cursor: pointer;
  border-radius: 5px;
}
.card-color-bg:hover .card-color-info{
  bottom: 0px;
}
.card-color-info{
  position: absolute;
  transition: bottom .3s;
  bottom: -60px;
  left: 0;
  width: 100%;
  height: 60px;
  padding: 10px 12px;
  color: #fff;
  font-weight: 100;
  background-color: rgba(0,0,0,.5)
}
.detail-card-content{
  padding: 15px 24px;
  font-size: 12px;
  border-top: 1px solid #E9E9E9;
}
.pl10{
  display: inline-block;
  width: 58px;
  height: 28px;
  line-height: 28px;
  text-align: center;
  /* margin-left: 10px; */
  background: #FFFFFF;
  border: 1px solid #D9D9D9;
  border-radius: 4px;
}
.detail-card-content input{
  height: 28px;
}
.lh28{
  line-height: 28px;
}
.card-content-row{
  padding: 0 10px;
  margin-bottom: 10px;
  text-align: center;
}
.card-content-stock{
  width: 100%;
  padding: 0 10px 10px;
  line-height: 34px;
}
.stock-situ{
  height: 32px;
  line-height: 32px;
  text-align: center;
}
.card-content-stock .ant-radio-group-default{
  width: 100%;
}
.card-content-stock .ant-radio-wrapper{
  width: 20%;
  margin-right: 0;
}
.stock-situ-input{
  width: 30%;
}

</style>
