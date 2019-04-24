<template>
	<div>
		<el-form :inline="true" class="demo-form-inline">
			<el-form-item label="搜索">
				<el-input placeholder="店铺" ref="shopName"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="getShopList">查询</el-button>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="openShopVisible('')">添加店铺</el-button>
			</el-form-item>
		</el-form>

		<el-table :data="shopList" border>
			<el-table-column label="ID" prop="_id"></el-table-column>
			<el-table-column label="店铺名称" prop="shopName"></el-table-column>
            <el-table-column label="所属类别" prop="typeInfo[0].shopTypeName"></el-table-column>
			<el-table-column label="店铺图片">
				<template slot-scope="scope">
					<img width="100" :src="scope.row.shopPic | imgUrl" alt="">
				</template>
			</el-table-column>

			<el-table-column label="操作" width="500">
                <template slot-scope="scope">
                    <el-button  size="mini" @click="openShopVisible(scope.row._id)">编辑</el-button>
                    <el-button  size="mini" type="danger" @click="shopDelete(scope.row._id)">删除</el-button>
                    <el-button  size="mini" type="primary" >添加商品类别</el-button>
                </template>
            </el-table-column>
		</el-table>

        <div class="toolbar">
            <el-pagination
                background
                layout="prev, pager, next"
                :current-page.sync="pageIndex"
                @current-change="getShopList"
                :page-count="pageSum">
            </el-pagination>
        </div>

		<addShop v-if="shopVisible" :shopId="shopId" :getShopList="getShopList" :shopVisible.sync="shopVisible"></addShop>
	</div>
</template>

<script>
	import addShop from "./addShop"
	export default {
		name: "shop-manage",
		data() {
			return {
				shopVisible:false,
				shopList:[],//店铺列表
				shopId:"",//店铺ID号
                pageIndex:1,
                pageSum:1

			};
		},
		components:{
			addShop
		},
		methods:{
			openShopVisible(id){
				this.shopVisible=true;
				this.shopId=id
			},
			//获得店铺列表
			getShopList(pageIndex){
				this.$ajax.get("/getShopList",{
				    params:{
				        shopName:this.$refs["shopName"].$data.currentValue,
                        pageIndex
                    }
                })
					.then(data=>{
					    this.shopList=data.shopList
                        this.pageSum=data.pageSum
					})
			},
            //删除
            shopDelete(id){
                this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.$ajax.delete("/deleteShop",{
                        params:{
                            id
                        }
                    }).then(data=>{
                            if(data.ok===1){
                                this.getShopList()
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
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

		},
		mounted() {
			this.getShopList(1)
		}
	}
</script>

<style>

</style>
