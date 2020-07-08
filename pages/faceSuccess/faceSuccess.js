// pages/faceSuccess/faceSuccess.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    message:'',
    code:'重新预约',
    continueName:'',
    subscribeId:''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      message:options.message,
      code:options.code,
      subscribeId:options.subscribeId
    })
    if(options.code=='200'){
      this.setData({
        continueName:'继续预约'
      })
    }else if(options.code=='70002'){
      this.setData({
        continueName:'重新预约'
      })
    }else if(options.code=='70003'){
      this.setData({
        continueName:'申请重修',

      })
    }else if(options.code=='70001'){
      this.setData({
        continueName:'申请重修',

      })
    }
  },
  //继续预约
  continue(){
    if(this.data.code=='70003'||this.data.code=='70001'){
      this.confirmAppoint()
    }else{
      wx.navigateBack({
        delta: 2
      })
    }
  
  },
  //我的预约
  mineorder(){
    wx.navigateTo({
      url: '../faceOrder/mineOrder',
    })
  },
  //申请上课
  confirmAppoint(){
    let options = {
      subscribeId: this.data.subscribeId - 0,
    }
    let that =this
      app.encryption({
        url: api.default.insertSubscribe,
        method: "POST",
        // dataType: "json",
        data: options,
        success: function (res) {
          console.log(res)
          let message=res.data.message
          if(res.data.code=="200"){
            wx.showToast({
              title: res.data.message,
              icon: 'success',
              duration: 2000
            })
            // wx.navigateTo({
            //   url: `../faceSuccess/faceSuccess?message=${message}`,
            // })
          }else {
            // let code = res.data.code
            wx.showToast({
              title: res.data.message,
              icon: 'fail',
              duration: 2000
            })
            // wx.navigateTo({
            //   url: `../faceSuccess/faceSuccess?message=${message}&code=${code}&subscribeId=${that.data.rommId}`,
            // })
          }
        
        },
        fail: function (t) {
          // wx.showModal({
          //   title: "警告",
          //   content: t.msg,
          //   showCancel: !1
          // });
        },
        complete: function () {
          // wx.hideLoading();
        }
      });
    // wx.navigateTo({
    //      url: '../facebetrayFail/facebetrayFail',
    // })
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