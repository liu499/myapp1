const db=require("../modules/db");
const common=require("../modules/common");
const myEnum=require("../modules/Enum")
const md5=require("md5");
const bodyParser = require("body-parser");


//删除管理员日志
module.exports.adminLogList=function(req,res){
	console.log(req.query)
	db.deleteOneById("adminLog",req.query.id,function(){
		res.json({
			ok:1,
			msg:"删除成功"
		})
	})
	
}
//删除管理员
module.exports.deleteadminLog=function(req,res){
    console.log(req.query)
    db.deleteOneById("adminList",req.query.id,function(){
        res.json({
            ok:1,
            msg:"删除成功"
        })
    })

}
//获得管理员日志列表
module.exports.getAdminLogList=function(req,res){
	var pageIndex = req.query.pageIndex/1;//当前页
	var pageSum=1;//默认总页数
	var pageNum=4;//每页显示2条
	db.count("adminLog",{},function(count){// count根据条件求总文档数
		var pageSum = Math.ceil(count/pageNum)//总页数
		if(pageSum<0){
			pageSum=1;
		}
		if (pageIndex > pageSum) {
			pageIndex = pageSum
		}
		db.getAdminLogList((pageIndex-1)*pageNum,pageNum,function(err,adminLogList){
			// setTimeout(()=>{//延迟属性
				res.json({
					ok:1,
					adminLogList,
					pageSum
					// Enum:myEnum.adminLogEnum
				})
			// },500)
		})
	})
	
}

//登录
module.exports.login=function(req,res){
	console.log(req.body)
	db.findOne("adminList",{
		adminName:req.body.adminName,
		passWord:md5(req.body.passWord+"@!Ele.Com")
	},function(err,adminInfo){
		if (adminInfo) {
			db.insertOne("adminLog",{
				adminId:adminInfo._id,
				logType:1,
				addTime:Date.now(),
				detail:adminInfo.adminName+ "于" + common.getNowTime()+ "登陆了"
			},function(err,results){
				res.json({
					ok:1,
					adminId:adminInfo._id,
					adminName:adminInfo.adminName,
					msg:"登录成功"
				})
			})
			
		} else{
			res.json({
				ok:2,
				msg:"用户名或密码错误"
			})
		}
	})
	
}

//添加管理员
module.exports.adminList=function (req, res) {
    console.log(req.body.adminName,req.body.passWord);
    db.insertOne("adminList",{
        adminName : req.body.adminName,
        passWord : md5(req.body.passWord+"@!Ele.Com")
    },function (err) {
        res.json({
            ok : 1,
            msg : "添加成功"
        })
    })
}

//获得管理员
module.exports.getadminList=function (req, res) {
	var pageIndex=req.query.pageIndex;//当前页
    var pageSum=1;//默认总页数
    var pageNum=3//每页显示5条
	db.count("adminList",{},function (count) {
        var pageSum = Math.ceil(count/pageNum)//总页数
        if(pageSum<0){
            pageSum=1;
        }
        if (pageIndex > pageSum) {
            pageIndex = pageSum
        }
        db.find("adminList",{
            skipNum : (pageIndex-1)*pageNum,
            limitNum : pageNum
		},function (err, adminList) {
            res.json({
                ok:1,
                adminList,
                pageSum,
                pageIndex
            })
        })
    })

}