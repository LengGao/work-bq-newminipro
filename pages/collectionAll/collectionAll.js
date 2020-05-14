// pages/collectionAll/collectionAll.js
let app = getApp();
let api = require("../../api.js")
Page({
  /**
   * 页面的初始数据
   */
  data: {
    topSelect:[
      {
        name:'收藏夹',
        id:'2'
      },
      {
        name:'错题集',
        id:'1'
      },
      {
        name:'做题历史',
        id:'0'
      }
    ],
    collectionList:null,
    hisdata:null,
    nodata:true,
    errornodata:true,
    nohisdata:true,
    tabArr: {
      curHdIndex: 1,
      curBdIndex: 1
    },
    chapter:[
      {
        charper:'2020年3月19日',
        list:[
          {
          name:'第一章信息化知识',
          rate:'27%',
          time:'10分5秒'
        }
      ]
      },
      {
        charper:'2020年3月20日',
        list:[{
          name:'第一章信息化知识',
          rate:'27%',
          time:'10分5秒'
        }]
      },
      {
        charper:'2020年3月21日',
        list:[{
          name:'第一章信息化知识',
          rate:'27%',
          time:'10分5秒'
        }]
      }
    ],
    catalist:[
      {
        charper:'第一章',
        name:'信息化知识',
        num:'5'
      },
      {
        charper:'第二章',
        name:'信息化知识',
        num:'15'
      },
      {
        charper:'第三章',
        name:'信息化知识',
        num:'25'
      }
    ],
    errordata:null
  },
  tabFun: function (t) {
    var e = t.target.dataset.id;
    console.log("----" + e + "----");
    var tab = {};
    tab.curHdIndex = e, tab.curBdIndex = e,
    this.setData({
      tabArr: tab
    });
  },
  ifShow(e) {
    let index = e.currentTarget.dataset.index;
    let d = this.data;
    d.collectionList[index].isShow = !d.collectionList[index].isShow;
    this.setData({
      collectionList: d.collectionList
    })
    console.log(this.data.collectionList)
  },
  Showif(e) {
    let index = e.currentTarget.dataset.index;
    let d = this.data;
    d.errordata[index].isShow = !d.errordata[index].isShow;
    this.setData({
      errordata: d.errordata
    })
    console.log(this.data.collectionList)
  },
  getCollection(){
    let that = this
    let option = {
      courseId: that.data.courseId
    }
    console.log(option)
    app.encryption({
      url: api.default.getCollection,
      method: "GET",
      data: option,
      success: function (res) {
        console.log(res)
        for(let i of res){
          app.testWxParse(that, i)
        }
        if( res.data != undefined && res.data.code == 30000){
          console.log('12313')
          that.setData({
            nodata:false
          })
        }else{
          that.setData({
            collectionList:res
          })
        }
      },
      fail: function (t) {
      },
      complete: function () {

      }
    })
  },
  getErrorTopicFeedbac(){
    let that = this
    let option = {
      courseId: that.data.courseId
    }
    console.log(option)
    app.encryption({
      url: api.default.getErrorTopicFeedbac,
      method: "GET",
      data: option,
      success: function (res) {
        console.log(res)
        for(let i of res){
          app.testWxParse(that, i)
        }
        if( res.data != undefined && res.data.code == 30000){
          console.log('2342324')
          that.setData({
            errornodata:false
          })
        }else{
          that.setData({
            errordata:res
          })
        }
      },
      fail: function (t) {
      },
      complete: function () {
      }
    })
  },
  getBehaviorLogList(){
    let that = this
    let option = {
      courseId: that.data.courseId,
      page:1
    }
    console.log(option)
    app.encryption({
      url: api.default.getBehaviorLogList,
      method: "GET",
      data: option,
      success: function (res) {
        console.log(res)
        // for(let i of res){
        //   app.testWxParse(that, i)
        // }
        if( res.data != undefined && res.data.code == 30000){
          console.log('2342324')
          that.setData({
            nohisdata:false
          })
        }else{
          that.setData({
            hisdata:res
          })
        }
      },
      fail: function (t) {
      },
      complete: function () {
      }
    })

  },
  select_date(t){
    let courseId = this.data.courseId
    wx.navigateTo({
        url: `../answerCardPir/answerCardPir?chapter_id=${t.currentTarget.dataset.cid}&courseId=${courseId}&type=${t.currentTarget.dataset.type}&name=${t.currentTarget.dataset.name}`
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    let  tabArr0 = 'tabArr.curHdIndex',tabArr1 = 'tabArr.curBdIndex'
    this.setData({
      courseId:options.courseId,
      [tabArr0]:options.number,
      [tabArr1]:options.number,     
    })
   this.getCollection(),
   this.getErrorTopicFeedbac()
   this.getBehaviorLogList()
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