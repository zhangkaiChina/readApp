let fs = require('fs')
const path = require('path')



// 路由方法拆分
let searchQD = require('./searchQD/searchQD.js')
let searchBqg = require('./searchBqg/searchBqg.js')
let searchBookInfo = require('./searchBookInfo/searchBookInfo.js')
let getEssay = require('./getEssay/getEssay.js')
let searchBox = require('./searchBox/searchBox.js')

// 引入服务



// let pathname = url.parse(request.url).pathname;
const express = require('express');
const server = express();
let Router = express.Router();
// 引入并使用路由


Router
  .get('/booklist', function (req, res) {
    let data = fs.readFileSync('json/booklist.json')
    res.writeHead(200, { "Content-Type": "text/plain;charset=UTF-8" });
    res.end(data.toString())
  })
  .get('/searchQD', searchQD)
  .get('/searchBqg', searchBqg)
  .get('/searchBookInfo', searchBookInfo)
  .get('/getEssay', getEssay)
  .get('/searchBox', searchBox)
// .get('/index',searchBox)

server.use(Router)
server.use(express.static(path.join(__dirname, 'public')))
// 启动服务
server.listen(12345, '192.168.0.102')


