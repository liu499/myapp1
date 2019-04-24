<template>
    <el-dialog title="添加商品类别" :visible="dialogFormVisible" @update:visible="v=>$emit('update:dialogFormVisible',v)">
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

            <el-form-item label="店铺类别">
                <el-select v-model="shopTypeId" placeholder="请选择" @click="getShopInfo()">
                    <el-option
                        v-for="item in shopTypeList"
                        :key="item._id"
                        :label="item.shopTypeName"
                        :value="item._id">
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="店铺">
                <el-select v-model="shopTypeId" placeholder="请选择">
                    <el-option
                        v-for="item in shopList"
                        :key="item._id"
                        :label="item.shopName"
                        :value="item._id">
                    </el-option>
                </el-select>
            </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer">
            <el-button>取 消</el-button>
            <el-button type="primary" @click="addproduct">提 交</el-button>
        </div>
    </el-dialog>
</template>

<script>
    export default {
        props:["dialogFormVisible","getaddproduct"],
        name: "addproduct",
        data(){
            return {
                shopTypeList:[],
                shopList:[],
                shopTypeId:""
            }
        },
        methods:{
            addproduct(){
                // this.$refs.upload.clearFiles();
                var formdata=new FormData();
                // console.log(this.$refs.shopTypeName.$data)
                formdata.set("shopTypeName",this.$refs.shopTypeName.$data.currentValue);//图片名
                formdata.set("shopTypePic",document.querySelector(".el-upload__input").files[0]);//图片
                formdata.set("shopTypeId",this.shopTypeId)//id
                this.$ajax.post("/addproduct",formdata)
                    .then(data=>{
                    // this.dialogFormVisible=false;
                    this.$emit("update:dialogFormVisible",false)
                    this.getaddproduct();//调一下前面传过来的方法   更新
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
            },
            getShopType(){//获取
                this.$ajax.get("/shopType")
                    .then(data=>this.shopTypeList=data.shopTypeList)
            },
            getShop(){
                this.$ajax.get("/getproduct")
                    .then(data=>this.shopList=data.shopList)
            },
            // getShopInfo(){//id
            //     console.log(this.shopId)
            //     this.$ajax.get("/getShopInfoById",{
            //         params:{
            //             shopId:this.shopId
            //         }
            //     }).then(data=>{
            //         this.$refs.shopTypeName.$data.currentValue=data.shopInfo.shopTypeName;//获得对应店铺名称
            //         this.shopTypeId=data.shopInfo.shopTypeId;//店铺类别
            //         this.shopPic="http://127.0.0.1/" + data.shopInfo.shopPic;//店铺图片
            // })
            // }
        },
        mounted(){
            this.getShopType()
            this.getShop()
            // this.getShopInfo()
        }
    }
</script>

<style scoped>

</style>
