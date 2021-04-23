let app = getApp(),
  api = require("../../../../api.js"),
  util = require("../../../../utils/util.js")
Page({
  /**
   * 页面的初始数据
   */
  data: {
    arrange_id: '',
    class_hour_id: "",
    funlist: [{
      chapter: 'hjkshfjhf'
    }],
    subscribe_classroom_id: '',
    rommId: '',
    status: 2,
    id: 0,
    nickname: '',
    mobile: '',
    explain_btn: '确定预约',
    courseId: 0,
    memberId: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(query) {
    // const {query} = wx.getLaunchOptionsSync()
    // scene 需要使用 decodeURIComponent 才能获取到生成二维码时传入的 scene
    //scene=arrange_id%3D5%26class_hour_id%3D5
    var params = new Object();
    let scene = decodeURIComponent(query.scene).split('&');
    for (var i = 0; i < scene.length; i++) {
      params[scene[i].split('=')[0]] = scene[i].split('=')[1];
    }
    this.setData({
      arrange_id: params.arrange_id,
      class_hour_id: params.class_hour_id,
    })
    console.log(this.data.subscribe_classroom_id)
    this.getQrcodeSubscribeInfo()
  },
  getQrcodeSubscribeInfo() {
    let that = this
    let option = {
      arrange_id: parseInt(this.data.arrange_id)
    }
    console.log(option)

    app.encryption({
      url: api.default.getScheduleCode,
      method: "GET",
      data: option,
      success: function (res) {
        console.log(res)

        if (res == undefined) {

          wx.showModal({
            title: '提示',
            content: res.data.message,
            success(res) {
              if (res.confirm) {
                wx.redirectTo({
                  url: `../../../../pages/index/index`,
                })
              } else if (res.cancel) {
                wx.redirectTo({
                  url: `../../../../pages/index/index`,
                })
              }
            }
          })
        } else {
          let classroom = res

          let arr = []
          arr.push(classroom)
          console.log(arr)
          that.setData({
            funlist: arr,
          })
        }



      },
      fail: function (t) {

      },
      complete: function () {

      }
    })
  },
  //签到
  signin() {
    this.updateSubscribeMemberStatus()
  },
  //签到
  updateSubscribeMemberStatus() {
    let option = {
      arrange_id: parseInt(this.data.arrange_id),
      class_hour_id: parseInt(this.data.class_hour_id)
    }
    console.log(option)
    app.encryption({
      url: api.default.arrangeUpdateSignIn,
      method: "POST",
      data: option,
      success: function (res) {
        console.log(res.data.message)
        let code = res.data.code
        let message = res.data.message
        if (res.data.code != '200') {
          wx.navigateTo({
            url: `../scheduleSuccess/scheduleSuccess?&code=${code}&message=${message}`,
          })
        } else {
          wx.showToast({
            title: res.data.message,
            icon: 'none',
            duration: 2000
          })
        }

        // let arr = []
        // arr.push(res.info)
        //   that.setData({
        //     funlist:arr
        //   })

      },
      fail: function (t) {

      },
      complete: function () {

      }
    })
  },
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
  // onShareAppMessage: function () {

  // }
})