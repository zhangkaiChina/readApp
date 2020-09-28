<template>
	<div class="bookInfo">
		<div class="infoheader">
			<div class="coverbox">
				<img :src="bookinfo.imgUrl" alt="" class="cover">
			</div>
			<div class="infobox">
				<p class="name">
					{{bookinfo.name}}
				</p>
				<p class="author">
					{{bookinfo.author}}
				</p>
			</div>
			
		</div>
		<div class="infobody">
			{{bookinfo.intro}}
		</div>
		<div class="list" @click="showList">
			<span class="l1">
				目录
			</span>
			<span class="r1">
				共{{list.length}}章
			</span>
		</div>
		<div class="footbox">
			<button class="l" @click="collect">收藏</button>
			<button class="r" @click="watchBook">立即观看</button>
		</div>
		<Menu :list="list" @renovate="renovate" v-if="show" class="Menu"></Menu>
	</div>
</template>

<script>
import { mapState } from 'vuex'
import axios from 'axios'
import Menu from '../menu/menu.vue'

export default {
	data(){
		return {
			h: Number,
			list: [],
			show: false
		}
	},
	mounted:function(){
		this.setList()
	},
	computed:{
		...mapState(['bookinfo'])
	},
	watch:{
		"$route":{
			handler(route){
				if(route.name=='detail'){
					this.setList()
				}
			}
		}
	},
	methods:{
		renovate: function(){
			this.setList()
			
		},
		showList:function(){
			this.show = !this.show
		},
		setList: function(){
			this.list=[]
			let url = {url:this.bookinfo.bookurl}
			new Promise((resolve)=>{
				
				axios
				.get('/searchBookInfo', {params:url})
				.then((res)=>{
					resolve(res.data)
				})
				
			})
			.then((list)=>{
				this.list = list
			})
			.catch((err)=>{
				console.log(err)
			})
		},
		watchBook: function(){
			console.log(this.list[0])
		},
		collect:function(){
			let book = {}
			book.name = this.bookinfo.name
			book.author = this.bookinfo.author
			book.bookurl = this.bookinfo.bookurl
			book.imgUrl = this.bookinfo.imgUrl
			book.flag = true
			if(window.localStorage.booklist){
				
				let arr = JSON.parse(window.localStorage.booklist)
				let test = arr.some((el)=>{
					return el.name == book.name
				})
				if(!test){
					arr.push(book)
					window.localStorage.booklist = JSON.stringify(arr)
				}
				
			}else{
				window.localStorage.booklist = JSON.stringify([book])
			}
		}
	},
	components: {
		Menu
	}
	
}
</script>

<style lang="stylus" scoped>
	@import "../../assets/base.styl"
	.bookInfo 
		width 100%
		height 100%
		.infoheader
			display flex
			justify-content space-between
			box-sizing  border-box
			width 100%
			height 2.8rem
			padding 1rem .25rem 0 .25rem
			background-color rgba(0,0,0,.8)
			.coverbox
				width 2rem
				margin-right .25rem
				img 
					width 2rem
					height 2.5rem
			.infobox
				flex 1
				text-align left
				color #EEEEEE
				p.name
					margin-top 0
					margin-bottom .2rem
					font-size .4rem
					font-weight bold
				p.author
					margin 0
					font-size .3rem
					font-weight 300
		.infobody	
			margin-top 1rem
			text-align left
			padding 0 .25rem 0 .25rem
			color #777777
			font-size .3rem
		.list 
			text-align right
			padding .2rem
			margin-top .2rem
			line-height .5rem
			display flex
			justify-content space-between
			.l1
				font-size .4rem
				font-weight 500
			.r1
				font-size .3rem
				font-weight 400
				color #BBBBBB
		.footbox
			display flex
			justify-content space-between
			width 100%	
			height 1rem
			position absolute
			bottom  0
			left 0
			button
				box-sizing border-box
				flex 1 0
				border none
				background none
				font-size .35rem
			.l
				color $baseColor
				border-top 2px solid $baseColor 
			.r
				color #FFFFFF
				background $baseColor
		.Menu 
			position absolute
			top 0
			left 0
			z-index 1000
</style>
