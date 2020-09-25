var t = getApp(), e = require("../../../../api.js");

Page({
    data: {
        index: 0,
        subject_list: [],
        paper_list: []
    },
    flowChange: function (t) {
        this.setData({
            index: t.detail.value
        }), this.mycollectPaper();
    },
    onLoad: function (t) { },
    onReady: function () { },
    onShow: function () {
        this.mycollectSubject();
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
    mycollectSubject: function () {
        var n = this;
        wx.showLoading({
            title: "加载中"
        }), t.request({
            url: e.paper.my_collect_subject,
            method: "POST",
            data: {},
            success: function (t) {
                0 == t.errcode && (n.setData({
                    subject_list: t.data
                }), n.mycollectPaper());
            },
            fail: function (t) {
                wx.showModal({
                    title: "警告",
                    content: t.errmsg,
                    showCancel: !1
                });
            },
            complete: function () {
                wx.hideLoading();
            }
        });
    },
    mycollectPaper: function () {
        var n = this;
        wx.showLoading({
            title: "加载中"
        }), t.request({
            url: e.paper.my_collect_paper,
            method: "POST",
            data: {
                subject_id: n.data.subject_list[n.data.index].subject_id
            },
            success: function (t) {
                0 == t.errcode && n.setData({
                    paper_list: t.data
                });
            },
            fail: function (t) {
                wx.showModal({
                    title: "警告",
                    content: t.errmsg,
                    showCancel: !1
                });
            },
            complete: function () {
                wx.hideLoading();
            }
        });
    }
});