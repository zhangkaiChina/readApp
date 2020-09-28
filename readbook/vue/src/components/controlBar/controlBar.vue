<template>
	<div class="control" v-if="barShowFlag">
		<div class="controlBar">
			<button @click="menuShow()">
				目录
			</button>
			<button>
				选项
			</button>
		</div>
		<div class="menuBox"  v-show="menuShowFlag">
			<Menu :list="essayList" @menuShow="menuShow()"></Menu>
		</div>
		<div class="controlBox"  v-show="controlShowFlag">
			<controlBox></controlBox>
		</div>
	</div>
</template>

<script>
import {mapState} from "vuex"
import Menu from "../menu/menu.vue"
import controlBox from '../controlBox/controlBox.vue'
export default {
	props:{
		listData:{
			type:Array,
			default(){
				return []
			}
		}
	},
	data(){
		return {
			menuShowFlag: false,
			barShowFlag: false,
			controlShowFlag: false
		}
	},
	methods:{
		barShow: function(){
			this.barShowFlag = !this.barShowFlag
		},
		menuShow: function(){
			this.menuShowFlag = !this.menuShowFlag
		},
		fontShow: function(){
			this.controlShowFlag = !this.controlShowFlag
		}
	},
	components:{
		Menu,
		controlBox
	},
	computed:{
		...mapState(['essayList']),
	}
}
</script>

<style lang="stylus" scoped>
	
	.control
		.controlBar 
			width 100%
			height 1.2rem
			background-color rgba(0,0,0,.9)
			position fixed
			left 0
			bottom 0
			display flex
			button 
				flex-grow 1
				height 100%
				outline none
				border none
				background none
				color #999999
		.menuBox 
			width 6rem
			position absolute
			top 0
			left  0
</style>
