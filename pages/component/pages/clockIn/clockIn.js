
var app = getApp(), api = require("../../../../api.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selected: [],
    info: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options = {}) {

    this.setData({
      id: options.id || 79
    });
    let time = new Date();
    this.getTimeTable(time.getFullYear(), time.getMonth() + 1);

  },

  /**
   * 获取课程表
   */
  getTimeTable(timeYear, timeMonth) {
    // let time = e.detail;

    let self = this;
    let d = this.data;

    wx.showLoading({
      title: "加载中"
    });

    app.request({
      url: api.index.getMyTimeTable,
      method: "GET",
      data: {
        classroom_id: self.data.id,
        month: timeYear + '/' + timeMonth,
      },
      success: function (res) {
        let dataArray = res.data;
        let selected = [];
        let selected2 = [];
        if (0 == res.code) {
          console.log(11);
          dataArray.forEach(function (value, index) {
            selected2.push(timeYear + '-' + timeMonth + '-' + value.day);
            selected.push({
              id: timeYear + '-' + timeMonth + '-' + value.day,
              style: 'color: red;',
              dateId: value.id
            });
          });
          console.log(self.data.time);
          self.setData({
            selected,
            selected2,
            dataArray
          })

        }

      },
      complete: function () {
        wx.hideLoading();
      }
    });

  },
  // 获取每月的数组
  doMonthChange(e) {

    let time = new Date(e.detail);

    this.getTimeTable(time.getFullYear(), time.getMonth() + 1);
  },

  /**
  * 获取
  */
  getTime(id) {
    // let time = e.detail;
    let self = this;

    wx.showLoading({
      title: "加载中"
    });

    app.request({
      url: api.index.getUserSignin,
      method: "GET",
      data: {
        classroom_id: self.data.id,
        timetable_id: id,
      },
      success: function (res) {

        if (0 == res.code) {
          console.log(res.data);
          self.setData({
            info: res.data.data
          })

        }

      },
      complete: function () {
        wx.hideLoading();
      }
    });

  },

  /**
  * 日历是否被打开
  */
  bindselect(e) {
    console.log(e.detail.ischeck)
  },
  /**
   * 获取选择日期
   */
  // bindgetdate(e) {
  onDayClick(e) {

    let time = new Date(e.detail.date);

    let self = this;
    let d = this.data;


    let bool = false;
    d.dataArray && d.dataArray.forEach((val, index) => {
      if (val.day == time.getDate()) {
        self.getTime(val.id);
        bool = true;
      }
    })

    if (!bool) {
      this.setData({
        info: []
      })
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

})