// pages/virTest/virTest.js
let app = getApp(), api = require("../../api.js"), utils =  require("../../utils/util.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
     history:[
       {
         name:'模拟考试卷三',
         time:'2020年3月20日',
         marks:'90分'
       },
       {
        name:'模拟考试卷二',
        time:'2020年3月20日',
        marks:'90分'
      },
      {
        name:'模拟考试卷一',
        time:'2020年3月20日',
        marks:'90分'
      }
     ],
     nodeUrl:'../virStart/virStart',
     datas:false
  },
  getExaminationList(options){
    let that = this
    let option = {
      page:0,
      courseId:options.courseId
     }//以上为初始化加载参数
     app.encryption({//初始化加载函数获取所有题目
       url: api.default.getExaminationList,
       data: option,
       method: 'GET',
       dataType: "json",
       success: function (res) {
         console.log(res)
         if(res.data != undefined){
           that.setData({
             datas:false
           })
           return
         }
         for( let item of res ){
           item.updateTime = utils.js_date_time(item.updateTime)
         }
         {
           that.setData({
             history:res,
             datas:true
           })
         }
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
    let that = this
    that.setData({
      nondeID:options.courseId
    })
    console.log(options)
    // this.govirtest()
    this.getExaminationList(options)
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