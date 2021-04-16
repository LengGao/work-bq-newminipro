// pages/collectionAll/collectionAll.js
let app = getApp(),
  util = require('../../../../utils/util.js')

let api = require('../../../../api.js')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    noContent: false,
    page: 1,
    size: 20,
    hasMore: true,
    hasRefesh: false,
    page2: 1,
    collecthasMore: true,
    collecthasRefesh: false,
    hidden3: true,
    page3: 1,
    pageNum: '',
    pageNum2: '',
    pageNum3: '',
    historyhasRefesh: '',
    historyhasMore: true,
    historyScroll: '',
    topSelect: [{
        name: '收藏夹',
        id: '2',
      },
      {
        name: '错题集',
        id: '1',
      },
      {
        name: '做题历史',
        id: '0',
      },
    ],

    wrongList: [],
    collectList: [],
    problem_chapter_id: '', //错题集中
    collect_chapter_id: '',
    collectionList: null,
    hisdata: null,
    nodata: true,
    errornodata: true,
    nohisdata: true,
    tabArr: {
      curHdIndex: 1,
      curBdIndex: 1,
    },
    chapter: [],
    catalist: [],
    errordata: [],
    chapterName: '答题数据',
  },
  tabFun: function (t) {
    var e = t.target.dataset.id
    console.log(e)
    let collectionLi = this.data. collectionList
    console.log(collectionLi)
    if(collectionLi){
    collectionLi.forEach((i) => {
      i.isShow = false
    })
    this.setData({
      // errordata: WoringData,
       collectionList: collectionLi,
    })
  }
    let WoringData = this.data.errordata
     //折叠错题集所有下拉菜单
     console.log(WoringData&&WoringData.length>0)
    if (WoringData) {
      console.log(11111)
      WoringData.forEach((i) => {
        i.isShow = false
      })
      this.setData({
        errordata: WoringData,
        // collectionList: collectionLi,
      })
    }
    console.log('----' + e + '----')
    var tab = {};
    (tab.curHdIndex = e),
    (tab.curBdIndex = e),
    this.setData({
      tabArr: tab,
    })
  },
  ifShow(e) {
    let d = this.data
    // d.collectionList[index].isShow = !d.collectionList[index].isShow;
    let collectionLi = d.collectionList
    let problem_chapter_id = e.currentTarget.dataset.chapter_id
    collectionLi.forEach((i) => {
      console.log(i.chapter_id == problem_chapter_id)
      if (i.chapter_id == problem_chapter_id) {
        if (
          problem_chapter_id == this.data.collect_chapter_id &&
          i.isShow == true
        ) {
          i.isShow = false
        } else {
          i.isShow = true
        }
      } else {
        i.isShow = false
      }
    })
    this.setData({
      collectionList: collectionLi,
      collect_chapter_id: problem_chapter_id,
      page2: 1,
      collecthasMore: true,
      collecthasRefesh: false,
    })
    this.getFavoritesList()
  },
  //获取收藏夹列表
  getFavoritesList() {
    let problem_course_id = this.data.problem_course_id
    let that = this
    if (!this.data.collecthasMore) return
    if (this.data.page2 == 1) {
      this.setData({
        collecthasRefesh: false,
      })
    } else {
      this.setData({
        collecthasRefesh: true,
      })
    }
    let option = {
      problem_course_id: problem_course_id,
      problem_chapter_id: this.data.collect_chapter_id,
      page: this.data.page2,
    }
    console.log(option)
    app.encryption({
      url: api.test.getCollectionProblemList,
      method: 'GET',
      data: option,
      success: function (res) {
        console.log(res.list)
        let total = res.total
        let collectTitle = app.errorWxParse(that, res.list, 'wrong')
        let pageNum = Math.ceil(total / 20)
        console.log(pageNum)
        if (pageNum < 2) {
          that.setData({
            collectList: collectTitle,
            collecthasRefesh: false,
            pageNum2: pageNum,
            collecthasMore: false,
            page2: that.data.page2 + 1,
          })
        }
        if (that.data.page2 == 1) {
          that.setData({
            collectList: collectTitle,
            collecthasRefesh: false,
            pageNum2: pageNum,
            page2: that.data.page2 + 1,
          })
        } else if (that.data.page2 > 1 && that.data.page2 <= pageNum) {
          if (that.data.page2 == pageNum) {
            that.setData({
              collecthasMore: false,
            })
          }
          that.setData({
            collectList: that.data.collectList.concat(collectTitle),
            collecthasRefesh: false,
            pageNum2: pageNum,
            page2: that.data.page2 + 1,
          })
        }
      },
      fail: function (t) {},
      complete: function () {},
    })
  },
  Showif(e) {
    let d = this.data
    let problem_chapter_id = e.currentTarget.dataset.chapter_id
    let WoringData = d.errordata
    WoringData.forEach((i) => {
      if (i.chapter_id == problem_chapter_id) {
        if (
          problem_chapter_id == this.data.problem_chapter_id &&
          i.isShow == true
        ) {
          i.isShow = false
        } else {
          i.isShow = true
        }
      } else {
        i.isShow = false
      }
    })
    this.setData({
      errordata: WoringData,
      problem_chapter_id: problem_chapter_id,
      hasMore: true,
      hasRefesh: false,
      page: 1,
    })
    console.log(this.data.hasMore)
    this.getErrorQues()
  },
  //获取错题集列表
  getErrorQues() {
    let problem_course_id = this.data.problem_course_id
    let that = this
    if (!this.data.hasMore) return
    if (this.data.page == 1) {
      this.setData({
        hasRefesh: false,
      })
    } else {
      this.setData({
        hasRefesh: true,
      })
    }
    let option = {
      problem_course_id: problem_course_id,
      problem_chapter_id: this.data.problem_chapter_id,
      page: this.data.page,
    }
    console.log(option)
    app.encryption({
      url: api.test.getErrorProblemList,
      method: 'GET',
      data: option,
      success: function (res) {
        // let list = res.list;
        console.log(res.list)
        let total = res.total
        let worongTitle = app.errorWxParse(that, res.list, 'wrong')
        console.log(worongTitle)
        let pageNum = Math.ceil(total / 20)
        if (pageNum < 2) {
          that.setData({
            wrongList: worongTitle,
            hasRefesh: false,
            pageNum: pageNum,
            hasMore: false,
            page: that.data.page + 1,
          })
        }
        if (that.data.page == 1) {
          that.setData({
            wrongList: worongTitle,
            hasRefesh: false,
            pageNum: pageNum,
            page: that.data.page + 1,
          })
        } else if (that.data.page > 1 && that.data.page <= pageNum) {
          console.log(that.data.page == pageNum)
          if (that.data.page == pageNum) {
            that.setData({
              hasMore: false,
            })
          }
          console.log(that.data.hasMore)
          console.log(11)
          that.setData({
            wrongList: that.data.wrongList.concat(worongTitle),
            hasRefesh: false,
            pageNum: pageNum,
            page: that.data.page + 1,
          })
        }
      },
      fail: function (t) {},
      complete: function () {},
    })
  },
  getCollection() {
    let that = this
    let option = {
      problem_course_id: this.data.problem_course_id,
    }
    console.log(option)
    app.encryption({
      url: api.default.getCollection,
      method: 'GET',
      data: option,
      success: function (res) {
        console.log(res)
        if (res.list.length <= 0) {
          that.setData({
            nodata: false,
          })
        } else {
          let CollectionTitle = app.errorWxParse(that, res.list)
          that.setData({
            collectionList: CollectionTitle,
          })
        }
      },
      fail: function (t) {},
      complete: function () {},
    })
  },
  getErrorTopicFeedbac() {
    var that = this
    let problem_course_id = wx.getStorageSync('problem_course_id')
      .problem_course_id
    let option = {
      problem_course_id: problem_course_id,
    }
    console.log(option)
    app.encryption({
      url: api.test.getProblemErrorCollectionChapter,
      method: 'GET',
      data: option,
      success: function (res) {
        console.log(res)
        if (res.list.length <= 0) {
          that.setData({
            errornodata: false,
          })
        } else {
          // console.log()
          let errorTitle = app.errorWxParse(that, res.list)
          console.log(errorTitle)
          that.setData({
            errordata: errorTitle,
          })
        }
      },
      fail: function (t) {},
      complete: function () {},
    })
  },
  getBehaviorLogList() {
    let that = this
    let option = {
      problem_course_id: this.data.problem_course_id,
      page: this.data.page3,
    }
    if (!this.data.historyhasMore) return
    this.setData({
      hidden3: false,
    })
    if (this.data.page3 == 1) {
      this.setData({
        historyhasRefesh: false,
      })
    } else {
      this.setData({
        historyhasRefesh: true,
      })
    }

    app.encryption({
      url: api.default.getBehaviorLogList,
      method: 'GET',
      data: option,
      success: function (res) {
        console.log(res.total)
        if (res.list.length <= 0) {
          that.setData({
            nohisdata: false,
          })
        }
        let pageNum = Math.ceil(res.total / 20)
        that.setData({
          hidden3: true,
          historyhasRefesh: false,
        })
        console.log(that.data.page3)
        let historyTitle = app.errorWxParse(that, res.list, 'history')
        // console.log(historyTitle)
        for (let k in historyTitle) {
          historyTitle[k].create_time = util.js_date_time(
            historyTitle[k].create_time
          )
        }

        if (pageNum < 2) {
          that.setData({
            hisdata: historyTitle,
            historyhasRefesh: false,
            pageNum3: pageNum,
            noContent: false,
            historyhasMore: false,
            page: that.data.page + 1,
          })
        }
        if (that.data.page3 == 1) {
          that.setData({
            hisdata: historyTitle,
            pageNum3: pageNum,
            page3: that.data.page3 + 1,
          })
          console.log(that.data.hisdata)
        } else if (that.data.page3 > 1 && that.data.page3 <= pageNum) {
          if (that.data.page3 == pageNum) {
            that.setData({
              historyhasMore: false,
              noContent: false,
            })
          }
          that.setData({
            hisdata: that.data.hisdata.concat(historyTitle),
            pageNum3: pageNum,
            page3: that.data.page3 + 1,
          })
        }
      },
      fail: function (t) {},
      complete: function () {},
    })
  },
  select_date(t) {
    let id = t.currentTarget.dataset.cid
    wx.navigateTo({
      url: `../errorCardPir/errorCardPir?problem_id=${id}&problem_chapter_id=${this.data.collect_chapter_id}&type=${t.currentTarget.dataset.type}`,
    })
  },
  goforError(t) {
    let id = t.currentTarget.dataset.cid
    wx.navigateTo({
      // url: `../errorCardPir/errorCardPir?problem_id=${id}&type=${t.currentTarget.dataset.type}`
      url: `../errorCardPir/errorCardPir?problem_course_id=${this.data.problem_course_id}&problem_chapter_id=${this.data.problem_chapter_id}&type=${t.currentTarget.dataset.type}`,
    })
  },
  gobefor(e) {
    console.log(e.currentTarget.dataset.index)
    let pages = getCurrentPages() // 当前页面
    let beforePage = pages[pages.length - 2]
    let courseId = wx.getStorageSync('courseId').courseId
    // console.log("beforePage");
    // console.log(beforePage);
    wx.navigateBack({
      success: function () {
        beforePage.getHomePanel(courseId)
      },
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let problem_course_id = wx.getStorageSync('problem_course_id')
      .problem_course_id
    this.setData({
      problem_course_id: problem_course_id,
    })
    // wx.startPullDownRefresh();
    console.log(options)
    let screenHeight = wx.getSystemInfoSync().windowHeight
    let historyScroll = screenHeight - app.globalData.navHeight
    let that = this
    let query = wx
      .createSelectorQuery()
      .select('.fenlei-menu')
      .boundingClientRect(function (res) {
        let thisFenLeiHeight = res.height
        console.log(thisFenLeiHeight)
        console.log(app.globalData.navHeight)
        that.setData({
          historyScroll: screenHeight - app.globalData.navHeight - thisFenLeiHeight + 'px',
          // setHeight: screenHeight - thisflexBoxHeight - thisbgcolorHeight+'px'
        })
        console.log(that.data.historyScroll)
      })
      .exec()
    console.log(this.data.historyScroll)
    this.setData({
      navH: app.globalData.navHeight,
    })

    // console.log(screenHeight,historyScroll)
    let tabArr0 = 'tabArr.curHdIndex',
      tabArr1 = 'tabArr.curBdIndex'
    this.setData({
      courseId: options.courseId,
      [tabArr0]: options.number,
      [tabArr1]: options.number,
    })
    this.getCollection(), this.getErrorTopicFeedbac()
    this.getBehaviorLogList()
  },
  loadMore() {
    console.log('进入了下拉加载')
    this.getErrorQues()
  },
  refesh() {
    console.log('进入了刷新')
    this.setData({
      hasRefesh: true,
      hasMore: true,
      page: 1,
    })
    this.getErrorQues()
  },
  //做题历史加载更多
  historyloadMore() {
    this.getBehaviorLogList()
  },
  historyrefesh() {
    this.setData({
      historyhasRefesh: true,
      historyhasMore: true,
      page3: 1,
    })
    this.getBehaviorLogList()
  },
  //收藏集加载更多
  colloadMore() {
    this.getFavoritesList()
  },
  collrefesh() {
    this.setData({
      collecthasRefesh: true,
      collecthasMore: true,
      page2: 1,
    })
    this.getFavoritesList()
  },

  // onPullDownRefresh() {
  //   wx.stopPullDownRefresh()
  // },
  // onReachBottom: function () {
  //   console.log("上拉加载")
  //   let that = this;
  //   that.setData({
  //     loading: true, //把"上拉加载"的变量设为false，显示
  //     pageIndex: that.data.pageIndex + 5

  //   })
  //   // 上拉获取更多数据
  //   this.gainMoreLoadingListData()
  // },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},
  /**
   * 用户点击右上角分享
   */
  // onShareAppMessage: function () {},
})