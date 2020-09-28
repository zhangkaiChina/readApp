export default {
	getData(context,arg) {
		context.commit('getData', arg);
	},
	getessayIndex(context,arg) {
		context.commit('getessayIndex', arg);
	},
	getessayList(context,arg) {
		context.commit('getessayList', arg);
	},
}