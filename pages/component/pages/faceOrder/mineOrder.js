let app = getApp(),
  api = require("../../../../api.js"),
  util = require("../../../../utils/util.js")
Page({
  /**
   * 页面的初始数据
   */
  data: {
    status: -2,
    isFail: '0',
    // courseId: '',
    tabId: '0',
    courseInfor: [],
    navH: '',
    chapterName: '我的预约',
    topSelect: [{
        name: '全部预约',
        id: '0',
        isFail: '0',
        status: -2
      },
      {
        name: '待上课',
        id: '1',
        isFail: '0',
        status: 1
      },
      {
        name: '待确认',
        id: '2',
        isFail: '0',
        status: 0
      },
      {
        name: '已签到',
        id: '3',
        isFail: '0',
        status: 2
      },
      {
        name: '已失约',
        id: '4',
        isFail: '1',
        status: 3
      },
      {
        name: '已取消',
        id: '5',
        isFail: '0',
        status: -1
      }
    ],
    hidden: false,
    page: 1,
    size: 20,
    hasMore: true,
    hasRefesh: false
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      navH: app.globalData.navHeight,
      subscribeId: options.subscribeId
    })
    console.log(options)
    this.getMySubscribe()
  },
  gobefor(e) {
    wx.reLaunch({
      url: '../faceTeach/faceTeach',
    })
  },
  //加载更多
  loadMore: function(e) {
    console.log(2222)
   
    that.setData({
    hasRefesh:true,});
    // if (!this.data.hasMore) return
    
    let that = this
    let option = {
      page: 2,
      status: this.data.status,
    }
    app.encryption({
      url: api.default.getMySubscribe,
      method: "GET",
      data: option,
      success: function (res) {
        console.log(res)
        // let arr = []
        // arr.push(res.info)
        let list = res.list
        for (let k in list) {
          list[k].close_time = util.js_date_time(list[k].close_time);
        }
        that.setData({
          courseInfor: list ? list : []
        })
      },
      fail: function (t) {

      },
      complete: function () {

      }
    })


    // var url = 'http://v.juhe.cn/weixin/query?key=f16af393a63364b729fd81ed9fdd4b7d&pno='+(++that.data.page)+'&ps=10';
    // network_util._get(url,
    // function(res){
    // that.setData({
    // list: that.data.list.concat(res.data.result.list),
    // hidden: true,
    // hasRefesh:false,
    // });
    // },function(res){
    // console.log(res);
    // })
   },
 //刷新处理
refesh: function(e) {
 
  var that = this;
  that.setData({
  hasRefesh:true,
  });
  // var url = 'http://v.juhe.cn/weixin/query?key=f16af393a63364b729fd81ed9fdd4b7d&pno=1&ps=10';
  // network_util._get(url,
  // function(res){
  // that.setData({
  // list:res.data.result.list,
  // hidden: true,
  // page:1,
  // hasRefesh:false,
  // });
  // },function(res){
  // console.log(res);
  // })
 },
  //我的预约列表
  getMySubscribe() {
    let that = this
    let option = {
      page: 1,
      status: this.data.status,
    }
    app.encryption({
      url: api.default.getMySubscribe,
      method: "GET",
      data: option,
      success: function (res) {
        console.log(res)
        // let arr = []
        // arr.push(res.info)
        let list = res.list
        for (let k in list) {
          list[k].close_time = util.js_date_time(list[k].close_time);
        }
        that.setData({
          courseInfor: list ? list : []
        })
      },
      fail: function (t) {

      },
      complete: function () {

      }
    })
  },
  //tab点击事件
  tabFun(e) {
    let id = e.currentTarget.dataset.key.id;
    let isFail = e.currentTarget.dataset.key.isFail;
    let status = e.currentTarget.dataset.key.status;
    this.setData({
      isFail: isFail,
      status: status
    })
    this.getMySubscribe(this.data.courseId)
    this.setData({
      tabId: id,
    });
  },
  //跳转到详情界面
  tofaceDetail(e) {
    let subscribe_classroom_id = e.currentTarget.dataset.subscribe_classroom_id
    wx.navigateTo({
      url: `../faceDetail/faceDetail?subscribe_classroom_id=${subscribe_classroom_id}`
    })
  },

})