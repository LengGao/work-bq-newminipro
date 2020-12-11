// pages/dailyShare/dailyShare.js
let t, app = getApp(), api = require("../../../../api.js")
Page({
  /**
   * 页面的初始数据
   */
  data: {
    imgsrc: '',
    previewData: null
  },
  saveImage() {
    let imgsrc = this.data.imgsrc
    wx.showLoading({
      title: '保存中...',
      mask: true,
    });
    console.log(imgsrc)
    wx.downloadFile({
      url: imgsrc,
      success: function (res) {
        console.log(res)
        if (res.statusCode === 200) {
          let img = res.tempFilePath;
          wx.saveImageToPhotosAlbum({
            filePath: img,
            success(res) {
              wx.showToast({
                title: '保存成功',
                icon: 'success',
                duration: 2000
              });
            },
            fail(res) {
              wx.showToast({
                title: '保存失败',
                icon: 'success',
                duration: 2000
              });
            }
          });
        }
      }
    });
  },
  getPunchClock(courseId) {
    let that = this
    let option = {
      punch_id: courseId
    }
    console.log(option)
    app.encryption({
      url: api.test.sharePunchData,
      method: "GET",
      data: option,
      success: function (res) {
        console.log(res)
        that.setData({
          previewData: res.info
        })
      },
      fail: function (t) {

      },
      complete: function () {

      }
    })
  },
  createPunchPoster(courseId) {
    let that = this
    wx.showLoading({
      title: '正在生成图片中...',
      mask: true,
    });
    let problem_course_id = wx.getStorageSync('problem_course_id').problem_course_id
    let option = {
      punch_id: that.data.courseId,
      problem_course_id: problem_course_id
    }
    console.log(option)
    app.encryption({
      url: api.test.createPunchPoster,
      method: "POST",
      data: option,
      success: function (res) {
        console.log(res)
        that.setData({
          imgsrc: res.info.share_url
        })
        that.saveImage()
      },
      fail: function (t) {

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
    this.setData({
      height: wx.getSystemInfoSync().windowHeight,
      courseId: options.courseId
    })
    let courseId = options.courseId
    this.getPunchClock(courseId)
    // this.createPunchPoster(courseId)
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
    let that = this
    return {
      title: '东培学堂',
      path: '../../../../pages/index/index',
      imageUrl: 'https://minproimg.oss-cn-hangzhou.aliyuncs.com/images/dakafenxiang.png',
      success: function (shareTickets) {
        console.info(shareTickets + '成功');
        // 转发成功
      },
      fail: function (res) {
        console.log(res + '失败');
        // 转发失败
      },
      complete: function (res) {
        console.log('xiixixixixixi')
      }
    }
  }
})