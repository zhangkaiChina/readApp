<template>
	<div>
		<div style="width: 100%;overflow: hidden; margin: 0;" ref="essay" >
			<div 
			class="essayBox essayBoxHide" 
			ref="essayBox" 
			:style="transformEssay"
			>
				<h3>
					{{title}}
				</h3>
				
				<span v-for="(page,index) in essay" :key="index">
					{{page}}
					<br>
				</span>
				<div ref="flagEnd" class="flagEnd" style="width: 1px;height: 1px;position: relative;left: -12.5px;"></div>
			</div>
			
		</div>
		<p class="info">
			{{flag+1}}/{{max}}
		</p>
	</div>

	
</template>

<script>
export default {
	props:{
		title: {
			type: String,
			default: ''
		},
		essay: {
			// type: Array,
			default: () => Array
		}
		
	},
	data(){
		return {
			w:0,
			flag:0,
			max: 0
		}
	},
	methods:{
		beforeBox:function(){
			if(this.flag > 0){
				this.flag --
			}else{
				this.$emit('beforeThis')
			}
			
			
		},
		afterBox:function(){
			if(this.flag+1 < this.max){
				this.flag ++
			}else{
				this.$emit('afterThis')
			}
			
		}
	},
	watch:{
		essay(){
			this.flag = 0
			if(this.essay.length<1){
				return false
			}
			this.$nextTick(()=>{
				
				setTimeout(()=>{
					
					
					this.max = Math.ceil(this.$refs.flagEnd.offsetLeft/window.innerWidth)
					
				},510)
				
			})
			
		}
		
	},
	mounted:function(){

		this.w = window.outerWidth + 25
		this.$refs.essay.style.height = window.innerHeight-33+'px'
	},
	computed:{
		transformEssay:function(){
			return {
				'transform':'translateX('+-this.w*this.flag+'px)'
			}
		}
	}
}
</script>

<style lang="stylus" scoped>
	.essayBoxHide 
		height 100%
		overflow visible
		font-size 16px
		columns calc(100vw - 32px) 1 
		column-gap 1rem
		transition all .5s
		padding .25rem .25rem 0 .25rem
		text-align left
		h3 
			font-size 0.48rem
		span
			// display inline-block
			// width 100%
			text-align left
			letter-spacing 0px
			margin 0
			line-height 0.6rem
	&.info
		height 0.64rem
		text-align left
		font-size 0.24rem
		margin 0
		line-height 0.64rem
		padding-left 0.24rem
		color #888888
</style>
