const superagent = require('superagent');
const cheerio = require('cheerio')


var search =  (req,res)=>{
	
	
	new Promise((resolve, reject)=>{
		let value = encodeURI(req.query.value)
		let url = `https://m.qidian.com/search?kw=${value}`
		let list = []
		superagent
		.get(url)
		.set('Cookie','_csrfToken=TOQUm6Af8l1x3mgtLeh4C6nS4ToTskIa9H1cfwIS; newstatisticUUID=1574409564_744254403; hiijack=0; _qda_uuid=205d7ec1-12d4-3d09-17ea-e43d171b945b; mrecUUID=ef6c98b10d8d952abab8fbb9833d9e02; r_set=d%7C3%7C0%7Ch; e1=%7B%22pid%22%3A%22mqd_P_qidianm%22%2C%22eid%22%3A%22mqd_A12%22%2C%22l1%22%3A3%7D; e2=%7B%22pid%22%3A%22qd_p_qidian%22%2C%22eid%22%3A%22qd_A13%22%2C%22l1%22%3A2%7D')
		.set('Accept','text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9')
		.set('Accept-Encoding','gzip, deflate, br')
		.set('Accept-Language','zh-CN,zh;q=0.9,zh-TW;q=0.8,en;q=0.7')
		.set('Connection','keep-alive')
		.set('Host','m.qidian.com')
		.set('Referer','https://m.qidian.com/rank/male')
		.set('Sec-Fetch-Dest','document')
		.set('Sec-Fetch-Mode','navigate')
		.set('Sec-Fetch-Site','same-origin')
		.set('Sec-Fetch-User','?1')
		.set('Upgrade-Insecure-Requests','Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1')
		.set('User-Agent','1')
		.end((err, response)=>{
			if(err){
				console.log(err)
			}
			else{
				const $ = cheerio.load(response.text)
				
				$('.jsBooks .book-li .book-layout img ').each((index, el)=>{
					let book = {}
					book.name = el.attribs.alt
					book.imgUrl = el.attribs['data-src']
					list.push(book)
					
				})
				$('.jsBooks .book-li .book-layout .book-desc ').each((index, el)=>{
					list[index].intro = el.children[0].data
				})
				
				$('.jsBooks .book-li .book-layout  .book-author ').each((index, el)=>{
					list[index].author = el.children[2].data
				})
				
				$('.jsBooks .book-li .book-layout .origin-right .red  ').each((index, el)=>{
					list[index].state = el.children[0].data
				})
			}
			
			resolve(list)
		})
		
	})
	.then((list)=>{
		let arr = JSON.stringify(list)
		res.writeHead(
			200,
			{"Content-Type":"text/plain;charset=UTF-8"},
		);
		res.end(arr)
	})
	.catch((err)=>{
		console.log(err)
	})
}

module.exports = search