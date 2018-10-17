<template>
  <a-collapse>
    <a-collapse-panel id='item-box' header="商品信息" key="1" :disabled='false'>
      <p class='weight1'>{{detailData.itemInfo.itemCode}}</p>
      <p><b>品名：</b>{{detailData.itemInfo.itemName}}</p>
      <p><b>商品ID：</b>{{detailData.itemInfo.itemId}}</p>
      <p><b>Spu：</b>{{detailData.itemInfo.SPU}}</p>
      <p><b>链尚货号：</b>{{detailData.itemInfo.lsItemCode}}</p>
    </a-collapse-panel>
  </a-collapse>
</template>
<script>
// import Vue from 'vue'
import {mapState} from 'vuex'
// import {Collapse} from 'ant-design-vue'
import moduleName from '../../store'

// Vue.component(Collapse.name, Collapse)
// Vue.component(Collapse.Panel.name, Collapse.Panel)
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
    detailData: state => state.pageData[state.currentPageId].detailData
  },
  methods: {
  },
  created () {
  }
}
</script>
<style>
 #item-box .ant-collapse-header {
  display: inline-block;
  padding: 0 14px;
  padding-right: 30px;
  min-width: 162px;
  width: 100%;
  height: 32px;
  line-height: 32px;
  color: #666;
  background: #f0f2f5;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
}
#item-box .ant-collapse-header .arrow{
  top: -6px;
  left: auto;
  right: 10px;
  margin-left: 57px;
}
#item-box .ant-collapse-content{
  padding: 0;
}
#item-box .ant-collapse-content-box {
    padding: 14px;
}
#item-box .ant-collapse-content-box p{
  margin-bottom: 0;
  padding-bottom: 0;
}
</style>
<style scoped>
.ant-collapse{
  display: inline-block;
  vertical-align: top;
  font-size: 14px;
}
.weight1{
  font-weight: 600;
}
#item-box p{
  margin-bottom: 0;
  line-height: 27px;
}
#item-box p b{
  width: 5em;
  font-weight: 400;
  display: inline-block;
}
</style>
