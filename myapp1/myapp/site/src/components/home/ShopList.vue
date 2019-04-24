<template>
    <div>
        <div class="Caption">
            <a href="javascript:;">综合排序</a>
            <a href="javascript:;">距离最近</a>
            <a href="javascript:;">品质联盟</a>
            <a href="javascript:;">筛选 </a>
        </div>

        <div v-infinite-scroll="loadMore"
             infinite-scroll-disabled="loading"
             infinite-scroll-distance="10">
            <li class="shop-list" v-for="item in productList" @click="$router.push({path:'/product',query:{id:item._id}})">
                <img class="img1" :src="item.shopPic | imgUrl" alt="">
                <p>{{item.shopName}}</p>
                <img class="img2" src="../../img/shop.jpg" alt="">
            </li>
            <div v-if="isLoading"><mt-spinner color="#26a2ff"></mt-spinner></div>
        </div>

        <mt-tabbar v-model="selected" fixed>
            <mt-tab-item id="外卖">
                <img slot="icon" src="">
                外卖
            </mt-tab-item>
            <mt-tab-item id="订单">
                <img slot="icon" src="">
                订单
            </mt-tab-item>
            <mt-tab-item id="发现">
                <img slot="icon" src="">
                发现
            </mt-tab-item>
            <mt-tab-item id="我的">
                <img slot="icon" src="">
                我的
            </mt-tab-item>
        </mt-tabbar>
    </div>
</template>

<script>
    import { InfiniteScroll } from 'mint-ui';
    import axios from "axios";

    export default {
        name: "shop-list",
        data(){
            return {
                productList:[],
                pageIndex:0,
                loading:false,
                isLoading:false,
                selected:[]
            }
        },
        methods:{
            loadMore(){
                this.isLoading=true
                this.loading=true
                axios.get("/getproductList",{
                    params:{
                        pageIndex:++this.pageIndex
                    }
                }).then(({data})=>{
                    if(data.sop){
                        this.loading=true;
                        this.isLoading=false;
                        this.productList=this.productList.concat(data.productList);
                    }else{
                        this.productList=this.productList.concat(data.productList);
                        this.loading=false;
                        this.isLoading=false;
                    }

                });
            }
        }
    }
</script>

<style scoped>
    .shop-list{
        height:3.52rem;
        font-size:30px;
        border-bottom:1px solid #ccc;
        list-style: none;
        padding-left: 0.17rem;
    }
    .Caption{
        height: 0.92rem;
        line-height: 0.92rem;
        background: #fff;
        display:flex;
        flex-wrap:wrap;
    }
    .Caption a{
        font-size: 0.26rem;
        height: 0.91rem;
        float: left;
        text-align: center;
        width: 25vw;
    }
    .shop-list .img1{
        margin-top: 0.3rem;
        width: 1.13rem;
        height: 1.3rem;
        float: left;
        margin-right: 0.2rem;
    }
    .shop-list p{
        height: 0.4rem;
        width: 4.9rem;
        float: left;
        font-size: 0.3rem;
        margin-top: 0.3rem;
    }
    .shop-list .img2{
        width: 4.9rem;
        float: right;
        display: block;
    }
</style>
