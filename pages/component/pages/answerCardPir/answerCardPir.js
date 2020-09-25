var t, app = getApp(), api = require("../../../../api.js"),
  app = getApp(),
  wxParse = require("../../../../wxParse/wxParse.js");
const util = require('../../../../utils/util.js')
Page({
  data: {
    current_no: 0,
    all_current_no: '0', //当前题目
    question_list: [],
    question_no: 1,
    is_collect: 0,
    question_num: 40,
    originTitle: [],
    randerTitle: [],
    allRender: [],
    indexs: 0,
    option: '',
    disabled: false,
    showAny: true,
    likes: false,//默认展示未收藏
    singleNum: '0',
    multipleNum: '0',
    judgmentNum: '0',
    formId: '',
    tabItems: [
      {
        icon: 'https://minproimg.oss-cn-hangzhou.aliyuncs.com/images/cards (4).png',
        name: '上一题',
        action: 'lastQU',
        class: ''
      },
      {
        icon: 'https://minproimg.oss-cn-hangzhou.aliyuncs.com/images/weishoucang.png',
        name: '收藏',
        action: 'likes',
        class: 'active',
        id: 3
      },
      {
        icon: 'https://minproimg.oss-cn-hangzhou.aliyuncs.com/images/cards (3).png',
        name: '下一题',
        action: 'nextQU',
        class: ''
      }
    ],
    ProblemType: '1',
    answerImg: 'https://minproimg.oss-cn-hangzhou.aliyuncs.com/images/hideAnswer.png',
    activeAnswer: 'defaultAnswer',
    correctoption: '',
    multishowAny: true,
    multiselect: '',
    chapterName: '收藏夹'
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
        beforePage.getCollection(courseId);
      }
    });
  },
  lastQU() {
    if (this.data.current_no < 1) {//如果下标小于等于1则提示当前已经是第一题
      wx.showToast({
        title: '已经是第一道题了！',//提示文字
        duration: 1000,//显示时长
        mask: false,//是否显示透明蒙层，防止触摸穿透，默认：false  
        icon: 'none', //图标，支持"success"、"loading"  
        success: function () { },//接口调用成功
        fail: function () { },  //接口调用失败的回调函数  
        complete: function () { } //接口调用结束的回调函数  
      })
      let icon = 'tabItems[0].icon'
      this.setData({
        [icon]: 'https://minproimg.oss-cn-hangzhou.aliyuncs.com/images/cards (4).png',
      })
      return
    }
    this.setData({
      showAny: true
    })
    let that = this
    let randerTitle = null
    let current_no = that.data.current_no//获取上一题的下标
    current_no -= 1
    let curReander = that.data.originTitle[current_no]//获取上一题的原始数据
    randerTitle = app.testWxParse(that, curReander)
    console.log(randerTitle)
    let res = randerTitle.content.some(res => {
      return res.color == true || res.err == true
    })
    let option = randerTitle.content.forEach(res => {
      if (res.color == true || res.err == true) {
        return res.option
      }
    })
    if (res) {
      this.setData({
        showAny: false,
        option: option
      })
    } else {
      this.setData({
        showAny: true,
        option: option
      })
    }
    that.setData({
      randerTitle: randerTitle,//挂载页面
      current_no: current_no,//更新下标
      ProblemType: randerTitle.ProblemType,//更新题目类型
      answerImg: 'https://minproimg.oss-cn-hangzhou.aliyuncs.com/images/hideAnswer.png',
      activeAnswer: 'defaultAnswer',
      correctoption: '',
    })
  },
  cards() {
    let judgmentNum = JSON.stringify(this.data.judgmentNum)
    let singleNum = JSON.stringify(this.data.singleNum)
    let multipleNum = JSON.stringify(this.data.multipleNum)
    let formId = this.data.formId
    wx.navigateTo({
      url: `../answerCard/answerCard?name=第一章&formId=${formId}&judgmentNum=${judgmentNum}&singleNum=${singleNum}&multipleNum=${multipleNum}`
    })
  },
  nextQU() {
    if (this.data.current_no + 1 >= this.data.all_current_no) {
      wx.showToast({
        title: '已经是最后一道题了！',//提示文字
        duration: 1000,//显示时长
        mask: false,//是否显示透明蒙层，防止触摸穿透，默认：false  
        icon: 'none', //图标，支持"success"、"loading"  
        success: function () { },//接口调用成功
        fail: function () { },  //接口调用失败的回调函数  
        complete: function () { } //接口调用结束的回调函数  
      })
      return
    }
    var that = this
    let randerTitle
    let current_no = that.data.current_no//获取下一题index
    current_no += 1
    let curReander = that.data.originTitle[current_no]//获取下一题的原始数据
    console.log('大家好')//判断下一题的渲染数据是否已存在当前已经渲染的数据集合，如果不存在则添加并初始化状态
    //如果该数据没有解析则进行解析
    randerTitle = app.testWxParse(that, curReander)
    let res = randerTitle.content.some(res => {
      return res.color == true || res.err == true
    })
    let option = randerTitle.content.forEach(res => {
      if (res.color == true || res.err == true) {
        return res.option
      }
    })
    console.log(res)
    if (res) {
      this.setData({
        showAny: false,
        option: option
      })
    } else {
      this.setData({
        showAny: true,
        option: option
      })
    }
    that.setData({
      randerTitle: randerTitle,//挂载页面
      current_no: current_no,//更新下标
      ProblemType: randerTitle.ProblemType,//更新题目类型
      answerImg: 'https://minproimg.oss-cn-hangzhou.aliyuncs.com/images/hideAnswer.png',
      activeAnswer: 'defaultAnswer',
      correctoption: '',
      multishowAny: true//
    })

    if (current_no > 0) {
      let icon = 'tabItems[0].icon'
      this.setData({
        [icon]: 'https://minproimg.oss-cn-hangzhou.aliyuncs.com/images/leftsing.png',
      })
    }
    if (randerTitle.ProblemType == '2') {
      let options = {
        problemId: randerTitle.ProblemId,
        answe: this.data.multiselect
      }
      app.encryption({
        url: api.default.answerEvents,
        data: options,
        method: 'POST',
        dataType: "json",
        success: function (res) {
          console.log(res)
        },
        fail: function (n) {
          console.log('333333')
        }
      })
    }
  },
  //选择答案
  selectAnswer(e) {
    if (!this.data.showAny) {//如果已选答案，再次点击不在触发
      return
    }
    let rightStatus = 1;
    let formId = this.data.formId;
    let option = e.currentTarget.dataset.option;//当前点击选项的option
    let answer = e.currentTarget.dataset.answer;//当前题目的答案
    let index = e.currentTarget.dataset.index;//当前点击选项的index
    let id = e.currentTarget.dataset.id;//当前点击题目的ID
    let color = this.data.randerTitle.content[index];//获取当前点击选项的数组
    this.setData({
      showAny: false,//尚未操作前，隐藏答案
    })
    color.color = false//新增当前点击选项的color
    color.err = false//新增当前点击选项的err
    if (option == answer) { //单选正确
      color.color = true//改变当前选项的颜色为true
      rightStatus = 1
      this.setData({
        randerTitle: this.data.randerTitle,//缓存改变后的渲染数据
      })
    } else {
      rightStatus = 0
      color.color = false
      color.err = true
      this.setData({
        randerTitle: this.data.randerTitle,//缓存改变后的渲染数据
      })
    }
    //记录点击选项后数据库的改变
    let options = {
      problemId: id,
      answe: option,
      formId: formId,
      rightStatus: rightStatus
    }
    console.log(options)
    app.encryption({
      url: api.default.answerEvents,
      data: options,
      method: 'POST',
      dataType: "json",
      success: function (res) {
        console.log(res)
      },
      fail: function (n) {
        console.log('333333')
      }
    })
  },
  multiselectAnswer(e) {
    if (!this.data.multishowAny) {
      return
    }
    let option = e.currentTarget.dataset.option;
    let answer = e.currentTarget.dataset.answer;
    let index = e.currentTarget.dataset.index;
    let color = this.data.randerTitle.content[index];
    let id = e.currentTarget.dataset.id;
    console.log(option, answer)
    let multiselect = []
    if (!multiselect.includes(option)) {
      multiselect.push(option)
      this.setData({
        multiselect: this.data.multiselect + option + ','
      })
    }
    if (answer.includes(option)) {
      color.color = true
      this.setData({
        randerTitle: this.data.randerTitle,
      })
    } else {
      color.color = false
      color.err = true
      this.setData({
        randerTitle: this.data.randerTitle
      })
    }

    // this.setData({
    //   option:multiselect
    // })
  },
  wode(number, nosubmit = 0) {
    let that = this
    let allRenders = that.data.originTitle//获取所有的数据
    console.log(allRenders)
    allRenders.forEach(element => {
      app.testWxParse(that, element)
    });
    number = allRenders.findIndex(ite => ite.problemId == number)
    if (number >= 1) {
      let icon = 'tabItems[0].icon'
      this.setData({
        [icon]: 'https://minproimg.oss-cn-hangzhou.aliyuncs.com/images/leftsing.png',
      })
    }
    console.log(number, nosubmit)
    let randerTitle = app.testWxParse(that, allRenders[number])
    this.setData({
      randerTitle: randerTitle,
      current_no: number + 1,
      allRenders: allRenders
    })
  },
  showAnswer() {
    if (this.data.activeAnswer == 'activeAnswer') {
      this.setData({
        answerImg: 'https://minproimg.oss-cn-hangzhou.aliyuncs.com/images/hideAnswer.png',
        activeAnswer: 'defaultAnswer',
        correctoption: '',
        multishowAny: true
      })
    } else {
      this.setData({
        answerImg: 'https://minproimg.oss-cn-hangzhou.aliyuncs.com/images/showAnswer (1).png',
        activeAnswer: 'activeAnswer',
        correctoption: 'activeoption',
        multishowAny: false
      })
    }
  },
  onLoad: function (options = {}) {
    console.log(options)
    this.setData({
      navH: app.globalData.navHeight,
    })
    let icon = 'tabItems[1].icon'
    let classes = 'tabItems[1].class'
    let name = 'tabItems[1].name'//以上为获取收藏按钮状态
    var that = this;
    let id = options.id
    let option = {
      type: options.type,
      courseId: parseInt(options.courseId),
      chapterId: parseInt(options.chapter_id)
    }//以上为初始化加载参数
    console.log(option)
    app.encryption({//初始化加载函数获取所有题目
      url: api.default.collectionList,
      data: option,
      method: 'GET',
      dataType: "json",
      success: function (res) {
        console.log(res)
        let number = res.list.findIndex(ite => ite.problemId == id)
        let randerTitle = app.testWxParse(that, res.list[number])//初始化第一道题目
        if (number >= 1) {
          let icon = 'tabItems[0].icon'
          that.setData({
            [icon]: 'https://minproimg.oss-cn-hangzhou.aliyuncs.com/images/leftsing.png',
          })
        }
        that.data.allRender.push(randerTitle)//allRender为所有已经渲染页面的数据集合
        that.setData({
          originTitle: res.list,//为所有原始数据
          randerTitle: randerTitle,//为当前渲染数据
          current_no: number,//初始化题目标注
          ProblemType: randerTitle.ProblemType,//表明练习题类型
          all_current_no: res.count,//所有题目的数量
          singleNum: res.singleList,//单选题的数量
          multipleNum: res.multipleLis,//多选题的数量
          judgmentNum: res.judgmentList,//判断题的数量
          formId: res.formId,
          likes: true,
          [icon]: 'https://minproimg.oss-cn-hangzhou.aliyuncs.com/images/yishuangcang (1).png',
          [classes]: 'active',
          [name]: '已收藏'//formid
        })
        //是否已收藏
        // that.wode(id)
      },
      fail: function (n) {
        console.log('初始化失败')
      }
    })
  },
  likes() {
    let that = this
    let icon = 'tabItems[1].icon'
    let classes = 'tabItems[1].class'
    let name = 'tabItems[1].name'
    let current_no = that.data.current_no
    let allRender = that.data.allRender//页面已经渲染的数据集合
    console.log(current_no, allRender)
    if (this.data.tabItems[1].class == 'active') {
      let option = {
        problemId: this.data.randerTitle.problemId,
        behavior: 2
      }
      app.encryption({
        url: api.default.makeCollection,
        data: option,
        method: 'POST',
        dataType: "json",
        success: function (res) {
          if (res.data.code == 200) {
            that.setData({
              likes: false,//表示当前题目未收藏
              [icon]: 'https://minproimg.oss-cn-hangzhou.aliyuncs.com/images/weishoucang.png',
              [classes]: '',
              [name]: '收藏',
              allRender: allRender//缓存即将需要渲染的数据
            })
            // $Message({
            //   content: '收藏已取消',
            //   type: 'success'
            // });
            wx.showToast({
              title: '收藏已取消',
              icon: 'none',
              duration: 2000
            })
            return
          }
          wx.showToast({
            title: res.data.message,
            icon: 'none',
            duration: 2000
          })

        },
        fail: function (n) {
          console.log('333333')
        }
      })
      return
    }
    let option = {
      problemId: this.data.randerTitle.problemId,
      behavior: 1
    }
    app.encryption({
      url: api.default.makeCollection,
      data: option,
      method: 'POST',
      dataType: "json",
      success: function (res) {
        if (res.data.code == 200) {
          that.setData({
            likes: true,
            [icon]: 'https://minproimg.oss-cn-hangzhou.aliyuncs.com/images/yishuangcang (1).png',
            [classes]: 'active',
            [name]: '已收藏',
            allRender: allRender
          })
          wx.showToast({
            title: '收藏成功',
            icon: 'none',
            duration: 2000
          })
          // $Message({
          //   content: '收藏成功',
          //   type: 'success'
          // });
          return
        }
        wx.showToast({
          title: res.data.message,
          icon: 'none',
          duration: 2000
        })
        // $Message({
        //   content: res.data.message,
        //   type: 'warning'
        // });

      },
      fail: function (n) {
        console.log('333333')
      }
    })
  },
  onReady: function () { },
  onShow: function () { },
  onHide: function () {
    clearTimeout(t);
  },
  onUnload: function () {
    clearTimeout(t);
  },
  onPullDownRefresh: function () { },
  onReachBottom: function () { },
  // 左右滑动事件
  touchStart(e) {
    this.setData({
      touchX: e.changedTouches[0].clientX,
      touchY: e.changedTouches[0].clientY
    });
  },
  touchEnd(e) {
    let d = this.data;
    let x = e.changedTouches[0].clientX;
    let y = e.changedTouches[0].clientY;
    let direction = app.getTouchData(x, y, d.touchX, d.touchY);
    if (direction == 'left') {
      this.nextQU();
    } else if (direction == 'right') {
      this.lastQU();
    }
  },
});