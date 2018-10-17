<template>
  <div class="detail-other">
    <a-row>
      <h5 class="other-title">备注</h5>
    </a-row>
    <a-row>
      {{detailData.remark || '无'}}
    </a-row>
    <a-row>
        <h5 class="other-title">工艺信息</h5>
    </a-row>
    <a-row>
      <div v-if="crafts.length != 0">
        <div  v-for="(item, index) in crafts" :key="item.text">
          <a-row >
            <a-col :span="2">工艺：</a-col>
            <a-col :span="4">
              <div v-show="!item['isEdit']">{{ item.craftsName }}</div>
              <a-input placeholder="请输入" v-model="item.craftsName" v-show="item['isEdit']" :disabled='!canEdit'></a-input>
            </a-col>
            <a-col :span="2">加价：</a-col>
            <a-col :span="4">
              <div v-show="!item['isEdit']">{{ item.price }}元</div>
              <div v-show="item['isEdit']">
                <a-input-number placeholder="请输入" v-model="item.price"  :disabled='!canEdit'/>元
              </div>
            </a-col>
            <a-col :span="4">
              <a-button type="primary" :disabled='!canEdit' @click="editCraft(index)" v-show="!item['isEdit']" >修改</a-button>
              <a-button type="primary" :disabled='!canEdit' @click="confirmCraft(index)" v-show="item['isEdit']">确认</a-button>
              <a-button @click="deleteCraft(index)" :disabled='!canEdit'>删除</a-button>
            </a-col>
            <a-col :span="8">
            </a-col>
          </a-row>
        </div>
      </div>
      <div v-else>
        暂无工艺
      </div>
    </a-row>
    <a-row>
      <a-col :span="2"></a-col>
      <a-col :span="4">
        <a-button type="primary" @click="addCraft()" class="add-btn" :disabled='!canEdit'>+新增工艺</a-button>
      </a-col>
    </a-row>
    <a-divider />
    <a-row v-if = 'itemInfo.rootCategoryId === 1'>
      <h5 class="other-title">空差/米差</h5>
    </a-row>
    <a-row v-if = 'itemInfo.rootCategoryId === 1'>
      <a-radio-group v-model="detailData.isMeterDifference" :disabled='!canEdit'>
        <a-row>
          <a-radio :value="2">
            纸管：<span v-if="!canEdit">{{itemInfo.paperTube}}</span><a-input-number v-if='canEdit' placeholder="请输入" :disabled="detailData.isMeterDifference != 2 " v-model="itemInfo.paperTube" />
            空差：<span v-if="!canEdit">{{itemInfo.blankShort}}</span><a-input-number v-if='canEdit' placeholder="请输入" :disabled="detailData.isMeterDifference != 2" v-model="itemInfo.blankShort"/>
          </a-radio>
        </a-row>
        <a-row>
          <a-radio :value="1">
            米差：<span v-if="!canEdit">{{itemInfo.meterShort}}</span><a-input v-if='canEdit' placeholder="请输入" :disabled="detailData.isMeterDifference != 1" v-model="itemInfo.meterShort"/>
          </a-radio>
        </a-row>
      </a-radio-group>
    </a-row>
  </div>
</template>
<script>
// import Vue from 'vue'
import { mapState } from 'vuex'
// import { Input, InputNumber, Row, Col, Divider, Radio } from 'ant-design-vue'
import moduleName from './../../store'
// Vue.component(Input.name, Input)
// Vue.component(Row.name, Row)
// Vue.component(Col.name, Col)
// Vue.component(Divider.name, Divider)
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
    detailData: state => state.pageData[state.currentPageId].detailData,
    crafts: state => state.pageData[state.currentPageId].detailData.itemCraftsDTOList,
    itemInfo: state => state.pageData[state.currentPageId].detailData.itemInfo,
    canEdit: state => state.pageData[state.currentPageId].operations.canEdit
  },
  methods: {
    addCraft () {
      this.$set(this.crafts, this.crafts.length, {'craftsName': null,
        'price': 0.0,
        'isEdit': true})
    },
    deleteCraft (index) {
      this.crafts.splice(index, 1)
    },
    editCraft (index) {
      this.$set(this.crafts[index], 'isEdit', true)
    },
    confirmCraft (index) {
      this.$set(this.crafts[index], 'isEdit', false)
    }
  },
  created () {
    // console.log(this.itemInfo)
  }
}
</script>
<style scoped>
  .detail-other{
    padding: 20px 40px;
    line-height: 32px;
  }
  .other-title {
    font-family: PingFangSC-Semibold;
    font-size: 14px;
    color: #333333;
    line-height: 14px;
    font-weight: 700;
    border-left: 4px solid #108EE9;
    padding-left: 6px;
    margin: 20px 0 15px;
  }
  .detail-other .ant-row{
    margin-bottom: 10px;
  }
  .detail-other .ant-col-2{
    text-align: right;
  }
  .add-btn{
    margin-top: 10px;
  }
</style>
