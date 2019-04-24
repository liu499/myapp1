const db=require("../modules/db");
const {upPic} =require("../modules/upPic")
const mongodb = require("mongodb")

//添加店铺类别
module.exports.addShopType=function(req,res){
	upPic(req,"shopTypePic",function(obj){
		if(obj.ok===1){
			db.insertOne("shopTypeList",{
				shopTypeName:obj.params.shopTypeName,//图片偏名字
                shopTypePic:obj.newPicName,//图片
                addTime:Date.now()//时间
			},function(){
				res.json({
					ok:1,
					msg:"上传成功"
				})
			})
		}else{
			res.json({
				ok:2,
				msg:obj.msg
			})
		}
		
	})
}

//渲染页面
module.exports.getShopType=function(req,res){
    var pageIndex=req.query.pageIndex;//当前页
    var pageSum=1;//默认总页数
    var pageNum=3//每页显示5条
    db.count("shopList",{},function (count) {
        var pageSum = Math.ceil(count/pageNum)//总页数
        if(pageSum<0){
            pageSum=1;
        }
        if (pageIndex > pageSum) {
            pageIndex = pageSum
        }
        db.find("shopTypeList",{
            sortObj:{
                addTime:-1
            },
            skipNum : (pageIndex-1)*pageNum,
            limitNum : pageNum
        },function(err,shopTypeList){
            res.json({
                ok:1,
                shopTypeList,
                pageSum,
                pageIndex
            })
        })

        // db.getShopList((pageIndex-1)*pageNum,pageNum,function(err,shopTypeList){
        //     // setTimeout(()=>{//延迟属性
			// console.log(shopTypeList)
        //     res.json({
        //         ok:1,
        //         shopTypeList,
        //         pageSum,
        //         pageIndex
        //         // Enum:myEnum.adminLogEnum
        //     })
        //     // },500)
        // })
	})
}

//添加店铺
module.exports.addShop=function(req,res){
	upPic(req,"shopPic",function(obj){
		if(obj.ok===1){
			db.insertOne("shopList",{
				shopName:obj.params.shopName,//店铺名称
                shopPic:obj.newPicName,//店铺图片
                shopTypeId:mongodb.ObjectID(obj.params.shopTypeId),//店铺类别ID
                addTime:Date.now()
			},function(){
				res.json({
					ok:1,
					msg:"上传成功"
				})
			})
		}else{
			res.json({
				ok:2,
				msg:obj.msg
			})
		}
		
	})
}
module.exports.getShopList=function(req,res){//查找
	var shopName = req.query.shopName;
	var whereObj = {//搜索条件
		shopName:new RegExp(shopName)
	}
    var pageIndex = req.query.pageIndex/1;//当前页
    var pageSum=1;//默认总页数
    var pageNum=4;//每页显示2条
    db.count("shopList",{},function(count) {// count根据条件求总文档数
        var pageSum = Math.ceil(count / pageNum)//总页数
        if (pageSum < 1) {
            pageSum = 1;
        }
        if (pageIndex > pageSum) {
            pageIndex = pageSum
        }
        if(pageIndex < 1)
            pageIndex = 1;
        var skipNum = (pageIndex-1)*pageNum //跳过几条
        db.getShopList(whereObj,skipNum,pageNum, function (err, shopList) {
            res.json({
                ok: 1,
                shopList,
                pageIndex,
                pageSum
            })
        })
    })
}

//根据id 获得对应信息
module.exports.getShopInfoById=function(req,res){
    db.findOneById("shopList",req.query.shopId,function(err,shopInfo){
        res.json({
            ok:1,
            shopInfo
        })
    })
}

//店铺管理修改 编辑
module.exports.upShop=function (req,res) {
	upPic(req,"shopPic",function (obj) {
		if (obj.ok===2){//有问题
            res.json({
                ok:2,
                msg:obj.msg
            })
		}else {
			var upObj={//要修改的对象
				$set:{
                    shopName:obj.params.shopName,
                    shopTypeId:mongodb.ObjectID(obj.params.shopTypeId),
				}
			}
			if(obj.newPicName){//上传了图片
				upObj.$set.shopPic=obj.newPicName
			}
			db.updateOneById("shopList",obj.params.shopId,upObj,function (err,results) {
				res.json({
					ok:1,
					msg:"修改成功"
				})
            })
		}

    })
}

//删除 店铺管理
module.exports.deleteShop=function (req, res) {
	db.deleteOneById("shopList",req.query.id,function (err) {
        res.json({
            ok:1,
            msg:"删除成功"
        })
    })
}

//删除店铺类别
module.exports.deleteShopType=function (req, res) {
    db.deleteOneById("shopTypeList",req.query.id,function (err) {
        res.json({
            ok:1,
            msg:"删除成功"
        })
    })
}


//添加商品类别
module.exports.addproduct=function (req,res) {
	upPic(req,"shopTypePic",function (obj) {
        if(obj.ok===1){
            db.insertOne("addproduct",{
                shopTypeName:obj.params.shopTypeName,//图片偏名字
                shopTypePic:obj.newPicName,//图片
                shopTypeId:mongodb.ObjectID(obj.params.shopTypeId),//店铺类别ID
                addTime:Date.now()//时间
            },function(){
                res.json({
                    ok:1,
                    msg:"上传成功"
                })
            })
        }else{
            res.json({
                ok:2,
                msg:obj.msg
            })
        }
    })
}

//获取商品类别
module.exports.getaddproduct=function (req,res) {
    var pageIndex=req.query.pageIndex;//当前页
    var pageSum=1;//默认总页数
    var pageNum=3//每页显示5条
    db.count("addproduct",{},function (count) {
        var pageSum = Math.ceil(count/pageNum)//总页数
        if(pageSum<0){
            pageSum=1;
        }
        if (pageIndex > pageSum) {
            pageIndex = pageSum
        }
        db.find("addproduct",{
            sortObj:{
                addTime:-1
            },
            skipNum : (pageIndex-1)*pageNum,
            limitNum : pageNum
        },function (err, addproduct) {
            res.json({
                ok:1,
                addproduct,
                pageSum,
                pageIndex
            })
        })
    })

}

//删除商品类别
module.exports.delproductType=function (req,res) {
    db.deleteOneById("addproduct",req.query.id,function (err) {
        res.json({
            ok:1,
            msg:"删除成功"
        })
    })
}


//添加商品
module.exports.addShopManage=function (req,res) {
    upPic(req,"shopPic",function (obj) {
        if(obj.ok===1){
            db.insertOne("productList",{
                shopName:obj.params.shopName,//商品名称
                shopPic:obj.newPicName,//商品图片
                shopTypeId:mongodb.ObjectID(obj.params.shopTypeId),//商品类别ID
                addTime:Date.now()
            },function(err){
                res.json({
                    ok:1,
                    msg:"上传成功"
                })
            })
        }else{
            res.json({
                ok:2,
                msg:obj.msg
            })
        }
    })
}
module.exports.getShopManageList=function (req, res) {
    var pageIndex = req.query.pageIndex/1;//当前页
    var pageSum=1;//默认总页数
    var pageNum=3;//每页显示2条
    db.count("productList",{},function(count) {// count根据条件求总文档数
        var pageSum = Math.ceil(count / pageNum)//总页数
        if (pageSum < 1) {
            pageSum = 1;
        }
        if (pageIndex > pageSum) {
            pageIndex = pageSum
        }
        if(pageIndex < 1)
            pageIndex = 1;
        var skipNum = (pageIndex-1)*pageNum //跳过几条
        db.getShopManageList(skipNum,pageNum,function(err,productList){
            res.json({
                ok:1,
                productList,
                pageIndex,
                pageSum
            })
        })
    })

}

//删除商品
module.exports.deleteproduct=function (req, res) {
    db.deleteOneById("productList",req.query.id,function (err) {
        res.json({
            ok:1,
            msg:"删除成功"
        })
    })
}


//根据id 获得对应信息
module.exports.getShopManageInfoById=function(req,res){
    var id = mongodb.ObjectID(req.query.shopId);
    db.findOneById("productList",id,function(err,shopInfo){
        res.json({
            ok:1,
            shopInfo
        })
    })
}
//商品修改 编辑
module.exports.upShopManage=function (req, res) {
    upPic(req,"shopPic",function (obj) {
        if (obj.ok===2){//有问题
            res.json({
                ok:2,
                msg:obj.msg
            })
        }else {
            var upObj={//要修改的对象
                $set:{
                    shopName:obj.params.shopName,
                    shopTypeId:mongodb.ObjectID(obj.params.shopTypeId),
                }
            }
            if(obj.newPicName){//上传了图片
                upObj.$set.shopPic=obj.newPicName
            }
            db.updateOneById("productList",obj.params.shopId,upObj,function (err,results) {
                res.json({
                    ok:1,
                    msg:"修改成功"
                })
            })
        }

    })
}

module.exports.getproduct=function (req, res) {
    db.find("shopList",{},function (err, shopList) {
        res.json({
            ok:1,
            shopList
        })
    })
}







