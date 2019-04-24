<template>
	<div>
		<!-- <mysolt></mysolt> -->
		<div>
			<el-form :inline="true" class="demo-form-inline">
				<el-form-item label="审批人">
					<el-input placeholder="审批人"></el-input>
				</el-form-item>
				<el-form-item label="活动区域">
					<!-- <el-select  placeholder="活动区域">
						<el-option label="区域一" value="shanghai"></el-option>
						<el-option label="区域二" value="beijing"></el-option>
					</el-select> -->
				</el-form-item>
				<el-form-item>
					<el-button type="primary">查询</el-button>
					<el-button type="primary" @click="dialogFormVisible=true">添加店铺类别</el-button>
				</el-form-item>
			</el-form>
		</div>

		<el-table
            v-loading="loading"
            border
        :data="adminLogList"
        style="width: 100%">
        <el-table-column
          label="id">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row._id }}</span>
          </template>
        </el-table-column>

        <el-table-column
          label="日志时间">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            {{scope.row.addTime | date}}
          </template>
        </el-table-column>

		<el-table-column
		label="管理员账号" prop="adminInfo[0].adminName">
		<!--<template slot-scope="scope" >-->
			<!--{{scope.row.adminInfo[0].adminName}}-->
		<!--</template>-->
		</el-table-column>

		<el-table-column label="类型">
			<template slot-scope="scope">
				{{scope.row.logInfo[0].typeName}}
			</template>
		</el-table-column>

		<el-table-column label="类型" prop="detail">
		</el-table-column>

			<el-table-column label="操作">
				<template slot-scope="scope">
				 <!-- <el-button
						size="mini"
						@click="handleEdit(scope.$index, scope.row)">编辑</el-button> -->
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




		<addShopType :dialogFormVisible.sync="dialogFormVisible"></addShopType>

	</div>

</template>
<!-- sync 相当于@update  实时更新  操作父元素的属性-->
<script>
	// import mysolt from "@/components/mySlot"
	import addShopType from "../shop/addShopType"
	export default {
		name:"admin-log",
		data() {
			return {
				adminLogList:[],
				Enum:{},
				pageSum:1,
				loading:true,
				pageIndex:1,
				dialogFormVisible:false
			}
		},
		components:{
			// mysolt
			addShopType
		},
		methods:{
			handleDelete(id){
					this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
							this.$ajax.delete("/adminLogList",{
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
				this.$ajax.get("/getAdminLogList",{
					params:{
						pageIndex
					}
				})
					.then(data=>{
						this.loading=false
						this.adminLogList=data.adminLogList;
						this.pageSum=data.pageSum
						// this.Enum=data.adminLogEnum
					})
			}
		},
		mounted() {
			this.getAdminLogList(1)
		}
	}
</script>

<style>

</style>
