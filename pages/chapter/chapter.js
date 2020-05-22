var app = getApp(), api= require("../../api.js");

Page({
    data: {
        id: 0,
        type: 0,
        paper_list: [],
        title_list:[],
        reader:[],
        courseId:''
    },
    onLoad: function(t) {
        this.setData({
            courseId:t.courseId
        })
        let promise = new Promise((resolve, reject) => {  this.getChapterInfo(t.courseId,resolve, reject) })
        let promise1 = new Promise((resolve, reject) => { this.getPaperList(t.courseId,resolve, reject) })
        Promise.all([promise,promise1]).then((result) => {
            wx.hideLoading();               //['成功了', 'success']
          }).catch((error) => {
            console.log(error)
          })
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
    gopri(t){
        let courseId = this.data.courseId
        wx.navigateTo({
            url: `../test/test?chapter_id=${t.currentTarget.dataset.cid}&courseId=${courseId}&name=${t.currentTarget.dataset.name}`
        })
    },
    getChapterInfo: function(courseId,resolve, reject) {
        var that = this;
        wx.showLoading({
            title: "加载中"
        });
        let option = {
            courseId:courseId
        }
        app.encryption({
            url: api.default.getChapterInfo,
            method: "GET",
            data:option,
            success: function(res) {
               
                console.log(res)
                that.setData({
                    title_list:res
                })
            },
            fail: function(t) {
                wx.showModal({
                    title: "警告",
                    content: t.errmsg,
                    showCancel: !1
                });
            },
            complete: function() {
                return resolve()
            }
        });
    },
    getPaperList: function(courseId,resolve, reject) {
        var that = this;
        wx.showLoading({
            title: "加载中"
        });
        let option = {
            courseId:courseId
        }
        app.encryption({
            url: api.default.getChapters,
            method: "GET",
            data:option,
            success: function(res) {
                console.log(res)
                that.setData({
                    reader:res
                })
          
            },
            fail: function(t) {
                wx.showModal({
                    title: "警告",
                    content: t.errmsg,
                    showCancel: !1
                });
            },
            complete: function() {
                return resolve()
            }
        });
    }
});