<template>
	<div>
		<HeaderBar title="目录"></HeaderBar>
		<book-select-btn
		@getChan="setChanId"
		@getSubCate="setSubCateId"
		@flagCHange="flagF"
		class="btnbox"
		>
		</book-select-btn>
		<div ref="listBox" class="listBox" v-show="showFlagTip">
			<div>
				<list :listData="this.listData"></list>
			</div>
		</div>
		
		<FooterBar></FooterBar>
		
	</div>
</template>

<script>
import FooterBar from '../footer/footer.vue'
import HeaderBar from '../header/header.vue'
import list from '../list/list.vue'
import BookSelectBtn from '../BookSelectBtn/BookSelectBtn.vue'
import axios from 'axios'
import BetterScroll from 'better-scroll'

export default {
	data (){
		return {
			listData : [],
			chanId : null,
			SubCateId : null,
			orderId : null,
			page : 1,
			action : null,
			size : null,
			update : null,
			bs: null,
			showFlagTip: false
		}
	},
	
	mounted:function(){
		// this.sreach()
		let rem = 50
		let h = window.innerHeight-2.7*rem-4
		document.querySelector('.listBox').style.height = h+'px'
		
	},
	methods:{
		sreach : function(chanId=this.chanId, orderId=this.orderId, page=this.page, action=this.action, size=this.size, update=this.update ,subCateId=this.SubCateId){
			var params={
				chanId:chanId,
				orderId:orderId,
				page:page,
				action:action,
				size:size,
				update:update,
				subCateId:subCateId
			};
			
			axios.get('/searchQD',{params:params}).then((res)=>{
				res.data.split('@#').forEach((item)=>{
					item = JSON.parse(item)
					this.listData.push(item)
					
				});
				this.showFlagTip = true
				console.log(this.listData)
				this.bs.finishPullUp()
			})
		},
		setChanId:function(ChanId){
			this.chanId = ChanId
			this.listData = []
			this.sreach()
		},
		setSubCateId:function(SubCateId,chanId){
			this.SubCateId = SubCateId
			this.chanId = chanId
			this.listData = []
			this.sreach()
		},
		flagF: function(){
			this.showFlagTip = false
		}
	},
	components:{
		HeaderBar,
		FooterBar,
		BookSelectBtn,
		list
		
	},
	watch: {
		listData() {
			this.$nextTick(function(){
				if(this.bs){
					this.bs.refresh()
					return false
				}	
				this.bs = new BetterScroll(this.$refs.listBox,{
					scrollY: true,
					click: true,
					pullUpLoad: {
						threshold: -30
					}
				})	
				this.bs.on("pullingUp",()=>{
					this.page++ 
					this.sreach()
				})
			})

		}
	}
}
</script>

<style lang="stylus" scoped>
	.listBox
		height 5rem
		overflow hidden
		
</style>
