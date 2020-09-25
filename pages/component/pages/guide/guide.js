var n = getApp(), t = require("../../../../api.js");
import config from '../../../../config.js';

Page({
    data: {
        imgUrl: config.imgUrl,
    },
    onLoad: function (n) {
        // this.getGuanzhu();
    },
    onReady: function () { },
    onShow: function () { },
    onHide: function () { },
    onUnload: function () { },
    onPullDownRefresh: function () { },
    onReachBottom: function () { },
    onShareAppMessage: function () {
        return {
            path: "../../../../pages/index/index?pid=" + wx.getStorageSync("user_info").user_id
        };
    },
    getGuanzhu: function () {
        var e = this;
        wx.showLoading({
            title: "加载中"
        }), n.request({
            url: t.default.guanzhu,
            method: "POST",
            data: {},
            success: function (n) {
                0 == n.errcode && e.setData({
                    guanzhu: n.data
                });
            },
            fail: function (n) {
                wx.showModal({
                    title: "警告",
                    content: n.msg,
                    showCancel: !1
                });
            },
            complete: function () {
                wx.hideLoading();
            }
        });
    }
});