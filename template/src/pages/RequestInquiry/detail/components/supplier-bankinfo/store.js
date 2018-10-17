import store from '@/store/index'
import axios from '@/components/axios'
import { Message } from 'ant-design-vue'
var moduleName = 'requestInquiry.detail.supplier-bankinfo'

store.registerModule(moduleName, {
  namespaced: true,
  state: {
    reportData: {
      data: {
        supplierInfoDto: {
          id: null,
          supplierBankAccountDtos: [
            {
              // 省市
              bankProvince: null,
              bankCity: null,
              // 银行
              bankId: null,
              bankName: null,
              bankCode: null,
              // 支行id
              bankBranchId: null,
              bankFullname: null,
              bankNo: null,
              // 帐号
              accountNo: null,
              accountOwner: null,
              // 帐号类型
              accountType: 1,
              selectCity: [],
              validity: 1
            }
          ]
        }
      }
    },
    selectData: {
      provinceData: [],
      cityData: [],
      bankData: [],
      subBankData: []
    },
    visible: false,
    loading: false
  },
  getters: {
  },
  mutations: {
    setLoading (state, data) {
      state.loading = data
    },
    setVisible (state, data) {
      state.visible = data
    },
    setSupplierId (state, data) {
      state.reportData.data.supplierInfoDto.id = data
    },
    setProvinceData (state, data) {
      state.selectData.provinceData = data.data.list.map(item => ({
        value: item.id.toString(),
        label: item.name,
        isLeaf: false
      }))
    },
    setProvinceReportData (state, data) {
      state.reportData.data.supplierInfoDto.supplierBankAccountDtos[0].bankProvince = data[0]
      state.reportData.data.supplierInfoDto.supplierBankAccountDtos[0].bankCity = data[1]
    },
    setBankData (state, data) {
      state.selectData.bankData = data.data.bankList.map(item => ({
        bankId: item.bankId.toString(),
        bankName: item.bankName,
        bankCode: item.bankCode
      }))
    },
    setBankReportData (state, data) {
      state.reportData.data.supplierInfoDto.supplierBankAccountDtos[0].bankCode = data.bankCode
      state.reportData.data.supplierInfoDto.supplierBankAccountDtos[0].bankName = data.bankName
    },
    setSubBankData (state, data) {
      if (data) {
        state.selectData.subBankData = data.data.subBankList.map(item => ({
          bankBranchId: item.bankSubId.toString(),
          bankSubName: item.bankSubName,
          bankNo: item.bankNo
        }))
      } else {
        state.selectData.subBankData = []
      }
    },
    setSubBankReportData (state, data) {
      state.reportData.data.supplierInfoDto.supplierBankAccountDtos[0].bankFullname = data.bankSubName
      state.reportData.data.supplierInfoDto.supplierBankAccountDtos[0].bankNo = data.bankNo
    },
    clearSubBankKey (state) {
      state.reportData.data.supplierInfoDto.supplierBankAccountDtos[0].bankBranchId = null
    },
    initSupplierBankAccount (state, supplierBankAccount) {
      if (!supplierBankAccount) {
        return
      }
      if (supplierBankAccount && supplierBankAccount.bankProvince) {
        state.reportData.data.supplierInfoDto.supplierBankAccountDtos[0].bankProvince = supplierBankAccount.bankProvince.toString()
      }

      if (supplierBankAccount && supplierBankAccount.bankCity) {
        state.reportData.data.supplierInfoDto.supplierBankAccountDtos[0].bankCity = supplierBankAccount.bankCity.toString()
      }
      if (supplierBankAccount && supplierBankAccount.bankId) {
        state.reportData.data.supplierInfoDto.supplierBankAccountDtos[0].bankId = supplierBankAccount.bankId.toString()
      }

      state.reportData.data.supplierInfoDto.supplierBankAccountDtos[0].bankCode = supplierBankAccount.bankCode
      state.reportData.data.supplierInfoDto.supplierBankAccountDtos[0].bankName = supplierBankAccount.bankName

      if (supplierBankAccount && supplierBankAccount.bankBranchId) {
        state.reportData.data.supplierInfoDto.supplierBankAccountDtos[0].bankBranchId = supplierBankAccount.bankBranchId.toString()
      }

      state.reportData.data.supplierInfoDto.supplierBankAccountDtos[0].bankNo = supplierBankAccount.bankNo
      state.reportData.data.supplierInfoDto.supplierBankAccountDtos[0].bankFullname = supplierBankAccount.bankFullname

      state.reportData.data.supplierInfoDto.supplierBankAccountDtos[0].accountNo = supplierBankAccount.accountNo
      state.reportData.data.supplierInfoDto.supplierBankAccountDtos[0].accountOwner = supplierBankAccount.accountOwner
      state.reportData.data.supplierInfoDto.supplierBankAccountDtos[0].accountType = supplierBankAccount.accountType
      state.reportData.data.supplierInfoDto.supplierBankAccountDtos[0].selectCity = [supplierBankAccount.bankProvince, supplierBankAccount.bankCity]
    }
  },
  actions: {
    init (context, supplierBankAccount) {
      context.commit('initSupplierBankAccount', supplierBankAccount)

      axios.get('/public/getProvinceList?id=1').then(data => {
        context.commit('setProvinceData', data)
        context.dispatch('initCity')
      })

      axios.get('/public/bank/all').then(data => {
        context.commit('setBankData', data)
        context.dispatch('updateSubBank', true)
      })
    },
    handleBankChange (context, value) {
      context.state.selectData.bankData.forEach(item => {
        if (item.bankId === value) {
          context.commit('setBankReportData', item)
        }
      })
      context.dispatch('updateSubBank', false)
    },
    handleSubBankChange (context, value) {
      context.state.selectData.subBankData.forEach(item => {
        if (item.bankBranchId === value) {
          context.commit('setSubBankReportData', item)
        }
      })
    },
    handleCityChange (context, value) {
      context.commit('setProvinceReportData', value)
      context.dispatch('updateSubBank', false)
    },
    updateSubBank (context, isInit) {
      var bankId = context.state.reportData.data.supplierInfoDto.supplierBankAccountDtos[0].bankId
      var bankCity = context.state.reportData.data.supplierInfoDto.supplierBankAccountDtos[0].bankCity
      //
      if (!isInit) {
        context.commit('clearSubBankKey')
      }
      //
      if (!bankId || !bankCity) {
        return
      }
      axios.get('/public/bank/subAll?bankId=' + bankId + '&cityId=' + bankCity).then(data => {
        context.commit('setSubBankData', data)
      })
    },
    submit (context, supplierId) {
      context.commit('setSupplierId', supplierId)
      let supplierBankAccount = context.state.reportData.data.supplierInfoDto.supplierBankAccountDtos[0]
      if (!supplierBankAccount) {
        Message.error('请填写打款信息')
        context.commit('setLoading', false)
        return false
      }
      if (!supplierBankAccount.accountNo) {
        Message.error('请填写打款账号')
        context.commit('setLoading', false)
        return false
      }
      if (!supplierBankAccount.accountOwner) {
        Message.error('请填写持款人姓名')
        context.commit('setLoading', false)
        return false
      }
      if (!supplierBankAccount.accountType) {
        Message.error('请填写账号类型')
        context.commit('setLoading', false)
        return false
      }
      if (!supplierBankAccount.bankCode) {
        Message.error('请填写开户银行')
        context.commit('setLoading', false)
        return false
      }
      if (!supplierBankAccount.bankProvince) {
        Message.error('请填写开户省份')
        context.commit('setLoading', false)
        return false
      }
      if (!supplierBankAccount.bankCity) {
        Message.error('请填写开户城市')
        context.commit('setLoading', false)
        return false
      }
      if (!supplierBankAccount.bankBranchId) {
        Message.error('请填写开户银行支行')
        context.commit('setLoading', false)
        return false
      }
      axios.post('/supplier/report-supplier-bankInfo', context.state.reportData).then(data => {
        console.log(data)
        context.commit('setVisible', false)
        context.commit('setLoading', false)
      })
    },
    initCity (context) {
      var bankProvince = context.state.reportData.data.supplierInfoDto.supplierBankAccountDtos[0].bankProvince
      if (!bankProvince) {
        return
      }

      var bankProvinceOption
      context.state.selectData.provinceData.forEach(item => {
        if (item.value === bankProvince) {
          bankProvinceOption = item
        }
      })

      if (!bankProvinceOption) {
        return
      }

      axios.get('/public/getCityList?id=' + bankProvince).then(data => {
        bankProvinceOption.children = data.data.list.map(item => ({
          value: item.id.toString(),
          label: item.name
        }))
      })
    }
  }
})

export {
  store
}

export default moduleName
