// pages/challengRate/challengRate.js
let app = getApp(), api= require("../../api.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    names:[
      {
        name:'排名'
      },
      {
        name:'姓名'
      },
      {
        name:'得分'
      },
      {
        name:'用时'
      }
    ],
    infos:null,
    userInfo:[]
  },
  MyRankeEdition(){
    var that = this;
    wx.showLoading({
        title: "加载中"
    });
    let option = {
        courseId:that.data.courseId
    }
    console.log(option)
    app.encryption({
        url: api.default.MyRankeEdition,
        method: "GET",
        data:option,
        success: function(res) {
          console.log(res)
          let data = that.data.userInfo
          if(res.data == undefined){
            that.setData({
              userInfo:res
            })
          }
         
        },
        fail: function(t) {
            wx.showModal({
                title: "警告",
                content: t.errmsg,
                showCancel: !1
            });
        },
        complete: function() {
            wx.hideLoading();
        }
    });
  },
  getRankeEdition(){
    var that = this;
    wx.showLoading({
        title: "加载中"
    });
    let option = {
        courseId:that.data.courseId
    }
    console.log(option)
    app.encryption({
        url: api.default.getRankeEdition,
        method: "GET",
        data:option,
        success: function(res) {
          console.log(res)
          if(res.data == undefined){
            that.setData({
              infos:res
            })
          }
          console.log(that.data.infos)
        },
        fail: function(t) {
            wx.showModal({
                title: "警告",
                content: t.errmsg,
                showCancel: !1
            });
        },
        complete: function() {
            wx.hideLoading();
        }
    });
  },
  gochallengPri(){
    let id = this.data.courseId
    wx.navigateTo({
      url: `../challengPri/challengPri?courseId=${id}`
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
    this.MyRankeEdition()
    this.getRankeEdition()
      
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