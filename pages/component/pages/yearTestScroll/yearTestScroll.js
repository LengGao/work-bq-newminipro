// pages/answerCard/answerCard.js
let app = getApp(), api = require("../../../../api.js")
Page({
  /**
   * 页面的初始数据
   */
  data: {
    multipleNum: null,
    type:'',
    singleNum: null,
    judgmentNum: null,
    successOPtion: 'defaultOption',
    correct: [],
    topmenu: [
      {
        name: '正确题数:',
        number: '00',
        class: 'green',
        color: 'greens'
      },
      {
        name: '错误题数:',
        number: '00',
        class: 'red',
        color: 'reds'
      },
      {
        name: '未回答题数:',
        number: '00',
        class: 'gray',
        color: 'grays'
      }
    ],
    ID:''
  },
  goToTest(e) {
    let pages = getCurrentPages(); // 当前页面
    let beforePage = pages[pages.length - 2];
    let number = this.data.ID// 前一个页面
    console.log(beforePage)
    console.log(number)
    wx.showModal({
      title: '提示',
      content: '查看详情后，将不能查看当前信息，是否查看详情？',
      showCancel: true,//是否显示取消按钮
      confirmText: "确认",//默认是“确定”
      confirmColor: '#199FFF',//确定文字的颜色
      success: function (res) {
        if (res.cancel) {
        } else {
          wx.navigateBack({
            success: function () {
              beforePage.wode(number, 'nosubmit'); // 执行前一个页面的onLoad方法
            }
         })
        }
      }
  })
  },
  gobefor(e) {
    console.log(e.currentTarget.dataset.index)
    let pages = getCurrentPages(); // 当前页面
    let beforePage = pages[pages.length - 2];
    let number = e.currentTarget.dataset.index// 前一个页面
    console.log(beforePage,number)
    console.log(pages)
    wx.showModal({
      title: '提示',
      content: '查看详情后，将不能查看当前信息，是否查看详情？',
      showCancel: true,//是否显示取消按钮
      confirmText: "确认",//默认是“确定”
      confirmColor: '#199FFF',//确定文字的颜色
      success: function (res) {
        if (res.cancel) {
        } else {
          wx.navigateBack({
            success: function () {
              beforePage.wode(number, 'nosubmit'); // 执行前一个页面的onLoad方法
            }
         })
        }
      }
 })
  },
  generalScoring(courseId) {
    let that = this
    let option = {
      exam_identity: courseId
    }
    console.log(option)
    app.encryption({
      url: api.default.examreport,
      method: "GET",
      data: option,
      success: function (res) {
        console.log(res)
      
      },
      fail: function (t) {
        return reject()
      },
      complete: function () {

      }
    })
  },
  goback() {
    wx.showModal({
      title: '提示',
      content: '返回将回到首页，是否返回？',
      showCancel: true,//是否显示取消按钮
      confirmText: "确认",//默认是“确定”
      confirmColor: '#199FFF',//确定文字的颜色
      success: function (res) {
        if (res.cancel) {
        } else {
          wx.reLaunch({
            url: '/pages/index/index'
          });
        }
      }
 })
 
   
  },
  settlementRealTopicResult(options){
    let that = this
    let option , url
    if(options.type == 4){ //模拟考试
      option = {
        exam_log_id: options.real_topic_log_id,
        problem_course_id: parseInt(options.course_id)
      }
      url = api.test.settlementTestExamResult
    }else if (options.type == 5){
      option = {
        real_topic_log_id: options.real_topic_log_id,
        problem_course_id: parseInt(options.course_id),
        problem_chapter_id: parseInt(options.chapter_id)
      }
      url = api.test.settlementRealTopicResult
    }else if(options.type == 6){
      option = {
        self_determination_id: options.self_determination_id,
        problem_course_id: parseInt(options.course_id),
        problem_chapter_id: parseInt(options.chapter_id)
      }
      url = api.test.settlementSelfDeterminationResult
    }
       
      console.log(option)
      app.encryption({//交卷动作
        url: url,
        data: option,
        method: 'POST',
        dataType: "json",
        success: function (res) {
          console.log(res)
          let nums1 = 'topmenu[0].number'
          let nums2 = 'topmenu[1].number'
          let nums3 = 'topmenu[2].number'
            that.setData({
              [nums1]: res.info.right_problem,
              [nums2]: res.info.fail_problem,
              [nums3]: res.info.unanswered,
              singleNum: res.list.single_problem.length == 0 ? [] : res.list.single_problem,//单选
              multipleNum: res.list.multiple_problem.length == 0 ? [] : res.list.multiple_problem,//多选
              judgmentNum: res.list.judge_problem.length == 0 ? [] : res.list.judge_problem,//判断
              short_problem: res.list.short_problem.length == 0 ? [] : res.list.short_problem,//简答
              fill_problem: res.list.fill_problem.length == 0 ? [] : res.list.fill_problem,//填空
              scenes_problem: res.list.scenes_problem.length == 0 ? [] : res.list.scenes_problem,//场景
              allScroll: res.info.mark,
              ID:res.list.single_problem[0].problem_id
            })
       
         
        },
        fail: function (n) {
          console.log('初始化失败')
        }
      })
      },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.settlementRealTopicResult(options)
    this.setData({
      navH: app.globalData.navHeight,
      chapterName: options.chapterName,
      courseId: options.course_id,
      chapterId: options.chapter_id,
      type:option.type
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
  // onShareAppMessage: function () {

  // }
})