getApp();

Page({
    data: {},
    onLoad: function (n) { },
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
    }
});