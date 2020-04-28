var e = require("../../api.js"), a = getApp(), t = {
    init: function(t) {
        var s = this;
        s.page = t, s.page.share = function(e) {
            var a = e.currentTarget.dataset.index, t = s.page.data.hide, r = s.page.data.video_list[a], i = wx.createVideoContext("video_" + t);
            i.seek(0), i.pause(), s.page.setData({
                share: r,
                share_show: !0,
                hide: -1
            });
        }, s.page.share_1 = function(e) {
            var a = s.page.data.video;
            s.page.setData({
                share: a,
                share_show: !0
            });
            var t = wx.createVideoContext("video");
            t.seek(0), t.pause();
        }, s.page.share_cancel = function(e) {
            s.page.setData({
                share_show: !1
            });
        }, s.page.share_b = function(t) {
            wx.showLoading({
                title: "海报生成中"
            }), a.request({
                url: e.default.share,
                method: "POST",
                data: {
                    video_id: s.page.data.share.id
                },
                success: function(e) {
                    wx.hideLoading(), 0 == e.code ? wx.previewImage({
                        current: e.data.url,
                        urls: [ e.data.url ]
                    }) : (s.page.setData({
                        isshare: !0,
                        share_text: e.msg
                    }), setTimeout(function() {
                        s.page.setData({
                            isshare: !1
                        });
                    }, 1500));
                },
                complete: function() {}
            });
        };
    }
};

module.exports = t;