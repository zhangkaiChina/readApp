const path = require('path');
function resolve (dir) {
	return path.join(__dirname, dir)
}
module.exports = {
	publicPath: process.env.NODE_ENV === "production" ? "./" : "/",
	devServer: {
		port: 1111,
		proxy: {
			'/searchQD': {
				target: 'http://192.168.0.102:12345',
				changeOrigin: true,
				pathRewrite: {
					'^/searchQD': '/searchQD'
				}
			},
			'/searchBqg': {
				target: 'http://192.168.0.102:12345',
				changeOrigin: true,
				pathRewrite: {
					'^/searchBqg': '/searchBqg'
				}
			},
			'/searchBookInfo': {
				target: 'http://192.168.0.102:12345',
				changeOrigin: true,
				pathRewrite: {
					'^/searchBookInfo': '/searchBookInfo'
				}
			},
			'/getEssay': {
				target: 'http://192.168.0.102:12345',
				changeOrigin: true,
				pathRewrite: {
					'^/getEssay': '/getEssay'
				}
			},
			'/booklist': {
				target: 'http://192.168.0.102:12345',
				changeOrigin: true,
				pathRewrite: {
					'^/booklist': '/booklist'
				}
			},
			'/searchBox': {
				target: 'http://192.168.0.102:12345',
				changeOrigin: true,
				pathRewrite: {
					'^/searchBox': '/searchBox'
				}
			}
		}
	},
	chainWebpack: config => {
		config.resolve.alias.set('src',resolve('src'))
	}
}