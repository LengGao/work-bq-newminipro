var t, app = getApp(), api = require("../../api.js"),
  app = getApp()
  
Page({

  data: {
    // visible2:false
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    // this.getSubscribePower()
  },
  goback(){
    wx.reLaunch({
      url:  `../../../personal-center/personal-center`
    })
  },
  // //获得约课权限
  // getSubscribePower(){
  //   let option = {
  //     courseId:wx.getStorageSync('courseId').courseId
  //   }
  //   console.log(option)
  //   app.encryption({
  //     url: api.default.getSubscribePower,
  //     data: option,
  //     method: 'GET',
  //     success: function (res) {
        
  //       console.log(res)  
  //       if(res.data.code!=200){
  //         wx.showModal({
  //       title: '提示',
  //       content: '你还不是正式学员，请购买课程后再预约面授课!',
  //       showCancel: true,//是否显示取消按钮
  //       cancelText: "返回",//默认是“取消”
  //       cancelColor: '#199FFF',//取消文字的颜色
  //       confirmText: "发现好课",//默认是“确定”
  //       confirmColor: '#199FFF',//确定文字的颜色
  //       success (res) {
  //         if (res.confirm) {
            
  //          wx.navigateTo({
  //            url: '../index/index',
  //          })
  //         } else if (res.cancel) {
  //           wx.navigateBack({
  //             delta: 1
  //           })
  //         }
  //     }
  //   })
  //       }      
  //     },
  //     fail: function (n) {
  //       console.log('333333')
  //     }
  //   })
  // },
  tofaceMessage(){
    
  
    wx.navigateTo({
      url: `../faceMessage/faceMessage`
    })
  },
  // handleClose2(){
  //   this.setData({
  //     visible2: false
  // });
  // },
  tomineOrder(){
    wx.navigateTo({
      url: `../faceOrder/mineOrder`
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