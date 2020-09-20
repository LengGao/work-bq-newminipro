let app = getApp();
var api = require("../../../../api.js")
Page({
    data: {
        practice: false,
        punchCard: false,
        mockExamination: false,
        pastExamPaper: false
    },
    switch1Change: function (e) {
        console.log('switch1 发生 change 事件，携带值为', e.detail.value)
    },
    switch2Change: function (e) {
        console.log('switch2 发生 change 事件，携带值为', e.detail.value)
    },
    practice(event) {
        let that = this
        const detail = event.detail.value;
        console.log(event)
        let state, id = event.currentTarget.dataset.id, temid = event.currentTarget.dataset.temid
        if (detail == false) {
            state = 0
        } else {
            state = 1
        }
        let option = {
            id: id,
            state: state
        }
        console.log(option)
        app.encryption({
            url: api.default.saveMessagePushState,
            method: "POST",
            data: option,
            success: function (res) {
                console.log(res)
                if (res.data != undefined && res.data.code == 200) {
                    console.log(temid)
                    wx.requestSubscribeMessage({
                        tmplIds: [temid],
                        success(res) {
                            console.log(res)
                        }
                    })
                    wx.showToast({
                        title: res.data.message,//提示文字
                        duration: 1300,//显示时长
                        mask: true,//是否显示透明蒙层，防止触摸穿透，默认：false  
                        icon: 'none', //图标，支持"success"、"loading"  
                        success: function () { },//接口调用成功
                        fail: function () { },  //接口调用失败的回调函数  
                        complete: function () { } //接口调用结束的回调函数  
                    })

                } else {
                    wx.showToast({
                        title: '操作失败！',//提示文字
                        duration: 1300,//显示时长
                        mask: true,//是否显示透明蒙层，防止触摸穿透，默认：false  
                        icon: 'none', //图标，支持"success"、"loading"  
                        success: function () { },//接口调用成功
                        fail: function () { },  //接口调用失败的回调函数  
                        complete: function () { } //接口调用结束的回调函数  
                    })
                }
            },
            fail: function (t) {
            },
            complete: function () {
            }
        })

    },
    punchCard(event) {
        let that = this
        const detail = event.detail.value;
        console.log(event)
        let state, id = event.currentTarget.dataset.id
        if (detail == false) {
            state = 0
        } else {
            state = 1
        }
        let option = {
            id: id,
            state: state
        }
        console.log(option)
        app.encryption({
            url: api.default.saveMessagePushState,
            method: "POST",
            data: option,
            success: function (res) {
                console.log(res)
                if (res.data != undefined && res.data.code == 200) {
                    wx.showToast({
                        title: res.data.message,//提示文字
                        duration: 1300,//显示时长
                        mask: true,//是否显示透明蒙层，防止触摸穿透，默认：false  
                        icon: 'none', //图标，支持"success"、"loading"  
                        success: function () { },//接口调用成功
                        fail: function () { },  //接口调用失败的回调函数  
                        complete: function () { } //接口调用结束的回调函数  
                    })

                } else {
                    wx.showToast({
                        title: '操作失败！',//提示文字
                        duration: 1300,//显示时长
                        mask: true,//是否显示透明蒙层，防止触摸穿透，默认：false  
                        icon: 'none', //图标，支持"success"、"loading"  
                        success: function () { },//接口调用成功
                        fail: function () { },  //接口调用失败的回调函数  
                        complete: function () { } //接口调用结束的回调函数  
                    })
                }
            },
            fail: function (t) {
            },
            complete: function () {
            }
        })

    },
    mockExamination(event) {
        let that = this
        const detail = event.detail.value;
        console.log(event)
        let state, id = event.currentTarget.dataset.id
        if (detail == false) {
            state = 0
        } else {
            state = 1
        }
        let option = {
            id: id,
            state: state
        }
        console.log(option)
        app.encryption({
            url: api.default.saveMessagePushState,
            method: "POST",
            data: option,
            success: function (res) {
                console.log(res)
                if (res.data != undefined && res.data.code == 200) {
                    wx.showToast({
                        title: res.data.message,//提示文字
                        duration: 1300,//显示时长
                        mask: true,//是否显示透明蒙层，防止触摸穿透，默认：false  
                        icon: 'none', //图标，支持"success"、"loading"  
                        success: function () { },//接口调用成功
                        fail: function () { },  //接口调用失败的回调函数  
                        complete: function () { } //接口调用结束的回调函数  
                    })

                } else {
                    wx.showToast({
                        title: '操作失败！',//提示文字
                        duration: 1300,//显示时长
                        mask: true,//是否显示透明蒙层，防止触摸穿透，默认：false  
                        icon: 'none', //图标，支持"success"、"loading"  
                        success: function () { },//接口调用成功
                        fail: function () { },  //接口调用失败的回调函数  
                        complete: function () { } //接口调用结束的回调函数  
                    })
                }
            },
            fail: function (t) {
            },
            complete: function () {
            }
        })

    },
    pastExamPaper(event) {
        let that = this
        const detail = event.detail.value;
        console.log(event)
        let state, id = event.currentTarget.dataset.id
        if (detail == false) {
            state = 0
        } else {
            state = 1
        }
        let option = {
            id: id,
            state: state
        }
        console.log(option)
        app.encryption({
            url: api.default.saveMessagePushState,
            method: "POST",
            data: option,
            success: function (res) {
                console.log(res)
                if (res.data != undefined && res.data.code == 200) {
                    wx.showToast({
                        title: res.data.message,//提示文字
                        duration: 1300,//显示时长
                        mask: true,//是否显示透明蒙层，防止触摸穿透，默认：false  
                        icon: 'none', //图标，支持"success"、"loading"  
                        success: function () { },//接口调用成功
                        fail: function () { },  //接口调用失败的回调函数  
                        complete: function () { } //接口调用结束的回调函数  
                    })

                } else {
                    wx.showToast({
                        title: '操作失败！',//提示文字
                        duration: 1300,//显示时长
                        mask: true,//是否显示透明蒙层，防止触摸穿透，默认：false  
                        icon: 'none', //图标，支持"success"、"loading"  
                        success: function () { },//接口调用成功
                        fail: function () { },  //接口调用失败的回调函数  
                        complete: function () { } //接口调用结束的回调函数  
                    })
                }
            },
            fail: function (t) {
            },
            complete: function () {
            }
        })

    },
    getMessagePushList() {
        let that = this
        // let option = {
        //   courseId: that.data.courseId
        // }
        app.encryption({
            url: api.default.getMessagePushList,
            method: "GET",
            //   data: option,
            success: function (res) {
                console.log(res)
                that.setData({
                    alldata: res
                })
                // if (res.data == undefined) {
                //   that.setData({
                //     myCourse: res,
                //     nomyCourse:true
                //   })
                // } else {
                //   that.setData({
                //     nomyCourse: false
                //   })
                // }
            },
            fail: function (t) {
            },
            complete: function () {
            }
        })
    },
    onLoad: function () {
        this.getMessagePushList()
    }
});