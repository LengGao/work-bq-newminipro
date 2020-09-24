// pages/faceSuccess/faceSuccess.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    message:'',
    code:'重新预约',
    continueName:'',
    subscribeId:'',
    newDataTime:''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      message:options.message,
      code:options.code,
      subscribeId:options.subscribeId,
      newDataTime:options.datatime
    })
    if(options.code=='200'){
      wx.setNavigationBarTitle({
        title: '预约成功' 
      })
    }else{
      wx.setNavigationBarTitle({
        title: '预约失败' 
      })
    }
    //70001,[],"该课程已经无效，无法预约"
    //70001,[],"您已经预约过课程,请勿重复预约"
    //70002,[],"您预约时间与课程:'{$classroomName}'的时间出现冲突"
    //70003,[],"预约申请失败"
    if(options.code=='200'){
      this.setData({
        continueName:'继续预约'
      })
    }else{
      this.setData({
        continueName:'重新预约'
      })
    }
    
    // else if(options.code=='70002'){
    //   this.setData({
    //     continueName:'重新预约'
    //   })
    // }else if(options.code=='70003'){
    //   this.setData({
    //     continueName:'重新预约',

    //   })
    // }else if(options.code=='70001'){
    //   this.setData({
    //     continueName:'重新预约',
    //   })
    // }
  },
  // gobefor(){
  //   let pages = getCurrentPages(); // 当前页面
  //   let beforePage = pages[pages.length - 3]; 
  //    let datatime = this.data.newDataTime
  //   wx.navigateBack({
  //     da
  //     success: function () {
  //       beforePage.afterTapDay('detail',datatime); 
  //     }
  //   });
  // },
  //继续预约
  continue(){
    // if(this.data.code=='70003'||this.data.code=='70001'){
    //   this.confirmAppoint()
    // }else{
      // this.gobefor()
    wx.redirectTo({
      url: '../faceMessage/faceMessage',
    })
    // }
  
  },
  //我的预约
  mineorder(){
    wx.redirectTo({
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
            wx.setNavigationBarTitle({
              title: '预约失败' 
            })
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