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
    noContent:false,
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
  loadMore() {
    this.getMySubscribe()
   },
 //刷新处理
refesh() {
  this.setData({
    hasRefesh: true,
    page: 1,
    hasMore: true,
  });
  this.getMySubscribe()
 },
  //我的预约列表
  getMySubscribe() {
    let that = this
    if (!this.data.hasMore) return
    if(this.data.page==1){
      this.setData({
        hasRefesh: false,
      });
    }else{
      this.setData({
        hasRefesh: true,
      });
    }
    this.setData({
      hidden:false
    })
    let option = {
      page: 1,
      status: this.data.status,
    }
    app.encryption({
      url: api.default.getMySubscribe,
      method: "GET",
      data: option,
      success: function (res) {
        let total = res.total
        let pageNum = Math.ceil(total / 20)
        that.setData({
          hidden:true
        })
        console.log(res)
        let list = res.list
        for (let k in list) {
          list[k].close_time = util.js_date_time(list[k].close_time);
        }
        if(pageNum<2){
          that.setData({
            courseInfor: list ? list : [],
            hasRefesh: false,
            pageNum: pageNum, 
            hasMore:false,
            noContent:false ,
            page: that.data.page + 1
          })
         }
         if (that.data.page == 1) {
          that.setData({
            courseInfor: list ? list : [],
            hasRefesh: false,
            pageNum: pageNum, 
            page: that.data.page + 1
          })
        } else if (that.data.page > 1 && that.data.page <= pageNum) {
          console.log(worongTitle)
          if (that.data.page == pageNum) {
            that.setData({
              hasMore: false,
              noContent:true 
            })
          }
          that.setData({
            courseInfor: that.data.courseInfor.concat( list ),
            hasRefesh: false,
            pageNum: pageNum,
            page: that.data.page + 1
          })
        
        }
        // that.setData({
        //   courseInfor: list ? list : []
        // })
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
      status: status,
      page: 1,
      hasMore:true,
      hasRefesh: false
    })
    console.log(this.data.status)
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