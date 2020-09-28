const superagent = require('superagent');
const cheerio = require('cheerio')

var search =  (req,res)=>{
	
	let nameArr = [], typeArr = [], indexArr = [], authorArr = [], nameHrefArr = [];
	let url = `http://www.lewenxsw.com/modules/article/search.php`
	new Promise((resolve, reject)=>{
		superagent
		.post(url)
		.send({'searchkey':req.query.name})
		.set({
			'Content-Type': 'application/x-www-form-urlencoded',
			'Cookie': 'Hm_lvt_740f69b3aacb85e6ad12ef35a6f0212d=1580565894,1580633981,1580634988; UM_distinctid=1700ad2bf8d2ff-0be70c9737d0ac-2d604637-4a574-1700ad2bf8e511; CNZZDATA1278027989=1998732600-1580725562-%7C1580725562'
		})
		.end((err, response) => {
			if(err){
				console.log(err)
			}else{
				// console.log(response.text)
				const $ = cheerio.load(response.text);
				console.log($)
				$('td').each((index,el)=>{
					if(el.attribs.align){
						let child = el.children[0]
						if(child.type == 'text'){
							indexArr.push(child.data)
						}else {
							typeArr.push(child.children[0].data)
						}
						
					}
				})
				$('td p a').each((index,el)=>{
	
					
					if (el.attribs.target) {
						authorArr.push(el.children[0].data)
						
						
					} else {
						nameArr.push(el.children[0].data)
						nameHrefArr.push(el.attribs.href)
						
					}
					
				})
				
			}
			
			resolve();
		})
	}).then(()=>{
		let dataArr = []
		nameArr.forEach((el,index)=>{
			dataArr[index] = {}
			dataArr[index].i = indexArr[index]
			dataArr[index].a = authorArr[index]
			dataArr[index].n = nameArr[index]
			dataArr[index].t = typeArr[index]
			dataArr[index].nh = nameHrefArr[index]
			
		})
		let arr = JSON.stringify(dataArr)
		res.writeHead(
			200,
			{"Content-Type":"text/plain;charset=UTF-8"},
		);
		res.end(arr)
	}).catch((err)=>{
		console.log(err)
	});
	
	

}
module.exports = search