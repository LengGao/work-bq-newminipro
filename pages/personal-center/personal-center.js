var app = getApp(),
    api = require("../../api.js"),
    n = require("../tab-bar/tab-bar.js"),
    courseId = wx.getStorageSync("courseId").courseId
Page({
  data: {
    user_info: {},
    local_admin:wx.getStorageSync('local_admin'),
    info: {},
    funsel: [
      {
        url: 'https://minproimg.oss-cn-hangzhou.aliyuncs.com/images/banji.png',
        name: '我的班级',
        action: 'myclass'
      },
      {
        url: 'http://minproimg.oss-cn-hangzhou.aliyuncs.com/images/imgs/alarm.png',
        name: '面授约课',
        action: 'likes'
      },
      {
        url: 'https://minproimg.oss-cn-hangzhou.aliyuncs.com/images/xuexibaogao.png',
        name: '学习报告',
        action: 'learns'
      },
      {
        url: 'https://minproimg.oss-cn-hangzhou.aliyuncs.com/images/goumaijilu.png',
        name: '自主出题',
        action: 'recorders'
      },
    ],
    funlist: [
      {
        url: 'https://minproimg.oss-cn-hangzhou.aliyuncs.com/images/xiugaiziliao.png',
        tosome: '../component/pages/personalInfor/personalInfor',
        name: '个人资料',
        option: ['身份证、', '毕业证']
      },
      // {
      //   url: `https://minproimg.oss-cn-hangzhou.aliyuncs.com/images/goumajilsu.png`,
      //   tosome: `../component/pages/buyStatus/buyStatus?courseId=${courseId}`,
      //   name: '购买记录'
      // },
      {
        url: 'https://minproimg.oss-cn-hangzhou.aliyuncs.com/images/xitongshezhi.png',
        tosome: '../component/pages/switchScore/switchScore',
        name: '提醒设置',
      },
      {
        url: 'https://minproimg.oss-cn-hangzhou.aliyuncs.com/images/yijianfankui.png',
        tosome: '../component/pages/problem/problem',
        name: '意见反馈',
      },
      {
        url: 'https://minproimg.oss-cn-hangzhou.aliyuncs.com/images/lianxikefu.png',
        tosome: '',
        name: '联系客服',
        id: 1
      },
      // {
      //   url: 'https://minproimg.oss-cn-hangzhou.aliyuncs.com/images/yijianfankui.png',
      //   tosome: '../component/pages/polyv-test/polyv-test',
      //   name: '视频polyv',
      // },
    ],
    adminList:[{
      url: 'https://minproimg.oss-cn-hangzhou.aliyuncs.com/images/swicth.png',
      tosome: '../component/pages/switchUser/switchUser',
      name: '切换账户',
      option: ['仅管理员可用'],
    }]
  },
  recorders() {
    let courseId = this.data.courseId
    wx.navigateTo({
      url: `../component/pages/determination/determination?courseId=${courseId}`
    })
  },
  learns() {
    let id = this.data.courseId
    console.log(id)
    wx.navigateTo({
      url: `../component/pages/learnStatus/learnStatus?courseId=${id}`
    })
  },
  likes() {
    let courseId = this.data.courseId
    console.log(courseId)
    wx.navigateTo({
      url: `../component/pages/faceTeach/faceTeach?number=2&courseId=${courseId}`
    })
    //  this.getSubscribePower(courseId)
  },
  myclass() {
    let courseId = this.data.courseId
    wx.navigateTo({
      url: `../component/pages/Myclass/Myclass?courseId=${courseId}`
    })
  },
  onLoad: function (e) {
    n.tabbar("tabBar", 0, this, "usercenter");
    var t = wx.getStorageSync("user_info");
 console.log(t.mobile)
 let mobile = t.mobile
    if (mobile) {
      //使用正则
   var ab=   mobile.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
  }
  t.mobile = ab
  
    if (app.globalData.info_show == 1) {
      this.data.funlist.splice(0, 1)
    }
    this.setData({
      funlist: this.data.funlist
    })
    console.log(t)
    courseId =  wx.getStorageSync("problem_course_id").problem_course_id
    this.setData({
      user_info: t,
      courseId: wx.getStorageSync("problem_course_id").problem_course_id
    });
  },
  //获得约课权限
  getSubscribePower(courseId) {
    let option = {
      courseId: wx.getStorageSync('courseId').courseId
    }
    console.log(option)
    app.encryption({
      url: api.default.getSubscribePower,
      data: option,
      method: 'GET',
      success: function (res) {
        console.log(res)
        if (res.data.code != 200) {
          wx.showModal({
            title: '提示',
            content: '你还不是正式学员，请购买课程后再预约面授课!',
            showCancel: true,//是否显示取消按钮
            cancelText: "返回",//默认是“取消”
            cancelColor: '#199FFF',//取消文字的颜色
            confirmText: "发现好课",//默认是“确定”
            confirmColor: '#199FFF',//确定文字的颜色
            success(res) {
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
        } else {
          wx.navigateTo({
            url: `../component/pages/faceTeach/faceTeach?number=2&courseId=${courseId}`
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
    // this.userCenter();
  },
  onHide: function () { },
  onUnload: function () { },
  onPullDownRefresh: function () { },
  onReachBottom: function () { },
  onShareAppMessage: function () {
    return {
      path: "/pages/index/index?"
    };
    // return {
    //   path: "../component/pages/index/index?pid=" + wx.getStorageSync("user_info").user_id
    // };
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