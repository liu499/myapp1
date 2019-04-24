<template>
	<div>
		<el-form :inline="true" class="demo-form-inline">
			<el-form-item label="搜索">
				<el-input placeholder="类别"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary">查询</el-button>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="dialogFormVisible=true">添加店铺类别</el-button>
			</el-form-item>
		</el-form>

		<el-table :data="shopTypeList">
			<el-table-column label="ID" prop="_id"></el-table-column>
            <el-table-column label="店铺类别名称" prop="shopTypeName"></el-table-column>
            <el-table-column label="店铺类别图片">
                <template slot-scope="scope">
                        <div>
                                <img width="100" :src="scope.row.shopTypePic | imgUrl" alt="">
                                <!-- <img width="100" :src="'http://127.0.0.1/'+scope.row.shopTypePic" alt=""> -->
                        </div>
                </template>
            </el-table-column>

			<el-table-column label="操作">
					<template slot-scope="scope">
							<el-button  size="mini">编辑</el-button>
							<el-button  size="mini" type="danger" @click="handleDelete(scope.row._id)">删除</el-button>
							<el-button  size="mini" type="primary" @click="openShop(scope.row._id)">添加店铺</el-button>
					</template>
			</el-table-column>

		</el-table>

		<!-- <addShopType :dialogFormVisible="dialogFormVisible" @changevisible="v=>dialogFormVisible=v"></addShopType> -->
		<!-- <addShopType :dialogFormVisible.sync="dialogFormVisible"></addShopType> -->
		<addShopType :getShopType="getShopType" :dialogFormVisible.sync="dialogFormVisible"></addShopType>

		<addShop :shopId="''" v-if="shopVisible" :typeId="typeId" :shopVisible.sync="shopVisible"></addShop>
	</div>
</template>

<script>
	import addShopType from "./addShopType"
	import addShop from "./addShop"
	export default {
		name:"shop-type",
		data() {
			return {
				typeId:"",
				dialogFormVisible:false,
				shopTypeList:[],
				shopVisible:false
			};
		},
		methods:{
		    //删除
            handleDelete(id){
                this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$ajax.delete("/deleteShopType",{
                    params:{
                        id
                    }
                }).then(data=>{
                    if(data.ok===1){
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    // this.getAdminLogList(this.pageIndex)
                    this.getShopType()
                }else{
                    this.$message({
                        type: 'info',
                        message: '删除失败'
                    });
                }
            })

            }).catch(() => {
                    this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
            },
			//添加店铺类型到数据库
			addShopType(){
				var formdata=new FormData();
				// console.log(this.$refs.shopTypeName.$data)
				formdata.set("shopTypeName",this.$refs.shopTypeName.$data.currentValue);//店铺类别名称
				formdata.set("shopTypePic",document.querySelector(".el-upload__input").files[0]);//图片
				this.$ajax.post("/addShopType",formdata)
						.then(data=>{
							this.dialogFormVisible=false;
							// console.log(data)
							if(data.ok===1){
								this.$message({
										message: data.msg,
										type: 'success'
								});
							}else{
								this.$message.error(data.msg);
							}
						})
			},
			//从数据库获取
			getShopType(){
				this.$ajax.get("/shopType")
					.then(data=>{
						this.shopTypeList = data.shopTypeList
					})
			},
			//添加店铺类别将 ID 传过去
			openShop(id){
				this.typeId=id;
				this.shopVisible=true
			}
		},
		components:{
			addShopType,
			addShop
		},
		mounted(){
			this.getShopType()
		}
	}
</script>

<style>

</style>
