<template>
  <div>
    <div class="clearfix">
      <a-upload
        :action="action"
        :data="dataParams"
        listType="picture-card"
        :beforeUpload="beforeUpload"
        :fileList="fileList"
        @preview="handlePreview"
        @change="handleChange"
      >
        <div v-if="fileList.length < imgLen && !disabled">
          <a-icon type="plus" />
          <div class="ant-upload-text">Upload</div>
        </div>
      </a-upload>
      <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
        <img alt="example" style="width: 100%" :src="previewImage"/>
      </a-modal>
    </div>
    <div class="tips-upload" v-if="tips">{{tips}}</div>
  </div>
</template>
<script>
/*
  用法：直接引入该组件，用v-modal把值传进去(v-modal的值可以是对象，也可以是字符串，字符串的时候，默认只能选择上传一张图片)
  参数： 1.v-modal
        2.size:限制图片数量
        3.tips:文字提示
        4.disabled是否可以编辑
*/
// import Vue from 'vue'
// import { Upload, Modal, Message } from 'ant-design-vue'
import axios from '@/components/axios'
import {util} from '@/util/index'

// Vue.component(Upload.name, Upload)
// Vue.component(Modal.name, Modal)

export default {
  data () {
    return {
      imgLen: 0,
      uid: 0,
      action: '',
      dataParams: {},
      previewVisible: false,
      previewImage: '',
      fileList: [],
      valueToString: ''
    }
  },
  props: ['value', 'size', 'tips', 'disabled'],
  methods: {
    handleCancel () {
      this.previewVisible = false
    },
    handlePreview (file) {
      this.previewImage = file.url || file.thumbUrl
      this.previewVisible = true
    },
    handleChange ({ file, fileList }) {
      if (this.disabled) {
        this.$message.info('图片不可编辑')
        return false
      }
      fileList.map((file) => {
        if (!file.url) {
          file.url = file.originFileObj.fileUri
        }
      })
      this.fileList = fileList
    },
    beforeUpload (file) {
      var self = this
      return new Promise((resolve, reject) => {
        axios.get('/image/token?category=generic').then((resp) => {
          self.action = resp.data.host
          var name = new Date().getTime() + '_' + (10000 * Math.random()).toFixed(0) + '.' + file.name.split('.')[1]
          self.dataParams.key = resp.data.dir + name
          self.dataParams.policy = resp.data.policy
          self.dataParams.OSSAccessKeyId = resp.data.accessid
          self.dataParams.signature = resp.data.signature
          self.dataParams.success_action_status = 201
          var fileUri = resp.data.path + self.dataParams.key
          file.fileUri = fileUri
          // console.log('fileUri:' + fileUri)
          resolve()
        })
      })
    },
    initData () {
      this.imgLen = this.size || 10
      var fileList = []
      if (typeof this.value === 'string') {
        this.imgLen = 1
        fileList = [{
          uid: --this.uid,
          name: util.getImgNameByUrl(this.value),
          status: 'done',
          url: this.value,
          thumbUrl: this.value
        }]
        this.valueToString = this.value
      } else {
        if (this.value && this.value.length > 0) {
          for (var i = 0; i < this.value.length; i++) {
            var file = {
              uid: --this.uid,
              name: util.getImgNameByUrl(this.value[i]),
              status: 'done',
              url: this.value[i],
              thumbUrl: this.value[i]
            }
            fileList.push(file)
          }
        }
      }
      this.fileList = fileList
    }
  },
  created () {
    this.initData()
  },
  watch: {
    'fileList' (val, oldval) {
      var imgDate = []
      if (typeof this.value === 'string') {
        imgDate = val[0] ? val[0].url : ''
      } else {
        for (var i = 0; i < val.length; i++) {
          imgDate.push(val[i].url)
        }
      }
      this.valueToString = JSON.stringify(imgDate)
      this.$emit('input', imgDate)
    },
    'value' (val) {
      if (this.valueToString !== JSON.stringify(this.value)) {
        this.initData()
      }
    }
  }
}
</script>
<style>
  /* you can make up upload button and sample style by using stylesheets */
  .ant-upload-select-picture-card i {
    font-size: 32px;
    color: #999;
  }

  .ant-upload-select-picture-card .ant-upload-text {
    margin-top: 8px;
    color: #666;
  }
  .tips-upload {
    color: red;
    font-size: 12px;
    line-height: 30px;
  }
  .ant-upload-list-item-thumbnail img{
    width: 86px!important;
    height: 86px!important;
  }
</style>
