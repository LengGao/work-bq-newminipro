// pages/yearTestIntro/yearTestIntro.js
let app = getApp();
let api = require("../../../../api.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    chapterName: ''
  },
  gokaoshi() {
    let chapterId = this.data.chapterId;
    let courseId = this.data.courseId;//courseID
    let chapterName = this.data.chapterName
    let exam_length = this.data.exam_length //考试时长
    wx.navigateTo({
      url: `../determinTestStart/determinTestStart?chapter_id=${chapterId}&courseId=${courseId}&chapterName=${chapterName}&exam_length=${exam_length}`
    })
  },
  gettruthinfo(options) {
    let that = this
    let option = {
      problem_course_id: options.courseId,
      problem_chapter_id: options.chapterId,
    }
    app.encryption({
      url: api.test.getSelfDeterminationExamConfig,
      method: "GET",
      data: option,
      success: function (res) {
        console.log(res)
        try {
          if (res.info) {
            that.setData({
              exam_length: res.info.duration,
              pass_scores: res.info.pass_score,
              total_point: res.info.problem_score,
              judge: res.info.exam_extends.judge,
              multi: res.info.exam_extends.multiple,
              radio: res.info.exam_extends.single,
              fill_vacancy: res.info.exam_extends.fill_vacancy,
              brief: res.info.exam_extends.brief,
              scene: res.info.exam_extends.scene,
            })
          }
        } catch (err) {
        }
      },
      fail: function (t) {
      },
      complete: function () {
      }
    })
  },
  getUserAuth(options,callback) {
    // 如果不是分享进来的就不用判断是否授权
    if(!options.isShare){
      callback && callback()
      return
    }
    wx.login({ // 判断是否授权，，没有则授权
      success: (res) => {
        let code = res.code
        if (code) {
          app.request({
            url: api.user.newLogin,
            data: {
              code,
              version: app.globalData.version
            },
            header: {
              'organization-id': app.globalData.organizationId
            },
            method: 'POST',
            success: (res) => {
              const data = res.data.param || {}
              // 错误码不为200去授权
              if (200 != res.code) {
                wx.setStorageSync("privateInfor", {
                  openid: data.openid,
                  session_key: data.session_key,
                  unionid: data.unionid,
                })
                const{chapterId,courseId,chapterName} = options
                wx.reLaunch({
                  url: `../usersq/usersq?chapterId=${chapterId}&courseId=${courseId}&chapterName=${chapterName}`,
                })
              } else {
                wx.setStorageSync("user_info", {
                  nickname: data.user_nicename,
                  avatar_url: data.user_img,
                  uid: data.uid,
                  uuid: data.uuid,
                  token: data.token,
                  mobile: data.telphone,
                  is_admin: data.is_admin,
                  info_show: data.info_show
                });
                callback && callback()
              }
            },
            fail: function (e) {
              wx.showModal({
                title: "警告",
                content: e.msg,
                showCancel: !1
              });
            },
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.options = options
    this.setData({
      chapterId: options.chapterId,
      courseId: options.courseId,
      chapterName: options.chapterName
    })
    this.getUserAuth(options,()=>{
      this.gettruthinfo(options)
    })
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
    const{chapterId,courseId,chapterName} = this.options
    return {
      title:chapterName,
      path: `pages/component/pages/determinationIntro/determinationIntro?chapterId=${chapterId}&courseId=${courseId}&chapterName=${chapterName}&isShare=1`,
    }
  }
})