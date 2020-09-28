<template>
	<div class="bookcard"
	@click.stop="bookDetail(bookInfo.name,bookInfo.author,bookInfo.intro,bookInfo.imgUrl)"
	>
		<div class="imgBox">
			<img :src="this.bookInfo.imgUrl" alt="">
		</div>
		<div class="bookInfo">
			<p class="bookName">
				{{bookInfo.name}}
			</p>
			<p class="bookAuthor">
				{{bookInfo.author}}
			</p>
			<p class="bookIntro" v-if="bookInfo.intro">
				{{bookInfo.intro}}
			</p>
			<p v-else  class="bookIntro">
				{{chapterName}}
			</p>
		</div>
	</div>
</template>

<script>
import axios from 'axios'



export default {
	props:{
		bookInfo: Object
	},
	data(){
		return {
			slectBook:{
				name:'',
				intro:'',
				author:'',
				bookurl: '',
				imgUrl:''
			},
			chapterName: ""
		}
	},
	mounted:function(){
		if(this.bookInfo.flag){
			let url = {url:this.bookInfo.bookurl}
			console.log(url)
			new Promise((resolve)=>{
				
				axios
				.get('/searchBookInfo', {params:url})
				.then((res)=>{
					resolve(res.data[res.data.length-1])
				})
				
			})
			.then((menu)=>{
				console.log(menu.name)
				this.chapterName = menu.name
			})
			.catch((err)=>{
				console.log(err)
			})
			
		}
	},
	methods:{

		
		bookDetail: function(name,author,intro,imgUrl){
			
			// if(this.bookInfo.flag){
			// 	console.log(true)
				
				
			// }else{
				new Promise((resolve)=>{
					console.log(name)
					axios
					.get('/searchBqg', {params:{name}})
					.then((res)=>{
						if(!res.data[0]){
							console.log('无此书籍')
							return false
						}
						let num = /(\d+\S\d+\S)/;
						var reg = num.exec(res.data[0].nh)
						resolve(reg[0])
					})
				})
				.then((bookurl)=>{
					this.slectBook.bookurl = bookurl
					this.slectBook.name = name
					this.slectBook.author = author
					this.slectBook.intro = intro
					this.slectBook.imgUrl = imgUrl
					
					this.$store.dispatch('getData',this.slectBook)
					this.$router.push({name:'detail'})
				})
				.catch((err)=>{
					console.log(err)
				})
		}
			
		// }
	}
}
</script>

<style lang="stylus" scoped>
	.bookcard
		display flex
		justify-content space-around
		align-items center
		width 95%
		margin 0.2rem auto
		.imgBox
			width 1.5rem
			height auto
			margin-right 0.3rem
			img
				width 100%
		.bookInfo
			flex 1
			text-align left
			.bookName
				font-size 0.3rem
				margin-top 0
				margin-bottom 0.15rem
			.bookAuthor
				font-size 0.2rem
				color #333
				margin-top 0
			.bookIntro
				font-size 0.24rem
				line-height 0.32rem
				height 1rem
				width 100%
				color #666
				overflow hidden
				text-overflow ellipsis
				display -webkit-box
				-webkit-line-clamp 3
				-webkit-box-orient vertical
</style>
