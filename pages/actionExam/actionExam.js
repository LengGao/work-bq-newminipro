
const app = getApp(), api = require("../../api.js");

Page({

    /**
     * 页面的初始数据
     */
    data: {
        staticUrl: app.staticUrl,
      index_data: {},
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options = {}) {
        let self = this;
        this.setData({
          id: options.id,
        })
      this.userExamInfo();
    },

    userExamInfo(){
      let self = this , d = this.data;
      wx.showLoading({
        title: "加载中"
      });
      app.request({
        url: api.course.userExamInfo,
        method: "POST",
        data: {
          id: d.id,
        },
        success: function (res) {
          
          if(res.code == 0){
            self.setData({
              index_data:res.data
            })
          }

        },
        fail: function (t) {
          wx.showModal({
            title: "警告",
            content: t.msg,
            showCancel: !1
          });
        },
        complete: function () {
          wx.hideLoading();
        }
      });
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


})