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
    courseId:'',
    menuTop:'',
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
        number: '45'
      },
      {
        name: '错题集',
        img: 'https://minproimg.oss-cn-hangzhou.aliyuncs.com/images/xingxing.png',
        number: '45'
      },
      {
        name: '做题历史',
        img: 'https://minproimg.oss-cn-hangzhou.aliyuncs.com/images/lishi.png',
        number: '45'
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
    noACtion:0
  },
  // 点击下拉显示框
  prictive() {
    let id = this.data.courseId
    console.log(this.data.courseId)
    wx.navigateTo({
      url: `../chapter/chapter?courseId=${id}`
    })
  },
  yearText() {
    wx.navigateTo({
      url: '../yearTest/yearTest?video_id=79'
    })
  },
  virText() {
    let id = this.data.menustat
    wx.navigateTo({
      url: `../virTest/virTest?courseId=${id}`
    })
  },
  changll() {
    console.log('点击了刷题挑战')
    // wx.navigateTo({
    //   url: '../live-class-room/live-class-room?video_id=79'
    //  })
  },
  handleCancel1() {
    this.setData({
      visible1: false
    });
  },
  toliveclass() {
    wx.navigateTo({
      url: '../live-class-room/live-class-room?video_id=79'
    })
  },
  toVideoroom() {
    wx.navigateTo({
      url: '../course-detail/course-detail?video_id=20'
    })
  },
  handleClickItem1({ detail }) {
    if(this.data.noACtion){
      this.setData({
        visible1: false
      });
      return
    }
    const index = detail.index;
    console.log(this.data.courseId)
    this.setData({
      courseId: this.data.actions1[index].name,
      biaoti: this.data.actions1[index].name,
      visible1: false,
      courseId:this.data.actions1[index].courseId
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
    wx.navigateTo({
      url: `../dailyCard/dailyCard`
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
    console.log(this.data.index)
  },
  selectmenu: function (t) {
    let that = this
    let key = t.currentTarget.dataset.key;
    let courseId =  t.currentTarget.dataset.key
    this.setData({
      menuTop:key.courseId,
      biaoti:key.courseName,
      courseId:courseId.courseId
    });
    that.getSubject()
 
    
  },
  addStory() {
    wx.redirectTo({
      url:'../addCourse/addCourse'
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
    app.encryption({
      url: api.default.getCollectionCourses,
      method: "GET",
      success: function (res) {
        console.log(res)
        for (let i = 0; i < res.length; i++) {
          console.log(res[i].courseName)
          res[i].name = res[i].courseName
        }
        console.log(res)
        that.setData({
          course_list: res,
          menuTop:res[0].courseId,
          courseId:res[0].courseId,
          biaoti:res[0].courseName
        })
        that.getSubject()
        return resolve()
      },
      fail: function (t) {
        return reject()
      },
      complete: function () {
        
      }
    })
  },
  getMycourse(resolve, reject) {
    let that = this
    let option = {
      courseId: 18
    }
    app.encryption({
      url: api.default.getMyCourse,
      method: "GET",
      data: option,
      success: function (res) {
        console.log(res)
        return resolve()
      },
      fail: function (t) {
        return reject()
      },
      complete: function () {
      
      }
    })
  },
  getSubject(){
    let that = this 
    let courseId = this.data.menuTop
    let option = {
      courseId: courseId
    }
    console.log(option)
    app.encryption({
      url: api.default.getSubject,
      method: "GET",
      data: option,
      success: function (res) {
        console.log(res)
        if(  res.data == undefined){
          for (let i = 0; i < res.length; i++) {
            console.log(res[i].courseName)
            res[i].name = res[i].courseName
        }
        that.setData({
          biaoti:res[0].courseName,
          actions1: res,
          courseId:res[0].courseId,
          noACtion:0
        })
        }else{
          let action = [
            {
              name:'该课程暂未设置科目'
            }
          ]
          that.setData({
            actions1: action,
            noACtion:1
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
  onLoad: function (e) {
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    let that = this
    let promise1 = new Promise((resolve, reject) => {
      that.gettopINfor(resolve, reject)
    });
    let promise2 = new Promise((resolve, reject) => {
      that.getMycourse(resolve, reject)
    });
    Promise.all([promise1, promise2]).then((result) => {
      console.log('全部完成')
      wx.hideLoading();               //['成功了', 'success']
    }).catch((error) => {
      console.log(error)
    })
    e && wx.setStorageSync("tmp_options", e), t.tabbar("tabBar", 0, this, "home")
  },
  onReady: function () { },
  onShow: function () {
    wx.login({ // 判断是否授权，，没有则授权
      success: function (n) {
        if (n.code) {
          var t = n.code;
          console.log(n)
          app.request({
            url: api.user.newLogin,
            data: { code: t },
            method: 'POST',
            dataType: '',
            success: function (e) {
              console.log(e.data.param)
              wx.setStorageSync("user_info", {
                nickname: e.data.param.nickname,
                avatar_url: e.data.param.user_img,
                uid: e.data.param.uid,
                uuid: e.data.param.uuid,
                token: e.data.param.token
              });
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
    wx.redirectTo({
      url: e.currentTarget.dataset.url
    });

  }
});