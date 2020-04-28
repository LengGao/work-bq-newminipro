var t = getApp(), e = require("../../api.js");

Page({
    data: {
        id: 0,
        type: 0,
        paper_list: []
    },
    onLoad: function(t) {
      let paper_list = JSON.parse(decodeURIComponent(t.chapter));
      console.log(paper_list);
        this.setData({
          paper_list,
          id:t.id 
        })
        // wx.getStorageSync("rdsession") || (t && wx.setStorageSync("tmp_options", t), wx.navigateTo({
        //     url: "/pages/usersq/usersq"
        // })), t && (t.id && this.setData({
        //     id: t.id
        // }), t.type && this.setData({
        //     type: t.type
        // }));
    },
    onReady: function() {},
    onShow: function() {
        // this.getPaperList();
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    // onShareAppMessage: function() {
    //     var t = wx.getStorageSync("user_info");
    //     return {
    //         path: "/pages/chapter/chapter?id=" + this.data.id + "&type=" + this.data.type + "&pid=" + t.user_id
    //     };
    // },
    getPaperList: function() {
        var a = this;
        wx.showLoading({
            title: "加载中"
        }), t.request({
            url: e.paper.paper_list,
            method: "POST",
            data: {
                id: a.data.id,
                type: a.data.type
            },
            success: function(t) {
                0 == t.errcode && a.setData({
                    paper_list: t.data
                });
            },
            fail: function(t) {
                wx.showModal({
                    title: "警告",
                    content: t.errmsg,
                    showCancel: !1
                });
            },
            complete: function() {
                wx.hideLoading();
            }
        });
    }
});