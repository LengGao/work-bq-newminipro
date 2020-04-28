var e = require("../../api.js"), t = getApp(), a = {
    init: function(a) {
        var o = this;
        o.page = a, o.page.show = function(e) {
            if (wx.createVideoContext("video").pause(), 1 != wx.getStorageSync("user_info").is_comment) {
                var t = e.currentTarget.dataset.id, a = "发表评论";
                0 != t && (a = "回复@" + e.currentTarget.dataset.name + "的评论"), t != o.page.data.c_id && o.page.setData({
                    content: ""
                }), o.page.setData({
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
        }, o.page.input = function(e) {
            var t = e.detail.value;
            o.page.setData({
                content: t
            });
        }, o.page.hide = function(e) {
            o.page.setData({
                show: !1
            });
        }, o.page.chooseImg = function(a) {
            var i = o.page.data.img_list, n = i.length;
            n >= 5 || wx.chooseImage({
                count: 5 - n,
                success: function(n) {
                    function d(t) {
                        return t == i.length ? c() : t >= 5 ? c() : void wx.uploadFile({
                            url: e.default.upload_img,
                            filePath: i[t],
                            name: "image",
                            complete: function(e) {
                                if (200 == e.statusCode) {
                                    var a = JSON.parse(e.data);
                                    0 == a.code && (s = s.concat(a.data.url));
                                }
                                return ++t != i.length ? d(t) : c();
                            }
                        });
                    }
                    function c() {
                        t.request({
                            url: e.user.comment,
                            method: "POST",
                            data: {
                                video_id: o.page.data.video_id,
                                c_id: o.page.data.c_id,
                                content: "",
                                upload_img: JSON.stringify(s),
                                form_id: 0
                            },
                            success: function(e) {
                                wx.hideLoading(), 0 == e.code ? (o.page.loadComment(o.page.data.video_id), o.page.hide(), 
                                o.page.setData({
                                    img_list: [],
                                    content: "",
                                    page: 1
                                })) : 2 == e.code && wx.showModal({
                                    title: "提示",
                                    content: e.msg,
                                    showCancel: !1
                                });
                            }
                        });
                    }
                    i = i.concat(n.tempFilePaths);
                    var s = [];
                    o.page.setData({
                        focus: !1
                    });
                    a.detail.formId;
                    0 != i.length && (wx.showLoading({
                        title: "正在提交",
                        mask: !0
                    }), d(0));
                }
            });
        }, o.page.deleteImg = function(e) {
            wx.showModal({
                title: "提示",
                content: "是否删除图片？",
                success: function(t) {
                    if (t.confirm) {
                        var a = e.currentTarget.dataset.index, i = o.page.data.img_list;
                        i.splice(a, 1), o.page.setData({
                            img_list: i
                        });
                    }
                }
            });
        }, o.page.submit = function(a) {
            function i(t) {
                return t == d.length ? n() : t >= 5 ? n() : void wx.uploadFile({
                    url: e.default.upload_img,
                    filePath: d[t],
                    name: "image",
                    complete: function(e) {
                        if (200 == e.statusCode) {
                            var a = JSON.parse(e.data);
                            0 == a.code && (c = c.concat(a.data.url));
                        }
                        return ++t != d.length ? i(t) : n();
                    }
                });
            }
            function n() {
                t.request({
                    url: e.user.comment,
                    method: "POST",
                    data: {
                        video_id: o.page.data.video_id,
                        c_id: o.page.data.c_id,
                        content: o.page.data.content,
                        upload_img: JSON.stringify(c),
                        form_id: g
                    },
                    success: function(e) {
                        wx.hideLoading(), 0 == e.code ? (wx.showToast({
                            title: "评论成功"
                        }), o.page.loadComment(o.page.data.video_id), o.page.hide(), o.page.setData({
                            img_list: [],
                            content: "",
                            page: 1
                        })) : 2 == e.code && wx.showModal({
                            title: "提示",
                            content: e.msg,
                            showCancel: !1
                        });
                    }
                });
            }
            var d = o.page.data.img_list, c = [];
            o.page.setData({
                focus: !1
            });
            var s = o.page.data.content, g = a.detail.formId;
            s || 0 != d.length ? (wx.showLoading({
                title: "正在提交",
                mask: !0
            }), i(0)) : wx.showModal({
                title: "提示",
                content: "请输入内容或上传图片",
                showCancel: !1
            });
        };
    }
};

module.exports = a;