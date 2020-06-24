// pages/addCourse/addCourse.js
let app = getApp();
let api = require("../../api.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showIndex: 0,
    maskData:[
      {
        title:'标题',
        child:[
          {
            courseName:'我是抽屉3'
          },
          {
            courseName:'我是抽屉1'
          },
          {
            courseName:'我是抽屉2'
          },
        ]
      },
      {
        title:'标题',
        child:[
          {
            courseName:'我是抽屉3'
          },
          {
            courseName:'我是抽屉1'
          },
          {
            courseName:'我是抽屉2'
          },
        ]
      },
      {
        title:'标题',
        child:[
          {
            courseName:'我是抽屉3'
          },
          {
            courseName:'我是抽屉1'
          },
          {
            courseName:'我是抽屉2'
          },
        ]
      }
    ]
  },
  gobefor(e){
    console.log(e.currentTarget.dataset.index)
    let pages = getCurrentPages(); // 当前页面
    let beforePage = pages[pages.length - 2]; 
    let number = e.currentTarget.dataset.index// 前一个页面
    // console.log("beforePage");
    // console.log(beforePage);
    wx.navigateBack({
      success: function () {
        beforePage.gettopINfor(number); 
      }
    });
  },
  insertCourse(e){
    let that = this
    wx.showLoading({
      title: '加载中',
      mask: true
    })
   let courseId = e.currentTarget.dataset.courseid
   let option = {
    courseId:courseId
   }
   console.log(option)
   app.encryption({
    url: api.default.insertCourse,
    data:option,
    method: "POST",
    success: function (res) {
      console.log(res)
      wx.showToast({
        title: '添加成功',//提示文字
        duration: 1000,//显示时长
        mask: false,//是否显示透明蒙层，防止触摸穿透，默认：false  
        icon: 'none', //图标，支持"success"、"loading"  
        success: function () { },//接口调用成功
        fail: function () { },  //接口调用失败的回调函数  
        complete: function () { } //接口调用结束的回调函数  
      })
      that.getCourse()//获取所有分类
    },
    fail: function (t) {

    },
    complete: function () {
      wx.hideLoading();  
    } 
  })
  },

  cancel(e){
    let that = this
    wx.showLoading({
      title: '加载中',
      mask: true
    })
   let courseId = e.currentTarget.dataset.courseid
   let option = {
    courseId:courseId
   }
   console.log(option)
   app.encryption({
    url: api.default.removeCourse,
    data:option,
    method: "POST",
    success: function (res) {
      console.log(res)
      wx.showToast({
        title: '移除成功',//提示文字
        duration: 1000,//显示时长
        mask: false,//是否显示透明蒙层，防止触摸穿透，默认：false  
        icon: 'none', //图标，支持"success"、"loading"  
        success: function () { },//接口调用成功
        fail: function () { },  //接口调用失败的回调函数  
        complete: function () { } //接口调用结束的回调函数  
      })
      that.getCourse()//获取所有分类
    },
    fail: function (t) {
    },
    complete: function () {
      wx.hideLoading();  
    } 
  })
  },
  getCourse(){
    let that = this
    app.encryption({
      url: api.default.getCourse,
      method: "GET",
      success: function (res) {
        console.log(res)
        that.setData({
          maskData:res
        })
      },
      fail: function (t) {

      },
      complete: function () {
      
      }
    })
  },

  panel: function (e) {
    if (e.currentTarget.dataset.index != this.data.showIndex) {
      this.setData({
        showIndex: e.currentTarget.dataset.index
      })
    } else {
      this.setData({
        showIndex: 0
      })
    }
    console.log(this.data.showIndex,e.currentTarget.dataset.index)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCourse()//获取所有分类
    this.setData({
      navH: app.globalData.navHeight,
    })
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