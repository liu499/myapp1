const express=require("express");
const bodyParser=require("body-parser");

const admin =require("./router/admin")
const shop =require("./router/shop")
const app=express();
app.use(express.static("./upload"))
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({
//     extended:false
// }))
// app.all("*",function(req,res,next){
//     res.header("Access-Control-Allow-Origin","*");
// 	res.header("Access-Control-Allow-Methods","DELETE")
//     // res.header("Access-Control-Allow-Methods","POST,OPTIONS");
//     res.header("Access-Control-Allow-Headers","content-type");
//     next();
// });

/*************************** 店铺相关 ***************************/
//添加店铺类别
app.post("/addShopType",shop.addShopType)

//渲染到页面  店铺类别
app.get("/shopType",shop.getShopType)

//添加店铺
app.post("/addShop",shop.addShop)

// 获得店铺列表
app.get("/getShopList",shop.getShopList);

// 根据 店铺ID获得店铺信息
app.get("/getShopInfoById",shop.getShopInfoById);
// 根据 店铺ID获得商品信息
app.get("/getShopManageInfoById",shop.getShopManageInfoById);

//店铺修改 编辑
app.put("/upShop",shop.upShop)
//商品修改 编辑
app.put("/upShopManage",shop.upShopManage)

//删除店铺管理
app.delete("/deleteShop",shop.deleteShop)

//删除店铺类别
app.delete("/deleteShopType",shop.deleteShopType)

//添加商品类别
app.post("/addproduct",shop.addproduct)

//获取商品类别
app.get("/getaddproduct",shop.getaddproduct)

//删除 商品类别
app.delete("/delproductType",shop.delproductType)

//添加商品
app.post("/addShopManage",shop.addShopManage)
app.get("/getproductList",shop.getShopManageList)

//删除商品
app.delete("/deleteproduct",shop.deleteproduct)

app.get("/getproduct",shop.getproduct)
/*************************** 管理员相关 ***************************/
//登录
app.post("/login",admin.login)

//获得管理员日志列表
app.get("/getAdminLogList",admin.getAdminLogList)

//删除管理员日志
app.delete("/adminLogList",admin.adminLogList)

//添加管理员
app.post("/adminList",admin.adminList)

//获得管理员
app.get("/getadminList",admin.getadminList)

//删除管理员
app.delete("/deleteadminLog",admin.deleteadminLog)

app.listen(80,function(){
    console.log("success");
})
