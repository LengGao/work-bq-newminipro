// pages/virTest/virTest.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
     history:[
       {
         name:'模拟考试卷三',
         time:'中等',
         marks:'300'
       },
       {
        name:'模拟考试卷二',
        time:'中等',
        marks:'500'
      },
      {
        name:'模拟考试卷一',
        time:'中等',
        marks:'200'
      }
     ],
     datas:true
  },
  gointro(){
    
      wx.redirectTo({
        url: '../yearTestIntro/yearTestIntro'
     })
  },  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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