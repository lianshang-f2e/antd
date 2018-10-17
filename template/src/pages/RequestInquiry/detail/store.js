import store from '@/store/index'
import router from '@/router/index'
import { message, Modal } from 'ant-design-vue'
import server from '../server'
import util from '@/util/index'

var moduleName = 'requestInquiry.detail'

store.registerModule(moduleName, {
  namespaced: true,
  state: {
    pageData: {},
    currentPageId: null
  },
  getters: {
    // 对比是否有改动
    comparedDraft (state) {
      var currentPageId = state.currentPageId
      if (!currentPageId) return false
      var detailData = state.pageData[currentPageId].detailData
      var originalDetailData = state.pageData[currentPageId].originalDetailData
      // 如果卡片信息，其他信息字符串相等返回false
      if (
        JSON.stringify(detailData.requestInquiryDetailQuerySkuResponseList) === originalDetailData.requestInquiryDetailQuerySkuResponseList &&
        JSON.stringify(detailData.itemCraftsDTOList) === originalDetailData.itemCraftsDTOList &&
        JSON.stringify(detailData.itemInfo) === originalDetailData.itemInfo
      ) {
        return false
      } else {
        return true
      }
    },
    // 反馈询价单数据封装
    feedbackRQ (state) {
      var currentPageId = state.currentPageId
      if (!currentPageId) return false
      var detailData = state.pageData[currentPageId].detailData
      var itemColorDTOList = []
      var itemSpecificationDTOList = []
      var itemCraftsDTOList = []
      let swatchMeasurementUnit = detailData.itemInfo.swatchMeasurementUnit
      let largeCargoMeasurementUnit = detailData.itemInfo.largeCargoMeasurementUnit
      if (detailData.requestInquiryDetailQuerySkuResponseList) {
        detailData.requestInquiryDetailQuerySkuResponseList.map((sku) => {
          if (sku.itemColorDTO) {
            sku.itemColorDTO.itemId = detailData.itemInfo.itemId
            sku.itemColorDTO.swatchMeasurementUnit = swatchMeasurementUnit
            sku.itemColorDTO.largeCargoMeasurementUnit = largeCargoMeasurementUnit
            itemColorDTOList.push(sku.itemColorDTO)
          }
          if (sku.itemSpecificationDTO) {
            sku.itemSpecificationDTO.itemId = detailData.itemInfo.itemId
            sku.itemSpecificationDTO.swatchMeasurementUnit = swatchMeasurementUnit
            sku.itemSpecificationDTO.largeCargoMeasurementUnit = largeCargoMeasurementUnit
            itemSpecificationDTOList.push(sku.itemSpecificationDTO)
          }
        })
      }
      if (detailData.itemCraftsDTOList) {
        detailData.itemCraftsDTOList.map((crafts) => {
          if (crafts.craftsName && crafts.price > 0) {
            itemCraftsDTOList.push(crafts)
          }
        })
      }
      var feedbackData = {
        'itemId': detailData.itemInfo.itemId, // 商品id
        'requestInquiryId': detailData.requestInquiryId, // 询价单编号
        'blankShort': detailData.itemInfo.blankShort, // 空差
        'meterShort': detailData.itemInfo.meterShort, // 米差
        'paperTube': detailData.itemInfo.paperTube, // 纸管
        'memo': detailData.remark, // 备注
        'itemColorDTOList': itemColorDTOList,
        'itemCraftsDTOList': itemCraftsDTOList,
        'itemSpecificationDTOList': itemSpecificationDTOList
      }
      return feedbackData
    }
  },
  mutations: {
    createdPageData (state, payload) {
      var currentPageId = payload + ''
      state.currentPageId = currentPageId
      state.pageData[currentPageId] = state.pageData[currentPageId] || {
        originalDetailData: {},
        detailData: {
          itemCraftsDTOList: [],
          isMeterDifference: 1,
          itemInfo: {},
          ratingStatus: {
            canRating: false,
            rated: false
          }
        },
        operations: {
          'canFeedback': false,
          'canStartPackingSlip': false,
          'canContactSupplier': false,
          'canEdit': false
        },
        // 草稿
        draft: {}
      }
      state.pageData = { ...state.pageData }
    },
    setInquiryDetailData (state, payload) {
      var currentPageId = state.currentPageId
      state.pageData[currentPageId].detailData = {
        ...state.pageData[currentPageId].detailData,
        ...payload.detail
      }
      state.pageData[currentPageId].operations = {
        ...state.pageData[currentPageId].operations,
        ...payload.operations
      }
      if (!state.pageData[currentPageId].detailData.itemCraftsDTOList) {
        state.pageData[currentPageId].detailData.itemCraftsDTOList = []
      }
      state.pageData[currentPageId].detailData.isMeterDifference = (payload.detail.itemInfo && payload.detail.itemInfo.meterShort !== null ? 1 : 2)
      // 保存后端返回数据，用草稿对比是否要保存草稿 START
      let requestInquiryDetailQuerySkuResponseList = state.pageData[currentPageId].detailData.requestInquiryDetailQuerySkuResponseList
      requestInquiryDetailQuerySkuResponseList.map(sku => {
        if (sku.itemColorDTO === null && payload.detail.itemInfo.rootCategoryId === 1) {
          sku.itemColorDTO = {colorNo: sku.colorNo}
        }
        if (sku.itemSpecificationDTO === null && payload.detail.itemInfo.rootCategoryId === 2) {
          sku.itemSpecificationDTO = {
            specification: sku.specification
          }
        }
        if (sku.itemColorDTO) {
          sku.itemColorDTO = {
            ...sku.itemColorDTO,
            originSwatchPrice: sku.itemColorDTO.swatchPrice,
            originLargeCargoPrice: sku.itemColorDTO.largeCargoPrice,
            originSwatchProcurementPrice: sku.itemColorDTO.swatchProcurementPrice,
            originLargeCargoProcurementPrice: sku.itemColorDTO.largeCargoProcurementPrice
          }
        }
        if (sku.itemSpecificationDTO) {
          sku.itemSpecificationDTO = {
            ...sku.itemSpecificationDTO,
            originSwatchPrice: sku.itemSpecificationDTO.swatchPrice,
            originLargeCargoPrice: sku.itemSpecificationDTO.largeCargoPrice,
            originSwatchProcurementPrice: sku.itemSpecificationDTO.swatchProcurementPrice,
            originLargeCargoProcurementPrice: sku.itemSpecificationDTO.largeCargoProcurementPrice
          }
        }
      })
      state.pageData[currentPageId].detailData.requestInquiryDetailQuerySkuResponseList = requestInquiryDetailQuerySkuResponseList
      var detailData = state.pageData[currentPageId].detailData
      var originalDetailData = {
        requestInquiryDetailQuerySkuResponseList: JSON.stringify(requestInquiryDetailQuerySkuResponseList),
        itemCraftsDTOList: JSON.stringify(detailData.itemCraftsDTOList),
        itemInfo: JSON.stringify(detailData.itemInfo)
      }
      state.pageData[currentPageId].originalDetailData = originalDetailData
      // 保存后端返回数据，用草稿对比是否要保存草稿 END
      state.pageData = { ...state.pageData }
    },
    setContactSupplier (state, payload) {
      var currentPageId = state.currentPageId
      state.pageData[currentPageId].detailData.contactSupplierStatus = state.pageData[currentPageId].detailData.contactSupplierStatus + 1
    },
    setDraft (state, payload) {
      var currentPageId = state.currentPageId
      state.pageData[currentPageId].draft = payload
    },
    // 使用草稿
    useDraft (state) {
      var currentPageId = state.currentPageId
      state.pageData[currentPageId].detailData = state.pageData[currentPageId].draft
      state.pageData = { ...state.pageData }
    }
  },
  actions: {
    // 获取询价单详情
    inquiryDetail (context, payload) {
      var params = {
        requestInquiryId: payload
      }
      server.inquiryDetail(params).then(data => {
        context.commit('setInquiryDetailData', data.data)
        // 待反馈询价单，触发获取草稿
        if (1 * data.data.detail.status !== 50) return false
        var loadDraftParams = {
          businessId: data.data.detail.requestInquiryId,
          businessType: 10,
          status: data.data.detail.status
        }
        context.dispatch('loadDraft', loadDraftParams)
      })
    },
    // 获取草稿
    loadDraft (context, params) {
      server.loadDraft(params).then(data => {
        if (data.code === 200 && data.data && data.data !== '{}') {
          var draft = util.htmlDecode(data.data)
          context.commit('setDraft', JSON.parse(draft))
          Modal.confirm({
            title: '温馨提示',
            content: '当前询价单您之前有保存草稿，是否使用草稿',
            okText: '确定使用',
            cancelText: '不想使用',
            maskClosable: true,
            onOk (close) {
              context.commit('useDraft')
              close()
            },
            onCancel () {
              context.dispatch('clearDraft')
            }
          })
        }
      })
    },
    clearDraft (context) {
      var currentPageId = context.state.currentPageId
      var detailData = context.state.pageData[currentPageId].detailData
      var params = {
        'businessId': detailData.requestInquiryId,
        'businessType': 10,
        'status': detailData.status,
        'data': '{}'
      }
      server.saveDraft(params).then(data => {})
    },
    // 保存草稿
    saveDraft (context, callback) {
      var currentPageId = context.state.currentPageId
      var detailData = context.state.pageData[currentPageId].detailData
      var params = {
        'businessId': detailData.requestInquiryId,
        'businessType': 10,
        'status': detailData.status,
        'data': JSON.stringify(detailData)
      }
      new Promise((resolve, reject) => {
        server.saveDraft(params).then(data => {
          if (data.code === 200) {
            message.success('保存草稿成功')
            callback && callback()
            resolve()
          }
        })
      }).catch(() => console.log('保存草稿失败!'))
      // return axios.post('/web/request-inquiry/inquiryFeedBack', this.requestInquiryFeedbackParams)
    },
    // 开始联系供应商
    startContactSupplier (context, payload) {
      var currentPageId = context.state.currentPageId
      var detailData = context.state.pageData[currentPageId].detailData
      var params = {
        requestInquiryId: detailData.requestInquiryId
      }
      server.startContactSupplier(params).then(data => {
        if (data.code === 200) {
          context.dispatch('inquiryDetail', context.state.currentPageId)
        }
      })
    },
    // 处理下一个
    nextRequestInquiry (context, payload) {
      var currentPageId = context.state.currentPageId
      var detailData = context.state.pageData[currentPageId].detailData
      var params = {
        businessType: 10,
        businessStatus: detailData.status,
        businessId: detailData.requestInquiryId
      }
      server.nextRequestInquiry(params).then(data => {
        if (data.code === 200) {
          if (data.data.businessId) {
            router.push('/index/RequestInquiry/detail/' + data.data.businessId)
          } else {
            message.error('您没有当前类型的处理单,请前往列表进行选择')
          }
        }
      })
    },
    // 反馈询价单
    feedback (context, payload) {
      var params = context.getters.feedbackRQ
      if (!params.itemColorDTOList && !params.itemSpecificationDTOList) {
        message.info('必须要有一个sku信息')
        return false
      }
      var currentPageId = context.state.currentPageId
      var detailData = context.state.pageData[currentPageId].detailData
      if (detailData.isMeterDifference * 1 === 1) {
        if (detailData.itemInfo.rootCategoryId === 1 && (!params.meterShort && (params.meterShort !== 0 || params.meterShort !== '0'))) {
          message.info('请在其他信息输入米差')
          return false
        }
      } else {
        if (detailData.itemInfo.rootCategoryId === 1 &&
          ((!params.paperTube && params.paperTube !== 0 && params.paperTube !== '0') || (!params.blankShort && params.blankShort !== 0 && params.blankShort !== '0'))) {
          message.info('请在其他信息输入空差')
          return false
        }
      }
      server.inquiryFeedBack(params).then((resp) => {
        if (resp.code === 200) {
          message.success(resp.message)
          context.dispatch('clearDraft')
          context.dispatch('inquiryDetail', context.state.currentPageId)
        }
      })
    }
  }
})

export {
  store
}

export default moduleName
