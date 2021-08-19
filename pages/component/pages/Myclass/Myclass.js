// pages/AllTestPir/AllTestPir.js
let app = getApp()
let api = require("../../../../api.js")
let util = require("../../../../utils/util.js")
Page({
  /**
   * 页面的初始数据
   */
  data: {
    nodata: false
  },

  // 去班级回顾视频页
  toClassVideo(e) {
    const index = e.currentTarget.dataset.index
    const classroom = this.data.myclass[index] || {}
    if (!classroom.class_video_count) {
      wx.showToast({
        icon: "error",
        title: '暂无视频',
      })
      return
    }
    wx.navigateTo({
      url: `../course-class-detail/course-class-detail?classroom_id=${classroom.class_id}`
    })
  },
  getClassroomList() {
    app.encryption({
      url: api.default.getClassroomList,
      method: "GET",
      success: (res) => {
        console.log(res)
        res.forEach(i => {
          i.join_time = util.js_date_time(i.update_time)
        })
        this.setData({
          myclass: res
        })
        if (res.data != undefined) {
          this.setData({
            nodata: true
          })

        }

      },
      fail: function (t) {

      },
      complete: function () {

      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    this.getClassroomList()

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
  // onShareAppMessage: function () {

  // }
})