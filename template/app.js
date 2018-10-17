const express = require('express');
const config = require('./config')
const path = require('path')
let app = express();
let port = process.env.PORT || config.build.nodePort;

// 开启gzip压缩,如果你想关闭gzip,注释掉下面两行代码，重新执行`node server.js`
var compression = require('compression')
app.use(compression())

app.use(express.static(path.resolve(__dirname, './dist/')));

app.all('*', function (req, res) {
    res.sendFile('./dist/index.html', {
        root: __dirname
    });
});
app.listen(port);
console.log('server on port ' + port);