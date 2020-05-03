// pages/dailyChallenge/dailyChallenge.js
let app = getApp(), api = require("../../api.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    directions: [
      {
        name: '每天可以多次刷题挑战，00:00更新挑战榜'
      },
      {
        name: '每次挑战包括30个题目，涉及多个知识点'
      },
      {
        name: '挑战题型多样, 全部答完才可提交挑战'
      },
      {
        name: '完成后可以查看解析, 也可以邀请好友参加挑战'
      },
    ],
    everyDate: [
      {
        name: '15:30',
        title: '挑战用时',
      
      },
      {
        name: '120',
        title: '挑战得分',
      
      },
      {
        name: '68',
        title: '挑战排名'
      }
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      navH: app.globalData.navHeight
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