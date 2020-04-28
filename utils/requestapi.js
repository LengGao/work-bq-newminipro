var e = getApp();

module.exports.commonRequest = function(t, o, a, n) {
    return new Promise(function(n, s) {
        wx.request({
            url: t,
            data: a,
            method: o,
            header: {
                acctid: e.globalData.acct_id,
                rdsession: e.globalData.rdsession,
                openid: e.globalData.openid,
                "content-type": "application/x-www-form-urlencoded"
            },
            success: n,
            fail: s
        });
    });
};