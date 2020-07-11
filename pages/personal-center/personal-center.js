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
        name:'我的班级',
        action:'myclass'
      },
      {
        url:'../../imgs/alarm.png',
        name:'面授约课',
        action:'likes'
      },
      {
        url:'https://minproimg.oss-cn-hangzhou.aliyuncs.com/images/xuexibaogao.png',
        name:'学习报告',
        action:'learns'
      },
      {
        url:'https://minproimg.oss-cn-hangzhou.aliyuncs.com/images/goumaijilu.png',
        name:'购买记录',
        action:'recorders'
      },
    ],
    funlist:[
      {
        url:'https://minproimg.oss-cn-hangzhou.aliyuncs.com/images/xiugaiziliao.png',
        tosome:'../personalInfor/personalInfor',
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
        tosome:'../switchScore/switchScore',
        name:'提醒设置',
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
        id:1
      }
    ]
  },
  recorders() {
    let courseId = this.data.courseId
    wx.navigateTo({
      url: `../buyStatus/buyStatus?courseId=${courseId}`
    })
  },
  learns() {
    let id = this.data.courseId
    console.log(id)
    wx.navigateTo({
      url: `../learnStatus/learnStatus?courseId=${id}`
    })
  },
  likes() {
    let courseId = this.data.courseId
    console.log(courseId)
    this.getSubscribePower(courseId)
  
  },
  myclass() {
    let courseId = this.data.courseId
    wx.navigateTo({
      url: `../Myclass/Myclass?courseId=${courseId}`
    })
  },
  onLoad: function (e) {
    n.tabbar("tabBar", 0, this, "usercenter");
    var t = wx.getStorageSync("user_info");
    if(app.globalData.info_show  == 1){
      this.data.funlist.splice(0,1)
    }
    this.setData({
      funlist:this.data.funlist
    })
   
    this.setData({
      user_info: t,
      courseId: wx.getStorageSync("courseId").courseId
    });
  },
  //获得约课权限
  getSubscribePower(courseId){
    let option = {
      courseId:wx.getStorageSync('courseId').courseId
    }
    console.log(option)
    app.encryption({
      url: api.default.getSubscribePower,
      data: option,
      method: 'GET',
      success: function (res) {
        
        console.log(res)  
        if(res.data.code!=200){
          wx.showModal({
        title: '提示',
        content: '你还不是正式学员，请购买课程后再预约面授课!',
        showCancel: true,//是否显示取消按钮
        cancelText: "返回",//默认是“取消”
        cancelColor: '#199FFF',//取消文字的颜色
        confirmText: "发现好课",//默认是“确定”
        confirmColor: '#199FFF',//确定文字的颜色
        success (res) {
          if (res.confirm) {
            
           wx.navigateTo({
             url: '../index/index',
           })
          } else if (res.cancel) {
            wx.navigateBack({
              delta: 1
            })
          }
      }
    })
        }else{
            wx.navigateTo({
                 url: `../faceTeach/faceTeach?number=2&courseId=${courseId}`
               })
        }      
      },
      fail: function (n) {
        console.log('333333')
      }
    })
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
    wx.reLaunch({
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