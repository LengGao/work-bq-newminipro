var t = getApp(), n = require("../../api.js");

Page({
    data: {
        activity: []
    },
    onLoad: function(t) {
        this.getActivity();
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    getActivity: function() {
        var o = this;
        wx.showLoading({
            title: "加载中"
        }), t.request({
            url: n.activity.list,
            method: "POST",
            data: {},
            success: function(t) {
                0 == t.errcode && o.setData({
                    activity: t.data
                });
            },
            fail: function(t) {
                wx.showModal({
                    title: "警告",
                    content: t.msg,
                    showCancel: !1
                });
            },
            complete: function() {
                wx.hideLoading();
            }
        });
    }
});