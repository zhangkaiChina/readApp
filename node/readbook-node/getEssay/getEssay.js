const superagent = require('superagent');
const cheerio = require('cheerio')

let getEssay = function(req,res){
	
	let url = `http://www.lewenxsw.com${req.query.url}`
	superagent
	.get(url)
	.end((err, response)=>{
		if(err){
			console.log(err)
		}else{
			const $ = cheerio.load(response.text)
			let text = $('.content-ext')[0].children
			let a = []
			
			// text[0].children.each(function(index,el){
			// 	if(el.type === 'text'){
			// 		console.log(el.data)
			// 	}
			// })
			for(let i = 0 ; i < text.length ; i ++){
				let data = text[i].data
				if(data){
					a.push(data)
				}
				
			}
			// res.writeHead(
			// 	200,
			// 	{"Content-Type":"text/plain;charset=UTF-8"},
			// );
			
			res.end(JSON.stringify(a))
		}
	})
}

module.exports = getEssay