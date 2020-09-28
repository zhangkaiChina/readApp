<template>
	<div>
		<div class="selectBox" v-show="!descriptionFlag">
			<div class="selectList" 
			v-for="(items,index) in bookSelect" 
			:key="index" 
			
			>
				<p class="titlebox" @click.stop="getChanId(items.chanId,items.title)">{{items.title}}</p>
				<div class="selectBtnBox">
					<p class="selectBtn" 
					v-for="(btn, index) in items.child" 
					:key="index"
					@click="getSubCateId(btn.subCateId,items.chanId,items.title)"
					>
						{{btn.title}}
					</p>
				</div>
			</div>
		</div>
		<div class="description" v-show="descriptionFlag" @click="descriptionFlagChange">
			{{description}}
		</div>
	</div>
	
</template>

<script>
import axios from 'axios'
export default {
	data(){
		return {
			bookSelect:[],
			bookInfo:{},
			description: null,
			descriptionFlag: false
		}
	},
	methods:{
		getChanId:function(ChanId,title){
			this.description = title
			this.descriptionFlagChange()
			this.$emit("getChan",ChanId)
		},
		getSubCateId:function(SubCateId,chanId,title){
			this.description = title
			this.descriptionFlagChange()
			this.$emit("getSubCate",SubCateId,chanId)
		},
		descriptionFlagChange:function(){
			this.descriptionFlag = !this.descriptionFlag
			this.$emit('flagCHange','')
		}
	},
	mounted:function(){
		axios.get('/booklist').then((res)=>{
			this.bookInfo = res.data.bookInfo
			this.bookSelect = res.data.bookSelect
		})
	}
}
</script>

<style lang="stylus" scoped>
	@import "../../assets/base.styl"
	
	.selectBox
		padding-bottom 1rem
		.selectList
			.titlebox
				width 100%
				height 0.36rem
				line-height 0.36rem
				padding-left 0.3rem
				box-sizing border-box
				text-align left
				color $baseColor
			.selectBtnBox
				padding 0 0.36rem
				display flex
				justify-content flex-start
				flex-wrap wrap
				.selectBtn
					padding .15rem
					background $baseColor
					color #EEEEEE
					margin .05rem
					font-size .3rem
	.description
		padding .15rem 0
		width 100%
		height 0.4rem
		line-height 0.4rem
		font-size .3rem
		text-align center
		color $baseColor
</style>
