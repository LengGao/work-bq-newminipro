const { $Message, $Toast } = require('../../../../utils/iview/base/index');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    code: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      code: options.code
    })
    if (options.code == '200') {
      wx.setNavigationBarTitle({
        title: '预约成功'
      })
    } else {
      wx.setNavigationBarTitle({
        title: '预约失败'
      })
    }
  },
  //我的预约
  mineorder() {
    wx.navigateTo({
      url: '../faceOrder/mineOrder',
    })
  },
  //东培学堂
  dongpei() {
    wx.navigateTo({
      url: '../../../../pages/index/index',
    })
  },
  //叫老师申请补签到
  handleText() {
    console.log(111)
    $Toast({
      content: '请找老师补签',
      type: 'warning'
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