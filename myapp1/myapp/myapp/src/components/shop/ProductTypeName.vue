<template>
    <div>
        <el-form :inline="true" class="demo-form-inline">
            <el-form-item label="搜索">
                <el-input placeholder="商品类别" ref="shopName"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary">查询</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="dialogFormVisible=true">添加商品类别</el-button>
            </el-form-item>
        </el-form>

        <el-table :data="addproduct" border>
            <el-table-column label="ID" prop="_id"></el-table-column>
            <el-table-column label="商品类别名称" prop="shopTypeName"></el-table-column>
            <el-table-column label="商品类别图片">
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
                    <el-button  size="mini" type="danger" @click="delproductType(scope.row._id)">删除</el-button>
                    <el-button  size="mini" type="primary" @click="openShop(scope.row._id)">添加商品</el-button>
                </template>
            </el-table-column>

        </el-table>

        <div class="toolbar">
            <el-pagination
                background
                layout="prev, pager, next"
                :current-page.sync="pageIndex"
                @current-change="getaddproduct"
                :page-count="pageSum">
            </el-pagination>
        </div>

        <addproduct :typeId="typeId" :getaddproduct="getaddproduct" :dialogFormVisible.sync="dialogFormVisible"></addproduct>
    </div>
</template>

<script>
    import addproduct from "./addproduct"
    export default {
        name: "product-type-name",
        data(){
            return{
                dialogFormVisible:false,
                pageIndex:1,
                pageSum:1,
                addproduct:[],
                typeId:""
            }
        },
        methods:{
            //数据库获取
            getaddproduct(pageIndex){//读取
                this.loading=true
                this.$ajax.get("/getaddproduct",{
                    params:{
                        pageIndex
                    }
                })
                    .then(data=>{
                    this.loading=false
                    this.addproduct=data.addproduct;
                    this.pageSum=data.pageSum
                    // this.Enum=data.adminLogEnum
                })
            },
            //添加店铺 将 ID 传过去
            openShop(id){
                this.typeId=id;
                this.shopVisible=true
            },
            //删除商品类别
            delproductType(id){
                this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$ajax.delete("/delproductType",{
                    params:{
                        id
                    }
                }).then(data=>{
                    if(data.ok===1){
                    this.getaddproduct()
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
        components:{
            addproduct
        },
        mounted(){
            this.getaddproduct()
        }
    }
</script>

<style scoped>

</style>
