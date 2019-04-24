const express = require("express");
const bodyParser = require("body-parser")
const jwt = require("./modules/jwt")
const db=require("./modules/db");
const mongodb = require("mongodb")
const app=express()
app.use(bodyParser.json())
app.use(express.static("./upload"))
app.all("*",function (req, res, next) {
    res.header("Access-Control-Allow-Origin","*")
    res.header("Access-Control-Allow-Methods","DELETE")
    res.header("Access-Control_Allow-Headers","content-type,authorization")
    next();
})


//获得店铺
app.get("/getshopList",function (req, res) {
    db.find("shopList",{},function (err, shopList) {
        var arr=shopList
        var shopTypeList=[];
        var num=Math.ceil(arr.length/10);
        for (var i=0;i<num;i++){
            shopTypeList[i]=[]
            for (var j=i*10;j<i*10+10 && j<arr.length;j++){
                shopTypeList[i].push(arr[j])
            }
        }
        res.json({
            ok:1,
            shopTypeList
        })
    })
})

//获取店铺
app.get("/getproductList",function (req,res) {
    db.find("shopList",{},function (err, product) {
        var pageIndex = req.query.pageIndex/1;
        var pageNum = 10;
        var skipNum = (pageIndex-1)*pageNum;
        var productList=[];
        for (var i=skipNum;i<skipNum+pageNum;i++){
            productList.push(product[i])
        }
        setTimeout(()=>{
            res.json({
            ok:1,
            productList,
            sop:productList===skipNum?false:true
        })
    },2000)
    })

})

app.get("/getaddproduct",function(req,res) {
    db.find("addproduct",{},function (err, addproduct) {
        res.json({
            ok:1,
            addproduct
        })
    })
})
app.get("/getaddproductList",function (req, res) {
    var whereObj={
        shopTypeId:mongodb.ObjectID(req.query.id)
    }
    console.log(whereObj);
    db.getaddShopList(whereObj,function (err, productList) {
        console.log(productList)
        res.json({
            ok:1,
            productList
        })
    })
})












app.get("/token",function (req, res) {
    console.log(req.headers.authorization)
    var info=jwt.decode(req.headers.authorization);
    console.log(info);
    res.end()
})
app.get("/login",function (req, res) {
    var token = jwt.encode({
        phoneId:"161616"
    })
    console.log(token)
    res.json({
        ok:1,
        token
    })
})

app.get("/getShopType",function (req, res) {
    // var arr=[[1,2,3,4,5,6,7,8,9,10],[11,12]];
    var arr=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];

    var shopTypeList=[];
    var num=Math.ceil(arr.length/10);
    for (var i=0;i<num;i++){
        shopTypeList[i]=[]
        for (var j=i*10;j<i*10+10 && j<arr.length;j++){
            shopTypeList[i].push(arr[j])
        }
    }
    res.json({
        ok:1,
        shopTypeList
    })
})



app.listen(8081,function () {
    console.log("success")
})