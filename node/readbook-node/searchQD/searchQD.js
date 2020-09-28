const superagent = require('superagent');
const cheerio = require('cheerio')
let html = '';
var bookList;
let aF;
let iF;
// charset(superagent);

var search =  (req,res)=>{
	var query = req.query;
	
	let chanId=query.chanId?query.chanId:null,
	orderId=query.orderId?query.orderId:null,
	page=query.page?query.page:1,
	action=query.action?query.action:null,
	size=query.size?query.size:null,
	update=query.update?query.update:null,
	subCateId=query.subCateId?query.subCateId:null
	new Promise((resolve, reject)=>{
		
		let url = `https://www.qidian.com/all?chanId=${chanId}&subCateId=${subCateId}&orderId=${orderId}&action=${action}&size=${size}&update=${update}&page=${page}`
		
		superagent
			.get(url)
			.end((err, res) => {
				if (err) {} else {
					bookList = []
					aF = 0;
					iF = 0;
					html = res.text.toString()
					const $ = cheerio.load(html);
					
					$('.all-img-list li').each((index,el) => {
						var book = {};
						book.name = $('.book-mid-info h4 a')[index].children[0].data
						book.imgUrl = $('.book-img-box img')[index].attribs.src
						bookList.push(book)
					})
					$('.book-mid-info .author a.name').each((index, el)=>{
						if(el.attribs['data-eid'] === 'qd_B59'){
							bookList[aF].author  = el.children[0].data;
							aF ++
						}
					})
					$('p.intro').each((index,el) => {
						let intro = el.children[0].data.replace('/n','').trim()
						bookList[index].intro  = intro;
					})
				}
				resolve();
			});
	}).then(()=>{
		var str = ''
		bookList.forEach(list => {
			if(str === ''){
				str = JSON.stringify(list)
			}else{
				str += '@#'+JSON.stringify(list)
			}
			
		})
		res.writeHead(200,{"Content-Type":"text/plain;charset=UTF-8"});
		res.end(str)
	}).catch((err)=>{
		console.log(err)
	})

}
module.exports = search