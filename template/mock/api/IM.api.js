
let contetn = {
  "bizType":1,//1-询价单,2-码单,3-订单
  "bizId":11111,//业务id，如：询价单id
  "subBizType":1,//业务下的子类型，im服务端发送的复杂消息时用于数据格式一样时候的布局区分,websocket时用于推送某业务的消息,参见sub_biz_type表
  "messageType":"",//
  "message":{
      "text":"啦啦啦",//文本消息
      "imageUrl":"",
      "title":"",
      "fieldValues":{"key":"value"},
      "names":[],
      "rowRecords":[],
      "actions":[
          {
              "name":"",
              "type":1,//1,alter,2,直接跳转
              "link":"",
              "choices":[
                  {
                      "name":"",
                      "link":""
                  }
              ]
          }
      ]
    },
  }

  let contetn1 = {
    "bizType":1,//1-询价单,2-码单,3-订单
    "bizId":11111,//业务id，如：询价单id
    "subBizType":1,//业务下的子类型，im服务端发送的复杂消息时用于数据格式一样时候的布局区分,websocket时用于推送某业务的消息,参见sub_biz_type表
    "messageType":"TEXT",//
    "message":{
        "text":"啦啦啦",//文本消息
      },
    }

    let contetn2 = {
      "bizType":1,//1-询价单,2-码单,3-订单
      "bizId":11111,//业务id，如：询价单id
      "subBizType":1,//业务下的子类型，im服务端发送的复杂消息时用于数据格式一样时候的布局区分,websocket时用于推送某业务的消息,参见sub_biz_type表
      "messageType":"TABLE",//
      "message":{
        "title":"title",
        "fieldValues":{"key":"value"},
        "names":["1,","2","3"],
        "rowRecords":[
          ["v1","v2","v3"],
          ["v2","v3","v3"]
        ],
        "rowActions":[[
            {
                "name":"",
                "type":1,//1,alter,2,直接跳转
                "link":"",
                "choices":[
                    {
                        "name":"",
                        "link":""
                    }
                ]
            }
        ]],
        },
      }

      let contetn3 = {
        "bizType":1,//1-询价单,2-码单,3-订单
        "bizId":11111,//业务id，如：询价单id
        "subBizType":1,//业务下的子类型，im服务端发送的复杂消息时用于数据格式一样时候的布局区分,websocket时用于推送某业务的消息,参见sub_biz_type表
        "messageType":"LINK",//
        "message":{
            "text": '213',
            "actions":[
              {
                  "name":"",
                  "type":1,//1,alter,2,直接跳转
                  "link":"",
                  "choices":[
                      {
                          "name":"",
                          "link":""
                      }
                  ]
              }
          ]
          },
        }


let IMApi = {
  '/im/message/getBizHistoryMessage': {
    "code":200,
    "data":{
      "pageData":{
        "pageId":1,
        "pageSize":100,
        "totalCount":1000,
        "hasMore":true,
        "list":[
          {
            "content": JSON.stringify(contetn1),
            "extra": {"ack":1},
            "fromUserId":"3",//发送者员工号
            "targetId":"e1",//接收人员工号列表
            "unread":0,
            "messageLocation":1,
            "sendType":0,//0-客户端自发，1-服务端消息
            "messageOuterid":"1",
            "messageTimestamp":1535459310926,//当前消息时间戳
          },
          {
            "content": JSON.stringify(contetn2),
            "extra": {"ack":1},
            "fromUserId":"4",//发送者员工号
            "targetId":"e1",//接收人员工号列表
            "unread":0,
            "messageLocation":0,
            "sendType":0,//0-客户端自发，1-服务端消息
            "messageOuterid":"2",
            "messageTimestamp":1535459310926,//当前消息时间戳
          },
          {
            "content": JSON.stringify(contetn3),
            "extra": {"ack":1},
            "fromUserId":"4",//发送者员工号
            "targetId":"e1",//接收人员工号列表
            "unread":0,
            "messageLocation":0,
            "sendType":0,//0-客户端自发，1-服务端消息
            "messageOuterid":"3",
            "messageTimestamp":1535459310926,//当前消息时间戳
          },
          {
            "content": JSON.stringify(contetn1),
            "extra": {"ack":1},
            "fromUserId":"3",//发送者员工号
            "targetId":"e1",//接收人员工号列表
            "unread":0,
            "messageLocation":1,
            "sendType":0,//0-客户端自发，1-服务端消息
            "messageOuterid":"4",
            "messageTimestamp":1535459310926,//当前消息时间戳
          },
          {
            "content": JSON.stringify(contetn1),
            "extra": {"ack":1},
            "fromUserId":"3",//发送者员工号
            "targetId":"e1",//接收人员工号列表
            "unread":0,
            "messageLocation":1,
            "sendType":0,//0-客户端自发，1-服务端消息
            "messageOuterid":"5",
            "messageTimestamp":1535459310926,//当前消息时间戳
          },
          {
            "content": JSON.stringify(contetn1),
            "extra": {"ack":1},
            "fromUserId":"4",//发送者员工号
            "targetId":"e1",//接收人员工号列表
            "unread":0,
            "messageLocation":0,
            "sendType":0,//0-客户端自发，1-服务端消息
            "messageOuterid":"6",
            "messageTimestamp":1535459310926,//当前消息时间戳
          },
          {
            "content": JSON.stringify(contetn2),
            "extra": {"ack":1},
            "fromUserId":"4",//发送者员工号
            "targetId":"e1",//接收人员工号列表
            "unread":0,
            "messageLocation":0,
            "sendType":0,//0-客户端自发，1-服务端消息
            "messageOuterid":"7",
            "messageTimestamp":1535459310926,//当前消息时间戳
          },
          {
            "content": JSON.stringify(contetn1),
            "extra": {"ack":1},
            "fromUserId":"3",//发送者员工号
            "targetId":"e1",//接收人员工号列表
            "unread":0,
            "messageLocation":1,
            "sendType":0,//0-客户端自发，1-服务端消息
            "messageOuterid":"8",
            "messageTimestamp":1535459310926,//当前消息时间戳
          },
          {
            "content": JSON.stringify(contetn3),
            "extra": {"ack":1},
            "fromUserId":"3",//发送者员工号
            "targetId":"e1",//接收人员工号列表
            "unread":0,
            "messageLocation":1,
            "sendType":0,//0-客户端自发，1-服务端消息
            "messageOuterid":"9",
            "messageTimestamp":1535459310926,//当前消息时间戳
          },
          {
            "content": JSON.stringify(contetn2),
            "extra": {"ack":1},
            "fromUserId":"3",//发送者员工号
            "targetId":"e1",//接收人员工号列表
            "unread":0,
            "messageLocation":1,
            "sendType":0,//0-客户端自发，1-服务端消息
            "messageOuterid":"a",
            "messageTimestamp":1535459310926,//当前消息时间戳
          }
        ]
      }
    }
  },
  '/im/user/getToken': {
    "code":200,
    "data":{
      "userInfo":{
        // "token":"623LPoD8haSZYWLGJHyEsAT8+hAtExk+ZvYwK5x84SpwB3vX0U3gNVe3/IdKqoGsnREkxpZacqUEecCBn0rkPQ==", // id 3 的token
        // "token":"q4D3jrDx0/QSESyc1EtX5QT8+hAtExk+ZvYwK5x84SpwB3vX0U3gNVwgifQJmGUvCZvxnCuQLqcEecCBn0rkPQ==", // id 4 的token
        "token": 'i9f1XP6Fo/HDA5mVuxqocOftwNxZjEc80nt3vMUK3Xgp8Jy9khmrrsonDW1xoxvxKbHr04PRV/e6UOjWYiaD1cIn6E9NgGls',
        // "appkey": "kj7swf8o7vuv2",
        "appkey": "tdrvipkstmfg5",
        "name":"张三",
        "avatar":"头像"
      }
    }
  },
  '/im/user/getBizUserInfo': {
    "code":200,
    "data":{
      "userInfo":[{
        "userId":"3",
        "name":"张三",
        "avatar":"https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=2612104513,3026521417&fm=173&app=25&f=JPEG?w=218&h=146&s=6DF20DC54A1349DE0E343C3B03005012"
      },{
        "userId":"4",
        "name":"李四",
        "avatar":"https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=2612104513,3026521417&fm=173&app=25&f=JPEG?w=218&h=146&s=6DF20DC54A1349DE0E343C3B03005012"
      }],
      "canChat": true, // 本人能否聊天
      "targetUserId": "why2", // 聊天对象userId
    }
  },
}

module.exports = IMApi
