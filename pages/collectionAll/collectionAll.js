// pages/collectionAll/collectionAll.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    topSelect:[
      {
        name:'收藏夹',
        id:'2'
      },
      {
        name:'错题集',
        id:'1'
      },
      {
        name:'做题历史',
        id:'0'
      }
    ],
    tabArr: {
      curHdIndex: 2,
      curBdIndex: 2
    },
    chapter:[
      {
        charper:'2020年3月19日',
        list:[
          {
          name:'第一章信息化知识',
          rate:'27%',
          time:'10分5秒'
        }
      ]
      },
      {
        charper:'2020年3月20日',
        list:[{
          name:'第一章信息化知识',
          rate:'27%',
          time:'10分5秒'
        }]
      },
      {
        charper:'2020年3月21日',
        list:[{
          name:'第一章信息化知识',
          rate:'27%',
          time:'10分5秒'
        }]
      }
    ],
    catalist:[
      {
        charper:'第一章',
        name:'信息化知识',
        num:'5'
      },
      {
        charper:'第二章',
        name:'信息化知识',
        num:'15'
      },
      {
        charper:'第三章',
        name:'信息化知识',
        num:'25'
      }
    ]
  },
  tabFun: function (t) {
    var e = t.target.dataset.id;
    console.log("----" + e + "----");
    var tab = {};
    tab.curHdIndex = e, tab.curBdIndex = e,
    this.setData({
      tabArr: tab
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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