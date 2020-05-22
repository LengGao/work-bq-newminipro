// pages/answerCard/answerCard.js
let app = getApp(), api = require("../../api.js")
Page({
  /**
   * 页面的初始数据
   */
  data: {
    multipleNum:null,
    singleNum:null,
    judgmentNum:null,
    successOPtion:'defaultOption',
    correct:[],
    topmenu: [
      {
        name: '正确题数:',
        number: '45',
        class:'green',
        color:'greens'
      },
      {
        name: '错误题数:',
        number: '45',
        class:'red',
        color:'reds'
      },
      {
        name: '未回答题数:',
        number: '45',
        class:'gray',
        color:'grays'
      }
    ],
  },
  goToTest(e) {
    let pages = getCurrentPages(); // 当前页面
    let beforePage = pages[pages.length - 2]; 
    let number = 0// 前一个页面
    // console.log("beforePage");
    // console.log(beforePage);
    wx.navigateBack({
      success: function () {
        beforePage.wode(number,'nosubmit'); // 执行前一个页面的onLoad方法
      }
    });
  },
  gobefor(e){
    console.log(e.currentTarget.dataset.index)
    let pages = getCurrentPages(); // 当前页面
    let beforePage = pages[pages.length - 2]; 
    let number = e.currentTarget.dataset.index// 前一个页面
    // console.log("beforePage");
    // console.log(beforePage);
    wx.navigateBack({
      success: function () {
        beforePage.wode(number,'nosubmit'); // 执行前一个页面的onLoad方法
      }
    });
    // let that = this
    // let chapterName= that.data.chapterName;
    // let course_id= that.data.courseId;
    // let chapter_id= that.data.chapterId;
    // wx.navigateTo({
    //   url:`/pages/yeartestReload/yeartestReload?chapterName=${chapterName}&courseId=${course_id}&chapterId=${chapter_id}`
    // })
  },
  generalScoring(courseId){
    let that = this
    let option = {
      exam_identity:courseId
    }
    console.log(option)
    app.encryption({
      url: api.default.examreport,
      method: "GET",
      data: option,
      success: function (res) {
      console.log(res)
      let nums1 =  'topmenu[0].number'
      let nums2 =  'topmenu[1].number'
      let nums3 =  'topmenu[2].number'
      that.setData({
        [nums1]:res.real_number,
        [nums2]:res.error_number,
        [nums3]:res.not_doing,
        singleNum:res.radio.length==0?false:res.radio,
        multipleNum:res.multi.length==0?false:res.multi,
        judgmentNum:res.judge.length==0?false:res.judge,
        allScroll:res.total_scores
      })
    },
      fail: function (t) {
        return reject()
      },
      complete: function () {

      }
    })
  },
  goback(){
    wx.reLaunch({
      url: '/pages/index/index'
  });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
     this.generalScoring(options.exam_identity)
      this.setData({
        navH: app.globalData.navHeight,
        chapterName: options.chapterName,
        courseId: options.course_id,
        chapterId: options.chapter_id
      })
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