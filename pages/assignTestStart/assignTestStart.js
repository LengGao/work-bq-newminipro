
var t, app = getApp(), api = require("../../api.js"), app = getApp()
Page({
  data:{
    navH:'',
  },
  onLoad: function (options = {}) {
    let that = this
    that.setData({
      navH: app.globalData.navHeight,
      swiperHeight: wx.getSystemInfoSync().windowHeight,
    })
    console.log(that.data.swiperHeight)
  }
})