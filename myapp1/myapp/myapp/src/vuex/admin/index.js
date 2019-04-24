import axios from "axios"
import Vue from "vue";
var vue=new Vue();
export default{
	state:{//存放数据
		adminId:localStorage.adminId || null,//数据 储存起来
		adminName:localStorage.adminName || null
	},
	mutations:{//修改数据
		CHANGE_ADMININFO(state,info){
			state.adminId=localStorage.adminId=info.adminId;
			state.adminName=localStorage.adminName=info.adminName;
		},
		//退出登录
		OUT_LOGIN(state){
			localStorage.clear();
			state.adminId=localStorage.adminId;
			state.adminName=localStorage.adminName;
			vue.$message({//提示消息
				message: "退出成功",
				type: 'success'
			});
		}
	},
	getters:{//计算属性
		
	},
	actions:{//异步操作
		login({commit,state,getter},{adminName,passWord,success,error}){//登录
			// console.log(2121)
			axios.post("/login",{
				adminName,
				passWord
			}).then((data)=>{
				// console.log(data)
				if (data.ok===1) {
					commit("CHANGE_ADMININFO",data)
					success(data.msg)
				} else{
					error(data.msg)
				}
			})
		}
	}
}
