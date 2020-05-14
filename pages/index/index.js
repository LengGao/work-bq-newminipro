require("../../utils/requestapi.js");
let app = getApp();
var api = require("../../api.js"), t = (require("../../utils/util.js"), require("../tab-bar/tab-bar.js"));
import config from '../../config.js';
Page({
  data: {
    isIOS: app.globalData.isIOS,
    visible1: false,
    banner: [],
    biaoti: '',
    actions1: [],
    courseId: '',
    menuTop: '',
    accuracy:0,
    course_list: [
      {
        name: '初级会计师',
        id: '0'
      }
    ],
    topmenu: [
      {
        name: '收藏夹',
        img: 'https://minproimg.oss-cn-hangzhou.aliyuncs.com/images/cuotiji.png',
        number:'0',
        num:'2'
      },
      {
        name: '错题集',
        img: 'https://minproimg.oss-cn-hangzhou.aliyuncs.com/images/xingxing.png',
        number:'0',
        num:'1'
      },
      {
        name: '做题历史',
        img: 'https://minproimg.oss-cn-hangzhou.aliyuncs.com/images/lishi.png',
        number:'0',
        num:'0'
      }
    ],
    fun_list: [
      {
        name: '章节练习',
        img: 'https://minproimg.oss-cn-hangzhou.aliyuncs.com/images/zhangjielianxi.png',
        action: 'prictive'
      },
      {
        name: '历年真题',
        img: 'https://minproimg.oss-cn-hangzhou.aliyuncs.com/images/linianzhenti.png',
        action: 'yearText'
      },
      {
        name: '模拟考试',
        img: 'https://minproimg.oss-cn-hangzhou.aliyuncs.com/images/monikaoshi.png',
        action: 'virText'
      },
      {
        name: '刷题挑战',
        img: 'https://minproimg.oss-cn-hangzhou.aliyuncs.com/images/shuatitiaozhan.png',
        action: 'changll'
      },
    ],
    defaultImg: 'https://minproimg.oss-cn-hangzhou.aliyuncs.com/images/avatar-def%402x.png',
    selectShow: false,//控制下拉列表的显示隐藏，false隐藏、true显示
    index: 0,//选择的下拉列表下标
    menustat: 0,
    triangle: !0,
    cat_list2: [],
    cat_list3: [],
    c_id: 0,
    s_id: 0,
    t_id: 0,
    type: 0,
    noACtion: 0,
    myCourse: [],
    optionsGo: 'toliveclass',
    nomyCourse:false,
    noliving:true,
   
  },
  gocollection(number){
    let courseId = this.data.courseId
    console.log(number.currentTarget.dataset.number)
    wx.navigateTo({
      url: `../collectionAll/collectionAll?number=${number.currentTarget.dataset.number}&courseId=${courseId}`
    })
  },
  errorFunction(e) {
    if (e.type == "error") {
      let imgList = this.data.myCourse
      imgList['teacherImage'] = this.data.defaultImg //错误图片替换为默认图片
      this.setData({
        myCourse: imgList
      })
    }

  },
  errorLiving(e) {
    if (e.type == "error") {
      let imgList = this.data.living
      imgList['img'] = this.data.defaultImg //错误图片替换为默认图片
      this.setData({
        living: imgList
      })
    }
  },
  // 点击下拉显示框
  prictive() {
    let id = this.data.courseId
    wx.navigateTo({
      url: `../chapter/chapter?courseId=${id}`
    })
  },
  yearText() {
    let courseId = this.data.courseId
    wx.navigateTo({
      url: `../yearTest/yearTest?courseId=${courseId}`
    })
  },
  virText() {
    let id = this.data.courseId
    wx.navigateTo({
      url: `../virTest/virTest?courseId=${id}`
    })
  },
  changll() {
    let courseId = this.data.courseId
    wx.navigateTo({
      url: `../dailyChallenge/dailyChallenge?courseId=${courseId}`
    })
  },
  handleCancel1() {
    this.setData({
      visible1: false
    });
  },
  toliveclass() {
    let video_id = this.data.banjiID
    wx.navigateTo({
      url: `../live-class-room/live-class-room?video_id=${video_id}`
    })
  },
  toVideoroom() {
    let video_id = this.data.myCourse['courseId']
    wx.navigateTo({
      url: `../course-detail/course-detail?video_id=${video_id}&courseId=${video_id}`
    })
  },
  handleClickItem1({ detail }) {
    if (this.data.noACtion) {
      this.setData({
        visible1: false
      });
      return
    }
    const index = detail.index;
    this.setData({
      courseId: this.data.actions1[index].name,
      biaoti: this.data.actions1[index].name,
      visible1: false,
      courseId: this.data.actions1[index].courseId
    });
  },
  selectTap() {
    this.setData({
      // selectShow: !this.data.selectShow,
      visible1: true,
      // triangle:!this.data.triangle
    });
  },
  clickin() {
    let id = this.data.courseId
    wx.navigateTo({
      url: `../dailyCard/dailyCard?courseId=${id}`
    })
  },
  // 点击下拉列表
  optionTap(e) {
    let Index = e.currentTarget.dataset.index;//获取点击的下拉列表的下标
    this.setData({
      index: Index,
      selectShow: !this.data.selectShow,
      triangle: !this.data.triangle
    });
  },
  selectmenu: function (t) {
    let that = this
    let key = t.currentTarget.dataset.key;
    let courseId = t.currentTarget.dataset.key
    this.setData({
      menuTop: key.courseId,
      courseId: courseId.courseId,

    });
    wx.setStorageSync("courseId", {
      courseId:courseId.courseId
    });
    that.getSubject()
    that.getHomePanel()
  },
  addStory() {
    wx.navigateTo({
      url: '../addCourse/addCourse'
    })
    // wx.showToast({
    //   title: '暂未开放',//提示文字
    //   duration: 1000,//显示时长
    //   mask: false,//是否显示透明蒙层，防止触摸穿透，默认：false  
    //   icon: 'none', //图标，支持"success"、"loading"  
    //   success: function () { },//接口调用成功
    //   fail: function () { },  //接口调用失败的回调函数  
    //   complete: function () { } //接口调用结束的回调函数  
    // })
  },
  gettopINfor(resolve, reject) {
    let that = this
    console.log('8888')
    app.encryption({
      url: api.default.getCollectionCourses,
      method: "GET",
      success: function (res) {
        for (let i = 0; i < res.length; i++) {
          res[i].name = res[i].courseName
        }
        that.setData({
          course_list: res,
          menuTop: res[0].courseId,
          courseId: res[0].courseId,
          biaoti: res[0].courseName
        })
        wx.setStorageSync("courseId", {
          courseId: res[0].courseId
        });
        that.getHomePanel()
        that.getSubject()
        return resolve
      },
      fail: function (t) {
        return reject
      },
      complete: function () {

      }
    })
  },
  getMycourse() {
    let that = this
    let option = {
      courseId: that.data.courseId
    }
    app.encryption({
      url: api.default.getMyCourse,
      method: "GET",
      data: option,
      success: function (res) {
        console.log(res)
        if (res.data == undefined) {
          that.setData({
            myCourse: res,
            accuracy:res.info.accuracy,
            nomyCourse:true
          })
        } else {
          that.setData({
            nomyCourse: false
          })
        }
      },
      fail: function (t) {
      },
      complete: function () {

      }
    })
  },
  getSubject() {
    let that = this
    let courseId = this.data.menuTop
    let option = {
      courseId: courseId
    }
    app.encryption({
      url: api.default.getSubject,
      method: "GET",
      data: option,
      success: function (res) {
        if (res.data == undefined) {
          for (let i = 0; i < res.length; i++) {
            res[i].name = res[i].courseName
          }
          that.setData({
            biaoti: res[0].courseName,
            actions1: res,
            courseId: res[0].courseId,
            noACtion: 0
          })
        } else {
          // let action = [
          //   {
          //     name: '该课程暂未设置科目'
          //   }
          // ]
          that.setData({
            actions1: [],
            noACtion: 1
          })
        }
      },
      fail: function (t) {
        return reject()
      },
      complete: function () {

      }
    })
  },
  getclasslive() {
    let that = this
    app.encryption({
      url: api.default.getclasslive,
      method: "GET",
      success: function (res) {
        console.log(res.data)
        if (res.data == undefined) {
           that.setData({
            noliving:true
           })
           
        }else{
          that.setData({
            noliving:false
           })
        }
        console.log(that.data.noliving)
        if (res.classroomList[0].review == 1) {
          that.setData({
            optionsGo: 'goTestvideo',
            banjiID: res.classroomList[0].class_id
          })
        }
        that.setData({
          living: res.classroomList[0],
          banjiID: res.classroomList[0].class_id
        })
      },
      fail: function (t) {
      },
      complete: function () {
      }
    })
  },
  goTestvideo() {
    console.log('kakakaka')
    console.log(this.data.optionsGo)
    let courseId = this.data.banjiID
    console.log(courseId)
    wx.reLaunch({
      url: `../course-class-detail/course-class-detail?video_id=${courseId}`
    })
  },
  goindex(){
    wx.navigateTo({
      url: '../secondary/secondary'
    });
  },
  getHomePanel(){
    console.log('nimen')
    let that = this
    let courseId = this.data.menuTop
    let option = {
      courseId: courseId
    }
    console.log(option)
    app.encryption({
      url: api.user.getHomePanel,
      method: "GET",
      data: option,
      success: function (res) {
        console.log(res)
        let topmenu0 = 'topmenu[0].number'
        let topmenu1 = 'topmenu[1].number'
        let topmenu2 = 'topmenu[2].number'
        that.setData({
          [topmenu0]:res.collectionCount,
          [topmenu1]:res.errorCount,
          [topmenu2]:res.logNumber,
          accuracy:res.accuracy
        })
      },
      fail: function (t) {

      },
      complete: function () {

      }
    })
  },
  onLoad: function (e) {
 
    let that = this
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    let promise = new Promise((resolve, reject) => {
      wx.login({ // 判断是否授权，，没有则授权
        success: function (n) {
          if (n.code) {
            var t = n.code;
            app.request({
              url: api.user.newLogin,
              data: { code: t },
              method: 'POST',
              success: function (e) {
                console.log(e)
                if(e.code == '10001'){
                  wx.showModal({
                    title:"警告",
                    content:e.message,
                    showCancel: !1,
                    success:function(){
                     wx.reLaunch({
                       url:'../index/index'
                     })
                    }
                  })
                }
                wx.setStorageSync("user_info", {
                  nickname: e.data.param.nickname,
                  avatar_url: e.data.param.user_img,
                  uid: e.data.param.uid,
                  uuid: e.data.param.uuid,
                  token: e.data.param.token
                });
                return resolve()
              },
              fail: function (e) {
                wx.showModal({
                  title: "警告",
                  content: e.msg,
                  showCancel: !1
                });
              },
              complete: function () {
              }
            })
          }
        }
      })
    })
    promise.then(function (resolve, reject) {
      let promise1 = new Promise((resolve, reject) => {
        that.gettopINfor(resolve, reject)
      })
      promise1.then(function (resolve) {
        that.getMycourse()
        return resolve
      })
    });
    Promise.all([promise]).then((result) => {
      this.getclasslive()
     
      wx.hideLoading();               //['成功了', 'success']
    }).catch((error) => {
      console.log(error)
    })
    e && wx.setStorageSync("tmp_options", e), t.tabbar("tabBar", 0, this, "home")
  },
  onReady: function () { },
  onShow: function () {
  },
  onHide: function () { },
  onUnload: function () { },
  onPullDownRefresh: function () { },
  onReachBottom: function () { },
  onShareAppMessage: function () {
    return {
      path: "/pages/index/index?"
    };
  },
  tabBarRedirect: function (e) {
    wx.navigateTo({
      url: e.currentTarget.dataset.url
    });

  }
});