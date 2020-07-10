const { $Message ,$Toast} = require('../../utils/iview/base/index');
let app = getApp(), api = require("../../api.js"),util =  require("../../utils/util.js")
Page({
  /**
   * 页面的初始数据
   */
  data: {
    funlist:[],
    subscribeId:'',
    rommId:'',
    status:'',
    id:'',
    explain_btn:'',
    explain_bg:'',
    datetime:'',
    sy:false,
    explain_bg:'',
    subscribeStatushave:'',
    navH:'',
    chapterName:'预约详情'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    if(options.updatethisid){
      this.setData({
        id:options.updatethisid
      })
    }else if(options.id){
      this.setData({
        id:options.id
      })
    }
    this.setData({
      navH: app.globalData.navHeight,
      subscribeId:options.subscribeId,
      status:options.status,
   
      datetime:options.datetime,
      subscribeStatushave:options.subscribeStatushave,
      newDataTime:options.newDataTime
    })
    // console.log(options.subscribeStatushave)
    console.log(options.status)
    let todayTime = new Date()
    let y = todayTime.getFullYear().toString()
    let m = todayTime.getMonth() + 1
    if (m < 10) {
      let z = 0
      m = z.toString() + m.toString()
    }
    let d = todayTime.getDate().toString()
    if (d < 10) {
      let z = 0
      d = z.toString() + d.toString()
    }
    let  dateTime = y + m + d
    console.log(dateTime)
    function dateToSubstr(str){

      var year = str.substr(0,4);
      console.log(year)
      var month = str.substr(5,2);
      var day = str.substr(8,2);
      console.log(day)
    
      return year +  month + day
  }
    //我的预约传过来的时间
    console.log(options.datetime)
    let timeyear = dateToSubstr(options.datetime)
     console.log(timeyear)
// console.log(timeyear>dateTime)
    if(timeyear<dateTime){
      //失约
      this.setData({
        sy:true
      })
    }else{
      this.setData({
        sy:false
      })
    }
    if(options.status=="1"&&this.data.sy==false){
      this.setData({
        explain_btn:'取消预约',
      })
    }else if(options.status=="0"){
      this.setData({
        explain_btn:'等待确认',
        explain_bg:'explain_bg'
      })
    }else if(options.status=="-1"){
      this.setData({
        explain_btn:'重新预约',
      })
    }else if(options.status=="2"){
      this.setData({
        explain_btn:'已签到',
        explain_bg:'explain_bg'
      })
    }else if(options.status=="1"&&this.data.sy==true){
      this.setData({
        explain_btn:'申请补签到',
      })
    }

    this.getSubscribeInfo(options.subscribeId)
  },
  gobefor(e){
    let pages = getCurrentPages(); // 当前页面
    let beforePage = pages[pages.length - 2]; 
     let datatime = this.data.newDataTime
    wx.navigateBack({
      success: function () {
        beforePage.afterTapDay('detail',datatime); 
      }
    });
  },
  //面授课详情
  getSubscribeInfo(subscribeId){
    let that = this
    let option= {
      subscribeId	:subscribeId-0
    }
   
    app.encryption({
      url: api.default.getSubscribeInfo,
      method: "GET",
      data:option,
      success: function (res) {
      console.log(res.info)
      let courbox =res.info
          courbox.timeInfo = util.dateToSubstr2(courbox.dateTime,courbox.startTime,courbox.endTime)
       
        console.log(courbox)
      let arr = []
      arr.push(courbox)
        that.setData({
          funlist:arr
        })
        
      },
      fail: function (t) {
      
      },
      complete: function () {

      }
    })
  },
  //explain_btn按钮单机事件
  explain_btn(e){
    console.log(e)
   let  rommId = e.currentTarget.dataset.id
   let subscribeStatus= e.currentTarget.dataset.subscribestatus
  // // let  subscribeStatushave= e.currentTarget.dataset.subscribestatus
   console.log(subscribeStatus)
   this.setData({
    rommId:rommId,
    // subscribeStatushave:subscribeStatushave
   })
   
    let _that=this
    console.log()
    if(this.data.subscribeStatushave==1){
      if(subscribeStatus==null){
        //确定预约
        this.confirmAppoint()
      }else if(subscribeStatus==0||subscribeStatus==1){
        console.log(111)
        
         //取消预约
        this.cancelappoint()
      }else if(subscribeStatus==1){

      }else if(subscribeStatus==2){

      }
    }
    if(this.data.status=="1"&&this.data.sy==false){
      //取消预约
      this.cancelappoint()
    }else if(this.data.status=="0"){
      // this.setData({
      //   explain_btn:'等待确认',
      // })
    }else if(this.data.status=="-1"){
     wx.navigateTo({
       url: '../faceMessage/faceMessage',
     })
      // this.setData({
      //   explain_btn:'重新预约',
      // })
    }else if(this.data.status=="2"){
      // this.setData({
      //   explain_btn:'已签到',
      // })
    }else if(this.data.status=="1"&&this.data.sy==true){
      $Toast({
        content: '请找老师补签',
        type: 'warning'
    });
      // this.setData({
      //   explain_btn:'申请补签到',
      // })
    }

    // if(this.data.status=="0"||subscribeStatus=="-1"){
      // this.setData({
      //   explain_btn:'取消预约'
      // })
    // }else{
      // this.confirmAppoint()
    // }
  },
  //取消预约
cancelappoint(){
  let  _that =this
  let status= '-1'
  wx.showModal({
 title: '取消提醒',
 content: '取消预约后无法正常上课,是否继续',
 showCancel: true,//是否显示取消按钮
 cancelText: "放弃",//默认是“取消”
 cancelColor: '#199FFF',//取消文字的颜色
 confirmText: "继续",//默认是“确定”
 confirmColor: '#199FFF',//确定文字的颜色
 success (res) {
   console.log(res)
   if (res.confirm) {
     _that.updateSubscribeMemberStatus(status)   
   } else if (res.cancel) {
     console.log('用户点击取消')
   }
 }
})
},

   //更新学生状态
   updateSubscribeMemberStatus(status){
    let that = this
      let option = {
        id: this.data.id - 0,
        status:status - 0
      }
      console.log(option)
      app.encryption({
        url: api.default.updateSubscribeMemberStatus,
        method: "POST",
        data:option,
        success: function (res) {
        console.log(res)
        wx.navigateTo({
          url: `../faceOrder/mineOrder?subscribeId=${that.data.subscribeId}`
        })
        // wx.navigateBack({
        //   delta: 1
        // })

        },
        fail: function (t) {
        
        },
        complete: function () {
  
        }
      })
    },
  //确定预约
  confirmAppoint(){
    let options = {
      subscribeId: this.data.subscribeId - 0,
    }
    let that =this
      app.encryption({
        url: api.default.insertSubscribe,
        method: "POST",
        // dataType: "json",
        data: options,
        success: function (res) {
          console.log(res)
          let message=res.data.message
          let code = res.data.code
          if(res.data.code=="200"){
            wx.showToast({
              title: res.data.message,
              icon: 'success',
              duration: 2000
            })
            let datatime = this.data.newDataTime
            wx.navigateTo({
              url: `../faceSuccess/faceSuccess?message=${message}&code=${code}&datatime=${datatime}`,
            })
          }else {
          
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
  onShareAppMessage: function () {

  }
})