const { $Message, $Toast } = require('../../../../utils/iview/base/index');
let app = getApp(), api = require("../../../../api.js"), util = require("../../../../utils/util.js")
Page({
  /**
   * 页面的初始数据
   */
  data: {
    funlist: [],
    subscribeId: '',
    rommId: '',
    status: '',
    id: '',

    datetime: '',
    sy: false,
    cancelId: 0,
   
    subscribeStatushave: '',
    navH: '',
    chapterName: '预约详情',
    explain_bg:'',
    tips_type:'',
    subscribe_classroom_id:'',
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    // if (options.updatethisid) {
    //   this.setData({
    //     id: options.updatethisid
    //   })
    // } else if (options.id) {
    //   this.setData({
    //     id: options.id
    //   })
    // }
    this.setData({
      subscribe_classroom_id: options.subscribe_classroom_id
        })

    this.setData({
      navH: app.globalData.navHeight,
      subscribe_classroom_id: options.subscribe_classroom_id,
      // status: options.status,

      // datetime: options.datetime,
      // subscribeStatushave: options.subscribeStatushave,
      // newDataTime: options.newDataTime
    })
    // console.log(options.subscribeStatushave)
    // console.log(options.status)
    // let todayTime = new Date()
    // let y = todayTime.getFullYear().toString()
    // let m = todayTime.getMonth() + 1
    // if (m < 10) {
    //   let z = 0
    //   m = z.toString() + m.toString()
    // }
    // let d = todayTime.getDate().toString()
    // if (d < 10) {
    //   let z = 0
    //   d = z.toString() + d.toString()
    // }
    // let dateTime = y + m + d
    // console.log(dateTime)
    // function dateToSubstr(str) {

    //   var year = str.substr(0, 4);
    //   console.log(year)
    //   var month = str.substr(5, 2);
    //   var day = str.substr(8, 2);
    //   console.log(day)

    //   return year + month + day
    // }
    //我的预约传过来的时间
    // console.log(options.datetime)
    // let timeyear = dateToSubstr(options.datetime)
    // console.log(timeyear)
    // console.log(timeyear>dateTime)
    // if (timeyear < dateTime) {
    //   //失约
    //   this.setData({
    //     sy: true
    //   })
    // } else {
    //   this.setData({
    //     sy: false
    //   })
    // }
    // if (options.status == "1" && this.data.sy == false) {
    //   this.setData({
    //     explain_btn: '取消预约',
    //   })
    // } else if (options.status == "0") {
    //   this.setData({
    //     explain_btn: '等待确认',
    //     explain_bg: 'explain_bg'
    //   })
    // } else if (options.status == "-1") {
    //   this.setData({
    //     explain_btn: '重新预约',
    //   })
    // } else if (options.status == "2") {
    //   this.setData({
    //     explain_btn: '已签到',
    //     explain_bg: 'explain_bg'
    //   })
    // } else if (options.status == "1" && this.data.sy == true) {
    //   this.setData({
    //     explain_btn: '申请补签到',
    //   })
    // }
    this.getSubscribeInfo(options.subscribe_classroom_id)
  },
  gobefor(e) {
    let pages = getCurrentPages(); // 当前页面
    let beforePage = pages[pages.length - 2];
    let datatime = this.data.newDataTime
    wx.navigateBack({
      success: function () {
        console.log()
        if (typeof (beforePage.afterTapDay) == 'undefined') {
          beforePage
          return
        }
        beforePage.afterTapDay('detail', datatime);
      }
    });
  },
  //面授课详情
  getSubscribeInfo(subscribe_classroom_id) {
    let that = this
    let problem_course_id=wx.getStorageSync('problem_course_id').problem_course_id
    let option = {
      subscribe_classroom_id:parseInt(subscribe_classroom_id),
      problem_course_id:problem_course_id
    }
    app.encryption({
      url: api.default.getSubscribeInfo,
      method: "GET",
      data: option,
      success: function (res) {
        console.log(res.info)
        let info = res.info
        that.setData({
          tips_type: info.tips_type
        })
        info.show_time= util.js_date_time(info.show_time)
        info.close_time= util.js_date_time(info.close_time)
          // courbox[k].show_time = util.js_date_time(courbox[k].show_time)
          // courbox[k].close_time = util.js_date_time(courbox[k].close_time)
          if(info.tips_type==0||info.tips_type==1){
            that.setData({
              explain_bg: 'explain_bg'
            })
            info.tips='确定预约'
          }else if(info.tips_type==2||info.tips_type==3||info.tips_type==5){
            that.setData({
              explain_bg: 'explain_bg2'
            })
          }else if(info.tips_type==4){
            that.setData({
              explain_bg: 'explain_bg'
            })
            info.tips='取消预约'
            
          }
        let arr = []
        arr.push(info)
        // console.log(arr)
        that.setData({
          funlist: arr
        })

      },
      fail: function (t) {

      },
      complete: function () {

      }
    })
  },
  //explain_btn按钮单机事件
  explain_btn(e) {
    let rommId = e.currentTarget.dataset.id
    let subscribeStatus = e.currentTarget.dataset.subscribestatus
    this.setData({
      rommId: rommId,
      // subscribeStatushave:subscribeStatushave
    })
    let _that = this
    if(this.data.tips_type==0||this.data.tips_type==1){
      this.confirmAppoint()
    }else if(this.data.tips_type==4){
      this.cancelappoint()
    }
  },
  // //取消预约
  cancelappoint() {
    let _that = this
    let status = '-1'
    wx.showModal({
      title: '取消提醒',
      content: '取消预约后无法正常上课,是否继续',
      showCancel: true,//是否显示取消按钮
      cancelText: "放弃",//默认是“取消”
      cancelColor: '#199FFF',//取消文字的颜色
      confirmText: "继续",//默认是“确定”
      confirmColor: '#199FFF',//确定文字的颜色
      success(res) {
        console.log(res)
        if (res.confirm) {
          _that.cancelAppointment()
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },


  cancelAppointment(status) {
    let that = this
    let problem_course_id=wx.getStorageSync('problem_course_id').problem_course_id
    let option = {
      subscribe_classroom_id:this.data. subscribe_classroom_id,
      problem_course_id:problem_course_id
    }
    console.log(option)
    app.encryption({
      url: api.default.cancelAppointment,
      method: "POST",
      data: option,
      success: function (res) {
       if(res.data.code=="200"){
        wx.navigateTo({
          url: `../faceOrder/mineOrder?subscribeId=${that.data.subscribeId}`
        })
       }else{
        wx.showToast({
          title: res.data.message,
          icon: 'fail',
          duration: 2000
        })
       }
       
      },
      fail: function (t) {
      
      },
      complete: function () {

      }
    })
  },

  //确定预约
  confirmAppoint() {
    let problem_course_id=wx.getStorageSync('problem_course_id').problem_course_id
    let options = {
      problem_course_id,problem_course_id,
      subscribe_classroom_id:parseInt (this.data.subscribe_classroom_id) ,
    }
    console.log(options)
    let that = this
    app.encryption({
      url: api.default.insertSubscribe,
      method: "POST",
      // dataType: "json",
      data: options,
      success: function (res) {
        console.log(res)
        let message = res.data.message
        let code = res.data.code
        if (res.data.code == "200") {
          wx.showToast({
            title: res.data.message,
            icon: 'success',
            duration: 2000
          })
          let datatime = this.data.newDataTime
          wx.redirectTo({
            url: `../faceSuccess/faceSuccess?message=${message}&code=${code}&datatime=${datatime}`,
          })
        } else {
          wx.showToast({
            title: res.data.message,
            icon: 'fail',
            duration: 2000
          })
          wx.navigateTo({
            url: `../faceSuccess/faceSuccess?message=${message}&code=${code}&subscribeId=${that.data.rommId}`,
          })
        }

      },
      fail: function (t) {
        // wx.showModal({
        //   title: "警告",
        //   content: t.msg,
        //   showCancel: !1
        // });
      },
      complete: function () {
        // wx.hideLoading();
      }
    });
    // wx.navigateTo({
    //      url: '../facebetrayFail/facebetrayFail',
    // })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  // onShareAppMessage: function () {

  // }
})