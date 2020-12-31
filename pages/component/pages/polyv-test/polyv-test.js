
let app = getApp();
let api = require("../../../../api.js")
import plv from '../../../../lib/polyv-sdk/index';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    channel_id:'',
    uid:'',
    url:'',
    videoOption : {
      // mode: 'vod',//点播
      // vodVid:'879bbcba3973d9e27b430b5b406c0246_8',//视频点播id
      mode: 'live',
        uid: '879bbcba39',//userId
        cid: '2066621',//channelId
        isAutoChange: false,
        forceVideo: false,
        vodsrc:  '',
        liveMode:  1,
        statistics: {
          param4: 'param4',
          param5: 'param5'
        }
   },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let user_info=wx.getStorageSync("user_info");
    this.setData({
      uid:user_info.uid,
      channel_id: options.channelId ,     
    });
    this.getLiveUrls()
    console.log(options)
    // plv.init(options)
    // .then(({ detail, chat }) => {
    //   this.setData({
    //     detail: detail
    //   });
    //   // 设置mode为live的videoOption
    //   this.setLiveOption();

    //   // 设置mode为vod的videoOption
    //   // this.setVodOption();
    //   // 如果当前的mode为vod，切换到直播状态，云课堂和普通直播监听直播开始的方法不同。
    //   // 1. 普通直播通过轮询api.getOrdinaryLiveStatus(stream)获取当前的状态
    //   // 2. 云课堂通过chat.on(chat.events.SLICESTART, () => {})监听直播开始，也可以通过播放器的onLiveStatusChange监听开始和结束
    //   if (detail.isPPT) {
    //     chat.on(chat.events.SLICESTART, () => {
    //       // 开始直播
    //     });
    //   } else {
    //     plv.api.getOrdinaryLiveStatus(detail.stream);
    //   }
    // });
    
  },
  getLiveUrls() {
    var that =this
    let user_info=wx.getStorageSync("user_info");
    let option = {
      channel_id:this.data. channel_id,
      user_id:user_info.uid
    }

     console.log(option)
     console.log(api.default)
     console.log(api.default.getLiveUrls)
     console.log(app)
    app.encryption({
      url: api.default.getLiveUrls,
      method: "POST",
      data: option,
      success: function (res) {
        console.log(res)
      //  if(res.code==0){
         that.setData({
           url:res.url
         })
      //  }
       console.log(that.data.url)
      },
      fail: function (t) {
      },
      complete: function () {
      }
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

  }
})