// pages/dailyChallenge/dailyChallenge.js
let app = getApp(), api = require("../../api.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    directions: [
      {
        name: '每天可以多次刷题挑战，00:00更新挑战榜'
      },
      {
        name: '每次挑战包括30个题目，涉及多个知识点'
      },
      {
        name: '挑战题型多样, 全部答完才可提交挑战'
      },
      {
        name: '完成后可以查看解析, 也可以邀请好友参加挑战'
      },
    ],
    everyDate: [
      {
        name: '15:30',
        title: '挑战用时',
      
      },
      {
        name: '120',
        title: '挑战得分',
      
      },
      {
        name: '68',
        title: '挑战排名'
      }
    ],
  },
  gopaihang(){
    let courseId = this.data.courseId
    wx.navigateTo({
      url:`../challengRate/challengRate?courseId=${courseId}`
    })
  },
  startChallenge(){
    let id = this.data.courseId
    wx.reLaunch({
      url: `../challengPri/challengPri?courseId=${id}`
    })
  },
  goback(){  
    wx.reLaunch({
      url: '../index/index'
    })
  },
  MyRankeEdition(){
    var that = this;
    wx.showLoading({
        title: "加载中"
    });
    let option = {
        courseId:that.data.courseId
    }
    console.log(option)
    app.encryption({
        url: api.default.MyRankeEditions,
        method: "GET",
        data:option,
        success: function(res) {
          console.log(res)
          let data = that.data.userInfo
          let userInfo0 = 'everyDate[0].name'
          let userInfo1 = 'everyDate[1].name'
          let userInfo2 = 'everyDate[2].name'
          if(res.data == undefined){
            that.setData({
              [userInfo0]:res.consumeTime,
              [userInfo1]:res.mark,
              [userInfo2]:res.num
            })
          }
        },
        fail: function(t) {
            wx.showModal({
                title: "警告",
                content: t.errmsg,
                showCancel: !1
            });
        },
        complete: function() {
            wx.hideLoading(); 
        }
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      navH: app.globalData.navHeight,
      courseId:options.courseId
    })
    this.MyRankeEdition()
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
  onShareAppMessage: function (res) {
    // var _this = this;

    // if (res.from === 'button') {
    // }
    // return {
    //   title: "您好，这是我的名片，望惠存",
    //   path: "pages/TaCard/TaCard?objectId=" + _this.data.objectId + '&vrTag=' + _this.data.vrTag + '&imageUrl=' + _this.data.imageUrl + '&memberId=' + _this.data.memberId,
    //   imageUrl: _this.data.imageUrl,
    //   success: function (shareTickets) {
    //     console.info(shareTickets + '成功');
    //     // 转发成功
    //   },
    //   fail: function (res) {
    //     console.log(res + '失败');
    //     // 转发失败
    //   },
    //   complete:function(res){
    //     console.log('xiixixixixixi')
    //   }
    // }
    return {
      title: '东培学堂',
      path: 'pages/challengResult/challengResult?courseId=17',
      imageUrl:'',
      success: function (shareTickets) {
        console.info(shareTickets + '成功');
        // 转发成功
      },
      fail: function (res) {
        console.log(res + '失败');
        // 转发失败
      },
      complete:function(res){
        console.log('xiixixixixixi')
      }
    }
  }
})