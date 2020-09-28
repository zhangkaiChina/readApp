const express = require('express');
let server = express();

// server.use('/test',(req,res)=>{
// 	console.log(req.url)
// 	res.end("1231321")
// })
let Router = express.Router();
Router.get('/',(req,res)=>{
	res.end('index')
})
.get('/book',(req,res)=>{
	res.redirect('https://www.baidu.com')
	
})
server.use(Router)


server.listen(12345, '192.168.0.102');