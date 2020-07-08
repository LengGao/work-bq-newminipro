let app = getApp(), api = require("../../api.js")
Page({
  /**
   * 页面的初始数据
   */
  data: {
    funlist:[
      {chapter:'hjkshfjhf'}
    ],
    subscribeId:'',
    rommId:'',
    status:2,
    id:97,
    explain_btn:'确定预约'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let subscribeId=17
   this.getSubscribeInfo(subscribeId)
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
      console.log(res)
      let arr = []
      arr.push(res.info)
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
  // explain_btn(e){
  //   console.log(e)
  //  let  rommId = e.currentTarget.dataset.id
  //  this.setData({
  //   rommId:rommId
  //  })
  //  console.log(rommId)
    
  //   if(this.data.status=="-1"){
  //     this.updateSubscribeMemberStatus()
  //   }else{
  //     this.confirmAppoint()
  //   }
  // },
  
  //签到
  signin(){
  
    this.updateSubscribeMemberStatus()
  },
   //更新学生状态
   updateSubscribeMemberStatus(){
      let option = {
        id: this.data.id - 0,
        status:this.data.status - 0
      }
      console.log(option)
      app.encryption({
        url: api.default.updateSubscribeMemberStatus,
        method: "POST",
        data:option,
        success: function (res) {
          console.log(res.data.code)
          let code =res.data.code
          if(res.data.code=='200'){
              wx.navigateTo({
                          url: `../faceFail/faceFail?&code=${code}`,
                        })
          }

         
        console.log(res)
        // let arr = []
        // arr.push(res.info)
        //   that.setData({
        //     funlist:arr
        //   })
          
        },
        fail: function (t) {
      
        },
        complete: function () {
  
        }
      })
    },
  //确定预约
  // confirmAppoint(){
  //   let options = {
  //     subscribeId: this.data.subscribeId - 0,
  //   }
  //   let that =this
  //     app.encryption({
  //       url: api.default.insertSubscribe,
  //       method: "POST",
  //       // dataType: "json",
  //       data: options,
  //       success: function (res) {
  //         console.log(res)
  //         let message=res.data.message
  //         if(res.data.code=="200"){
  //           wx.showToast({
  //             title: res.data.message,
  //             icon: 'success',
  //             duration: 2000
  //           })
  //           wx.navigateTo({
  //             url: `../faceSuccess/faceSuccess?message=${message}`,
  //           })
  //         }else {
  //           let code = res.data.code
  //           wx.showToast({
  //             title: res.data.message,
  //             icon: 'fail',
  //             duration: 2000
  //           })
  //           wx.navigateTo({
  //             url: `../faceSuccess/faceSuccess?message=${message}&code=${code}&subscribeId=${that.data.rommId}`,
  //           })
  //         }
        
  //       },
  //       fail: function (t) {
  //         // wx.showModal({
  //         //   title: "警告",
  //         //   content: t.msg,
  //         //   showCancel: !1
  //         // });
  //       },
  //       complete: function () {
  //         // wx.hideLoading();
  //       }
  //     });
  //   // wx.navigateTo({
  //   //      url: '../facebetrayFail/facebetrayFail',
  //   // })
  // },
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