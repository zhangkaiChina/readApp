<template>
	<div class="menuBox" ref="menu">
		<div ref="menuBox">
			<ul class="menuList">
				<li class="menuSelector" v-for="(el,index) in list" :key="index" @click="getEssayUrl(index)">
					{{el.name}}
				</li>
			</ul>
		</div>
		
		<div class="btnbox">
			<button @click="renovate">
				刷新
			</button>
			<button @click="reverse">
				逆序
			</button>
		</div>
	</div>
</template>

<script>

import BetterScroll from 'better-scroll'
// import axios from 'axios'

export default {
	data(){
		return {
			bs: {},
			essay:[],
			h:'',
		}
	},
	props:{
		list: Array
	},
	methods:{
		getEssayUrl: function(index){
			this.$emit("menuShow")
			this.$store.dispatch('getessayIndex',index)
			this.$store.dispatch('getessayList',this.list)
			
			if(this.$route.path.indexOf('essay')>0){
				
				this.$router.push({path:`${index}`})
			}else{
				this.$router.push({path:`essay/${index}`})
			}
			
			
		},
		renovate: function(){
			this.$emit('renovate')
		},
		reverse: function(){
			this.list.reverse()
		}
	},
	mounted:function(){
		this.h = window.innerHeight
		this.$refs.menuBox.style.height = this.h - 50 + 'px'
		this.$refs.menu.style.height = this.h + 'px'
		this.bs = new BetterScroll(
		this.$refs.menuBox,
		{
			scrollY: true,
			click: true
		})
		
	}
}

</script>

<style lang="stylus" scoped>
	.menuBox 
		width 100%	
		background-color #FFFFFF
		overflow hidden
		.menuList
			padding 0
			margin 0
			.menuSelector 
				padding .15rem
				list-style none
				text-align left
				overflow hidden
				text-overflow ellipsis
				white-space nowrap
		.btnbox 
			position absolute
			left 0
			bottom 0
			height 1rem
			width 100%
			display flex
			justify-content space-between
			border-top 1px #DDDDDD solid
			button
				flex 1 
				background #FFFFFF
				border none
				outline none
</style>
