<template>
	<div>
		<list v-if="listShow" :listData="listData"></list>
		<div v-else>
			暂无数据
		</div>
		<FooterBar></FooterBar>
	</div>
	
</template>

<script>
import FooterBar from '../footer/footer.vue'
import list from '../list/list.vue'
export default {
	components:{
		list,
		FooterBar
	},
	data(){
		return {
			listShow: false,
			listData:[]
		}
	},
	mounted:function(){
		let booklist = window.localStorage.booklist
		if(booklist){
			this.listData = JSON.parse(booklist)
			this.listShow = true
		}
	}
	
}
</script>

<style lang="stylus" scoped>
	
</style>
