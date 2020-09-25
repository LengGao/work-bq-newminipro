function e(e, n, t) {
    return n in e ? Object.defineProperty(e, n, {
        value: t,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[n] = t, e;
}

var n;

Page((n = {
    data: {
        urls: ["../../images/mall-goods002.jpg", "../../images/mall-goods001.jpg"]
    },
    onLoad: function (e) { }
}, e(n, "onLoad", function () { }), e(n, "showGallery", function (n) {
    var t, r = n.currentTarget.dataset.current, o = this.data.urls;
    $wuxGallery.show((t = {
        current: r,
        urls: o
    }, e(t, "delete", function (e, n) {
        return n.splice(e, 1), this.setData({
            urls: n
        }), !0;
    }), e(t, "cancel", function () {
        return console.log("Close gallery");
    }), t));
}), e(n, "previewImage", function (e) {
    var n = e.currentTarget.dataset.current, t = this.data.urls;
    wx.previewImage({
        current: n,
        urls: t
    });
}), e(n, "onReady", function () { }), e(n, "onShow", function () { }), e(n, "onHide", function () { }),
    e(n, "onUnload", function () { }), e(n, "onPullDownRefresh", function () { }), e(n, "onReachBottom", function () { }),
    e(n, "onShareAppMessage", function () {
        return {
            path: "../../.././index/index?pid=" + wx.getStorageSync("user_info").user_id
        };
    }), n));