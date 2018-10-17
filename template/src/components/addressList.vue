<template>
  <a-cascader
    :options="options" @change="onChange" :value="getValue||[]"
    :loadData="loadData"
    :disabled="disabled"
    placeholder="请选择省／市／区"
    changeOnSelect
    style="width: 100%;"/>
</template>

<script>
// import Vue from 'vue'
// import { Cascader } from 'ant-design-vue'
import axios from '@/components/axios'

// Vue.component(Cascader.name, Cascader)

export default {
  mounted () {
    this.getProvinceList()
  },
  data () {
    return {
      options: []
    }
  },
  props: [
    'value',
    'provinceIdKey',
    'provinceNameKey',
    'cityIdKey',
    'cityNameKey',
    'districtIdKey',
    'districtNameKey',
    'disabled'],
  computed: {
    getValue: function () {
      let newValues = []
      if (this.value) {
        if (this.value[this.provinceIdKey]) {
          newValues[0] = this.value[this.provinceIdKey] + ''
        }
        if (this.value[this.cityIdKey]) {
          newValues[1] = this.value[this.cityIdKey] + ''
        }
        if (this.value[this.districtIdKey]) {
          newValues[2] = this.value[this.districtIdKey] + ''
        }
      }
      return newValues
    }
  },
  methods: {
    onChange (value, selectsOptions) {
      if (selectsOptions && selectsOptions.length === 3) {
        if (this.value) {
          if (this.provinceIdKey) {
            this.value[this.provinceIdKey] = selectsOptions[0].value * 1
          }
          if (this.provinceNameKey) {
            this.value[this.provinceNameKey] = selectsOptions[0].label
          }
          if (this.cityIdKey) {
            this.value[this.cityIdKey] = selectsOptions[1].value * 1
          }
          if (this.cityNameKey) {
            this.value[this.cityNameKey] = selectsOptions[1].label
          }
          if (this.districtIdKey) {
            this.value[this.districtIdKey] = selectsOptions[2].value * 1
          }
          if (this.districtNameKey) {
            this.value[this.districtNameKey] = selectsOptions[2].label
          }
        }
        this.$emit('input', this.value)
      }
    },
    getList (list, isLeaf) {
      for (var i = 0; i < list.length; i++) {
        list[i].value = list[i].id + ''
        list[i].label = list[i].name + ''
        if (isLeaf) {
          list[i].isLeaf = false
        }
      }
      return list
    },
    getProvinceList () {
      var self = this
      axios.get('/public/getChineseProvinceList').then((data) => {
        self.options = self.getList(data.data.list, true) || []
        if (self.value[self.provinceIdKey]) {
          self.options.forEach(item => {
            if (item.id === self.value[self.provinceIdKey]) {
              self.loadData([item])
            }
          })
        }
      })
    },
    loadData (selectedOptions) {
      var self = this
      const targetOption = selectedOptions[selectedOptions.length - 1]
      targetOption.loading = true
      if (selectedOptions.length === 1) {
        axios.get('/public/getCityList?id=' + targetOption.id).then((data) => {
          targetOption.loading = false
          targetOption.children = self.getList(data.data.list, true)
          self.options = [...self.options]
          if (self.value[self.cityIdKey]) {
            targetOption.children.forEach(item => {
              if (item.id === self.value[self.cityIdKey]) {
                self.loadData([null, item])
              }
            })
          }
        })
      } else if (selectedOptions.length === 2) {
        axios.get('/public/getDistrictList?id=' + targetOption.id).then((data) => {
          targetOption.loading = false
          targetOption.children = self.getList(data.data.list)
          self.options = [...self.options]
        })
      }
    }
  },
  watch: {
    'value' (val, oldValue) {
      if (!oldValue[this.provinceIdKey]) {
        this.getProvinceList()
      }
    }
  }
}
</script>

<style>

</style>
