<template>
    <div>
        <div id="header">
            <div class="header_top">
                <p>北京市人民路...</p>
            </div>
            <div class="header_bottom">
                <a href="javascript:;">搜索饿了么商家、店铺名称</a>
            </div>
        </div>
        <ShopType></ShopType>
        <ShopList></ShopList>
    </div>
</template>

<script>
    import ShopType from "./ShopType"
    import ShopList from "./ShopList"
    export default {
        name: "index",
        components:{
            ShopType,
            ShopList
        },
        methods:{

        }
    }
</script>

<style scoped>
    #header{
        height: 1.93rem;
        background: #0085ff;
    }
    .header_top{
        height: 0.8rem;
        line-height: 0.9rem;
    }
    .header_top p{
        color: #fff;
        font-size: 0.34rem;
        font-weight: 900;
        margin-left: 0.3rem;
    }
    .header_bottom{
        height: 1.02rem;
        font-size: 0.37rem;
        padding: 0.2rem 0.373333rem;
    }
    .header_bottom a{
        display: block;
        background: #fff;
        height: 0.7rem;
        color: #999;
        text-align: center;
        line-height: 0.7rem;
    }
</style>
