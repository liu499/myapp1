<template>
	<!-- el-form 表单   el-form-item  表单中的项-->
	<el-form :model="loginForm" ref="loginForm" class="dudu" :rules="rules">
		<h3>饿了么后台</h3>
		<el-form-item prop="adminName">
			<el-input type="text" ref="adminName" v-model="loginForm.adminName" placeholder="请输入用户名"></el-input>
		</el-form-item>
		<el-form-item prop="passWord">
			<el-input type="password" v-model="loginForm.passWord" placeholder="请输入密码"></el-input>
		</el-form-item>
		<el-form-item>
			<el-button style="width: 100%;" :loading="isLoading" type="primary" @click="submitForm('loginForm')">登录</el-button>
		</el-form-item>
	</el-form>
</template>

<script>
	// import axios from "axios";
	export default {
		name:"login",
		data() {
			var validatePass2 = (rule, value, callback) => {
				//rule  是规则  value 输入框里面的值   callback  回调函数
				if(value.length<4 || value.length>10){
					//new Error() 要在指定位置显示的提示文字
					   callback(new Error("请输入4到10位的密码"));
				   }else{
					   callback();
				   }

// 				if (value === '') {
// 				  callback(new Error('请再次输入密码'));
// 				} else if (value !== this.ruleForm2.pass) {
// 				  callback(new Error('两次输入密码不一致!'));
// 				} else {
// 				  callback();
// 				}
			  };
			return {
				isLoading:false,
				rules:{// 通过 rules 传入验证规则   通过 prop 绑定  名字  因为可能为多个规则 所以为数组
					adminName:[
						{ required: true, message: '请输入管理员账号', trigger: 'blur' }
					],
					passWord:[
						{ required: true, message: '请输入你的密码', trigger: 'blur' },
						{ validator: validatePass2, trigger: 'blur' }
						// { min:4,max:10, message: '密码长度为4---10位', trigger: 'blur' }
					]
				},
				loginForm:{//与表单绑定  里面的值
					adminName:"",
					passWord:""
				}
			};
		},
		methods:{
			submitForm(formName) {
				/* vue 中自带的一个方法  ref  可以给组件或者元素上加一个 ref 属性 进行绑定
				然通过 this.$refs.属性名  来获得这个组件相关的信息*/
				console.log(this.$refs.adminName.value)/* this.$refs.属性名.value   获取绑定的 里面的值*/
				this.$refs[formName].validate((valid) => {
					// console.log(valid)//valid  判断  返回 true 或 false
					if(valid){//验证成功以后
						this.isLoading=true//变为true

						var _this=this;//记录this
						this.$store.dispatch("login",{
							adminName:this.loginForm.adminName,
							passWord:this.loginForm.passWord,
							success(msg){
								_this.$message({//提示消息
									message: msg,
									type: 'success'
								});
								_this.isLoading=false
							},
							error(msg){
								_this.$message.error(msg);
								_this.isLoading=false
							}
						})

// 						this.$ajax({
// 							url:"http://127.0.0.1/post",
// 							method:"post",
// 							data:"a=4&b=5",
// 							headers:{
// 								"content-type":"application/x-www-form-urlencoded"
// 							}
// 						}).then(({data})=>{
// 							console.log(data);
// 							this.isLoading=false;
// 						})
					}



					//URL 方式
// 					axios.post("http://127.0.0.1/post","a=1&b=2",{
// 						headers:{
// 							"content-type":"application/x-www-form-urlencoded"
// 						}
// 					}).then(({data})=>{
// 						console.log(data);
//                     })

					//post 方式
// 					axios.post("http://127.0.0.1/post",{
// 						adminName:this.loginForm.adminName,
// 						passWord:this.loginForm.passWord
// 					}).then(({data})=>{
// 						console.log(data);
// 					})

					//get 方式
// 					axios.get("http://127.0.0.1/get",{
// 						params:{// get用 params 传的参数    post 的参数放在data中
// 							adminName:this.loginForm.adminName,
// 							passWord:this.loginForm.passWord
// 						}
// 					}).then((data)=>{
// 						console.log(data)
// 					})
				});
			}
		}
	}
</script>

<style scoped>
	.dudu{
        width:350px;
        margin:150px auto;
        border:2px solid #eaeaea;
        padding:35px 35px 15px 25px;
        box-shadow:0 0 10px blue;
    }
    .dudu h3{
        text-align:center;
    }
</style>
