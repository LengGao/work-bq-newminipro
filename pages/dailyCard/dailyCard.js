// pages/dailyCard/dailyCard.js
let app = getApp(), api = require("../../api.js"),util = require("../../utils/util.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
     everyDate:[
       {
         name:'12',
         title:'累计打卡天数',
         desc:'天'
       },
       {
         name:'15:30',
         title:'平均打卡时间',
         desc:''
       },
       {
        name:'68',
        title:'今天打卡人数',
        desc:'人'
       }
     ],
     directions:[
       {
         name:'每天只能打卡一次，00：00更新数据'
       },
       {
        name:'每次推荐一个知识点,包括10个题目'
      },
      {
        name:'题目均为单选题,全部答完才可提交打卡'
      },
      {
        name:'完成后可以查看解析,也可以再练一遍巩固知识点'
      },
     ]
  },
  goback(){
wx.navigateBack({
  delta: 1,  // 返回上一级页面。
  success: function() {
      console.log('成功！')
  }
})
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      navH: app.globalData.navHeight
    })
    let date= util.getDates(1, new Date())
   console.log(date)
    this.setData({
      time: date,
    });
    
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