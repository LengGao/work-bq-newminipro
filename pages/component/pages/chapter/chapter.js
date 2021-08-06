var app = getApp(), api = require("../../../../api.js");
Page({
    data: {
        id: 0,
        type: 0,
        paper_list: [],
        title_list: [],
        reader: [],
        courseId: ''
    },
    onLoad: function (t) {
        console.log(t)
        this.setData({
            courseId: t.courseId
        })
        let promise = new Promise((resolve, reject) => { this.getChapterInfo(t.courseId, resolve, reject) })
        let promise1 = new Promise((resolve, reject) => { this.getPaperList(t.courseId, resolve, reject) })
        Promise.all([promise, promise1]).then((result) => {
            wx.hideLoading();
        }).catch((error) => {
            console.log(error)
        })
    },
    onReady: function () { },
    onShow: function () {
        // this.getPaperList();
    },
    onHide: function () { },
    onUnload: function () { },
    onPullDownRefresh: function () { },
    onReachBottom: function () { },
    gopri(t) {
        let courseId = this.data.courseId
        console.log(t)
        if(t.currentTarget.dataset.total<1){
            wx.showToast({
              title: '该章节无题目',
              icon:"none"
            })
            return
        }
        wx.navigateTo({
            url: `../test/test?chapter_id=${t.currentTarget.dataset.cid}&courseId=${courseId}&name=${t.currentTarget.dataset.name}&hasdone=${t.currentTarget.dataset.hasdone}`
        })
    },
    getChapterInfo: function (courseId, resolve, reject) {
        var that = this;
        wx.showLoading({
            title: "加载中"
        });
        let option = {
            problem_course_id: courseId,
            chapter_type:'1'
        }
        app.encryption({
            url: api.default.getChapterInfo,
            method: "GET",
            data: option,
            success: function (res) {
                console.log(res)
                that.setData({
                    title_list: res.info
                })
            },
            fail: function (t) {
                wx.showModal({
                    title: "警告",
                    content: t.errmsg,
                    showCancel: !1
                });
            },
            complete: function () {
                return resolve()
            }
        });
    },
    getPaperList: function (courseId, resolve, reject) {
        var that = this;
        wx.showLoading({
            title: "加载中"
        });
        let option = {
            problem_course_id: courseId,
            chapter_type:'1'
        }
        console.log(option)
        app.encryption({
            url: api.default.getChapters,
            method: "GET",
            data: option,
            success: function (res) {
                console.log(res)
                that.setData({
                    reader: res.list
                })
            },
            fail: function (t) {
                wx.showModal({
                    title: "警告",
                    content: t.errmsg,
                    showCancel: !1
                });
            },
            complete: function () {
                return resolve()
            }
        });
    }
});