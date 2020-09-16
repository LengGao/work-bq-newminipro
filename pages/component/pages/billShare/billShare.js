// pages/billShare/billShare.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    biaoji: '../../images/jinbiao.png',
    pingjia: '无敌学霸',
    jieyu: '发挥超常，本次考试打败90%的同学，保持状态，再接再厉！',
    starIndex4: 4.2,
    allDatas: [
      {
        title: '单选题',
        starIndex4: 5,
        hasdone: '45',
        alldone: '60'
      },
      {
        title: '多选题',
        starIndex4: 4,
        hasdone: '45',
        alldone: '60'
      },
      {
        title: '判断题',
        starIndex4: 3,
        hasdone: '45',
        alldone: '60'
      },
      {
        title: '案例题',
        starIndex4: 2,
        hasdone: '45',
        alldone: '60'
      }
    ]
  },
  saveImage() {
    wx.showLoading({
      title: '保存中...',
      mask: true,
    });
    wx.downloadFile({
      url: 'http://api.beiqujy.com/outputFile/20200427/z6CNnD8RVn0XJfUA2a7apTQLd6NdJi40.jpg',
      success: function (res) {
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
  /**
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