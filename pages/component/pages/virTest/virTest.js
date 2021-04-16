// pages/virTest/virTest.js
let app = getApp(), api = require("../../../../api.js"), utils = require("../../../../utils/util.js"),pages = 0
Page({
  /**
   * 页面的初始数据
   */
  data: {
    history: [],
    nodeUrl: '../virStart/virStart',
    datas: false,
    nondeID:'',
    exam_length:10
  },
  toVirStart(){
    // courseId={{ nondeID }}&exam_length={{ exam_length }}"
    wx.navigateTo({
      url: `../virStart/virStart?&courseId=${this.data.nondeID}&exam_length=${this.data.exam_length}`
    })
  },
  getExaminationList() {
    let that = this
     pages = pages + 1
    let option = {
      page: pages,
      problem_course_id: this.data.nondeID
    }//以上为初始化加载参数
    console.log(option)
    app.encryption({//初始化加载函数获取所有题目
      url: api.test.getTestExamList,
      data: option,
      method: 'GET',
      dataType: "json",
      success: function (res) {
        console.log(res)
        if( res.list!=undefined&&res.list.length != 0){
          res.list.forEach( (value)=>{
            value.create_time = utils.js_date_time(value.create_time)
          })
          that.data.history.push.apply(that.data.history,res.list)
          that.setData({
            history: that.data.history,
            datas: true
          })
        }
      },
      fail: function (n) {
        console.log('初始化失败')
      }
    })
  },
  goback(){
    wx.reLaunch({
      url:  `../../../index/index`
    })
  },
  getTestExamConfig(){
    let that = this
    let option = {
      problem_course_id: this.data.nondeID
    }//以上为初始化加载参数
    console.log(option)
    app.encryption({//初始化加载函数获取所有题目
      url: api.test.getTestExamConfig,
      data: option,
      method: 'GET',
      dataType: "json",
      success: function (res) {
        console.log(res)
        that.setData({
          exam_length:res.info.duration
        })
        if(res){
        }
      }
  })
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    that.setData({
      nondeID: options.courseId
    })
    console.log(options)
    // this.govirtest()
    this.getExaminationList(options)
    this.getTestExamConfig(options)
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
    pages = 0
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
  this.getExaminationList()
  },

  /**
   * 用户点击右上角分享
   */
  // onShareAppMessage: function () {

  // }
})