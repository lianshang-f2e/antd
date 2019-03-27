const uploadDirToOss = require('upload-dir-to-oss')
const path = require('path')
const config = require('../config/uploadOss.env.js')

uploadDirToOss.updateToOss({
  region: 'oss-cn-hangzhou',
  accessKeyId: '',
  accessKeySecret: '',
  bucket: 'img-lianshang',
  dirPath: path.resolve(__dirname, '../dist'),
  ossDir: config.ossDir
})
