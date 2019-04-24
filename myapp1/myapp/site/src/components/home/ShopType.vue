<template>
    <div>
        <mt-swipe :auto="0">
            <mt-swipe-item v-for="item in shopTypeList">
                <div class="shop-type">
                    <div class="a" v-for="v in item">
                        <p><img :src="v.shopPic | imgUrl" alt=""></p>
                        <h4>{{v.shopName}}</h4>
                    </div>
                </div>
            </mt-swipe-item>
        </mt-swipe>

        <div class="Advertising">
            <div>
                <div class="Advertising_left">
                    <img src="../../img/01.jpg" alt="">
                </div>
                <div class="Advertising_left">
                    <img src="../../img/02.jpg" alt="">
                </div>
            </div>
        </div>

        <mt-swipe class="Advertising_bottom" :show-indicators="false">
            <mt-swipe-item><img src="../../img/03.jpg" alt=""></mt-swipe-item>
            <mt-swipe-item><img src="../../img/03.jpg" alt=""></mt-swipe-item>
            <mt-swipe-item><img src="../../img/03.jpg" alt=""></mt-swipe-item>
        </mt-swipe>

        <div class="header_center">
            <p>- 推荐商家 -</p>
        </div>
    </div>
</template>

<script>
    import axios from "axios"
    export default {
        name: "shop-type",
        data(){
          return {
              shopTypeList:[]
          }
        },
        mounted(){
            axios.get("/getshopList")
                .then(({data})=>{
                this.shopTypeList=data.shopTypeList;
            })
        }
    }
</script>

<style scoped>
    .mint-swipe{
        height:3.1rem;
        margin-bottom: 0.3rem;
    }
    .shop-type{
        display:flex;
        flex-wrap:wrap;
    }
    .shop-type div{
        width:20vw;
        height:1.55rem;
        background:white;
    }
    .a{position: relative;}
    .a img{
        width: 0.6rem;
        display: block;
        margin: 0 auto;
        margin-top: 0.1rem;
    }
    .a h4{
        font-size: 1vw;
        width: 100%;
        position: absolute;
        bottom: 1vw;
        text-align: center;
    }
    .header{
        height: 0.87rem;
        background: aqua;
    }
    .Advertising{
        height: 2.85rem;
        padding: 0 0.17rem;
        position: relative;
    }
    .Advertising_left{
        width: 3rem;
        height: 2.84rem;
        float: left;
        background: #f9f9f9;
        margin-right: 0.03rem;
    }
    .Advertising_left img{
        width: 3rem;
        height: 2.84rem;
    }
    .Advertising .mt-swipe{
        width: 6.16rem;
        height: 1.78rem;
    }
    .Advertising .mt-swipe img{
        width: 6.16rem;
        height: 1.78rem;
    }
    .Advertising_bottom{
        height: 1.8rem;
    }
    .Advertising_bottom img{
        width: 6.05rem;
        margin: 0 auto;
        display: block;
        margin-top: 0.1rem;
    }
    .header_center{
        height: 0.83rem;
        font-size: 0.3rem;
        line-height: 0.83rem;
        text-align: center;
    }
</style>
