<template>
	<div>
		<p>课程：{{studyInfo.title}}</p>
		<p>课程：{{studyInfo.day}}天</p>
		<!--<p><input type="button" :value="studyInfo.loveNum" @click="changeLoveNum"/></p>-->
		<!--<p><input type="button" :value="studyInfo.loveNum" @click="$store.commit('CHANGE_STUDYLIST_ID',studyInfo.id)"/></p>-->
		<p><input type="button" :value="studyInfo.loveNum" @click="CHANGE_STUDYLIST_ID(studyInfo.id)"/></p>
		<hr />
	</div>
</template>

<script>
//	import vuex from "vuex";
	import {mapState,mapMutations} from "vuex";
	export default {
		name:"study",
//		props:["studyInfo"],
		props:["id"],
		data(){
			return {
				studyInfo:{}
			}
		},
//		computed:vuex.mapState(["studyList"]),// 相当于  this.$store.state.studyList
//		computed:Object.assign(mapState(["studyList"]),{//要想添加计算属性的话     计算属性是一个对象    要与mapState 合并
//			sum(){
//				return 21
//			}
//		}),// 相当于  this.$store.state.studyList
//   第二种方式
		computed:{
			...mapState(["studyList"]),
			...{
				sum(){
					var s=0;
					this.studyList.forEach(v=>{
						s+=v.loveNum
					})
					return s
				}
			}
		},
		methods:{
			...mapMutations(["CHANGE_STUDYLIST_ID"]),//简写
			...{
				changeLoveNum(){
	//				this.studyInfo.loveNum+=1
					this.$store.commit("CHANGE_STUDYLIST_ID",this.id)//   this.id  要修改的对象
				}
			}
			
		},
		mounted(){
			this.studyInfo=this.studyList.find(v=>v.id===this.id)
		}
	}
</script>

<style>
</style>