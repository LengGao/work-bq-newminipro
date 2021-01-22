// pages/AllTestPir/AllTestPir.js
let app = getApp(), api = require("../../../../api.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    funsel: null,
    nodata: false,
    uid:'',
    info_show:'',
    freeCourse: [],
    // hotpoint:[]
  },
  toVideoroom(e) {
    console.log(e.currentTarget.dataset.id)
    console.log('不会把')
    let video_id = e.currentTarget.dataset.id
    let video_collection_id = e.currentTarget.dataset.video_collection_id
    wx.navigateTo({
      url: `../course-detail/course-detail?video_id=${video_id}&courseId=${video_id}&video_collection_id=${video_collection_id}`
    })
  },
  getcoursecategory() {
    let that = this
    let option = {
      category_id: that.data.id
    }
    console.log(option)
    app.encryption({
      url: api.default.getcoursecategory,
      method: 'GET',
      data: option,
      success: function (res) {
        console.log(res)
        if (res.data != undefined) {
          that.setData({
            nodata: true
          })

        } else {
          that.setData({
            funsel: res
          })
        }

      },
      fail: function (res) {

      },
      complete: function () {
        wx.hideLoading();
      }
    })
  },
  freeCourse() {
    wx.showLoading({
      title: "加载中"
    });
    let uuid = wx.getStorageSync("user_info").uuid
    let token = wx.getStorageSync("user_info").token
    let that = this
    app.encryption({
      url: api.default.freecourse,
      header: {
        token: token,
        uuid: uuid
      },
      method: 'GET',
      dataType: "json",
      success: function (res) {
        console.log(res)
        that.setData({
          freeCourse: res
        })
      },
      fail: function (res) {

      },
      complete: function () {
        wx.hideLoading();
      }
    })
  },
  hotpoint() {
    wx.showLoading({
      title: "加载中"
    });
    let uuid = wx.getStorageSync("user_info").uuid
    let token = wx.getStorageSync("user_info").token
    let that = this
    app.encryption({
      url: api.default.hostcourse,
      header: {
        token: token,
        uuid: uuid
      },
      method: 'GET',
      dataType: "json",
      success: function (res) {
        console.log(res)
        that.setData({
          freeCourse: res
        })
      },
      fail: function (res) {

      },
      complete: function () {
        wx.hideLoading();
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    let user_info=wx.getStorageSync("user_info");
    if(user_info){
      this.setData({
        uid:user_info.uid,
        info_show :user_info.info_show 
      })
    }
    console.log(this.data.uid)
    wx.setNavigationBarTitle({
      title: options.name
    })
    this.setData({
      id: options.id
    })

    if (options.id == 1) {
      this.hotpoint()
    } else if (options.id == 2) {
      this.freeCourse()
    } else {
      this.getcoursecategory()
    }
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