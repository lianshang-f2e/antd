# {{ name }}

> {{ chinesename }}

## Build Setup

``` bash
# install dependencies
npm install

# 本地跑dev,alpha,prelease,production数据，localhost:7000
npm run dev
npm run alpha
npm run prelease
npm run production

# 本地跑dev,alpha服务，localhost:7000，同时会起localhost:6000的mock服务，接口是/mockapi/开头的会往mock里拿数据
npm run mock:dev
npm run mock:alpha

# 构建dev,alpha,prelease,production的包
npm run build:dev
npm run build:alpha
npm run build:prelease
npm run build:production

# panda构建dev,alpha,prelease,production的包
npm run panda:dev
npm run panda:alpha
npm run panda:prelease
npm run panda:production

# panda构建过程
## 1.执行npm install --registry=https://registry.npm.taobao.org
## 2.构建dev,alpha,prelease,production的包
## 3.上传静态资源到oss
## 4.移动静态资源目录

```

<!-- For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader). -->

## 项目结构说明
- [项目结构说明](http://git.lsfash.cn/f2e/vue-omniscient/blob/master/docs/projectStructure.md/)


## 如何新建模块
- [如何新建模块](http://git.lsfash.cn/f2e/vue-omniscient/blob/master/docs/buildModule.md/)

## 如何新建页面
- [如何新建页面](http://git.lsfash.cn/f2e/vue-omniscient/blob/master/docs/buildPage.md/)

## 开发工具推荐下载
- [vscode](https://code.visualstudio.com/)
- [vscode常用插件](https://blog.csdn.net/Che_rish/article/details/78893019)

## 注意事项

``` bash
# 1. 开始构建这项目的时候，考虑一个页面对应一个store.js，实现视图和数据完全分离。但实现的时候，出现很多问题，所以并不建议如此方式，但针对异常复杂的页面，各子组件交互复杂时，可使用这种方法。

# 2. 已经在项目里全局引入ant-design-vue，所以可以直接在项目中使用ant-design-vue的组件。（因为全局引入，开发方便太多了，故去掉按需加载方式加载ant-design-vue组件）

# 3. mock数据修改后，要重启服务
```

## 参考文档

- [Vue 中文文档](https://cn.vuejs.org/)
- [Vuex 中文文档](https://vuex.vuejs.org/zh/guide/)
- [Vue Router 中文文档](https://router.vuejs.org/zh/installation.html/)
- [Vue Ant Design 中文文档](https://vuecomponent.github.io/ant-design-vue/docs/vue/introduce-cn/)
- [Vue Ant Design 完整组件列表](https://github.com/vueComponent/ant-design-vue/blob/master/site/components.js)
- [Axios 中文文档](http://blog.lee-cloud.xyz/post/1/Axios-zhong-wen-wen-dang)
- [eslint 中文规范文档说明](https://github.com/standard/standard/blob/master/docs/RULES-zhcn.md/)
