<template>
	<div>
		<div class="bookList">
			<BookCard
			v-for="(item,index) in this.listData"
			:bookInfo="item"
			:key="index"
			>
			</BookCard>
		</div>
	</div>
</template>

<script>
import BookCard from '../bookcard/bookcard.vue'

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
			bookinfo: {}
		}
	},
	mounted:function(){
	},
	methods:{
	},
	components:{
		BookCard,
	}
}
</script>

<style lang="stylus" scoped>
	.bookList
		margin-bottom 1rem
</style>
