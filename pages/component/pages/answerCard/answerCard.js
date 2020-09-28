// pages/answerCard/answerCard.js
let app = getApp(), api = require("../../../../api.js")
Page({
  /**
   * 页面的初始数据
   */
  data: {
    multipleNum: '',
    singleNum: '',
    judgmentNum: '',
    successOPtion: 'defaultOption',
    correct: []
  },
  goToTest() {
    wx.navigateBack({
      delta: 1
    })
  },
  gobefor(e) {
    console.log(e.currentTarget.dataset.problem_id)
    let pages = getCurrentPages(); // 当前页面
    let beforePage = pages[pages.length - 2];
    let problem_id = e.currentTarget.dataset.problem_id// 前一个页面
    // console.log("beforePage");
    // console.log(beforePage);
    wx.navigateBack({
      success: function () {
        beforePage.checkout(problem_id); // 执行前一个页面的onLoad方法
      }
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    console.log(options)
    wx.setNavigationBarTitle({
      title: options.name
    })
    let option,url
    if(options.type==1){//历年真题
      option = {
        real_topic_log_id: options.practice_id
      };//以上为初始化加载参数
      url = api.test.getRealTopicRecordBoard
    }else if (options.type==0){// 章节练习
      option = {
        practice_id: options.practice_id
      };//以上为初始化加载参数
      url = api.test.getPracticeDRecordBoard
    }else if (options.type==3){
      option = {
        punch_id: options.practice_id,
        problem_course_id:options.courseId
      };//以上为初始化加载参数
      url = api.test.getRecordBoard
    }else if (options.type==5){
      option = {
        challenge_id: options.practice_id
      };//以上为初始化加载参数
      url = api.test.getChallengeRecordBoard
    }
    console.log(option,url)
    app.encryption({//初始化加载函数获取所有题目
      url: url,
      data: option,
      method: 'GET',
      dataType: "json",
      success: function (res) {
        console.log(res)
        if (typeof (res.info.list) != 'undefined') {
          console.log('1')
          that.setData({
            multipleNum: res.info.list.multiple_problem,
            singleNum: res.info.list.single_problem,
            judgmentNum: res.info.list.judge_problem,
            fill_problem: res.info.list.fill_problem,
            scenes_problem: res.info.list.scenes_problem,
            short_problem: res.info.list.short_problem
          })
        } else {
          console.log('2')
          for (let i of singleNum) {
            for (let j of res) {
              if (i.problemId == j.problemId) {
                i.correct = j.rightStatus
              }
            }
          }
          for (let i of multipleNum) {
            for (let j of res) {
              if (i.problemId == j.problemId) {
                i.correct = j.rightStatus
              }
            }
          }
          for (let i of judgmentNum) {
            for (let j of res) {
              if (i.problemId == j.problemId) {
                i.correct = j.rightStatus
              }
            }
          }
          that.setData({
            multipleNum: multipleNum,
            singleNum: singleNum,
            judgmentNum: judgmentNum
          })
        }
      },
      fail: function (n) {
        console.log('初始化失败')
      }
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