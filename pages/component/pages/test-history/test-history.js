var t = getApp(), e = require("../../../../api.js");

Page({
    data: {
        flowarray: ["章节测试卷1", "章节测试卷2", "模拟测试2"],
        subject_list: [],
        paper_list: [],
        index: 0
    },
    flowChange: function (t) {
        this.setData({
            index: t.detail.value
        });
    },
    onLoad: function (t) { },
    onReady: function () { },
    onShow: function () {
        this.mySubjectDolog();
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
    mySubjectDolog: function () {
        var o = this;
        wx.showLoading({
            title: "加载中"
        }), t.request({
            url: e.paper.my_subject_dolog,
            method: "POST",
            data: {},
            success: function (t) {
                0 == t.errcode && (o.setData({
                    subject_list: t.data
                }), o.myPaperDolog());
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
    myPaperDolog: function () {
        var o = this;
        wx.showLoading({
            title: "加载中"
        }), t.request({
            url: e.paper.my_paper_dolog,
            method: "POST",
            data: {
                subject_id: o.data.subject_list[o.data.index].subject_id
            },
            success: function (t) {
                0 == t.errcode && o.setData({
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