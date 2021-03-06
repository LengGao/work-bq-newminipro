// pages/dailyCard/dailyCard.js
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
        title: '平均打卡时间',
        desc: ''
      },
      {
        name: '00',
        title: '今天打卡人数',
        desc: '人'
      }
    ],
    directions: [
      {
        name: '每天只能打卡一次，00:00更新数据'
      },
      {
        name: '每次推荐一个知识点，包括30个题目'
      },
      {
        name: '题目均为单选题，全部答完才可提交打卡'
      }
    ],
    isCrard:1
  },
  goAny() {
    let courseId = this.data.punch_id
    wx.navigateTo({
      url: `../dailyRate/dailyRate?courseId=${courseId}`
    })
  },
  goback() {
    wx.reLaunch({
      url: '../../../../pages/index/index'
    })
    console.log('测试订阅消息')
    //测试订阅消息
  //   wx.requestSubscribeMessage({
  //     tmplIds: ['uURG_sarlVw6GDtD-svdPEp4GufnIO8v1Mxko6X5T_A'],
  //     success(res) {
  //       wx.redirectTo({
  //         url: `/pages/index/index`
  //       });
  //     }
  // })
  },
  gopri() {
    let id = this.data.courseId
    wx.navigateTo({
      url: `../daliyPri/daliyPri?courseId=${id}`
    })
  },
  getTodayStatus() {
    let that = this
    let option = {
      problem_course_id: that.data.courseId
    }
    app.encryption({
      url: api.test.getPunchPanelData,
      method: "GET",
      data: option,
      success: function (res) {
      

        // debugger
        console.log(res.data == undefined,res,res.info.has_clock_in)
        let allData = 'everyDate[0].name', allData1 = 'everyDate[1].name', allData2 = 'everyDate[2].name'
        if (res.data == undefined) {
         let times = util.setTimes(res.info.use_time)
          that.setData({
            [allData]: res.info.total_num,
            [allData1]:times,
            [allData2]: res.info.total_people,
            isCrard: res.info.has_clock_in
          })
          console.log(that.data.isCrard)
          if(res.info.clock_in_info != undefined){ //Math.round()
            if( res.info.clock_in_info.correct_rate < 10){
              that.setData({
                accuracy: res.info.clock_in_info.correct_rate,
                punch_id:res.info.clock_in_info.punch_id
              })
            }else{
              that.setData({
                accuracy: Math.round(res.info.clock_in_info.correct_rate),
                punch_id:res.info.clock_in_info.punch_id
              })
            }
           
          }
        } else {

        }
      },
      fail: function (t) {
        return reject
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
      navH: app.globalData.navHeight,
      courseId: options.courseId
    })
    let date = util.getDates(1, new Date())
    console.log(date)
    this.setData({
      time: date,
    });
    this.getTodayStatus()
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