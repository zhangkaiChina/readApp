<template>
	<div class="headerBox">
		{{title}}
	</div>
</template>

<script>
export default {
	props:{
		title:{
			type: String
		}
	}
}
</script>

<style lang="stylus" scoped>
	@import "../../assets/base.styl"
	.headerBox
		box-sizing border-box
		width 100%
		height 1rem
		line-height .8rem
		text-align center
		font-weight 500
		font-size .4rem
		color #ddd
		padding 0.1rem
		background $baseColor
		
</style>
