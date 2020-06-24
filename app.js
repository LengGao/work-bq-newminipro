var api = require("api.js"), wxParse = require("./wxParse/wxParse.js"); import crypto from './utils/common.util'
let app = getApp();
App({
    onLaunch: function () {
        let that = this
        var e = this, n = wx.getStorageSync("logs") || [];
        n.unshift(Date.now()), wx.setStorageSync("logs", n), wx.getSetting({
            success: function (n) {
                n.authSetting["scope.userInfo"] && wx.getUserInfo({
                    success: function (n) {
                        e.globalData.userInfo = n.userInfo, e.userInfoReadyCallback && e.userInfoReadyCallback(n);
                    }
                });
            }
        });
        wx.getSystemInfo({
            success: res => {
                //导航高度
                this.globalData.navHeight = res.statusBarHeight + 46;
            }, fail(err) {
                console.log(err);
            }
        })
        // 缓存
        wx.setStorageSync('school_id', 1);
    },
    // 新增school_id
    globalData: {
        userInfo: null,
        rdsession: "",
        acct_id: 1,
        openid: "",
        localSocket: {},
        school_id: 1,
        isIOS: wx.getSystemInfoSync().system.includes('iOS'),
        navHeight: 0,
        info_show:0
    },
    login: function () {
        is_login = !0,
            wx.checkSession({
                success: function () {
                    wx.getStorageSync("access_token") ? is_login = !1 : getApp().login_1();
                },
                fail: function () {
                    getApp().login_1();
                }
            });
    },
    getauth: function (e) {
        wx.navigateTo({
            url: "/pages/usersq/usersq"
        });
    },
    // 统一授权方法
    request: function (e) {
        e.data || (e.data = {});
        e.data.school_id = this.globalData.school_id;
        wx.request({
            url: e.url,
            data: e.data || {},
            method: e.method || "GET",
            dataType: e.dataType || "json",
            success: function (n) {
                // 错误码不为200去授权
                if (200 != n.data.code) {
                    wx.setStorageSync("privateInfor", {
                        openid: n.data.data.param.openid,
                        session_key: n.data.data.param.session_key
                    })
                    wx.reLaunch({
                        url: "/pages/usersq/usersq"
                    }), !1;
                }
                e.success && e.success(n.data);
            },
            fail: function (n) {
                var o = getApp();
                o.is_on_launch ? (o.is_on_launch = !1, wx.showModal({
                    title: "网络请求出错",
                    content: n.msg,
                    showCancel: !1,
                    success: function (n) {
                        n.confirm && e.fail && e.fail(n);
                    }
                })) : (wx.showToast({
                    title: n.msg,
                    image: "/images/icon-warning.png"
                }), e.fail && e.fail(n));
            },
            complete: function (n) {
                e.complete && e.complete(n);
            }
        });
    },
    // 统一加密解密请求
    encryption: function (e) {
        let uuid = wx.getStorageSync('user_info').uuid
        let token = wx.getStorageSync('user_info').token
        let key = 'c9ddd89b513f3385'
        let options = {}
        if (e.data) {
            e.data = crypto.encrypt(e.data, key, uuid);
            options = {
                param: e.data
            }
        }
        wx.request({
            url: e.url,
            header: {
                token: token,
                uuid: uuid
            },
            data: options,
            method: e.method || "GET",
            dataType: e.dataType || "json",
            success: function (n) {
               if(n.data.code==20001){
                wx.showToast({
                    title: '登陆状态已失效',//提示文字
                    duration:2000,//显示时长
                    mask:true,//是否显示透明蒙层，防止触摸穿透，默认：false  
                    icon:'none', //图标，支持"success"、"loading"  
                    success:function(){ 
                    },//接口调用成功
                    fail: function () { },  //接口调用失败的回调函数  
                    complete: function () { } //接口调用结束的回调函数  
                 })
               }
                let data
                if (n.data.data.length != undefined && n.data.data.length == 0 && n.data.data) {
                    e.success && e.success(n);
                } else {
                    data = crypto.decrypt(n.data.data['param'], key, uuid)
                    e.success && e.success(data);
                }
            },
            fail: function (n) {
                e.fail && e.fail(n);
            },
            complete: function (n) {
                e.complete && e.complete(n);
            }
        });
    },

    /***
    * 判断用户滑动
    * 左滑还是右滑
    */
    getTouchData(endX, endY, startX, startY) {
        let turn = "";
        if (endX - startX > 50 && Math.abs(endY - startY) < 50) {      //右滑
            turn = "right";
        } else if (endX - startX < -50 && Math.abs(endY - startY) < 50) {   //左滑
            turn = "left";
        }
        return turn;
    },
    testWxParse(self, objData) {
        let obj = objData || {};
        let d = self.data;
        let msgListArr = [];
        wxParse.wxParse("content", "html", obj.stem, self, 5); //标题
        wxParse.wxParse("analysis", "html", obj.analyse, self, 5);//分析
        // 拿
        obj.problem_stem_wx = d.content;
        obj.problem_analyse_wx = d.analysis;
        obj.content.forEach((val, index) => {
            wxParse.wxParse('content' + index, "html", val.content, self, 5);
            if (index == obj.content.length - 1) {
                wxParse.wxParseTemArray("WxParseListArr", 'content', obj.content.length, self);
            }
        })
        let listArr = d.WxParseListArr;
        listArr.forEach((item, index) => {
            obj.content[index].contentCopy = item;
            msgListArr.push(obj.content[index]);
        })
        obj.content = msgListArr;
        return obj;
    },
    testQuestionCom(self) {
        let d = self.data;
        d.question_list[d.current_no] = this.testWxParse(self, d.question_list[d.current_no]);
        self.setData({
            question_list: d.question_list,
        })

    },
});