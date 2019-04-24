const jwt=require("jwt-simple");
/*生成令牌
* 验证令牌*/
// 生成令牌 ,第一个参数是你荷 载的内容,第二个参数是密钥 key
var key="@!#@$#@#%#$%1212"
const token=jwt.encode({
    phoneId:"121212",
    id:"121212",
    exp:Date.now()+10*60*1000
},key);
console.log(token);
// 验证,解析你的令牌
console.log(jwt.decode(token,key));