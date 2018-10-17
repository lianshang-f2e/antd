<template>
  <div id="supplier-bankinfo" style="font-size:14px;">
    <span class="report" @click="showModal">银行卡报错</span>
    <a-modal
      v-model="visible"
      title="银行卡报错"
      onOk="handleOk"
      @cancel="handleCancel"
      width="510px"
    >
      <!-- 按钮 -->
      <template slot="footer">
        <a-button key="back" @click="handleCancel">取消</a-button>
        <a-button key="submit" type="primary" :loading="loading" @click="handleOk">确定</a-button>
      </template>

      <!-- 主体 -->
      <div>
        <a-row style="height:38px;">
          <a-col :span="4" style="margin-left:16px;margin-top:10px">持卡人姓名:</a-col>
          <a-col :span="10">
            <a-input placeholder="请输入" v-model="reportData.data.supplierInfoDto.supplierBankAccountDtos[0].accountOwner" style="height:28px;width:350px;margin-top:5px"/>
          </a-col>
        </a-row>
        <a-row style="height:38px">
          <a-col :span="4" style="margin-left:16px;margin-top:10px">开户银行:</a-col>
          <a-col :span="10">
            <a-select
              :filterOption="filterSelectOption"
              showSearch
              allowClear
              placeholder="请选择"
              @change="handleBankChange"
              v-model="reportData.data.supplierInfoDto.supplierBankAccountDtos[0].bankId"
              :defaultValue="reportData.data.supplierInfoDto.supplierBankAccountDtos[0].bankId"
              style="height:28px;width:350px;margin-top:5px" >
              <a-select-option v-for="bank in selectData.bankData" :key="bank.bankId">{{bank.bankName}}</a-select-option>
            </a-select>
          </a-col>
        </a-row>
        <a-row style="height:38px">
          <a-col :span="4" style="margin-left:16px;margin-top:10px">开户城市:</a-col>
          <a-col :span="10">
            <a-cascader
              :options="selectData.provinceData"
              @change="handleCityChange"
              :loadData="loadCityData"
              placeholder="请选择"
              v-model="reportData.data.supplierInfoDto.supplierBankAccountDtos[0].selectCity"
              style="height:28px;width:350px;margin-top:5px"/>
          </a-col>
        </a-row>
        <a-row style="height:38px">
          <a-col :span="4" style="margin-left:16px;margin-top:10px">开户支行:</a-col>
          <a-col :span="10">
            <a-select
              :filterOption="filterSelectOption"
              showSearch
              allowClear
              placeholder="请选择"
              @change="handleSubBankChange"
              v-model="reportData.data.supplierInfoDto.supplierBankAccountDtos[0].bankBranchId"
              :defaultValue="reportData.data.supplierInfoDto.supplierBankAccountDtos[0].bankBranchId"
              style="height:28px;width:350px;margin-top:5px" >
              <a-select-option v-for="subBank in selectData.subBankData" :key="subBank.bankBranchId">{{ subBank.bankSubName }}</a-select-option>
            </a-select>
          </a-col>
        </a-row>
        <a-row style="height:38px">
          <a-col :span="4" style="margin-left:16px;margin-top:10px">银行帐户:</a-col>
          <a-col :span="10">
            <a-input placeholder="请输入" style="height:28px;width:350px;margin-top:5px" v-model="reportData.data.supplierInfoDto.supplierBankAccountDtos[0].accountNo"/>
          </a-col>
        </a-row>
        <a-row style="height:38px">
          <a-col :span="4" style="margin-left:16px;margin-top:10px;">帐号类型:</a-col>
          <a-col :span="10">
            <a-radio-group v-model="reportData.data.supplierInfoDto.supplierBankAccountDtos[0].accountType" style="margin-top:11px">
              <a-radio :value="1">个人</a-radio>
              <a-radio :value="2">公司</a-radio>
            </a-radio-group>
          </a-col>
        </a-row>
      </div>
    </a-modal>
  </div>
</template>

<script>
// import Vue from 'vue'
// import { Icon, Input, Button, Select, Cascader, Modal } from 'ant-design-vue'
import axios from '@/components/axios'
import { mapActions, mapState, mapMutations } from 'vuex'
import moduleName from './store'

// Vue.component(Select.name, Select)
// Vue.component(Cascader.name, Cascader)
// Vue.component(Select.Option.name, Select.Option)
// Vue.component(Icon.name, Icon)
// Vue.component(Button.name, Button)
// Vue.component(Input.TextArea.name, Input.TextArea)
// Vue.component(Modal.name, Modal)

export default {
  name: 'bankinfo',
  mounted () {
    this.init(this.supplierBankAccount)
  },
  props: ['supplierId', 'supplierBankAccount'],
  data () {
    return {
    }
  },
  computed: {
    ...mapState(moduleName, {
      reportData: state => state.reportData,
      selectData: state => state.selectData,
      visible: state => state.visible,
      loading: state => state.loading
    })
  },
  methods: {
    ...mapActions(moduleName, [
      'init',
      'handleCityChange',
      'handleBankChange',
      'handleSubBankChange',
      'queryCityData',
      'submit'
    ]),
    ...mapMutations(moduleName, [
      'setLoading',
      'setVisible'
    ]),
    loadCityData (selectedOptions) {
      const targetOption = selectedOptions[selectedOptions.length - 1]
      targetOption.loading = true

      axios.get('/public/getCityList?id=' + targetOption.value).then(data => {
        targetOption.children = data.data.list.map(item => ({
          value: item.id.toString(),
          label: item.name
        }))

        targetOption.loading = false
        this.selectData.provinceData = [...this.selectData.provinceData]
      })
    },
    filterSelectOption (input, option) {
      return option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
    },
    showModal () {
      this.setVisible(true)
    },
    handleOk () {
      this.setLoading(true)
      this.submit(this.supplierId)
    },
    handleCancel () {
      this.setVisible(false)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.report{
  cursor:pointer;
  color:red;
}
.report:hover{
  color:blue;
  text-decoration:underline;
}
</style>
