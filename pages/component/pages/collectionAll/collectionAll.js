// pages/collectionAll/collectionAll.js
let app = getApp(),
  util = require("../../../../utils/util.js")

let api = require("../../../../api.js")
Page({
  /**
   * 页面的初始数据
   */
  data: {
    page: 1,
    size: 20,
    hasMore: true,
    hasRefesh: false,
    hidden3: true,
    page3: 1,
    historyhasRefesh: '',
    historyhasMore: true,
    topSelect: [{
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

    wrongList: [],
    collectList: [],
    problem_chapter_id: '', //错题集中
    collectionList: null,
    hisdata: null,
    nodata: true,
    errornodata: true,
    nohisdata: true,
    tabArr: {
      curHdIndex: 0,
      curBdIndex: 0
    },
    chapter: [],
    catalist: [],
    errordata: [],
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
    // d.collectionList[index].isShow = !d.collectionList[index].isShow;
    let collectionLi = d.collectionList
    let problem_chapter_id = e.currentTarget.dataset.chapter_id
    let problem_course_id = this.data.problem_course_id
    collectionLi.forEach((i) => {
      console.log(i.chapter_id == problem_chapter_id)
      if (i.chapter_id == problem_chapter_id) {
        i.isShow = true
      } else {
        i.isShow = false
      }
    })
    this.setData({
      collectionList: collectionLi
    })
    let that = this
    let option = {
      problem_course_id: problem_course_id,
      problem_chapter_id: problem_chapter_id,
      page: 1
    }
    console.log(option)
    app.encryption({
      url: api.test.getCollectionProblemList,
      method: "GET",
      data: option,
      success: function (res) {
        console.log(res.list)
        let collectTitle = app.errorWxParse(that, res.list, 'wrong')
        console.log(collectTitle)
        that.setData({
          collectList: collectTitle
        })
      },
      fail: function (t) {},
      complete: function () {}
    })

  },
  Showif(e) {
    // console.log(e)
    // let index = e.currentTarget.dataset.index;
    // console.log(index)
    let d = this.data;
    let problem_chapter_id = e.currentTarget.dataset.chapter_id

    // d.errordata[index].isShow = !d.errordata[index].isShow;
    console.log()
    let WoringData = d.errordata
    console.log(WoringData)
    WoringData.forEach((i) => {
      console.log(i.chapter_id == problem_chapter_id)
      if (i.chapter_id == problem_chapter_id) {
        i.isShow = true
      } else {
        i.isShow = false
      }
    })

    this.setData({
      errordata: WoringData,
      problem_chapter_id: problem_chapter_id,
      page: 1,
      hasMore:true,
      hasRefesh: false
    })
    this.getErrorQues()
    // if(this.data.pageNum==1){
    //   this.setData({
    //     hasMore: false
    //   })
    // }
  
  },
  //获取错题集列表
  getErrorQues() {
    let problem_course_id = this.data.problem_course_id
    let problem_chapter_id = this.data.problem_chapter_id
    let that = this
    if (!this.data.hasMore) return
    if(this.data.page==1){
      this.setData({
        hasRefesh: false,
      });
    }else{
      this.setData({
        hasRefesh: true,
      });
    }
   
    let option = {
      problem_course_id: problem_course_id,
      problem_chapter_id: problem_chapter_id,
      page: this.data.page
    }
    console.log(option)
    app.encryption({
      url: api.test.getErrorProblemList,
      method: "GET",
      data: option,
      success: function (res) {
        let list = res.list;
        console.log(list);
        console.log(res.total)
        let total = res.total
        let worongTitle = app.errorWxParse(that, res.list, 'wrong')
        let pageNum = Math.ceil(total / 20)
       console.log(pageNum)
       if(pageNum<2){
        that.setData({
          wrongList: worongTitle,
          hasRefesh: false,
          pageNum: pageNum, 
          hasMore:false,
          page: that.data.page + 1
        })
       }
        
        if (that.data.page == 1) {
          that.setData({
            wrongList: worongTitle,
            hasRefesh: false,
            pageNum: pageNum, 
            page: that.data.page + 1
          })
     
        } else if (that.data.page > 1 && that.data.page <= pageNum) {
          console.log(worongTitle)
          if (that.data.page == pageNum) {
            that.setData({
              hasMore: false
            })
          }
          that.setData({
            wrongList: that.data.wrongList.concat(worongTitle),
            hasRefesh: false,
            pageNum: pageNum,
            page: that.data.page + 1
          })
          console.log(that.data.wrongList)
        }
      },
      fail: function (t) {},
      complete: function () {}
    })
  },
  getCollection() {
    let that = this
    let option = {
      problem_course_id: this.data.problem_course_id
    }
    console.log(option)
    app.encryption({
      url: api.default.getCollection,
      method: "GET",
      data: option,
      success: function (res) {
        console.log(res)
        let CollectionTitle = app.errorWxParse(that, res.list)
        that.setData({
          collectionList: CollectionTitle
        })

        // if (res.data != undefined && res.data.code == 30000) {
        //   console.log('12313')
        //   that.setData({
        //     nodata: false
        //   })
        // } else {
        //   for (let i of res) {
        //     i.content.forEach(element => {
        //       element.content = [{
        //           A: 'lalala'
        //         }],
        //         element.stem = element.analyse
        //       app.testWxParse(that, element)
        //     });
        //   }
        //   that.setData({
        //     collectionList: res
        //   })
        // }
      },
      fail: function (t) {},
      complete: function () {}
    })
  },
  getErrorTopicFeedbac() {
    let that = this
    let problem_course_id = wx.getStorageSync('problem_course_id').problem_course_id
    let option = {
      problem_course_id: problem_course_id
    }
    console.log(option)
    app.encryption({
      url: api.test.getProblemErrorCollectionChapter,
      method: "GET",
      data: option,
      success: function (res) {
        console.log(res)
        if (res.list.length <= 0) {
          that.setData({
            errornodata: false
          })
        } else {
          // for (let i of res) {
          //   i.content.forEach(element => {
          //     element.content = [{ A: 'lalala' }],
          //       element.stem = element.analyse
          //     app.testWxParse(that, element)
          //   });
          //   console.log(i)
          // }
          let errorTitle = app.errorWxParse(that, res.list)

          that.setData({
            errordata: errorTitle
          })
        }
      },
      fail: function (t) {},
      complete: function () {}
    })
  },
  getBehaviorLogList() {
    let that = this
    let option = {
      problem_course_id: this.data.problem_course_id,
      page: this.data.page3
    }
    if (!this.data.historyhasMore) return
    if(this.data.page3==1){
      this.setData({
        historyhasRefesh: false,
        hidden3: false,
      });
    }else{
      this.setData({
        historyhasRefesh: true,
        hidden3: false,
      });
    }
    

    app.encryption({
      url: api.default.getBehaviorLogList,
      method: "GET",
      data: option,
      success: function (res) {
        console.log(res.total)
        let pageNum3 = Math.ceil(res.total / 20)
        console.log(pageNum3)
        that.setData({
          hidden3: true,
          historyhasRefesh: false,
        })
        console.log(that.data.page3)
        let historyTitle = app.errorWxParse(that, res.list, 'history')
        // console.log(historyTitle)
        for (let k in historyTitle) {
          historyTitle[k].create_time = util.js_date_time(historyTitle[k].create_time)
        }
        if (that.data.page3 == 1) {
          that.setData({
            hisdata: historyTitle,
            pageNum3: pageNum3,
            page3: that.data.page3 + 1
          })
          console.log(that.data.hisdata)
        } else if (that.data.page3 > 1 && that.data.page3 <= pageNum3) {
          // console.log(that.data.page3)
          // console.log(pageNum3)
          if (that.data.page3 == pageNum3) {
            that.setData({
              historyhasMore: false
            })
          }
          that.setData({
            hisdata: that.data.hisdata.concat(historyTitle),
            pageNum3: pageNum3,
            page3: that.data.page3 + 1
          })
         
          // console.log(that.data.wrongList)
        }
        //  else {
        //   console.log(888888)
        //   that.setData({
        //          historyhasMore: false
        //   })
        //   // that.setData({

        //   //   pageNum3: pageNum3,
        //   //   page3: that.data.page3,
        //   //   historyhasMore: false
        //   // })
        // }

        // else{
        //   that.setData({
        //     hisdata:that.data.hisdata.concat(historyTitle)
        //   })
        // }

        // if (res.data != undefined) {
        //   that.setData({
        //     nohisdata: false
        //   })
        // } else {
        // }
      },
      fail: function (t) {},
      complete: function () {}
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
    let problem_course_id = wx.getStorageSync('problem_course_id').problem_course_id
    this.setData({
      problem_course_id: problem_course_id
    })
    wx.startPullDownRefresh();
    console.log(options)
    this.setData({
      navH: app.globalData.navHeight,
    })
    let tabArr0 = 'tabArr.curHdIndex',
      tabArr1 = 'tabArr.curBdIndex'
    this.setData({
      courseId: options.courseId,
      [tabArr0]: options.number,
      [tabArr1]: options.number,
    })
    this.getCollection(),
      this.getErrorTopicFeedbac()
    this.getBehaviorLogList()
  },
  loadMore() {
    // console.log(111)
    // console.log(this.data.page)
    // console.log(this.data.pageNum)
 this.getErrorQues()
    // if (this.data.pageNum <= 1) {
    //   this.setData({
    //     hasMore: false,
    //     hasRefesh: false
    //   })
    // }
    // if (this.data.page != this.data.pageNum + 1) {
    //   this.getErrorQues()
    // } else {
    //   this.setData({
    //     hasMore: false,
    //     hasRefesh: false
    //   })
    // }

  },
  refesh() {
    var that = this;
    that.setData({
      hasRefesh: true,
      page: 1,
      hasMore: true,
    });
    this.getErrorQues()
  },
  //做题历史加载更多
  historyloadMore() {
    this.getBehaviorLogList()
  },
  historyrefesh() {
    this.setData({
      historyhasRefesh: true,
      historyhasMore:true,
      page3: 1,
    });
    this.getBehaviorLogList()
  },

  onPullDownRefresh() {
    wx.stopPullDownRefresh()
  },
  onReachBottom: function () {
    console.log("上拉加载")
    let that = this;
    that.setData({
      loading: true, //把"上拉加载"的变量设为false，显示 
      pageIndex: that.data.pageIndex + 5

    })
    // 上拉获取更多数据
    this.gainMoreLoadingListData()
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
  onReachBottom: function () {},
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})