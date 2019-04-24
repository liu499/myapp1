<template>
    <div>
        <el-form :inline="true" class="demo-form-inline">
            <el-form-item label="搜索">
                <el-input placeholder="商品" ref="shopName"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary">查询</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="openShopVisible('')">添加商品</el-button>
            </el-form-item>
        </el-form>

        <el-table :data="productList" border>
            <el-table-column label="ID" prop="_id"></el-table-column>
            <el-table-column label="商品名称" prop="shopName"></el-table-column>
            <el-table-column label="所属类别" prop="typeInfo[0].shopTypeName"></el-table-column>
            <el-table-column label="商品图片">
                <template slot-scope="scope">
                    <img width="100" :src="scope.row.shopPic | imgUrl" alt="">
                </template>
            </el-table-column>

            <el-table-column label="操作" width="500">
                <template slot-scope="scope">
                    <el-button  size="mini" @click="openShopVisible(scope.row._id)">编辑</el-button>
                    <el-button  size="mini" type="danger" @click="deleteproduct(scope.row._id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <div class="toolbar">
            <el-pagination
                background
                layout="prev, pager, next"
                :current-page.sync="pageIndex"
                @current-change="getproductList"
                :page-count="pageSum">
            </el-pagination>
        </div>

        <addshopManage v-if="shopVisible" :pageIndex="pageIndex" :shopId="shopId" :getproductList="getproductList" :shopVisible.sync="shopVisible"></addshopManage>

    </div>
</template>

<script>
    import addshopManage from "./addshopManage"
    export default {
        name: "shop-type-manage",
        data(){
            return {
                shopVisible:false,
                productList:[],//商品列表
                shopId:"",//店铺ID号
                pageIndex:1,
                pageSum:1
            }
        },
        components:{
            addshopManage
        },
        methods:{
            openShopVisible(id){
                this.shopId=id;
                this.shopVisible=true;
            },
            //获取商品列表
            getproductList(pageIndex){
                this.$ajax.get("/getproductList",{
                    params : {
                        pageIndex
                    }
                })
                    .then(data=>{
                        this.productList=data.productList;
                        this.pageSum=data.pageSum;
                        this.pageIndex=data.pageIndex;
                })
            },
            //删除商品
            deleteproduct(id){
                this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$ajax.delete("/deleteproduct",{
                    params:{
                        id
                    }
                }).then(data=>{
                    if(data.ok===1){
                    this.getproductList(this.pageIndex)
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
            }
        },
        mounted(){
            this.getproductList(this.pageIndex)
        }
    }
</script>

<style scoped>

</style>
