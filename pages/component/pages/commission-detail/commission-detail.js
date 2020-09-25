var n = getApp(), o = require("../../../../api.js");

Page({
    data: {
        commission_list: []
    },
    onLoad: function (n) { },
    onReady: function () { },
    onShow: function () {
        this.getCommissionList();
    },
    onHide: function () { },
    onUnload: function () { },
    onPullDownRefresh: function () { },
    onReachBottom: function () { },
    onShareAppMessage: function () {
        return {
            path: "../../../../pages/index/index?pid=" + wx.getStorageSync("user_info").user_id
        };
    },
    getCommissionList: function () {
        var i = this;
        wx.showLoading({
            title: "加载中"
        }), n.request({
            url: o.user.commission_list,
            method: "POST",
            data: {},
            success: function (n) {
                0 == n.errcode && i.setData({
                    commission_list: n.data
                });
            },
            fail: function (n) {
                wx.showModal({
                    title: "警告",
                    content: n.errmsg,
                    showCancel: !1
                });
            },
            complete: function () {
                wx.hideLoading();
            }
        });
    }
});