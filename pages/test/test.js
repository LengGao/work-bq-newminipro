var t, app = getApp(), api = require("../../api.js"),
  app = getApp(),
  wxParse = require("../../wxParse/wxParse.js");
Page({
  data: {
    current_no: -1,
    all_current_no: '0', //当前题目
    question_list: [],
    question_no: 1,
    is_collect: 0,
    question_num: 40,
    originTitle: [],
    randerTitle: [],
    allRender: [],
    indexs: 0,
    noexist:false,
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
        icon: 'https://minproimg.oss-cn-hangzhou.aliyuncs.com/images/leftsing.png',
        name: '上一题',
        action: 'lastQU',
        class: '',
        id: 1
      },
      {
        icon: 'https://minproimg.oss-cn-hangzhou.aliyuncs.com/images/cards (1).png',
        name: '答题卡',
        action: 'cards',
        class: '',
        id: 2
      },
      {
        icon: 'https://minproimg.oss-cn-hangzhou.aliyuncs.com/images/weishoucang.png',
        name: '收藏',
        action: 'likes',
        class: '',
        id: 3
      },
      {
        icon: 'https://minproimg.oss-cn-hangzhou.aliyuncs.com/images/cards (3).png',
        name: '下一题',
        action: 'nextQU',
        class: '',
        id: 4
      }
    ],
    ProblemType: '1',
    answerImg: 'https://minproimg.oss-cn-hangzhou.aliyuncs.com/images/hideAnswer.png',
    activeAnswer: 'defaultAnswer',
    correctoption: '',
    multishowAny: true,
    multiselecting: [],
    multiselect: '',
    multiID: '',
    multiAnswer: '',
    title: '',
    questionHeight: "",
    correctAnswer: false,
    wrongAnswer: false
  },
  lastQU() {
    let that = this
    let icon = 'tabItems[2].icon'
    let classes = 'tabItems[2].class'
    let name = 'tabItems[2].name'//以上为收藏按钮数据
    let current_no = that.data.current_no//获取当前标题数
    let allRenders = that.data.allRender//获取所有已经渲染的数据
    console.log(allRenders.length)
    current_no = current_no - 1 //获取上一题的下标（局部）

    // if (that.data.noexist) {
    //   let datas = that.data.originTitle[current_no]
    //   let randerTitle = app.testWxParse(that, datas)
    //   this.setData({
    //     randerTitle: randerTitle,
    //     current_no: current_no,
    //     answerImg: 'https://minproimg.oss-cn-hangzhou.aliyuncs.com/images/hideAnswer.png',
    //     activeAnswer: 'defaultAnswer',
    //     correctoption: '',
    //     ProblemType: randerTitle.ProblemType
    //   })
    //   return
    // }
    console.log(current_no)
    if (current_no < 0) {//如果下标小于等于1则提示当前已经是第一题
      wx.showToast({
        title: '已经是第一题了',
        icon: 'none',
        duration: 2000
      })
      let icon = 'tabItems[0].icon'
      this.setData({
        current_no: 0,
        [icon]: 'https://minproimg.oss-cn-hangzhou.aliyuncs.com/images/cards (4).png',
      })
      return
    }

    if (typeof (allRenders[current_no].isCollect) != undefined && allRenders[current_no].isCollect == '1') { //已收藏 
      that.setData({
        likes: true,
        [icon]: 'https://minproimg.oss-cn-hangzhou.aliyuncs.com/images/yishuangcang (1).png',
        [classes]: 'active',
        [name]: '已收藏'
      })
    } else {
      that.setData({
        likes: true,
        [icon]: 'https://minproimg.oss-cn-hangzhou.aliyuncs.com/images/weishoucang.png',
        [classes]: '',
        [name]: '收藏'
      })
    }
    console.log(allRenders[current_no])
    if (allRenders[current_no].done) {
      that.setData({
        showAny: 0,
        multishowAny: 0
      })
    } else {
      that.setData({
        showAny: true,
        multishowAny: true
      })
    }
    this.setData({
      randerTitle: allRenders[current_no],
      current_no: current_no,
      answerImg: 'https://minproimg.oss-cn-hangzhou.aliyuncs.com/images/hideAnswer.png',
      activeAnswer: 'defaultAnswer',
      correctoption: '',
      ProblemType: allRenders[current_no].ProblemType
    })
    this.showAnswer()
    if (allRenders[current_no].yourAnswer && allRenders[current_no].yourAnswer != '') { //如果改题目已经做过
      that.init(allRenders[current_no].yourAnswer)
    }
  },
  cards() {
    let judgmentNum = JSON.stringify(this.data.judgmentNum)
    let singleNum = JSON.stringify(this.data.singleNum)
    let multipleNum = JSON.stringify(this.data.multipleNum)
    let formId = this.data.formId
    let name = this.data.chapterName
    wx.navigateTo({
      url: `../answerCard/answerCard?name=${name}&formId=${formId}&judgmentNum=${judgmentNum}&singleNum=${singleNum}&multipleNum=${multipleNum}`
    })
  },
  wode(number) {
    wx.showLoading({
      title: '请耐心等待',
    })
    let that = this
    let arrData = that.data.allRender
    // let noexist = arrData.findIndex(ite => ite.ProblemId === number)
    let allRenders = that.data.originTitle//获取所有已经渲染的数据
    number = allRenders.findIndex(ite => ite.ProblemId === number)
    console.log(number)
    for (let i = 0; i < number; i++) {
      if(!arrData.includes(allRenders[i])){
        let randerTitls = app.testWxParse(that,allRenders[i])//解析所有已经加载的题目,从第一道题开始
        that.data.allRender.push(randerTitls)//向页面渲染集合推送已做过的题目,
      }
    }
    let randerTitle = app.testWxParse(that, allRenders[number])
    if (number > 0) {
      let icon = 'tabItems[0].icon'
      this.setData({
        [icon]: 'https://minproimg.oss-cn-hangzhou.aliyuncs.com/images/leftsing.png',
      })
    }
    // if (noexist == -1) { // 不存在已渲染的数组中
    //  that.setData({
    //   noexist: true
    //  })
    // }
    // console.log(noexist)
    if (typeof (randerTitle.done) != undefined && !randerTitle.done == true) {
      this.setData({
        showAny: true
      })
    }
    wx.hideLoading()
    this.setData({
      randerTitle: randerTitle,
      current_no: number,
      ProblemType: randerTitle.ProblemType
    })
  },
  likes() {
    let that = this
    let icon = 'tabItems[2].icon'
    let classes = 'tabItems[2].class'
    let name = 'tabItems[2].name'
    let current_no = that.data.current_no
    let allRender = that.data.allRender//页面已经渲染的数据集合
    if (this.data.tabItems[2].class == 'active') {
      let option = {
        problemId: this.data.randerTitle.ProblemId,
        behavior: 2
      }
      app.encryption({
        url: api.default.makeCollection,
        data: option,
        method: 'POST',
        dataType: "json",
        success: function (res) {
          if (res.data.code == 200) {
            // if (that.data.noexist) {
            //   //表明当前题目与实际渲染之间存在较大差值
            //   let datas = that.data.originTitle[current_no]
            //   let randerTitle = app.testWxParse(that, datas)
            //   if (typeof (randerTitle.isCollect) != 'undefined') {
            //     randerTitle.isCollect = 0
            //   }
            // }else{
             
            // }
            if (typeof (allRender[current_no].isCollect) != 'undefined') {
              allRender[current_no].isCollect = 0
            }
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
      problemId: this.data.randerTitle.ProblemId,
      behavior: 1
    }
    app.encryption({
      url: api.default.makeCollection,
      data: option,
      method: 'POST',
      dataType: "json",
      success: function (res) {
        if (res.data.code == 200) {
          if (that.data.noexist) {
            //表明当前题目与实际渲染之间存在较大差值
            let datas = that.data.originTitle[current_no]
            let randerTitle = app.testWxParse(that, datas)
            if (typeof (randerTitle.isCollect) != 'undefined') {
              randerTitle.isCollect = 0
            }
          }else{
            if (typeof (allRender[current_no].isCollect) != 'undefined') {
              allRender[current_no].isCollect = 0
            }
          }
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
  nextQU() {
    let that = this
    this.setData({
      answerImg: 'https://minproimg.oss-cn-hangzhou.aliyuncs.com/images/hideAnswer.png',
      activeAnswer: 'defaultAnswer',
      correctoption: '',
      multishowAny: true,
      correctAnswer: false,
      wrongAnswer: false
    })
    let flag = true
    if (that.data.ProblemType == '2') {
      let answersing = that.data.multiAnswer
      let a = answersing.split(',')
      a.sort(function (a, b) { return a.localeCompare(b) });
      let newArrd = a.filter(item => item)
      let b = this.data.multiselect.split(',')
      b.sort(function (a, b) { return a.localeCompare(b) });
      let newArr = b.filter(item => item)
      newArr.forEach(item => {
        if (newArrd.indexOf(item) === -1) {
          flag = false
        }
      })
      let rightStatus = 0
      if (flag) {
        rightStatus = 1
      }
      let options = {
        problemId: that.data.multiID,
        answe: that.data.multiselect,
        formId: that.data.multiFormId,
        rightStatus: rightStatus
      }
      console.log(options)
      app.encryption({
        url: api.default.answerEvents,
        data: options,
        method: 'POST',
        dataType: "json",
        success: function (res) {
          that.setData({
            multiselect: '',
            multiselecting: []
          })
        },
        fail: function (n) {
          console.log('333333')
        }
      })
    }
    if (this.data.current_no + 1 >= this.data.all_current_no) {
      wx.showToast({
        title: '已经是最后一题了',
        icon: 'none',
        duration: 2000
      })
      return
    }
    let randerTitle
    let current_no = that.data.current_no + 1
    let curReander = that.data.originTitle[current_no]//获取下一题的原始数据
    let allRender = that.data.allRender//页面已经渲染的数据集合
    console.log(current_no,curReander)
    if (curReander.done == true) {
      that.setData({
        showAny: 0
      })
    } else {
      that.setData({
        showAny: true
      })
    }
    console.log(that.data.showAny)
    let icon = 'tabItems[2].icon'
    let classes = 'tabItems[2].class'
    let name = 'tabItems[2].name'//以上为收藏按钮的数据
    if (!allRender.includes(curReander)) {//判断下一题的渲染数据是否已存在当前已经渲染的数据集合，如果不存在则添加并初始化状态
      allRender.push(curReander)
      // randerTitle = allRender[current_no]//初始化即将渲染的数据
      // console.log(randerTitle)
      //如果该数据没有解析则进行解析
      randerTitle = app.testWxParse(that, curReander)
      console.log(randerTitle)
      if (curReander.isCollect == '1') { //判断下一题是否已收藏 
        that.setData({
          [icon]: 'https://minproimg.oss-cn-hangzhou.aliyuncs.com/images/yishuangcang (1).png',
          [classes]: 'active',
          [name]: '已收藏'
        })
      } else {
        that.setData({
          [icon]: 'https://minproimg.oss-cn-hangzhou.aliyuncs.com/images/weishoucang.png',
          [classes]: '',
          [name]: '收藏'
        })
      }
      that.setData({
        randerTitle: randerTitle,//挂载页面
        current_no: current_no,//更新下标
        allRender: allRender,//更新已经渲染的数据
        ProblemType: randerTitle.ProblemType,//更新题目类型
        answerImg: 'https://minproimg.oss-cn-hangzhou.aliyuncs.com/images/hideAnswer.png',
        activeAnswer: 'defaultAnswer',
        correctoption: '',
      })
    } else {//如果存在则直接拿取已存在的数据渲染
      // let isShow
      console.log(allRender,current_no)
      randerTitle = allRender[current_no]
      console.log(randerTitle)
      // if (randerTitle.done){
      //   isShow = false //如果当前题目已做，则展示答案
      // }else{
      //   isShow = true //否则隐藏答案
      // }
      if (randerTitle.isCollect == '1') { //判断下一题是否已收藏 
        that.setData({
          likes: true,
          [icon]: 'https://minproimg.oss-cn-hangzhou.aliyuncs.com/images/yishuangcang (1).png',
          [classes]: 'active',
          [name]: '已收藏'
        })
      } else {
        that.setData({
          likes: true,
          [icon]: 'https://minproimg.oss-cn-hangzhou.aliyuncs.com/images/weishoucang.png',
          [classes]: '',
          [name]: '收藏'
        })
      }
      that.setData({
        randerTitle: randerTitle,//挂载页面
        current_no: current_no,//更新下标
        allRender: allRender,//更新已经渲染的数据
        ProblemType: randerTitle.ProblemType,//更新题目类型
        answerImg: 'https://minproimg.oss-cn-hangzhou.aliyuncs.com/images/hideAnswer.png',
        activeAnswer: 'defaultAnswer',
        correctoption: '',
        // showAny:isShow,
        // multishowAny: true//
      })
    }
    if (current_no > 0) {
      let icon = 'tabItems[0].icon'
      this.setData({
        [icon]: 'https://minproimg.oss-cn-hangzhou.aliyuncs.com/images/leftsing.png',
      })
    }
    if (randerTitle.yourAnswer && randerTitle.yourAnswer != '') { //如果改题目已经做过
      that.init(randerTitle.yourAnswer)
    }
  },
  //选择答案
  selectAnswer(e) {
    if (!this.data.showAny) {//如果已选答案，再次点击不在触发
      return
    }
    console.log(this.data.randerTitle)
    let d = this.data;
    let rightStatus = 1;
    let formId = this.data.formId;
    let option = e.currentTarget.dataset.option;//当前点击选项的option
    let answer = e.currentTarget.dataset.answer;//当前题目的答案
    let index = e.currentTarget.dataset.index;//当前点击选项的index
    let id = e.currentTarget.dataset.id;//当前点击题目的ID
    let color = this.data.randerTitle.content[index];//获取当前点击选项的数组
    let allRender = this.data.allRender//页面已经渲染的数据集合
    console.log(option)
    this.setData({
      // option: option,//声名点击选项
      showAny: false//尚未操作前，隐藏答案
    })
    color.color = false//新增当前点击选项的color
    color.err = false//新增当前点击选项的err
    this.data.randerTitle.done = true//表明当前题目已做
    this.data.randerTitle.option = option
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
        randerTitle: this.data.randerTitle//缓存改变后的渲染数据
      })
    }
    //记录点击选项后数据库的改变
    let options = {
      problemId: id,
      answe: option,
      formId: formId,
      rightStatus: rightStatus
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
  },
  multiselectAnswer(e) {
    if (!this.data.multishowAny) {
      return
    }
    let formId = this.data.formId;
    let option = e.currentTarget.dataset.option;
    let answer = e.currentTarget.dataset.answer;
    let index = e.currentTarget.dataset.index;
    let color = this.data.randerTitle.content[index];
    let id = e.currentTarget.dataset.id;
    this.setData({
      multiID: id,
      multiFormId: formId,
      multiAnswer: answer
    })
    console.log(option, answer, this.data.multiselect)
    let multiselect = this.data.multiselecting
    if (!multiselect.includes(option)) {
      multiselect.push(option)
      this.data.randerTitle.content[index].haschose = true
      this.data.randerTitle.done = true
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
    console.log(this.data.multiselect)
    // this.setData({
    //   option:multiselect
    // })
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
    this.setData({
      wrongAnswer: true,
      correctAnswer: true
    })

  },
  init(answering) {
    let options = []
    let rightStatus = 1;
    console.log(answering)
    let randerTitle = this.data.randerTitle
    for (let i of randerTitle.content) {
      options.push(i.option)
    }
    console.log(options)
    let option = answering//当前点击选项的option
    let answer = randerTitle.answer;//当前题目的答案
    let index = options.indexOf(answering);//当前点击选项的index
    let color = randerTitle.content[index];//获取当前点击选项的数组
    console.log(option)
    this.setData({
      option: option,//声名点击选项
      showAny: 0,//尚未操作前，隐藏答案
      multishowAny: 0
    })
    color.color = false//新增当前点击选项的color
    color.err = false//新增当前点击选项的err
    randerTitle.done = true//表明当前题目已做
    randerTitle.option = option
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
        randerTitle: this.data.randerTitle//缓存改变后的渲染数据
      })
    }
  },
  gobefor(e) {
    console.log(e.currentTarget.dataset.index)
    let number = e.currentTarget.dataset.index// 前一个页面
    // console.log("beforePage");
    // console.log(beforePage);
    wx.navigateBack({
      success: function () {
        beforePage.onLoad(number);
      }
    });
  },
  goback() {
    let courseId = this.data.courseId
    let formId = this.data.formId
    let that = this
    wx.showModal({
      title: '提示',
      content: '你正在进行章节练习，是否保存当前做题记录？',
      showCancel: true,//是否显示取消按钮
      cancelText: "重做",//默认是“取消”
      cancelColor: '#199FFF',//取消文字的颜色
      confirmText: "保存",//默认是“确定”
      confirmColor: '#333333',//确定文字的颜色
      success: function (res) {
        if (res.cancel) {
          console.log('点击了事件一')
          wx.showLoading({
            title: '正在清除进度...',
          })
          let pages = getCurrentPages(); // 当前页面
          let beforePage = pages[pages.length - 2];
          wx.navigateBack({
            success: function () {
              beforePage.onLoad({ courseId: courseId });
            }
          });

          //点击取消,默认隐藏弹框
        } else {
          console.log('点击了事件二')
          let option = {
            formId: formId
          }
          console.log(option)
          app.encryption({
            url: api.default.lockAnswerEvents,
            data: option,
            method: 'POST',
            dataType: "json",
            success: function (res) {
              console.log(res)
              wx.showToast({
                title: res.data.message,
                icon: 'none',
                duration: 2000
              })
              wx.hideLoading()
              let pages = getCurrentPages(); // 当前页面
              let beforePage = pages[pages.length - 2];
              wx.navigateBack({
                success: function () {
                  beforePage.onLoad({ courseId: courseId });
                }
              });
            },
            fail: function (n) {
              console.log('333333')
            }
          })
        }
      }
    })
  },
  onLoad: function (options = {}) {
    let that = this
    console.log(options)
    let redo = 1
    if (options.hasdone == 1) {
      wx.showModal({
        title: '提示',
        content: '检测到你上次保存过做题记录，是否继续上次开始做题？',
        showCancel: true,//是否显示取消按钮
        cancelText: "重新开始",//默认是“取消”
        cancelColor: '#199FFF',//取消文字的颜色
        confirmText: "继续上次",//默认是“确定”
        confirmColor: '#333333',//确定文字的颜色
        success: function (res) {
          if (res.cancel) {
            redo = 1 //重新开始
            //点击取消,默认隐藏弹框
          } else {
            redo = 0 //继续上次
          }
          that.initAlldata(options, redo)
        }
      })
    } else {

      that.initAlldata(options, redo)
    }
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
  initAlldata(options, redo) {
    wx.showLoading({
      title: '正在加载中...',
    })
    var that = this;
    this.setData({
      chapterName: options.name,
      navH: app.globalData.navHeight,
      courseId: options.courseId
    })
    wx.getSystemInfo({
      success(res) {
        let height = res.screenHeight * 2;
        let topheight = that.data.navH;
        let questionHeight = height - topheight * 2 - 98 - 56 * 2 - 40 
        that.setData({
          questionHeight: questionHeight
        })
      }
    })
    let icon = 'tabItems[2].icon'
    let classes = 'tabItems[2].class'
    let name = 'tabItems[2].name'//以上为获取收藏按钮状态
    let option = {
      courseId: options.courseId,
      chapterId: options.chapter_id,
      redo: redo
    }//以上为初始化加载参数
    console.log(option)
    app.encryption({//初始化加载函数获取所有题目
      url: api.default.getProblems,
      data: option,
      method: 'GET',
      dataType: "json",
      success: function (res) {
        console.log(res)
        let curtitle = res.list[0] //声明首次加载的题目
        let curindex = 0 //声明首次加载的下标
        let randerTitle = app.testWxParse(that, res.list[0])//初始化并解析第一道题目,默认是从第一道题开始加载渲染
        that.data.allRender.push(randerTitle)//allRender为所有已经渲染页面的数据集合
        if (redo == 0) {
          for (let item of res.list.entries()) {//遍历所有原始数据并初始化首次加载数据集合
            if (item[1].ProblemId == res.lastProblemId) {//如果发现了此lastProblemId则需要初始化所有之前的题目
              curtitle = item[1]
              curindex = item[0]//初始化加载下标
              console.log(curindex)
              randerTitle = app.testWxParse(that, curtitle)//初始化首次加载页面数据
              if (curindex >= 1) {
                let icon = 'tabItems[0].icon'
                that.setData({
                  [icon]: 'https://minproimg.oss-cn-hangzhou.aliyuncs.com/images/leftsing.png',
                })
              }
              that.data.allRender.length = 0
              for (let i = 0; i <= curindex; i++) {
                let randerTitle = app.testWxParse(that, res.list[i])//解析所有已经加载的题目,从第一道题开始
                that.data.allRender.push(randerTitle)//向页面渲染集合推送已做过的题目,
              }
            }
          }
        }//遍历所有题目并将上一次做过的题目找到，如果此前有记录，则需要把所有做过的题目推送到已经渲染的集合（即要初始化allRender）
        wx.hideLoading()
        that.setData({
          originTitle: res.list,//为所有原始数据
          randerTitle: randerTitle,//为当前渲染数据
          current_no: curindex,//初始化题目标注
          ProblemType: randerTitle.ProblemType,//表明练习题类型
          all_current_no: res.count,//所有题目的数量
          singleNum: res.singleList,//单选题的数量
          multipleNum: res.multipleLis,//多选题的数量
          judgmentNum: res.judgmentList,//判断题的数量
          formId: res.formId//formid
        })
        if (randerTitle.isCollect == 1) {  //是否已收藏
          that.setData({
            likes: true,
            [icon]: 'https://minproimg.oss-cn-hangzhou.aliyuncs.com/images/yishuangcang (1).png',
            [classes]: 'active',
            [name]: '已收藏'
          })
        }
        if (randerTitle.yourAnswer && randerTitle.yourAnswer != '') {
          that.init(randerTitle.yourAnswer)
        }
      },
      fail: function (n) {
        console.log('初始化失败')
      }
    })
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
  }
});