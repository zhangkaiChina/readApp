const superagent = require('superagent');
const cheerio = require('cheerio')



var search =  (req,res)=>{
	new Promise((resolve, reject)=>{
		let url = `http://www.lewenxsw.com/${req.query.url}`
		let list = []
		superagent
		.get(url)
		.end((err, response)=>{
			if(err){
				// console.log(err)
			}
			else{
				const $ = cheerio.load(response.text)
				$('ul.list-charts li').each((index, el)=>{
					if(el.children.length == 1){
						list[index] = {}
						list[index].href = el.children[0].attribs.href
						list[index].name = el.children[0].children[0].data
					}
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
	.catch(()=>{})
}

module.exports = search