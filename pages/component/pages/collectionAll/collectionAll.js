// pages/collectionAll/collectionAll.js
let app = getApp();
let api = require("../../../../api.js")
Page({
  /**
   * 页面的初始数据
   */
  data: {
    topSelect: [
      {
        name: '收藏夹',
        id: '2'
      },
      {
        name: '错题集',
        id: '1'
      },
      {
        name: '做题历史',
        id: '0'
      }
    ],
    collectionList: null,
    hisdata: null,
    nodata: true,
    errornodata: true,
    nohisdata: true,
    tabArr: {
      curHdIndex: 1,
      curBdIndex: 1
    },
    chapter: [],
    catalist: [],
    errordata: null,
    chapterName: '答题数据'
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
  ifShow(e) {
    let index = e.currentTarget.dataset.index;
    let d = this.data;
    d.collectionList[index].isShow = !d.collectionList[index].isShow;
    this.setData({
      collectionList: d.collectionList
    })
    console.log(this.data.collectionList)
  },
  Showif(e) {
    let index = e.currentTarget.dataset.index;
    let d = this.data;
    d.errordata[index].isShow = !d.errordata[index].isShow;
    this.setData({
      errordata: d.errordata
    })
    console.log(this.data.collectionList)
  },
  getCollection(courseid) {
    let that = this
    let option = {
      courseId: courseid || that.data.courseId
    }
    console.log(option)
    app.encryption({
      url: api.default.getCollection,
      method: "GET",
      data: option,
      success: function (res) {
        console.log(res)
        if (res.data != undefined && res.data.code == 30000) {
          console.log('12313')
          that.setData({
            nodata: false
          })
        } else {
          for (let i of res) {
            i.content.forEach(element => {
              element.content = [{ A: 'lalala' }],
                element.stem = element.analyse
              app.testWxParse(that, element)
            });
          }
          that.setData({
            collectionList: res
          })
        }
      },
      fail: function (t) {
      },
      complete: function () {
      }
    })
  },
  getErrorTopicFeedbac() {
    let that = this
    let option = {
      problem_course_id: that.data.courseId
    }
    console.log(option)
    app.encryption({
      url: api.test.getProblemErrorCollectionChapter,
      method: "GET",
      data: option,
      success: function (res) {
        console.log(res)
        // if (res.data != undefined && res.data.code == 30000) {
        //   that.setData({
        //     errornodata: false
        //   })
        // } else {
        //   for (let i of res) {
        //     i.content.forEach(element => {
        //       element.content = [{ A: 'lalala' }],
        //         element.stem = element.analyse
        //       app.testWxParse(that, element)
        //     });
        //     console.log(i)
        //   }
        //   that.setData({
        //     errordata: res
        //   })
        // }
      },
      fail: function (t) {
      },
      complete: function () {
      }
    })
  },
  getBehaviorLogList() {
    let that = this
    let option = {
      courseId: that.data.courseId,
      page: 1
    }
    console.log(option)
    app.encryption({
      url: api.default.getBehaviorLogList,
      method: "GET",
      data: option,
      success: function (res) {
        console.log(res)
        // for(let i of res){
        //   app.testWxParse(that, i)
        // }
        if (res.data != undefined) {
          that.setData({
            nohisdata: false
          })
        } else {
          that.setData({
            hisdata: res
          })
        }
      },
      fail: function (t) {
      },
      complete: function () {
      }
    })

  },
  select_date(t) {
    let courseId = this.data.courseId
    let id = t.currentTarget.dataset.id
    wx.navigateTo({
      url: `../answerCardPir/answerCardPir?chapter_id=${t.currentTarget.dataset.cid}&courseId=${courseId}&type=${t.currentTarget.dataset.type}&name=${t.currentTarget.dataset.name}&id=${id}`
    })
  },
  goforError(t) {
    let courseId = this.data.courseId
    let id = t.currentTarget.dataset.id
    wx.navigateTo({
      url: `../errorCardPir/errorCardPir?chapter_id=${t.currentTarget.dataset.cid}&courseId=${courseId}&type=${t.currentTarget.dataset.type}&name=${t.currentTarget.dataset.name}&id=${id}`
    })
  },
  gobefor(e) {
    console.log(e.currentTarget.dataset.index)
    let pages = getCurrentPages(); // 当前页面
    let beforePage = pages[pages.length - 2];
    let courseId = wx.getStorageSync('courseId').courseId
    // console.log("beforePage");
    // console.log(beforePage);
    wx.navigateBack({
      success: function () {
        beforePage.getHomePanel(courseId);
      }
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      navH: app.globalData.navHeight,
    })
    let tabArr0 = 'tabArr.curHdIndex', tabArr1 = 'tabArr.curBdIndex'
    this.setData({
      courseId: options.courseId,
      [tabArr0]: options.number,
      [tabArr1]: options.number,
    })
    // this.getCollection(),
    this.getErrorTopicFeedbac()
    // this.getBehaviorLogList()
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