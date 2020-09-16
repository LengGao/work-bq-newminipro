var t = getApp(), e = require("../../../../api.js"), a = require("../../../../wxParse/wxParse.js");

Page({
    data: {
        activity: {},
        id: 0,
        test_time: 30
    },
    onLoad: function (t) {
        wx.getStorageSync("rdsession") || (t && wx.setStorageSync("tmp_options", t), wx.navigateTo({
            url: "../usersq/usersq"
        })), t && t.id && this.setData({
            id: t.id
        }), this.getActivityDetail();
    },
    onReady: function () { },
    onShow: function () { },
    onHide: function () { },
    onUnload: function () { },
    onPullDownRefresh: function () { },
    onReachBottom: function () { },
    onShareAppMessage: function () {
        var t = this, e = wx.getStorageSync("user_info");
        return {
            title: t.data.activity.title,
            path: "../activity-details/activity-details?id=" + this.data.id + "&pid=" + e.user_id
        };
    },
    getActivityDetail: function () {
        var i = this;
        wx.showLoading({
            title: "加载中"
        }), t.request({
            url: e.activity.detail,
            method: "POST",
            data: {
                id: i.data.id
            },
            success: function (t) {
                if (0 == t.errcode) {
                    i.setData({
                        activity: t.data,
                        test_time: t.data.endjointime
                    }), i.setCountDown(), wx.setStorageSync("join_activity", t.data.join);
                    var e = t.data.detail + "<span> </span>";
                    a.wxParse("content", "html", e, i, 5);
                }
            },
            fail: function (t) {
                wx.showModal({
                    title: "警告",
                    content: t.msg,
                    showCancel: !1
                });
            },
            complete: function () {
                wx.hideLoading();
            }
        });
    },
    setCountDown: function () {
        var t = this, e = t.data.test_time;
        if ((e -= 1) > 0) {
            var a = t.getFormat(e), i = a.dd + "天" + a.hh + "时" + a.mm + "分" + a.ss + "秒";
            t.setData({
                test_time: e,
                formatTime: a,
                countDown: i
            }), setTimeout(t.setCountDown, 1e3);
        }
    },
    getFormat: function (t) {
        var e = parseInt(t), a = 0, i = 0, n = 0;
        return e > 60 && (a = parseInt(e / 60), e = parseInt(e % 60), a > 60 && (i = parseInt(a / 60),
            a = parseInt(a % 60), i > 24 && (n = parseInt(i / 24), i = parseInt(i % 24)))),
            e = e > 9 ? e : "0" + e, a = a > 9 ? a : "0" + a, i = i > 9 ? i : "0" + i, n = n > 9 ? n : "0" + n,
        {
            ss: e,
            mm: a,
            hh: i,
            dd: n
        };
    }
});