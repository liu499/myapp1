<template>
    <div>
        <div class="toolbar Box">
            <el-form :inline="true"  class="demo-form-inline">
                <el-form-item label="搜索">
                    <el-input  placeholder="管理员账号"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" >查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="dialogFormVisible=true">添加管理员</el-button>
                </el-form-item>
            </el-form>
        </div>
        <el-table
            v-loading="loading"
            border
            :data="adminList"
            style="width:100%">
            <el-table-column
                label="id"
            >
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row._id }}</span>
                </template>
            </el-table-column>
            <el-table-column
                label="管理员账号"
                prop="adminName"
            >

            </el-table-column>
            <el-table-column
                label="密码">
                <!--prop="logType"-->
                <template slot-scope="scope">
                    <!--{{scope.row.logType}}-->
                    <!--{{adminLogEnum.adminLogEnum[scope.row.logType]}}-->
                    <!--通过多表联查获取到了logInfo-->
                    {{scope.row.passWord}}
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.row._id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <div class="toolbar">
            <el-pagination
                background
                layout="prev, pager, next"
                :current-page.sync="pageIndex"
                @current-change="getAdminLogList"
                :page-count="pageSum">
            </el-pagination>
        </div>

        <addAdminList :getAdminLogList="getAdminLogList" :dialogFormVisible.sync="dialogFormVisible"></addAdminList>

    </div>
</template>

<script>
    import addAdminList from "@/components/admin/addAdminList";
    export default {
        name: "add-admin",
        data(){
            return {
                dialogFormVisible:false,
                loading : false,
                adminList : [],
                pageIndex:1,
                adminName:"",
                pageSum:1
            }
        },
        components:{
            addAdminList
        },
        methods:{
            handleDelete(id){
                this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$ajax.delete("/deleteadminLog",{
                    params:{
                        id
                    }
                }).then(data=>{
                    if(data.ok===1){
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    this.getAdminLogList(this.pageIndex)
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
            getAdminLogList(pageIndex){//读取
                this.loading=true
                this.$ajax.get("/getadminList",{
                    params:{
                        pageIndex
                    }
                })
                    .then(data=>{
                    this.loading=false,
                    this.adminList=data.adminList;
                    this.pageSum=data.pageSum
                // this.Enum=data.adminLogEnum
            })
            }
        },
        mounted(){
            this.getAdminLogList(1);
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
    .Box{
        width: 500px;
    }
</style>
