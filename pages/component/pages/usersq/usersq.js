var api = require("../../../../api.js"), t = (require("../../../../utils/util.js"), getApp()), o = !1;
import config from '../../../../config.js';
var app = getApp();

var i = '';
Page({
  data: {
    imgUrl: config.imgUrl,
    pid: 0,
    isphone: true,
    userData: '',
  },
  channelId: '',
  live_class_id: '',
  notAuthorized: function () {
    wx.navigateTo({
      url: "../../../../pages/index/index"
    });
  },
  odjToString(obj){
    let arr = []
    for(const k in obj){
      arr.push(`${k}=${obj[k]}`)
    }
    return arr.join('&')
  },
  onLoad: function (options) {
    this.options = options
    // if(options.chapterName){
    //   // 自主出题用
    //     this.live_class_id = options.live_class_id
    //     this.channelId = options.channelId
    // }
    // if(options.live_class_id){
    //   // 公开课用
    //     this.live_class_id = options.live_class_id
    //     this.channelId = options.channelId
    // }
    // if(options.videoId){
    //   // 视频分享码用
    //     this.videoId = options.videoId
    // }
    // if(options.courseId){
    //   // 课程详情用
    //     this.courseId = options.courseId
    // }

  },
  onReady: function () { },
  onShow: function () { },
  onHide: function () { },
  onUnload: function () { },
  onPullDownRefresh: function () { },
  onReachBottom: function () { },
  // 获取用户信息
  getUserProfile(){
    const session_key  = wx.getStorageSync('privateInfor').session_key
    const openid  = wx.getStorageSync('privateInfor').openid
    const unionid  = wx.getStorageSync('privateInfor').unionid
    wx.getUserProfile({
      desc: '请完善学员信息',
      success: (res) => {
        console.log(res)
        wx.request({
          url: api.user.login,
          method: "POST",
          header:{
            'organization-id':app.globalData.organizationId
           },
          data: {
            openid,
            session_key,
            unionid,
            encryptedData: res.encryptedData,
            iv: res.iv
          },
          success: (res)=>{
            console.log(res)
            if (res.data.code == 200) {
              this.setData({
                isphone: false,
              })
            }
          },
          complete: function (e) {
          }
        });
      },
      fail: function (error) {
        console.log(error)
      }
    })
  },
  getLogo: function (o) {
    var n = this;
    wx.showLoading({
      title: "加载中"
    }), wx.request({
      url: e.default.logo,
      method: "POST",
      header: {
        acctid: t.globalData.acct_id,
        "content-type": "application/x-www-form-urlencoded"
      },
      data: {
        acct_id: t.globalData.acct_id
      },
      success: function (e) {
        console.log(e);
        var t = e.data;
        wx.hideLoading(), 0 == t.errcode ? n.setData({
          logo: t.data
        }) : wx.showModal({
          title: "警告",
          content: t.errmsg,
          showCancel: !1
        });
      }
    });
  },
  // 取消
  cancelPhone() {

    this.setData({
      isphone: true
    })

    if (this.data.userCode == '77777') {
      this.registerBindExit();
    } else if (this.data.userCode == '88888') {
      this.loginBindExit();
    }
  },
  //获取手机号码
  getPhoneNumber(e) {
    console.log(e);
    var self = this, d = this.data;
    if ("getPhoneNumber:fail user deny" == e.detail.errMsg) {
      wx.showModal({
        title: "提示",
        showCancel: !1,
        content: "未授权",
        success: function (e) { }
      })
    } else {
      wx.request({
        url: api.user.bindPhone,
        method: "POST",
        header:{
          'organization-id':app.globalData.organizationId
         },
        data: {
          openid: wx.getStorageSync('privateInfor').openid,
          session_key: wx.getStorageSync('privateInfor').session_key,
          encryptedData: e.detail.encryptedData,
          iv: e.detail.iv,
        },
        success:  (res)=> {
          self.setData({
            isphone: !0
          });
          const {live_class_id,videoId,courseId,chapterName} = this.options
          // 公开课页面
          if(live_class_id){
            wx.reLaunch({
              url: `../live-class-room/live-class-room?${this.odjToString(this.options)}`
            });
          }
          // 视频分享码页面
          else if(videoId){
            wx.reLaunch({
              url: `../video-share/index?${this.odjToString(this.options)}`
            });
          }
          // 自主出题试卷页面
          else if(chapterName){
            wx.reLaunch({
              url: `../determinationIntro/determinationIntro?${this.odjToString(this.options)}`
            });
          }
          // 课程详情页面
          else if(courseId){
            wx.reLaunch({
              url: `../course-detail/course-detail?${this.odjToString(this.options)}`
            });
          }
          else{
            wx.reLaunch({
              url: '../../../../pages/index/index'
            });
          }
         
        }
      })
    }
  },
 getUserLoginInfo(){
  app.request({
    url: api.user.newLogin,
    data: {
      code: t,
      version: app.globalData.version
    },
    method: 'POST',
    success: function (e) {
      console.log(e);
      that.setData({
        region_type: e.data.param.region_type

      })
      // console.log(that.data.region_type)
      if (e.data.param.info_show) {
        app.globalData.info_show = 1;
      }
      if (e.code == '10001') {
        wx.showModal({
          title: "警告",
          content: e.message,
          showCancel: !1,
          success: function () {
            wx.reLaunch({
              url: '../index/index'
            })
          }
        })
      }
      wx.setStorageSync("user_info", {
        nickname: e.data.param.user_nicename,
        avatar_url: e.data.param.user_img,
        uid: e.data.param.uid,
        uuid: e.data.param.uuid,
        token: e.data.param.token,
        mobile: e.data.param.telphone,
        is_admin: e.data.param.is_admin,
        info_show: e.data.param.info_show
      });
      //增加本地存储管理员的信息；
      let local_admin = wx.getStorageSync("local_admin");
      if (typeof (local_admin) == "undefined" || local_admin == '' || e.data.param.is_admin == 1) {
        wx.setStorageSync("local_admin", {
          is_root: parseInt(e.data.param.is_admin) == 1 ? 1 : 0,
          is_uid: e.data.param.uid,
          is_token: e.data.param.token,
          is_uuid: e.data.param.uuid
        });
      }

    },
    fail: function (e) {
      wx.showModal({
        title: "警告",
        content: e.msg,
        showCancel: !1
      });
    },
    complete: function () {
      return resolve()
    }
  })
 }
});