let app = getApp(), api = require("../../api.js"),util =  require("../../utils/util.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    status:-2,
    isFail:'0',
    courseId:'',
    tabId:'0',
    courseInfor:[],
    topSelect:[
      {
        name:'全部预约',
        id:'0',
        isFail:'0',
        status:-2
      },
      {
        name:'待上课',
        id:'1',
        isFail:'0',
        status:1
      },
      {
        name:'待确认',
        id:'2',
        isFail:'0',
        status:0
      },
      {
        name:'已签到',
        id:'3',
        isFail:'0',
        status:2
      },
      {
        name:'已失约',
        id:'4',
        isFail:'1',
        status:1
      },
      {
        name:'已取消',
        id:'5',
        isFail:'0',
        status:-1
      }
    ],
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let courseId  =wx.getStorageSync('courseId').courseId
    this.setData({
      courseId:courseId
    })
    console.log(courseId)
    this.getMySubscribe(courseId)
  },
  //我的预约列表
  getMySubscribe(courseId){
    let that = this
    let option= {
      courseId	:courseId-0,
      status:this.data.status,
      isFail:this.data.isFail
    }
    console.log(option)
   
    app.encryption({
      url: api.default.getMySubscribe,
      method: "GET",
      data:option,
      success: function (res) {
      console.log(res)
      // let arr = []
      // arr.push(res.info)
        for(let k in res.list)
        {
          var a  = util.dateToSubstr(res.list[k].dateTime)
          res.list[k].dateTime = a;
        }
        that.setData({
          courseInfor:res.list?res.list:[]
        })
        
      },
      fail: function (t) {
      
      },
      complete: function () {

      }
    })
  },
  //tab点击事件
  tabFun(e){
    let id = e.currentTarget.dataset.key.id;
    let isFail = e.currentTarget.dataset.key.isFail;
    let status = e.currentTarget.dataset.key.status;
    this.setData({
      isFail:isFail,
      status:status
    })
    this.getMySubscribe(this.data.courseId)
    this.setData({
      tabId: id,
    });
  },
  //跳转到详情界面
  tofaceDetail(e){
    console.log(e)
    let subscribeid = e.currentTarget.dataset.subscribeid
    let id =e.currentTarget.dataset.id
    let status =e.currentTarget.dataset.status
    let datetime =e.currentTarget.dataset.datetime
    console.log(datetime)
    wx.navigateTo({
      url: `../faceDetail/faceDetail?subscribeId=${subscribeid}&status=${status}&id=${id}&datetime=${datetime}`,
    })
  },
  //头部左键头导航
  // gobefor(){

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