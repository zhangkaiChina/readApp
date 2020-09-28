import Vue from 'vue'
import VueRouter from 'vue-router'


import Index from '../src/components/index/index.vue'
import List from '../src/components/bookshelf/bookshelf.vue'
import Sreach from '../src/components/sreach/sreach.vue'
import Detail from '../src/components/bookDetail/bookDetail.vue'
import Essay from '../src/components/essay/essay.vue'



Vue.use(VueRouter)
export default new VueRouter({
	// mode:'history',   
	routes:[          
		{ path: '/', redirect: '/index' } ,
		{
			path:'/index', 
			name:'index',
			component:Index 
		} ,
		{
			path:'/bookshelf', 
			name:'bookshelf',
			component:List 
		} ,
		{
			path:'/sreach', 
			name:'sreach',
			component:Sreach 
		} ,
		{
			path:'/detail', 
			name:'detail',
			component:Detail 
		} ,
		{
			path:'/essay/:index', 
			name:'essay',
			component:Essay 
		} ,
	] ,
});