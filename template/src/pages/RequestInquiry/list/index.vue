<template>
  <div class="request-inquiry-list">
    <a-row class="title">
      <a-col>
        <h4 class="request-inquiry-list-title">询价单管理</h4>
      </a-col>
    </a-row>
    <a-row class="request-inquiry-list-tabs">
      <a-col>
        <a-tabs :defaultActiveKey="requestInquiryQueryForm['ri.status']['value']" type="card" size="small" @change="tabChange">
          <a-tab-pane tab="全部" key="0"></a-tab-pane>
          <a-tab-pane tab="待反馈" key="50" ></a-tab-pane>
          <a-tab-pane tab="已反馈" key="60"/>
          <a-tab-pane tab="待开码单" key="10"/>
          <a-tab-pane tab="已开码单" key="20" />
          <a-tab-pane tab="已失效" key="30"/>
          <a-tab-pane tab="已过期" key="40"/>
        </a-tabs>
      </a-col>
    </a-row>
    <a-row class="request-inquiry-list-screen" align="middle">
      <a-col :span="18">
          <a-row class="screen-row" >
            <a-col :span="3">
              询价单号：
            </a-col>
            <a-col :span="5">
              <a-input placeholder="请输入" v-model="requestInquiryQueryForm['ri.request_inquiry_id']['value']"/>
            </a-col>
            <a-col :span="3">
              生成时间：
            </a-col>
            <a-col :span="5">
               <a-range-picker
                 format="YYYY-MM-DD HH:mm:ss"
                 style="width: 100%;"
                 :placeholder="['开始时间', '结束时间']"
                 :showTime="{hideDisabledOptions: true, defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('23:59:59', 'HH:mm:ss')]}"
                 v-model = "requestInquiryQueryForm['ri.create_time']['pageValue']">
               </a-range-picker>
            </a-col>
            <a-col :span="3" v-show="fromShowStatus != 1">
              订单号：
            </a-col>
            <a-col :span="5" v-show="fromShowStatus != 1">
              <a-input placeholder="请输入" v-model = "requestInquiryQueryForm['ps.trade_id']['value']"/>
            </a-col>
          </a-row>
          <a-row class="screen-row">
            <a-col :span="3" v-show="fromShowStatus != 1">
              商品所在地：
            </a-col>
            <a-col :span="5" v-show="fromShowStatus != 1">
              <a-select
                placeholder="请选择"
                style="width: 100%"
                allowClear
                optionFilterProp="children"
                v-model="requestInquiryQueryForm['iteminfo.ls_isbn_code']['value']"
              >
                <a-select-option value="E">华东</a-select-option>
                <a-select-option value="S" >华南</a-select-option>
                <a-select-option value="null" >无</a-select-option>
              </a-select>
            </a-col>
            <a-col :span="3" v-show="fromShowStatus != 1">
              跟进人：
            </a-col>
            <a-col :span="5" v-show="fromShowStatus != 1">
              <a-select
                placeholder="请选择"
                style="width: 100%"
                showSearch
                allowClear
                optionFilterProp="children"
                :filterOption="filterOperatorOption"
                v-model="requestInquiryQueryForm['ri.crm_seller_id']['id']"
              >
              <a-select-option v-for="d in operatorData" :key="d.id">{{d.realName}}</a-select-option>
              </a-select>
            </a-col>
            <a-col :span="3" v-show="fromShowStatus == 3">
              发起人：
            </a-col>
            <a-col :span="5" v-show="fromShowStatus == 3">
              <a-select
                placeholder="请选择"
                style="width: 100%"
                showSearch
                allowClear
                optionFilterProp="children"
                :filterOption="filterOperatorOption"
                v-model="requestInquiryQueryForm['ri.crm_buyer_id']['value']"
              >
                <a-select-option v-for="d in operatorData" :key="d.id">{{d.realName}}</a-select-option>
              </a-select>
            </a-col>
          </a-row>
        <a-row class="screen-row">
          <a-col :span="3" v-show="fromShowStatus == 3">
            码单号：
          </a-col>
          <a-col :span="5" v-show="fromShowStatus == 3">
            <a-input placeholder="请输入" v-model="requestInquiryQueryForm['ps.packing_slip_id']['value']"/>
          </a-col>
          <a-col :span="3" v-show="fromShowStatus == 3">
            买家区域：
          </a-col>
          <a-col :span="5" v-show="fromShowStatus == 3">
            <a-select
              placeholder="请选择"
              allowClear
              v-model="requestInquiryQueryForm['ri.buyer_city_id']['value']"
              style="width: 100%">
              <a-select-option  v-for="d in userSalesAreas" :key="d.id">{{d.name}}</a-select-option>
            </a-select>
          </a-col>
          <a-col :span="3" v-show="fromShowStatus == 3">
            货品类别：
          </a-col>
          <a-col :span="5" v-show="fromShowStatus == 3">
            <a-select
              placeholder="请选择"
              style="width: 100%"
              showSearch
              optionFilterProp="children"
              v-model="requestInquiryQueryForm['ri.type']['value']"
            >
              <a-select-option value="3">大货单</a-select-option>
              <a-select-option value="2" >米样单</a-select-option>
            </a-select>
          </a-col>
        </a-row>
        <a-row class="screen-row">
          <a-col :span="3" v-show="fromShowStatus == 3">
            是否分配：
          </a-col>
          <a-col :span="5" v-show="fromShowStatus == 3">
            <a-select defaultValue="0"
                      allowClear
                      style="width: 100%" v-model="requestInquiryQueryForm['ri.crm_seller_id']['isAllocation']">
              <a-select-option value="0" >全部</a-select-option>
              <a-select-option value="isnotnull">已分配</a-select-option>
              <a-select-option value="isnull" >未分配</a-select-option>
            </a-select>
          </a-col>
        </a-row>
      </a-col>
      <a-col :span="6">
        <a-row class="screen-row">
          <a-col>
            <div style=" margin-left: 25px;">
              <a-button type="primary" @click="handleTableChange()">查询</a-button>
              <a-button @click="clearQueryForm()">重置</a-button>
              <span class="show-span">
                <a href="javascript:;" v-show="fromShowStatus == 2" @click="fromShowStatus = 3">更多</a>
                <a href="javascript:;" v-show="fromShowStatus == 1" @click="fromShowStatus = 2">展开</a>
                <a href="javascript:;" v-show="fromShowStatus != 1" @click="fromShowStatus = 1">收起</a>
              </span>
            </div>
          </a-col>
        </a-row>
      </a-col>
    </a-row>

    <a-row class="request-inquiry-list-table">
      <a-table :columns="columns"
               :dataSource="list"
               :pagination="pagination"
               :loading="loading"
                bordered
               :scroll="{ x: 1300 }"
               :rowKey="record => record.requestInquiryId"
               @change="handleTableChange">
        <template slot="packingSlipId" slot-scope="text, record">
          <div v-if="text === 0 ">无</div>
          <div v-if="text !== 0">
            <router-link :to=" '/index/PackingSlip/detail/' + text">
              {{text}}
            </router-link>
          </div>
        </template>
        <template slot="tradeId" slot-scope="text, record">
          <div v-if="text === 0 ">无</div>
          <div v-if="text !== 0">
            <router-link :to=" '/index/Declaration/detail/' + text">
              {{text}}
            </router-link>
          </div>
        </template>
        <template slot="operation" slot-scope="text, record">
          <a-popconfirm>
            <router-link :to=" '/index/RequestInquiry/detail/' + record.requestInquiryId">
              详情
            </router-link>
          </a-popconfirm>
          <a-dropdown :trigger="['hover']">
            <a class="ant-dropdown-link table-operation" href="javascript:void(0)">
              更多 <a-icon type="down" />
            </a>
            <a-menu slot="overlay">
              <a-menu-item key="0" :disabled = "!canAllocate">
                <span href="javascript:void(0);" @click=" canAllocate && showAllocationModel(record)">分配询价单</span>
              </a-menu-item>
              <a-menu-item key="1" :disabled="(record.status === 30 || record.status === 20 || record.status === 40|| !canCancel)">
                <span @click="!(record.status === 30 || record.status === 20 || record.status === 40|| !canCancel)  && showCancelModel(record)">使失效</span>
              </a-menu-item>
              <a-menu-divider />
              <a-menu-item key="3" :disabled="record.status !== 10">
                <span @click="!(record.status !== 10)  && startPackingSlip(record)">开码单</span>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </template>
      </a-table>
    </a-row>
    <a-modal
      title="分配询价单"
      v-model="allocationModelVisible"
      @ok="allocation"
      okText="确认"
      cancelText="取消"
    >
      <a-select
        placeholder="搜索分配人员"
        style="width: 400px"
        showSearch
        optionFilterProp="children"
        :filterOption="filterOperatorOption"
        v-model="allocationPerson"
      >
        <a-select-option v-for="d in operatorData" :key="d.id">{{d.realName}}</a-select-option>
      </a-select>
    </a-modal>

    <a-modal
      title="询价单失效"
      v-model="cancelModelVisible"
      @ok="cancel"
      okText="确认"
      cancelText="取消"
    >
      <a-row>
        <a-col :span="4">
          原因：
        </a-col>
        <a-col :span="20">
        <a-select
          placeholder="请选择"
          style="width: 300px"
          showSearch
          optionFilterProp="children"
          :filterOption="filterOperatorOption"
          v-model="cancelInquiryForm.comment"
        >
          <a-select-option value="询价反馈有误" >询价反馈有误</a-select-option>
          <a-select-option value="销售信息填写有误">销售信息填写有误</a-select-option>
          <a-select-option value="缺货" >缺货</a-select-option>
          <a-select-option value="其他" >其他</a-select-option>
        </a-select>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="4">
          备注：
        </a-col>
        <a-col :span="20">
          <a-input placeholder="请输入" v-model="cancelInquiryForm.otherReason"/>
        </a-col>
      </a-row>
    </a-modal>
  </div>
</template>

<script>
// import Vue from 'vue'
import { mapActions, mapState } from 'vuex'
import moduleName from './store'
import moment from 'moment'
// import { Modal, Button, Input, Row, Col, Table, Tabs, DatePicker, Select, Popconfirm, Dropdown, Menu, Icon, message } from 'ant-design-vue'
// Vue.component(Modal.name, Modal)
// Vue.component(Button.name, Button)
// Vue.component(Icon.name, Icon)
// Vue.component(Row.name, Row)
// Vue.component(Col.name, Col)
// Vue.component(Table.name, Table)
// Vue.component(Tabs.name, Tabs)
// Vue.component(Tabs.TabPane.name, Tabs.TabPane)
// Vue.component(Input.name, Input)
// Vue.component(DatePicker.RangePicker.name, DatePicker.RangePicker)
// Vue.component(Select.name, Select)
// Vue.component(Select.Option.name, Select.Option)
// Vue.component(Popconfirm.name, Popconfirm)
// Vue.component(Dropdown.name, Dropdown)
// Vue.component(Menu.name, Menu)
// Vue.component(Menu.Item.name, Menu.Item)
// Vue.component(Menu.Divider.name, Menu.Divider)

export default {
  name: 'request-inquiry-list',
  data () {
    return {
      // 1，2，3分别代表第一次，第二次，第三次展开
      fromShowStatus: 1,
      loading: false,
      allocationModelVisible: false,
      cancelModelVisible: false,
      columns: [{
        title: '询价单号',
        dataIndex: 'requestInquiryId',
        width: 200,
        fixed: 'left',
        key: 'requestInquiryId',
        customRender: (text, row, index) => {
          if (row.hasBaseItem === 1) {
            return <div><div class="base-price">基</div>{text}</div>
          }
          return text
        }
      }, {
        title: '码单号',
        dataIndex: 'packingSlipId',
        width: 200,
        key: 'packingSlipId',
        scopedSlots: { customRender: 'packingSlipId' }
      }, {
        title: '订单号',
        dataIndex: 'tradeId',
        width: 200,
        key: 'tradeId',
        scopedSlots: { customRender: 'tradeId' }
      }, {
        title: '商品id',
        dataIndex: 'itemId',
        key: 'itemId',
        width: 100
      }, {
        title: '供应商名称',
        dataIndex: 'supplierName',
        key: 'supplierName',
        width: 100
      }, {
        title: '状态',
        dataIndex: 'statusName',
        key: 'statusName',
        width: 100
      }, {
        title: '跟进人',
        dataIndex: 'crmSellerName',
        key: 'crmSellerName',
        width: 100
      }, {
        title: '发起人',
        dataIndex: 'crmBuyerName',
        key: 'crmBuyerName',
        width: 100
      }, {
        title: '创建时间',
        dataIndex: 'createTime',
        key: 'createTime',
        width: 100
      }, {
        title: '操作',
        dataIndex: '',
        width: 150,
        fixed: 'right',
        scopedSlots: { customRender: 'operation' }
      }
      ],
      allocationPerson: null,
      currentRequestInquiryId: null,
      cancelInquiryForm: {
        requestInquiryId: null,
        operateType: 3,
        score: 0,
        comment: null,
        otherReason: null
      },
      requestInquiryQueryForm: {
        'ri.request_inquiry_id': {
          'value': null,
          'logics': 'equal'
        },
        'ri.crm_buyer_id': {
          'value': null,
          'logics': 'equal'
        },
        'ri.crm_seller_id': {
          'id': null,
          'isAllocation': null,
          'value': null,
          'logics': 'equal'
        },
        'ri.create_time':
          {
            'value': null,
            'pageValue': [],
            'logics': 'between'
          },
        'ri.status': {
          'value': '0',
          'logics': 'equal'
        },
        'iteminfo.ls_isbn_code': {
          'value': null,
          'logics': 'startWith'
        },
        'ps.trade_id': {
          'value': null,
          'logics': 'equal'
        },
        'ps.packing_slip_id': {
          'value': null,
          'logics': 'equal'
        },
        'ri.buyer_city_id': {
          'value': null,
          'logics': 'equal'
        },
        'ri.type': {
          'value': null,
          'logics': 'equal'
        }
      }
    }
  },
  computed: {
    ...mapState(moduleName, {
      pagination: state => state.pagination,
      list: state => state.list,
      operatorData: state => state.operatorData,
      userSalesAreas: state => state.userSalesAreas
    }),
    canCancel () {
      return this.$store.getters.hasPermission('WEB.REQUEST.INQUIRY.CANCEL')
    },
    canAllocate () {
      return this.$store.getters.hasPermission('WEB.REQUEST.INQUIRY.ALLOCATE')
    }

  },
  methods: {
    moment,
    ...mapActions(moduleName, [
      'query',
      'listOperator',
      'listUserSalesArea',
      'cancelRequestInquiry',
      'allocationRequestInquiry'
    ]),
    routerTo (id, type) {
      if (type === 1) {
        this.$router.push('/index/PackingSlip/detail/' + id)
      }
    },
    startPackingSlip (record) {
      this.$router.push('/index/PackingSlip/detail/null?requestInquiryId=' + record.requestInquiryId)
    },
    clearQueryForm () {
      this.requestInquiryQueryForm['ri.request_inquiry_id']['value'] = null
      this.requestInquiryQueryForm['ri.crm_buyer_id']['value'] = null
      this.requestInquiryQueryForm['ri.crm_seller_id']['id'] = null
      this.requestInquiryQueryForm['ri.crm_seller_id']['isAllocation'] = null
      this.requestInquiryQueryForm['ri.create_time']['pageValue'] = []
      this.requestInquiryQueryForm['iteminfo.ls_isbn_code']['value'] = null
      this.requestInquiryQueryForm['ps.trade_id']['value'] = null
      this.requestInquiryQueryForm['ps.packing_slip_id']['value'] = null
      this.requestInquiryQueryForm['ri.buyer_city_id']['value'] = null
      this.requestInquiryQueryForm['ri.type']['value'] = null
    },
    handleTableChange  (params) {
      if (params) {
        this.pagination.current = params.current
        this.pagination.pageSize = params.pageSize
      } else {
        this.pagination.current = 1
      }
      const queryForms = {...this.requestInquiryQueryForm}
      const createForm = queryForms['ri.create_time']
      const createFormValue = createForm['pageValue']
      if (createFormValue.length !== 0) {
        createForm['value'] = createFormValue[0].format('YYYY-MM-DD HH:mm:ss') +
          ' - ' + createFormValue[1].format('YYYY-MM-DD HH:mm:ss')
      }
      const itemCodeForm = queryForms['iteminfo.ls_isbn_code']
      const itemCodeFormValue = itemCodeForm['value']
      if (itemCodeFormValue) {
        if (itemCodeFormValue === 'null') {
          itemCodeForm['value'] = 'null'
          itemCodeForm['logics'] = 'isnull'
        } else {
          itemCodeForm['logics'] = 'startWith'
        }
      }
      const crmSellerIdForm = queryForms['ri.crm_seller_id']
      if (crmSellerIdForm['id']) {
        crmSellerIdForm['value'] = crmSellerIdForm['id']
        crmSellerIdForm['logics'] = 'equal'
      } else {
        if (crmSellerIdForm['isAllocation'] === 'isnotnull') {
          crmSellerIdForm['value'] = crmSellerIdForm['isAllocation']
          crmSellerIdForm['logics'] = 'isnotnull'
        } else if (crmSellerIdForm['isAllocation'] === 'isnull') {
          crmSellerIdForm['value'] = crmSellerIdForm['isAllocation']
          crmSellerIdForm['logics'] = 'isnull'
        } else {
          crmSellerIdForm['value'] = null
          crmSellerIdForm['logics'] = 'equal'
        }
      }
      if (queryForms['ri.status']['value'] === 0 || queryForms['ri.status']['value'] === '0') {
        queryForms['ri.status']['value'] = null
      }
      this.query(queryForms)
    },
    getCurrentStyle (current, today) {
      const style = {}
      if (current.date() === 1) {
        style.border = '1px solid #1890ff'
        style.borderRadius = '50%'
      }
      return style
    },
    showAllocationModel (record) {
      this.allocationModelVisible = true
      this.currentRequestInquiryId = record.requestInquiryId
    },
    showCancelModel (record) {
      this.cancelModelVisible = true
      this.currentRequestInquiryId = record.requestInquiryId
    },
    allocation () {
      this.allocationModelVisible = false
      const allocationPerson = this.allocationPerson
      this.allocationRequestInquiry({'requestInquiryId': Number(this.currentRequestInquiryId),
        'userId': allocationPerson}).then(data => {
        this.handleTableChange(this.pagination)
      })
    },
    cancel () {
      const cancelForm = this.cancelInquiryForm
      cancelForm.requestInquiryId = this.currentRequestInquiryId
      let params = {...cancelForm}
      if (params.comment === '其他') {
        if (params.otherReason == null) {
          this.$message.error('原因选择其他时,请填写备注')
          return false
        } else {
          params.comment = params.otherReason
        }
      }
      this.cancelRequestInquiry(cancelForm).then(
        data => {
          if (data.code === 200) {
            this.$message.success(data.message)
            this.cancelModelVisible = false
            this.handleTableChange(this.pagination)
          }
          this.cancelInquiryForm.comment = null
        }
      )
    },
    filterOperatorOption (input, option) {
      return option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
    },
    tabChange (activeKey) {
      if (activeKey === 0) {
        this.requestInquiryQueryForm['ri.status']['value'] = null
      } else {
        this.requestInquiryQueryForm['ri.status']['value'] = activeKey
      }
      this.handleTableChange()
    }
  },
  created () {
    this.listUserSalesArea()
    this.listOperator()
    var status = this.$route.query.status
    var userId = this.$route.query.userId
    if (userId) {
      this.requestInquiryQueryForm['ri.crm_seller_id']['id'] = Number(userId)
    }
    if (status) {
      this.requestInquiryQueryForm['ri.status']['value'] = status
    }
    var dateType = this.$route.query.dateType
    if (dateType) {
      if (dateType === 'today') {
        this.requestInquiryQueryForm['ri.create_time']['pageValue'] = [
          moment().startOf('day'),
          moment().endOf('day')
        ]
      }
    }
    this.handleTableChange()
  }
}
</script>

<style scoped>
  .request-inquiry-list-title {
    font-family: PingFangSC-Regular;
    font-size: 18px;
    color: #333333;
    text-align: left;
    line-height: 26px;
    margin: 20px 20px 10px 20px;
  }
  .request-inquiry-list {
    background: #FFFFFF;
    border-radius: 2px;
  }
  .request-inquiry-list-tabs {
    margin-left: 20px;
  }
  .request-inquiry-list-screen {
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #666666;
    line-height: 18px;
  }

  .screen-row {
    margin-left: 20px;
    margin-top: 15px;
  }

  .request-inquiry-list-table {
    margin: 15px 20px;
  }
  .table-operation {
    margin-left: 10px;
    margin-right: 10px;
  }
  .ant-col-3{
    text-align: right;
    line-height: 20px;
    padding: 6px 0;
  }
  .request-inquiry-list-table .ant-layout{
    background: #FFFFFF;
  }
  .show-span{
    margin-left: 20px;
  }
  .show-span a{
    margin: 0 5px;
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
