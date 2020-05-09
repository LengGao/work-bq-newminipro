// pages/answerCard/answerCard.js
let app = getApp(), api = require("../../api.js")
Page({
  /**
   * 页面的初始数据
   */
  data: {
    multipleNum:'',
    singleNum:'',
    judgmentNum:'',
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
  goToTest(){
    wx.redirectTo({
      url: "../test/test"
    })
  },
  generalScoring(id,type,courseId){
    let that = this
    let option = {
      id:parseInt(id),
      courseId: parseInt(courseId) ,
      type: type 
    }
    console.log(option)
    app.encryption({
      url: api.default.generalScoring,
      method: "GET",
      data: option,
      success: function (res) {
      console.log(res)
      let nums1 =  'topmenu[0].number'
      let nums2 =  'topmenu[1].number'
      let nums3 =  'topmenu[2].number'
      that.setData({
        [nums1]:res.rightNum,
        [nums2]:res.errorNum,
        [nums3]:res.notDoneNum,
        singleNum:res.single,
        multipleNum:res.multiple,
        judgmentNum:res.judgment
      })
      if( typeof(res.data) != 'undefined'){
        console.log('1')
      }else {
        console.log('2')
      for(let i  of  singleNum )
      {
        for( let j of res.single)
        {
          if( i.problemId == j.problemId ){
            i.correct = j.rightStatus
         }
        }
      }
      for(let i  of  multipleNum )
      {
        for( let j of res)
        {
          if( i.problemId == j.problemId){
            i.correct = j.rightStatus
        }
        }
      }
      for(let i  of  judgmentNum )
      {
        for( let j of res)
        {
          if( i.problemId == j.problemId){
            i.correct = j.rightStatus
        }
        }
      }  
      that.setData({
        multipleNum:multipleNum,
        singleNum:singleNum,
        judgmentNum:judgmentNum 
      })
    }
      },
      fail: function (t) {
        return reject()
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
     this.generalScoring(options.id , options.type,options.courseId)
      
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