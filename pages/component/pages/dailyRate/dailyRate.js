// pages/dailyRate/dailyRate.js
let app = getApp(), api = require("../../../../api.js"), util = require("../../../../utils/util.js")
Page({
  /**
   * 页面的初始数据
   */
  data: {
    everyDate: [
      {
        name: '00',
        title: '累计打卡天数',
        desc: '天'
      },
      {
        name: '00:00',
        title: '本次打卡时间',
        desc: ''
      },
      {
        name: '00',
        title: '今天打卡排行',
        desc: ''
      }
    ],
    singleNum: 10,
    successOPtion: 'defaultOption',
    rate: 0
  },
  goshare() {
    let courseId = this.data.courseId
    wx.navigateTo({
      url: `../dailyShare/dailyShare?courseId=${courseId}`
    })
  },
  gobefor(e) {
    console.log(e.currentTarget.dataset.index)
    url: `../daliyPri/daliyPri?courseId=${id}`
    // let pages = getCurrentPages(); // 当前页面
    // let beforePage = pages[pages.length - 2];
    // let number = e.currentTarget.dataset.index// 前一个页面
    // console.log("beforePage");
    // console.log(beforePage);
    // wx.navigateBack({
    //   success: function () {
    //     beforePage.wode(number, 'nosubmit'); // 执行前一个页面的onLoad方法
    //   }
    // });
  },
//   gobefor(e) {
//     console.log(e.currentTarget.dataset.index)
//     let pages = getCurrentPages(); // 当前页面
//     let beforePage = pages[pages.length - 2];
//     let number = e.currentTarget.dataset.index// 前一个页面
//     wx.showModal({
//       title: '提示',
//       content: '查看详情后，将不能查看当前信息，是否查看详情？',
//       showCancel: true,//是否显示取消按钮
//       confirmText: "确认",//默认是“确定”
//       confirmColor: '#199FFF',//确定文字的颜色
//       success: function (res) {
//         if (res.cancel) {
//         } else {
//           wx.navigateBack({
//             success: function () {
//               beforePage.wode(number, 'nosubmit'); // 执行前一个页面的onLoad方法
//             }
//          })
//         }
//       }
//  })
//   },
  getinfo() {
    let that = this
    let option = {
      punch_id: this.data.courseId
    }
    console.log(option)
    app.encryption({
      url: api.test.settlementPunchResult,
      method: "POST",
      data: option,
      success: function (res) {
        console.log(res)
        let times = util.setTimes(res.info.use_time)
        let allInfo = 'everyDate[0].name'
        let allInfo1 = 'everyDate[1].name'
        let allInfo2 = 'everyDate[2].name'
        that.setData({
          [allInfo]: res.info.total_num,
          [allInfo1]: times,
          [allInfo2]: res.info.num,
          singleNum: res.info.correct_rate,
          time: res.info.date_time,
          multipleNum: res.list.multiple_problem,
          singleNum: res.list.single_problem,
          judgmentNum: res.list.judge_problem,
          fill_problem: res.list.fill_problem,
          scenes_problem: res.list.scenes_problem,
          short_problem: res.list.short_problem
        })
        if( res.info.correct_rate < 10){
          that.setData({
            rate: res.info.correct_rate
          })
        }else{
          that.setData({
            rate: Math.round(res.info.correct_rate)
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
  onLoad: function (options) {
    console.log(options)
    this.setData({
      courseId: options.courseId
    });
    this.getinfo()
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