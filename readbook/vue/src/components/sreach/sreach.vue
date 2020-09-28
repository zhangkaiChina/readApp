<template>
	<div>
		<div class="sreachBox">
			<input type="text" class="sreackInput" placeholder="输入" ref='sreackInput'>
			<button class="srachBtn" @click="sreach">搜索</button>
		</div>
		<div class="history">
			<p>
				<span class="historyClear" @click="historyClear()">清除记录</span>
			</p>
			<span class="history-box" v-for="(h,i) in history" :key='i'>
				{{h}}
			</span>
		</div>
		<list :listData="listData"></list>
		<FooterBar></FooterBar>
	</div>
</template>

<script>
import FooterBar from '../footer/footer.vue'
import axios from 'axios'
import list from '../list/list.vue'

export default {
	components:{
		FooterBar,
		list
	},
	data(){
		return {
			history:[],
			listData:[]
		}
	},
	methods:{
		sreach: function(){
			
			let key = this.$refs.sreackInput.value
			
			if(key){
				// let storage = window.localStorage
				// if(storage.history){
				// 	this.historyShow(key)
				// }else{
				// 	storage.history = key
				// 	this.history = [key]
				// }
				
				
				new Promise((resolve)=>{
					axios
					.get('/searchBox', {params:{value:key}})
					.then((res)=>{
						if(!res.data[0]){
							console.log('无此书籍')
							return false
						}
						
						resolve(res.data)
					})
				})
				.then((book)=>{
					this.listData = book
					this.historyShow(key)
				})
				.catch((err)=>{
					console.log(err)
				})
			}
			
		},
		link:function(link){
			let num = /(\d+\S\d+\S)/;
			var reg = num.exec(link.nh)
			return reg
		},
		historyClear: function(){
			window.localStorage.removeItem('history')
			this.history = []
			console.log(window.localStorage)
			
		},
		historyShow: function(key){
			let storage = window.localStorage
			let history = storage.history
			if(history){
				storage.history = history + ' ' + key
				
			}else{
				storage.history = key
			}
			this.history = storage.history.split(' ')
		}
	},
	mounted:function(){
		let storage = window.localStorage
		let h
		if(storage.history){
			h = storage.history
			this.history = h.split(' ')
		}else{
			h = ['暂无']
			this.history = h
		}
	},
	
}
</script>

<style lang="stylus" scoped>
	@import "../../assets/base.styl"
	.sreachBox
		width 90%
		border 1px $baseColor solid
		margin 0.4rem auto
		.sreackInput
			box-sizing border-box
			padding 0.2rem 0.5rem
			outline none
			width 80%
			height 0.8rem
			border none
		.srachBtn
			width 20% 
			height .8rem
			border none
			background none
			outline none
	.history
		padding 0.2rem 5%
		text-align left
		p
			.historyClear
				display inline-block
				font-size 0.24rem
				padding 0.12rem
				border-radius 0.12rem
				background-color #EEEEEE
				color #333333
		.history-box
			display inline-block
			padding .2rem
			margin-right .2rem
			border-radius .2rem
			height 0.28rem
			font-size 0.24rem
			line-height 0.28rem
			background-color #EEEEEE
			color #333333
</style>
