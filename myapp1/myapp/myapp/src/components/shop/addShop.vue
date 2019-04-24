<template>
	<el-dialog title="添加店铺" :visible="shopVisible" @update:visible="v=>$emit('update:shopVisible',v)">
		<el-form>
			<el-form-item label="店铺名称">
				<el-input ref="shopName" autocomplete="off"></el-input>
			</el-form-item>

			<el-form-item label="店铺图片">
				<el-upload
					class="upload-demo"
					ref="upload"
					:limit="1"
                    :on-change="upChange"
					:on-exceed="exceed"
					action=""
					:auto-upload="false">
					<el-button slot="trigger" size="small" type="primary">选取文件</el-button>
					<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
				</el-upload>

				<img v-if="shopPic.length>0" width="150" :src="shopPic" alt="">
			</el-form-item>

			<el-form-item label="店铺类别">
				<el-select v-model="shopTypeId" placeholder="请选择">
					<el-option
					  v-for="item in shopTypeList"
					  :key="item._id"
					  :label="item.shopTypeName"
					  :value="item._id">
					</el-option>
				</el-select>
			</el-form-item>
		</el-form>

		<div slot="footer" class="dialog-footer">
		<el-button @click="$emit('update:shopVisible',false)">取 消</el-button>
		<el-button type="primary" @click="addShop">提 交</el-button>
		</div>
	</el-dialog>
</template>

<script>
	export default {
		props:["shopVisible","typeId","getShopList","shopId"],
		name:"add-shop",
		data() {
			return {
				shopTypeId:"5bf528ff3783d53670fdd2e2",
				shopTypeList:[],
				shopPic:""
			};
		},
		methods:{
		    upChange(file){
		        this.$refs.upload.clearFiles()//清除上一图片     更新
                var reader = new FileReader()//js自带的一个对象   FileReader  文件读取
                reader.readAsDataURL(file.raw)//配置  将读取的信息转化成数据
                //转化为base64
                var _this=this
                reader.onload = function () {
                    _this.shopPic = this.result;
                }
            },
			//添加店铺
			addShop(){
				var formdata=new FormData();
				// console.log(this.$refs.shopTypeName.$data)
				formdata.set("shopName",this.$refs.shopName.$data.currentValue);//店铺名称
				formdata.set("shopPic",document.querySelector(".el-upload__input").files[0]);//图片
				formdata.set("shopTypeId",this.shopTypeId)//id
                if (this.shopId.length > 0){
                    //修改
                    formdata.set("shopId",this.shopId)//店铺ID
                    this.$ajax.put("upShop",formdata)
                        .then(data=>{
                        if(data.ok===1){
                            this.$emit('update:shopVisible',false)
                            this.$message({
                                message: data.msg,
                                type: 'success'
                            });
                            if(this.getShopList){
                                this.getShopList()
                            }else{
                                this.$router.push("/shopManage");
                            }
                        }else{
                            this.$message.error(data.msg);
                        }
                    })
                }else {
				    //添加
                    this.$ajax.post("/addShop",formdata)
                        .then(data=>{
                        if(data.ok===1){
                            this.$emit('update:shopVisible',false)
                            this.$message({
                                message: data.msg,
                                type: 'success'
                            });
                            if(this.getShopList){
                                this.getShopList()
                            }else{
                                this.$router.push("/shopManage");
                            }
                        }else{
                            this.$message.error(data.msg);
                        }
                    })
                }


            },
            exceed(){

            },
            //获取店铺类别管理    用于获取其中id
			getShopType(){
				this.$ajax.get("/shopType")
					.then(data=>this.shopTypeList=data.shopTypeList)
			},
			//根据id 获得对应信息
			getShopInfo(){
				this.$ajax.get("/getShopInfoById",{
					params:{
						shopId:this.shopId
					}
				}).then(data=>{
					this.$refs.shopName.$data.currentValue=data.shopInfo.shopName;//获得对应店铺名称
					this.shopTypeId=data.shopInfo.shopTypeId;//店铺类别
                    this.shopPic="http://127.0.0.1/" + data.shopInfo.shopPic;//店铺图片
				})
			}
		},
		mounted() {
			this.getShopType();
			this.shopTypeId=this.typeId
			//
			if(this.shopId.length > 0){
				this.getShopInfo()
			}
		}
	}
</script>

<style>

</style>
