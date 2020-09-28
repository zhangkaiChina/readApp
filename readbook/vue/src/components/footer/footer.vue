<template>
	<div class="footer">
		<router-link class="btn" to="/index">
			<span class="iconfont">&#xe627;</span>
			推荐
		</router-link >
		<router-link class="btn" to="/bookshelf">
			<span class="iconfont">&#xe628;</span>
			书架
		</router-link >
		<router-link class="btn" to="/sreach"> 
			<span class="iconfont">&#xe684;</span>
			搜索
		</router-link >
	</div>
</template>

<script>
export default {}
</script>

<style lang="stylus" scoped>
	@import "../../assets/base.styl"
	
	.footer
		width 100%
		display flex
		justify-content flex-start
		position fixed
		left 0
		bottom 0
		background #fff
		.btn
			// height 1.5rem
			width 33%
			text-align center
			flex 1 0
			border-top $baseColor  1px solid
			text-decoration none
			color #333
			font-size .3rem
			.iconfont 
				display block
				margin 0.1rem auto
				font-size .4rem
			
		.router-link-exact-active
			color $baseColor 
			
</style>
