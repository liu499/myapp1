<template>
    <div>
        <div class="imgtop">
            <div class="top-t"> < </div>

            <div class="header"></div>
            <div class="swiper-container">
                <ul class="swiper-container-ul">
                    <li class="swiper-container-ul-li actives">商品</li>
                    <li class="swiper-container-ul-li">店铺</li>
                </ul>
                <div class="swiper-wrapper">
                    <div class="swiper-slide">
                        <div class="content">
                            <div class="left" id="left">
                                <ul>
                                    <li v-for="item in productList">{{item.shopTypeName}}</li>
                                </ul>
                            </div>
                            <div class="right" id="right">
                                <ul>
                                    <li v-for="v in productList">
                                        <div class="class-title">{{v.shopTypeName}}</div>
                                        <div v-for="ite in v.shopInfo">
                                            <div class="item">
                                                <div class="item-left">
                                                    <div class="item-img"></div>
                                                </div>
                                                <div class="item-right">
                                                    <div class="title">{{ite.shopName}}</div>
                                                    <div class="subtitle"></div>
                                                    <div class="price"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="swiper-slide" style="display:none;">
                        店铺介绍
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from "axios";
    $('.content').css('height',$('.right').height());
    $('.left ul li').eq(0).addClass('active');
    $(window).scroll(function(){
        if($(window).scrollTop() >= 150){
            $('.swiper-container-ul').css('position','fixed');
            $('.left').css('position','fixed');
            $('.right').css('margin-left',$('.left').width());
        }else {
            $('.swiper-container-ul').css('position','');
            $('.left').css('position','');
            $('.right').css('margin-left','');
        };
        //滚动到标杆位置,左侧导航加active
        $('.right ul li').each(function(){
            var target = parseInt($(this).offset().top-$(window).scrollTop()-150);
            var i = $(this).index();
            if (target<=0) {
                $('.left ul li').removeClass('active');
                $('.left ul li').eq(i).addClass('active');
            }
        });
    });
    export default {
        name: "product",
        data(){
            return {
                addproduct:[],
                productList:[]
            }

        },
        methods:{
            getaddproduct(){
                axios.get("/getaddproduct")
                    .then(({data})=>{
                        this.addproduct=data.addproduct
                })
            },
            getaddproductList(id){
                console.log(212121,this.$route.query.id)
                axios.get("/getaddproductList",{
                    params : {
                        id:this.$route.query.id
                    }
                    })

                    .then(({data})=>{
                        console.log(data.productList)
                        this.productList=data.productList
                })
            },
            fn(){
                $('.left ul li').click(function(){
                    var i = $(this).index('.left ul li');
                    $('body, html').animate({scrollTop:$('.right ul li').eq(i).offset().top-40},500);
                });
                $('.swiper-container-ul-li').click(function(){
                    var index = $(this).index();
                    if(index == 0){
                        $('.swiper-slide').eq(0).show();
                        $('.swiper-container-ul-li').eq(0).addClass('actives');
                        $('.swiper-slide').eq(1).hide();
                        $('.swiper-container-ul-li').eq(1).removeClass('actives');
                    }else {
                        $('.swiper-slide').eq(0).hide();
                        $('.swiper-container-ul-li').eq(0).removeClass('actives');
                        $('.swiper-slide').eq(1).show();
                        $('.swiper-container-ul-li').eq(1).addClass('actives');
                    }
                });
            }
        },
        mounted(){
            this.fn()
            this.getaddproduct()
            this.getaddproductList()
        }
    }


</script>

<style scoped>
    .imgtop{
        height: 100%;
        background: url("../../img/c75a72f674052473fb35b5c8ab1d7jpeg.jpeg") no-repeat center;
    }
    .top-t{
        height: 0.5rem;
        line-height: 0.5rem;
        font-size: 0.5rem;
        color: #fff;
        margin-left: 0.1rem;
    }
    *{
        padding: 0;
        margin: 0;
        font-size: 0.3rem;
    }
    .header{
        width: 100%;
        height: 150px;
        background: #555;
    }
    .swiper-container-ul{
        list-style: none;
        overflow: hidden;
        width: 100%;
        background: #fff;
        top: 0;
    }
    .swiper-container-ul-li{
        width: 50%;
        height: 40px;
        line-height: 40px;
        float: left;
        text-align: center;
    }
    .actives{
        border-bottom: 1px solid #3190e8;
        color: #3190e8;
    }
    .content{
        width: 100%;
        overflow: hidden;
    }
    .left{
        top: 41px;
        float: left;
        width: 25%;
        height: 100%;
        background: #eee;
    }
    .left ul{
        list-style: none;
    }
    .left ul li{
        padding: 15px 5px;
        text-align: center;
    }
    .active{
        background: #fff;
        border-left: 2px solid #3190e8;
    }
    .right{
        float: left;
        width: 75%;
        height: 100%;
    }
    .right ul{
        list-style: none;
    }
    .class-title{
        padding: 7px 10px;
        background: #eee;
    }
    .item{
        overflow: hidden;
        width: 100%;
        padding: 10px;
        background: #fff;
        border-bottom: 1px solid #eee;
    }
    .item-left{
        float: left;
    }
    .item-right{
        float: left;
        padding: 0 10px;
    }
    .item-img{
        width: 100px;
        height: 100px;
        background: #eee;
    }
    .title{
        width: 100px;
        height: 20px;
        margin-top: 10px;
        background: #eee;
    }
    .subtitle{
        width: 70px;
        height: 20px;
        margin-top: 10px;
        background: #eee;
    }
    .price{
        width: 50px;
        height: 20px;
        margin-top: 10px;
        background: #eee;
    }
</style>
