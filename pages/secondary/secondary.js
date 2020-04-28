var app = getApp(), api = require("../../api.js"), tab = require("../tab-bar/tab-bar.js");

Page({
  data: {
    isIOS: app.globalData.isIOS,
    banner: [
      {
        url:'../../images/01.jpg'
      },
      {
        url:'../../images/02.jpg'
      },
      {
        url:'../../images/03.jpg'
      },
      {
        url:'../../images/04.jpg'
      }
  ],
  funsel: [
    {
      url:'../../images/ruankaojisuanji.png',
      name:'软考'
    },
    {
      url:'../../images/jiaoshizigezheng.png',
      name:'会计师'
    },
    {
      url:'../../images/jingjishizhicheng.png',
      name:'经济师'
    },
    {
      url:'../../images/gongchengshizhicheng.png',
      name:'特种作业'
    },
    {
      url:'../../images/jiankangguanlishi.png',
      name:'健康管理师'
    }
   
  
  ],
  freeCourse:[],
  hotpoint:[
    {
      url:'../../images/05.jpg',
      title:'系统集成项目管理工程师',
      price:'6666',
      personal:'2564',
      id:'123'
    },
    {
      url:'../../images/06.jpg',
      title:'系统集成项目管理工程师',
      price:'5646',
      personal:'1654'
    },
    {
      url:'../../images/04.jpg',
      title:'系统集成项目管理工程师',
      price:'8947',
      personal:'56971'
    },
    {
      url:'../../images/03.jpg',
      title:'系统集成项目管理工程师',
      price:'5612',
      personal:'89745'
    },
  ]
  },
  selectmenuAll() {
    this.setData({
      menustat: 0,
      c_id: 0,
      s_id: 0,
      t_id: 0,
      cat_list2: [],
      cat_list3: [],
    });
    this.getClassVideo(true);
  },
  selectmenu: function (t) {
    let key = t.currentTarget.dataset.key;
    this.setData({
      menustat: key.id,
      c_id: key.id,
      s_id: 0,
      t_id: 0,
      cat_list2: key.list,
      cat_list3: [],
    });
    this.getClassVideo(true);
  },
  selectmenu2: function (t) {
    let key = t.currentTarget.dataset.key;
    this.setData({
      menustat: key.id,
      c_id: 0,
      s_id: key.id,
      t_id: 0,
      cat_list3: key.list,
    });
    this.getClassVideo(true);
  },
  selectmenu3: function (t) {
    let key = t.currentTarget.dataset.key;
    this.setData({
      menustat: key.id,
      c_id: 0,
      s_id: 0,
      t_id: key.id,
    });
    this.getClassVideo(true);
  },
  hotpoint(){
    wx.showLoading({
      title: "加载中"
    });
    let uuid = wx.getStorageSync("user_info").uuid
    let token = wx.getStorageSync("user_info").token
    let that = this
    app.encryption({
      url:api.default.hostcourse,
      header: {
        token:token,
        uuid:uuid
      },
      method:'GET',
      dataType: "json",
      success:function(res){
        console.log(res)
        that.setData({
          hotpoint:res
        })
      },
      fail:function(res){
        
      },
      complete: function () {
        wx.hideLoading();
      }
    })
  },
  freeCourse(){
    wx.showLoading({
      title: "加载中"
    });
    let uuid = wx.getStorageSync("user_info").uuid
    let token = wx.getStorageSync("user_info").token
    let that = this
    app.encryption({
      url:api.default.freecourse,
      header: {
        token:token,
        uuid:uuid
      },
      method:'GET',
      dataType: "json",
      success:function(res){
        console.log(res)
        that.setData({
          freeCourse:res
        })
      },
      fail:function(res){
        
      },
      complete: function () {
        wx.hideLoading();
      }
    })
  },
  onLoad: function (t) {
    tab.tabbar("tabBar", 0, this, "shoponline");
    this.hotpoint();this.freeCourse()
  },
  onReady: function () { },
  onShow: function () { },
  onHide: function () { },
  onUnload: function () { },
  onPullDownRefresh: function () { },
  onReachBottom: function () { },
  onShareAppMessage: function () {
    return {
      path: "/pages/index/index"
    };
  },
  // 分类
  getClassList: function () {
    var a = this;
    wx.showLoading({
      title: "加载中"
    }), 
    wx.request({
      url: e.video.category_list,
      method: "POST",
      data: {},
      success: function (t) {
        0 == t.code && a.setData({
          cat_list: t.data
        });
      },
      fail: function (t) {
        wx.showModal({
          title: "警告",
          content: t.errmsg,
          showCancel: !1
        });
      },
      complete: function () {
        wx.hideLoading();
      }
    });
  },
  tabBarRedirect: function (e) {
    wx.redirectTo({
      url: e.currentTarget.dataset.url
    });
  },
  onReachBottom() {
    console.log('页面已经滑动至底部')
  },
});