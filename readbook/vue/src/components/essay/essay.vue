<template>
	<div>
		<essayView 
		class="essayBox" 
		:title="title"
		:essay="essay"
		ref="child"
		@beforeThis="beforeThis"
		@afterThis="afterThis"
		>
+
		</essayView>
		<div class="dim" :style="heightStyle">
			<div class="before" @click="before()"></div>
			<div class="control" @click="control()"></div>
			<div class="after" @click="after()"></div>
		</div>
		<controlBar ref="controlBar"></controlBar>
	</div>

</template>

<script>
import {mapState} from "vuex"
import axios from 'axios'
import essayView from '../essayView/essayView.vue'
import controlBar from "../controlBar/controlBar.vue"
export default {
	data(){
		return {
			essay:String,
			index: '',
			title:'',
			controlShow: false
		}
	},
	methods:{
		getEssay: function(index){
			let url = this.essayList[index].href
			axios
			.get('/getEssay',{params:{url}})
			.then((res)=>{
				let essay = res.data
				let arr = []
				let n = /^\n$/
				essay.forEach((el)=>{
					if( !n.test(el) ){
						arr.push(el)
					}
				})
				this.essay = arr
				this.getTitle(index)
			})
			.catch((err)=>{
				console.log(err)
			})
		},
		getTitle:function(index){
			this.title = this.essayList[index].name
		},
		before:function(){
			this.$refs.child.beforeBox()
		},
		after:function(){
			this.$refs.child.afterBox()
		},
		beforeThis: function(){
			this.$store.dispatch('getessayIndex',this.essayIndex-1)
			this.getEssay(this.essayIndex)
		},
		afterThis: function(){
			this.$store.dispatch('getessayIndex',this.essayIndex+1)
			this.getEssay(this.essayIndex)
		},
		control: function(){
			this.$refs.controlBar.barShow()
		}
	},
	computed:{
		...mapState(['essayIndex','essayList']),
		heightStyle:function(){
			return {
				'height': this.Height
			}
		}
	},
	mounted:function(){
		this.getEssay(this.essayIndex);
		this.Height = window.innerHeight-36+'px'
	},
	watch:{
		"$route":{
			handler(route){
				let i = route.params.index
				if(i){
					this.getEssay(i)
				}
			}
		}
	},
	components:{
		essayView,
		controlBar
	}
}
</script>

<style lang="stylus" scoped>
	.dim 
		width 100%
		height 100%
		position fixed
		top 0
		left 0
		display flex
		justify-content space-between
		flex 0 1
		.before
			flex-grow 1
			height 100%
		.control
			flex-grow 1
			height 100%
		.after
			flex-grow 1
			height 100%
</style>
