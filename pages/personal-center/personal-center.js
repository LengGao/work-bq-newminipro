var app = getApp(),
  api = require("../../api.js"),
  n = require("../tab-bar/tab-bar.js");

Page({
  data: {
    user_info: {},
    info: {},
    funsel:[
      {
        url:'https://minproimg.oss-cn-hangzhou.aliyuncs.com/images/banji.png',
        name:'我的班级'
      },
      {
        url:'https://minproimg.oss-cn-hangzhou.aliyuncs.com/images/xiazai.png',
        name:'收藏夹'
      },
      {
        url:'https://minproimg.oss-cn-hangzhou.aliyuncs.com/images/xuexibaogao.png',
        name:'学习报告'
      },
     
      {
        url:'https://minproimg.oss-cn-hangzhou.aliyuncs.com/images/goumaijilu.png',
        name:'购买记录'
      },
    ],
    funlist:[
      {
        url:'https://minproimg.oss-cn-hangzhou.aliyuncs.com/images/xiugaiziliao.png',
        tosome:'',
        name:'个人资料',
        option:['身份证、','毕业证']
      },
      // {
      //   url:'https://minproimg.oss-cn-hangzhou.aliyuncs.com/images/wodekaoshi.png',
      //   tosome:'',
      //   name:'我的考试',
      //   option:['考试时间、','地点、','科目']
      // },
      // {
      //   url:'https://minproimg.oss-cn-hangzhou.aliyuncs.com/images/jifentongji.png',
      //   tosome:'',
      //   name:'积分统计',
      // },
      {
        url:'https://minproimg.oss-cn-hangzhou.aliyuncs.com/images/xitongshezhi.png',
        tosome:'',
        name:'系统设置',
      },
      {
        url:'https://minproimg.oss-cn-hangzhou.aliyuncs.com/images/yijianfankui.png',
        tosome:'../problem/problem',
        name:'意见反馈',
      },
      {
        url:'https://minproimg.oss-cn-hangzhou.aliyuncs.com/images/lianxikefu.png',
        tosome:'',
        name:'联系客服',
      }
    ]
  },
  onLoad: function (e) {
    n.tabbar("tabBar", 0, this, "usercenter");
    var t = wx.getStorageSync("user_info");
    console.log(t)
    this.setData({
      user_info: t
    });
  },
  onReady: function () { },
  onShow: function () {
    // wx.getStorageSync('session_key') && this.userCenter();
    this.userCenter();
  },
  onHide: function () { },
  onUnload: function () { },
  onPullDownRefresh: function () { },
  onReachBottom: function () { },
  onShareAppMessage: function () {
    return {
      path: "/pages/index/index?pid=" + wx.getStorageSync("user_info").user_id
    };
  },
  userCenter: function () {
      //     wx.login({
      //         success: function(n) {
      //             if (n.code) {
      //                 var t = n.code;
      //                 console.log(n)

      //     app.request({
      //       url: api.user.newLogin,
      //       data:{code:t},
      //       method:'POST',
      //       dataType:'',
      //       success: function(e) {
      //         console.log(e)
      //      },
      //     fail: function(e) {
      //         wx.showModal({
      //             title: "警告",
      //             content: e.msg,
      //             showCancel: !1
      //         });
      //     },
      //     complete: function() {
      //         wx.hideLoading();
      //     }
      //     })    
      //   }
      // }
    // })
},
  tabBarRedirect: function (e) {
    wx.redirectTo({
      url: e.currentTarget.dataset.url
    });
  },
  doClose() {
    let self = this;
    wx.clearStorage({
      success() {
        wx.showToast({
          title: '退出成功',
        })
        self.onLoad();
      },
    })
  },
});