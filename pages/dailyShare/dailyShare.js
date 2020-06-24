// pages/dailyShare/dailyShare.js
let t, app = getApp(), api = require("../../api.js")
Page({
  /**
   * 页面的初始数据
   */
  data: {
    imgsrc:''
  },
  saveImage() {
    let imgsrc = this.data.imgsrc
    wx.showLoading({
      title: '保存中...', 
      mask: true,
    });
    console.log(imgsrc)
    wx.downloadFile({
      url:imgsrc,
      success: function(res) {
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
  getPunchClock(courseId){
    let that = this
    let option= {
      courseId:courseId
    }
    console.log(option)
    app.encryption({
      url: api.default.getPunchClock,
      method: "GET",
      data:option,
      success: function (res) {
        console.log(res)
        that.setData({
          imgsrc:res.imgUrl
        })
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
  onLoad: function (options) {
   this.setData({
     height:wx.getSystemInfoSync().windowHeight
   })
   let courseId  =wx.getStorageSync('courseId').courseId
    this.getPunchClock(courseId)
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
      path: 'pages/index/index',
      imageUrl:that.data.imgsrc,
      success: function (shareTickets) {
        console.info(shareTickets + '成功');
        // 转发成功
      },
      fail: function (res) {
        console.log(res + '失败');
        // 转发失败
      },
      complete:function(res){
        console.log('xiixixixixixi')
      }
    }
  }
})