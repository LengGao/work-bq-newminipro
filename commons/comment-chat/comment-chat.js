var e = require("../../api.js"), t = getApp(), a = {
    init: function(a) {
        var i = this;
        i.page = a, i.page.show = function(e) {
            if (wx.createVideoContext("video").pause(), 1 != wx.getStorageSync("user_info").is_comment) {
                var t = e.currentTarget.dataset.id, a = "发表评论";
                0 != t && (a = "回复@" + e.currentTarget.dataset.name + "的评论"), t != i.page.data.c_id && i.page.setData({
                    content: ""
                }), i.page.setData({
                    show: !0,
                    c_id: t,
                    name: a,
                    focus: !0
                });
            } else wx.showModal({
                title: "提示",
                content: "您已被管理员禁言！若要解除，请联系管理员",
                showCancel: !1
            });
        }, i.page.input = function(e) {
            var t = e.detail.value;
            i.page.setData({
                content: t
            });
        }, i.page.hide = function(e) {
            i.page.setData({
                show: !1
            });
        }, i.page.chooseImg = function(a) {
            var o = i.page.data.img_list, n = o.length;
            n >= 5 || wx.chooseImage({
                count: 5 - n,
                sizeType: [ "compressed" ],
                sourceType: [ "album" ],
                success: function(n) {
                    function s(t) {
                        return t == o.length ? d() : t >= 5 ? d() : void wx.uploadFile({
                            url: e.default.upload_img,
                            filePath: o[t],
                            name: "image",
                            complete: function(e) {
                                if (200 == e.statusCode) {
                                    var a = JSON.parse(e.data);
                                    0 == a.code && (c = c.concat(a.data.url));
                                }
                                return ++t != o.length ? s(t) : d();
                            }
                        });
                    }
                    function d() {
                        t.request({
                            url: e.user.comment,
                            method: "POST",
                            data: {
                                video_id: i.page.data.video_id,
                                c_id: 0,
                                content: "",
                                upload_img: JSON.stringify(c),
                                form_id: 0
                            },
                            success: function(e) {
                                if (wx.hideLoading(), 0 == e.code) {
                                    var t = e.maxid, a = e.store_id;
                                    setTimeout(function() {
                                        i.page.sendSocketMessage(i.page.data.video_id, t, a);
                                    }, 2e3), i.page.hide(), i.page.setData({
                                        img_list: [],
                                        content: "",
                                        page: 1
                                    });
                                } else 2 == e.code && wx.showModal({
                                    title: "提示",
                                    content: e.msg,
                                    showCancel: !1
                                });
                            }
                        });
                    }
                    o = o.concat(n.tempFilePaths);
                    var c = [];
                    i.page.setData({
                        focus: !1
                    });
                    a.detail.formId;
                    0 != o.length && (wx.showLoading({
                        title: "正在提交",
                        mask: !0
                    }), s(0));
                }
            });
        }, i.page.deleteImg = function(e) {
            wx.showModal({
                title: "提示",
                content: "是否删除图片？",
                success: function(t) {
                    if (t.confirm) {
                        var a = e.currentTarget.dataset.index, o = i.page.data.img_list;
                        o.splice(a, 1), i.page.setData({
                            img_list: o
                        });
                    }
                }
            });
        }, i.page.submit = function(a) {
            function o(t) {
                return t == s.length ? n() : t >= 5 ? n() : void wx.uploadFile({
                    url: e.default.upload_img,
                    filePath: s[t],
                    name: "image",
                    complete: function(e) {
                        if (200 == e.statusCode) {
                            var a = JSON.parse(e.data);
                            0 == a.code && (d = d.concat(a.data.url));
                        }
                        return ++t != s.length ? o(t) : n();
                    }
                });
            }
            function n() {
                t.request({
                    url: e.user.comment,
                    method: "POST",
                    data: {
                        video_id: i.page.data.video_id,
                        c_id: i.page.data.c_id,
                        content: i.page.data.content,
                        upload_img: JSON.stringify(d),
                        form_id: g
                    },
                    success: function(e) {
                        if (wx.hideLoading(), 0 == e.code) {
                            var t = e.maxid, a = e.store_id, o = wx.getStorageSync("user_info"), n = (i.page.data.comment_list, 
                            []);
                            n.push(o.avatar_url), n.push(o.nickname), n.push(c), n.join(","), i.page.sendSocketMessage(i.page.data.video_id, t, a), 
                            i.page.hide(), i.page.setData({
                                img_list: [],
                                content: "",
                                page: 1
                            });
                        } else 2 == e.code && wx.showModal({
                            title: "提示",
                            content: e.msg,
                            showCancel: !1
                        });
                    }
                });
            }
            var s = i.page.data.img_list, d = [];
            i.page.setData({
                focus: !1
            });
            var c = i.page.data.content, g = a.detail.formId;
            c || 0 != s.length ? (wx.showLoading({
                title: "正在提交",
                mask: !0
            }), o(0)) : wx.showModal({
                title: "提示",
                content: "请输入内容或上传图片",
                showCancel: !1
            });
        };
    }
};

module.exports = a;