
let userApi = {
  '/web/user/listUserSalesArea': {"code":200,"message":"操作成功","data":{"salesAreaList":[{"id":1,"name":"上海","createId":"华东-卖家运营-卖家运营a组-吴格格","updateId":"华东-卖家运营-卖家运营a组-吴格格","createTime":1497961544000,"updateTime":1530692010000,"validity":1},{"id":2,"name":"柯桥","createId":"华东-卖家运营-卖家运营a组-吴格格","updateId":"华东-卖家运营-卖家运营a组-吴格格","createTime":1497961557000,"updateTime":1530757059000,"validity":1},{"id":3,"name":"深圳","createId":"华东-卖家运营-卖家运营a组-吴格格","updateId":"华东-卖家运营-卖家运营a组-吴格格","createTime":1497961580000,"updateTime":1530757019000,"validity":1},{"id":4,"name":"湖州","createId":"华东-卖家运营-卖家运营a组-吴格格","updateId":"华东-卖家运营-卖家运营a组-吴格格","createTime":1497961585000,"updateTime":1530692013000,"validity":1},{"id":5,"name":"绍兴","createId":"华东-卖家运营-卖家运营a组-吴格格","updateId":"华东-卖家运营-卖家运营a组-吴格格","createTime":1497961589000,"updateTime":1530757061000,"validity":1},{"id":6,"name":"驻马店","createId":"华东-卖家运营-卖家运营a组-吴格格","updateId":"华东-卖家运营-卖家运营a组-吴格格","createTime":1497961593000,"updateTime":1530692017000,"validity":1},{"id":7,"name":"郑州","createId":"华东-卖家运营-卖家运营a组-吴格格","updateId":"华东-卖家运营-卖家运营a组-吴格格","createTime":1497961597000,"updateTime":1530692019000,"validity":1},{"id":8,"name":"石家庄","createId":"华东-卖家运营-卖家运营a组-吴格格","updateId":"华东-卖家运营-卖家运营a组-吴格格","createTime":1497961602000,"updateTime":1530692021000,"validity":1},{"id":9,"name":"武汉","createId":"华东-卖家运营-卖家运营a组-吴格格","updateId":"华东-卖家运营-卖家运营a组-吴格格","createTime":1497961607000,"updateTime":1530692022000,"validity":1},{"id":10,"name":"广州","createId":"sys","updateId":"sys","createTime":1526537978000,"updateTime":1530757013000,"validity":1},{"id":11,"name":"虎门","createId":"sys","updateId":"sys","createTime":1526537982000,"updateTime":1531728406000,"validity":1},{"id":12,"name":"杭州","createId":"sys","updateId":"sys","createTime":1526537988000,"updateTime":1530692031000,"validity":1},{"id":13,"name":"佛山","createId":"sys","updateId":"sys","createTime":1526537993000,"updateTime":1530692033000,"validity":1},{"id":14,"name":"常熟","createId":"sys","updateId":"sys","createTime":1526537995000,"updateTime":1531728415000,"validity":1}]},"success":true},
  '/web/user/myPermission':
    {
      "code": 200,
      "message": "操作成功",
      "data": ["APP.SAMPLE.WAREHOUSE.ADD","WEB.TRADE-MGMT.FOLLOWUP"],
      "success": true
    },
  '/web/user/current-user-info':
    {
      "code": 200,
      "message": "操作成功",
      "data": {"userInfo":{
        "avatar": "12324554", "realName": "鲍鱼立"
        }},
      "success": true
    }
}

module.exports = userApi
