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
  notAuthorized: function () {
    wx.navigateTo({
      url: "../../../../pages/index/index"
    });
  },
  onLoad: function (e) {
    // wx.getSync("store");
    // this.getLogo();

  },
  onReady: function () { },
  onShow: function () { },
  onHide: function () { },
  onUnload: function () { },
  onPullDownRefresh: function () { },
  onReachBottom: function () { },
  onGotUserInfo: function (n) {
    let self = this, dat = this.data;
    if (!n.detail.userInfo) return wx.showToast({
      title: "已拒绝"
    })
    var a = 0;
    if (wx.getStorageSync("tmp_options")) {
      var s = wx.getStorageSync("tmp_options");
      console.log(s), s.pid && (a = s.pid), s.scene && (i = decodeURIComponent(s.scene),
        i = t.str2Obj(i), a = i.pid ? i.pid : 0);
    }
    wx.login({
      success: function (res) {
        if (res.code) {
          var s = res.code;
          console.log(res),
            wx.showLoading({
              title: "登陆中"
            }),
            wx.getUserInfo({
              success: function (n) {
                console.log(n),
                  console.log(wx.getStorageSync('privateInfor').openid)
                wx.request({
                  url: api.user.login,
                  method: "POST",
                  data: {
                    openid: wx.getStorageSync('privateInfor').openid,
                    session_key: wx.getStorageSync('privateInfor').session_key,
                    encryptedData: n.encryptedData,
                    iv: n.iv
                  },
                  success: function (e) {
                    console.log(e);
                    var t = e.data;
                    if (e.data.code == 200) {
                      self.setData({
                        isphone: false,
                      })
                      // wx.setStorageSync("user_info", n.detail.userInfo);
                    }
                  },
                  complete: function (e) {
                    wx.hideLoading();
                  }
                });
              },
              fail: function (e) {
                wx.hideToast(), getApp().getauth({
                  content: "需要获取您的用户信息授权",
                  cancel: !0,
                  success: function (e) {
                    e && getApp().login_1();
                  }
                });
              }
            });
        } else wx.showToast({
          title: n.msg
        });
      },
      fail: function (e) {
        console.log(e);
      }
    });
  },
  // 获取用户信息
  getUserProfile(){
    const session_key  = wx.getStorageSync('privateInfor').session_key
    const openid  = wx.getStorageSync('privateInfor').openid
    wx.getUserProfile({
      desc: '用于完善学员信息',
      success: (res) => {
        wx.request({
          url: api.user.login,
          method: "POST",
          data: {
            openid,
            session_key,
            encryptedData: res.encryptedData,
            iv: res.iv
          },
          success: (e)=>{
            if (e.data.code == 200) {
              this.setData({
                isphone: false,
              })
            }
          },
          complete: function (e) {
          }
        });
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
        data: {
          openid: wx.getStorageSync('privateInfor').openid,
          session_key: wx.getStorageSync('privateInfor').session_key,
          encryptedData: e.detail.encryptedData,
          iv: e.detail.iv,
        },
        success: function (res) {
          console.log(res)
          self.setData({
            isphone: !0
          });
          wx.reLaunch({
            url: '../../../../pages/index/index'
          });
        }
      })
    }
  },

});