import shopType from "@/components/shop/shopType"
import shopManage from "@/components/shop/shopManage"
import ProductTypeName from "@/components/shop/ProductTypeName"
import shopTypeManage from "@/components/shop/shopTypeManage"
export default [
	{
		path:"/shopType",
		component:shopType
	},
	{
		path:"/shopManage",
		component:shopManage
	},
    {
        path:"/ProductTypeName",
        component:ProductTypeName
    },
    {
        path:"/shopTypeManage",
        component:shopTypeManage
    }
]
