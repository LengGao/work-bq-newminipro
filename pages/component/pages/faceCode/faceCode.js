let app = getApp(), api = require("../../../../api.js"), util = require("../../../../utils/util.js")
Page({
  /**
   * 页面的初始数据
   */
  data: {
    funlist: [
      { chapter: 'hjkshfjhf' }
    ],
    subscribe_classroom_id : '',
    rommId: '',
    status: 2,
    id: 0,
    nickname: '',
    mobile: '',
    explain_btn: '确定预约',
    courseId: 0,
    memberId: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(query) {
    // const {query} = wx.getLaunchOptionsSync()
    // scene 需要使用 decodeURIComponent 才能获取到生成二维码时传入的 scene
    
    let scene = decodeURIComponent(query.scene)
    console.log(scene)
    var sceneArr = scene.split('@')
    console.log(sceneArr[1])
    // let id = sceneArr.split('-')[1]
    // var para = {};
    // for (var i in sceneArr) {
    //   var name = sceneArr[i].slice(0, sceneArr[i].indexOf('-'));
    //   console.log(name)
    //   var value = sceneArr[i].slice(sceneArr[i].indexOf('-') + 1);
    //   console.log(name == "id")
    //   if (name == "id") {
    //     console.log(value)
    //     this.setData({
    //       subscribe_classroom_id : value
    //     })
    //   }
    //   para[name] = value
    // }
    this.setData({
             subscribe_classroom_id : sceneArr[1]
         })
    console.log(this.data.subscribe_classroom_id )
    this.getQrcodeSubscribeInfo()
  },
  // onLoad: function (options) {
  //   console.log(options)
  //   let subscribeId=options.subscribeId
  //   this.setData({
  //    ids:options.ids,
  //     id:options.id
  //   })
  //  this.getQrcodeSubscribeInfo(options.id)
  // },

  getQrcodeSubscribeInfo() {
    let that = this
    let option = {
      subscribe_classroom_id :parseInt (this.data.subscribe_classroom_id ) 
    }
    console.log(option)

    app.encryption({
      url: api.default.getClassroomInfoFromQrcode,
      method: "GET",
      data: option,
      success: function (res) {
        console.log(res)
       
        if (res.info == undefined) {
          console.log('我景来')
          wx.showModal({
            title: '提示',
            content: res.data.message,
            success(res) {
              if (res.confirm) {
                wx.redirectTo({
                  url: `../faceTeach/faceTeach`,
                })
              } else if (res.cancel) {
                wx.redirectTo({
                  url: `../faceTeach/faceTeach`,
                })
              }
            }
          })
        } else {
          let classroom = res.info
          // classroom.timeInfo = util.dateToSubstr2(classroom.dateTime, classroom.startTime, classroom.endTime)
          // let member = res.member
          // that.setData({
          //   memberId: member.id
          // })
          // console.log(that.data.memberId)
          // console.log(member.id)
          // for (var i in member) {
          //   if (i == 'nickname') {
          //     that.setData({
          //       nickname: member[i]
          //     })
          //   } else if (i == 'mobile') {
          //     that.setData({
          //       mobile: member[i]
          //     })
          //   }

          // }
          // for (var k in classroom) {
          //   if (k == 'id') {
          //     console.log(classroom[k])
          //     that.setData({
          //       courseId: classroom[k]
          //     })
          //   }
          // }
          // console.log(this.data.courseId)
          let arr = []
          arr.push(classroom)
          console.log(arr)
          that.setData({
            funlist: arr,
          })
        }



      },
      fail: function (t) {

      },
      complete: function () {

      }
    })
  },
  //签到
  signin() {
    this.updateSubscribeMemberStatus()
  },
  //签到
  updateSubscribeMemberStatus() {
    let option = {
      subscribe_classroom_id: parseInt (this.data.subscribe_classroom_id)
    }
    console.log(option)
    app.encryption({
      url: api.default.subscribeClassroomSignIn,
      method: "POST",
      data: option,
      success: function (res) {
        console.log(res.data.message)
        let code = res.data.code
        let message = res.data.message
        if (res.data.code == '200') {
          wx.navigateTo({
            url: `../faceFail/faceFail?&code=${code}&message=${message}`,
          })
        }else{
          wx.showToast({
            title: res.data.message,
            icon: 'fail',
            duration: 2000
          })
        }
      
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