## 项目结构说明

# 整体框架说明
<p align="center">
  <img width="800" src="http://img.lianshang.cn/vue/img/pic1.jpg">
</p>

# config文件大体说明
<p align="center">
  <img width="800" src="http://img.lianshang.cn/vue/img/pic2.jpg">
</p>

# mock文件说明
<p align="center">
  <img width="800" src="http://img.lianshang.cn/vue/img/pic3.jpg">
</p>
- 使用npm run mock:dev   或者npm run mock:alpha时才可用
- 在接口url前加/mockapi／即会访问mock服务内容

``` bash
# 使用用例：
import axios from '@/components/axios'
axios.get('/mockapi/login').then((res) => {
  console.log(res)
})
```

# src文件说明
<p align="center">
  <img width="800" src="http://img.lianshang.cn/vue/img/pic4.jpg">
</p>
