export default {
    getHomeData: () => {
        return {
            code:200,
            data: [
                {
                    name: "oppo",
                    todayBuy: 1200,
                    monthBuy: 4500,
                    totalBuy: 65000
                },
                {
                    name: "小米",
                    todayBuy: 1200,
                    monthBuy: 6500,
                    totalBuy: 45000,
                },
                {
                    name: "三星",
                    todayBuy: 300,
                    monthBuy: 2000,
                    totalBuy: 34000,
                },
                {
                    name: '魅族',
                    todayBuy: 350,
                    monthBuy: 3000,
                    totalBuy: 22000,
                }
            ]
        }
    },
    getCountData: () => {
        return {
            code:200,
            data: [
               {
                   name: "今日支付订单",
                   value: 1234,
                   icon:"Check",
                   color:"#2ec7c9",
               },
               {
                   name: "今日支付订单",
                   value: 1234,
                   icon:"StarFilled",
                   color:"#2ec7c9",
               },
               {
                   name: "今日支付订单",
                   value: 1234,
                   icon:"Handbag",
                   color:"#2ec7c9",
               },
           ]
       }
   },
    getChartData: () => {
        return {
            'code': 200,
            'data': {
                'orderData': {
                    "date": ["20231021","20231022","20231023","20231024","20231025","20231026","20231027"],
                    "data": [{  
                        "苹果": 4628,
                        "一加": 1837,
                        "oppo": 4893,
                        "华为": 3298,
                        "小米": 2379,
                        "魅族": 2901,
                      },{  
                        "苹果": 2039,
                        "一加": 5342,
                        "oppo": 2341,
                        "华为": 4983,
                        "小米": 4313,
                        "魅族": 1345,
                      },
                      {  
                        "苹果": 6342,
                        "一加": 4321,
                        "oppo": 6532,
                        "华为": 4398,
                        "小米": 2034,
                        "魅族": 3849,
                      },
                      {  
                        "苹果": 2314,
                        "一加": 5436,
                        "oppo": 1356,
                        "华为": 4523,
                        "小米": 4313,
                        "魅族": 3241,
                      },{  
                        "苹果": 4315,
                        "一加": 3243,
                        "oppo": 3214,
                        "华为": 4313,
                        "小米": 3214,
                        "魅族": 2314,
                      },
                      {  
                        "苹果": 4637,
                        "一加": 7234,
                        "oppo": 4732,
                        "华为": 1397,
                        "小米": 5489,
                        "魅族": 2384,
                      },
                      {  
                        "苹果": 1238,
                        "一加": 1952,
                        "oppo": 5343,
                        "华为": 3231,
                        "小米": 3274,
                        "魅族": 7438,
                      }
                    ],
                },
                'videoData': [
                    {
                        "name":"小米",
                        "value":1500
                    },
                    {
                        "name":"三星",
                        "value":2300
                    },
                    {
                        "name":"华为",
                        "value":3419
                    },
                    {
                        "name":"oppo",
                        "value":1290
                    },
                    {
                        "name":"苹果",
                        "value":5600
                    },
                    {
                        "name":"三星",
                        "value":4720
                    },
                ],
                'userData': [
                    {
                        "date":'周一',
                        "new": 5,
                        "active": 5,
                    },
                    {
                        "date":'周二',
                        "new": 7,
                        "active": 10,
                    },
                    {
                        "date":'周三',
                        "new": 13,
                        "active": 18,
                    },
                    {
                        "date":'周四',
                        "new": 16,
                        "active": 23,
                    },
                    {
                       "date":'周五',
                       "new": 21,
                       "active": 30,
                    },
                    {
                        "date":'周六',
                        "new": 30,
                        "active": 41,
                    },
                    {
                        "date":'周日',
                        "new": 32,
                        "active": 47,
                    },
                ]
            }
        }
    }
}