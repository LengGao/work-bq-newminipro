// pages/collectionAll/collectionAll.js
let app = getApp();
let api = require("../../api.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    topSelect:[
      {
        name:'全部订单',
        id:'2'
      },
      {
        name:'已付款',
        id:'1'
      },
      {
        name:'待付款',
        id:'0'
      }
    ],
    collectionList:[
      {
        "orderId": 4866,
        "orderNo": "B-5690200224-110032",
        "amount": "7980.00",
        "payTime": 0,
        "CourseName": "系统规划与管理师（高级职称）",
        "picture": "http://oss.beiqujy.com/dda0cf4ba3418fbf24456385d3efd850b387ed9a.jpeg"
      },
      {
        "orderId": 4915,
        "orderNo": "B-8953200224-172851",
        "amount": "0.00",
        "payTime": 0,
        "CourseName": "系统集成直播公开课（观看直播请联系老师）",
        "picture": "http://oss.beiqujy.com/f6f316cd0ed95208498b87db68d6ede101555eb0.jpeg"
      },
      {
        "orderId": 5044,
        "orderNo": "B-3971200314-151535",
        "amount": "7980.00",
        "payTime": 1583825968,
        "CourseName": "信息系统项目管理师（高级职称）",
        "picture": "http://oss.beiqujy.com/67225ecdc11e774929aa5955e38facb5eca306f1.jpeg"
      }
    ],
    nodata:true,
    errornodata:true,
    waitnodata:true,
    tabArr: {
      curHdIndex: 2,
      curBdIndex: 2
    },
    chapter:[
      {
        charper:'2020年3月19日',
        list:[
          {
          name:'第一章信息化知识',
          rate:'27%',
          time:'10分5秒'
        }
      ]
      },
      {
        charper:'2020年3月20日',
        list:[{
          name:'第一章信息化知识',
          rate:'27%',
          time:'10分5秒'
        }]
      },
      {
        charper:'2020年3月21日',
        list:[{
          name:'第一章信息化知识',
          rate:'27%',
          time:'10分5秒'
        }]
      }
    ],
    catalist:[
      {
        charper:'第一章',
        name:'信息化知识',
        num:'5'
      },
      {
        charper:'第二章',
        name:'信息化知识',
        num:'15'
      },
      {
        charper:'第三章',
        name:'信息化知识',
        num:'25'
      }
    ],
    defaultImg: 'https://minproimg.oss-cn-hangzhou.aliyuncs.com/images/avatar-def%402x.png',
    havepay:null,
    waitpay:null
  },
  tabFun: function (t) {
    var e = t.target.dataset.id;
    console.log("----" + e + "----");
    var tab = {};
    tab.curHdIndex = e, tab.curBdIndex = e,
    this.setData({
      tabArr: tab
    });
  },
  getCollection(){
    console.log(Date.parse(new Date()))
    let that = this
    let option = {
      state:0,
      page:1
    }
    console.log(option)
    app.encryption({
      url: api.default.getOrderList,
      method: "GET",
      data: option,
      success: function (res) {
        console.log(res)
        if( res.data != undefined && res.data.code == 30000){
          that.setData({
            nodata:false
          })
        }else{
          that.setData({
            collectionList:res
          })
         
        }
      },
      fail: function (t) {
      },
      complete: function () {

      }
    })
  },
  getErrorTopicFeedbac(){
    let that = this
    let option = {
      state:1,//已付款
      page:1
    }
    console.log(option)
    app.encryption({
      url: api.default.getOrderList,
      method: "GET",
      data: option,
      success: function (res) {
        console.log(res)
        if( res.data != undefined && res.data.code == 30000){
          that.setData({
            errornodata:false
          })
        }else{
          that.setData({
            havepay:res
          })
        }
      },
      fail: function (t) {
      },
      complete: function () {
      }
    })
  },
  waitForpay(){
   
    let that = this
    let option = {
      state:2,//待付款
      page:1
    }
    console.log(option)
    app.encryption({
      url: api.default.getOrderList,
      method: "GET",
      data: option,
      success: function (res) {
        console.log(res)
        if( res.data != undefined && res.data.code == 30000){
          that.setData({
            waitnodata:false
          })
        }else{
          that.setData({
            waitpay:res
          })
        }
      },
      fail: function (t) {
      },
      complete: function () {
      }
    })
  },
  errorFunction(e) {
    if (e.type == "error") {
      let imgList = this.data.collectionList
      imgList['teacherImg'] = this.data.defaultImg //错误图片替换为默认图片
      this.setData({
        collectionList: imgList
      })
    }

  },
  cancleData(e){
    wx.showLoading({
      title: '正在取消该订单',
      mask: true
    })
    console.log(e.currentTarget.dataset.id)
    let that = this
    let option = {
      orderId:e.currentTarget.dataset.id
    }
    console.log(option)
    app.encryption({
      url: api.default.closeOrder,
      method: "post",
      data: option,
      success: function (res) {
        console.log(res)
        if(res.data.code==200){
           wx.showToast({
              title: '已取消该订单',//提示文字
              duration: 1000,//显示时长
              mask: false,//是否显示透明蒙层，防止触摸穿透，默认：false  
              icon: 'none', //图标，支持"success"、"loading"  
              success: function () {
                wx.hideLoading();  
                that.getCollection()
                that.waitForpay()
               },//接口调用成功
              fail: function () { },  //接口调用失败的回调函数  
              complete: function () { } //接口调用结束的回调函数  
            })
        }else{
          wx.showToast({
            title: '无法取消该订单',//提示文字
            duration: 1000,//显示时长
            mask: false,//是否显示透明蒙层，防止触摸穿透，默认：false  
            icon: 'none', //图标，支持"success"、"loading"  
            success: function () { },//接口调用成功
            fail: function () { },  //接口调用失败的回调函数  
            complete: function () { } //接口调用结束的回调函数  
          })
        }
        // if( res.data != undefined && res.data.code == 30000){
        //   that.setData({
        //     waitnodata:false
        //   })
        // }else{
        //   that.setData({
        //     waitpay:res
        //   })
        // }
      },
      fail: function (t) {
      },
      complete: function () {
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      courseId:options.courseId
    })
   this.getCollection(),
   this.getErrorTopicFeedbac(),
   this.waitForpay()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})