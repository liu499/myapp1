<template>
	<el-dialog title="添加店铺类别" :visible="dialogFormVisible" @update:visible="v=>$emit('update:dialogFormVisible',v)">
		<el-form>
			<el-form-item label="类别名称">
				<el-input ref="shopTypeName" autocomplete="off"></el-input>
			</el-form-item>
			
			<el-form-item label="类别图片">
				<el-upload
					class="upload-demo"
					ref="upload"
					:limit="1"
					:on-exceed="exceed"
					action="https://jsonplaceholder.typicode.com/posts/"
					:auto-upload="false">
					<el-button slot="trigger" size="small" type="primary">选取文件</el-button>
					<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
				</el-upload>
			</el-form-item>
		</el-form>
		
		<div slot="footer" class="dialog-footer">
		<el-button @click="$emit('update:dialogFormVisible',false)">取 消</el-button> 
		<el-button type="primary" @click="addShopType">提 交</el-button>
		</div>
	</el-dialog>
</template>

<script>
	export default {
		props:["dialogFormVisible","getShopType"],
		name: "add-shop-type",
		data() {
			return {
				// dialogFormVisible:false
			};
		},
		methods:{
			addShopType(){
				// this.$refs.upload.clearFiles();
				var formdata=new FormData();
				// console.log(this.$refs.shopTypeName.$data)
				formdata.set("shopTypeName",this.$refs.shopTypeName.$data.currentValue);//图片名
				formdata.set("shopTypePic",document.querySelector(".el-upload__input").files[0]);//图片
				this.$ajax.post("/addShopType",formdata)
						.then(data=>{
							// this.dialogFormVisible=false;
							this.$emit("update:dialogFormVisible",false)
							this.getShopType();//调一下前面传过来的方法   更新
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
			exceed(){
				this.$message.error("您已经上传了图片");
			}
	},
}
</script>

<style>

</style>
