var t, app = getApp(), api = require("../../../../api.js"), app = getApp()
Page({
  data: {
    current_no: 0,
    all_current_no: '70', //当前题目
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
    targetTime2: '',
    navH: '',
    clearTimer: false,
    examLogId: '',
    exam_identity: '',
    tabItems: [
      {
        icon: 'https://minproimg.oss-cn-hangzhou.aliyuncs.com/images/cards%20(4).png',
        name: '上一题',
        action: 'lastQU',
        class: '',
        click: false
      },
      {
        icon: 'https://minproimg.oss-cn-hangzhou.aliyuncs.com/images/cards%20(1).png',
        name: '答题卡',
        action: 'cards',
        class: '',
        click: false
      },
      {
        icon: 'https://minproimg.oss-cn-hangzhou.aliyuncs.com/images/alerm.png',
        name: '',
        action: 'likes',
        class: '',
        click: true
      },
      {
        icon: 'https://minproimg.oss-cn-hangzhou.aliyuncs.com/images/cards%20(3).png',
        name: '下一题',
        action: 'nextQU',
        class: '',
        click: false
      }
    ],
    ProblemType: '1',
    answerImg: 'https://minproimg.oss-cn-hangzhou.aliyuncs.com/images/hideAnswer.png',
    activeAnswer: 'defaultAnswer',
    correctoption: '',
    multishowAny: true,
    multiselect: [],
    index: ''
  },
  wode(number) {
    let that = this
    let allRenders = that.data.allRender//获取所有已经渲染的数据
    console.log(allRenders.length)
    if (number >= allRenders.length) {
      wx.showToast({
        title: '不能查看未做题目',
        icon: 'none',
        duration: 2000
      })
      return
    }
    this.setData({
      randerTitle: allRenders[number],
      current_no: number + 1,
      ProblemType: allRenders[number].ProblemType
    })
  },
  lastQU() {
    let that = this
    let current_no = that.data.current_no//获取上一题的下标
    let allRenders = that.data.allRender//获取所有已经渲染的数据
    if (current_no <= 1) {//如果下标小于等于1则提示当前已经是第一题
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
        current_no: 1,
        [icon]: 'https://minproimg.oss-cn-hangzhou.aliyuncs.com/images/cards%20(4).png',
      })
      return
    }
    //修改渲染下标（局部）
    // console.log(current_no)
    if (allRenders[current_no - 1].done) //判断当前题目是否已做
    {
      if (this.data.index != '') {
        let index = this.data.index
        let color = this.data.randerTitle.content[index];//获取当前点击选项的数组
        color.haschose = true;
        this.setData({
          index: ''
        })
      }
    }
    current_no = current_no - 1
    this.setData({
      randerTitle: allRenders[current_no - 1],
      current_no: current_no,
      answerImg: 'https://minproimg.oss-cn-hangzhou.aliyuncs.com/images/hideAnswer.png',
      activeAnswer: 'defaultAnswer',
      option: '',
      multishowAny: true,
      ProblemType: allRenders[current_no - 1].ProblemType,
    })
  },
  cards() {
    let chapter_id = this.data.chapter_id
    let courseId = this.data.course_id
    let exam_identity = this.data.exam_identity
    let name = this.data.chapterName
    wx.navigateTo({
      url: `../yearAnswerVard/yearAnswerVard?chapter_id=${chapter_id}&courseId=${courseId}&exam_identity=${exam_identity}&name=${name}`
    })
  },
  myLinsterner(e) {
    let that = this
    wx.showModal({
      title: '提示',
      content: '考试时间到，系统自动交卷！',
      showCancel: false,//是否显示取消按钮
      confirmText: "确认",//默认是“确定”
      confirmColor: '#199FFF',//确定文字的颜色
      success: function (res) {
        if (res.cancel) {
          //点击取消,默认隐藏弹框
        } else {
          //点击确定
          let option = {
            exam_identity: that.data.exam_identity,
            course_id: parseInt(that.data.course_id),
            chapter_id: parseInt(that.data.chapter_id)
          }
          console.log(option)
          app.encryption({//交卷动作
            url: api.default.submitpaper,
            data: option,
            method: 'POST',
            dataType: "json",
            success: function (res) {
              console.table(res)
              wx.reLaunch({
                url: `../yearTest/yearTest?courseId=${that.data.course_id}`
              })
            },
            fail: function (n) {
              console.log('初始化失败')
            }
          })
        }
      },
      fail: function (res) { },//接口调用失败的回调函数
      complete: function (res) { },//接口调用结束的回调函数（调用成功、失败都会执行）
    })
  },
  nextQU() {
    let that = this
    this.setData({
      multiselecting: []
    })
    let randerTitle
    let current_no = that.data.current_no//获取下一题index
    let curReander = that.data.originTitle[current_no]//获取下一题的原始数据
    let allRender = that.data.allRender//页面已经渲染的数据集
    let exam_identity = that.data.exam_identity
    if (this.data.current_no >= this.data.all_current_no) {
      console.log('1111111')
      if (allRender[current_no - 1].done) {//当前题目是否已做
        console.log('22222222', typeof (this.data.index) != typeof (''))
        if (typeof (this.data.index) != typeof ('')) {
          let index = this.data.index
          let color = this.data.randerTitle.content[index];//获取当前点击选项的数组
          color.haschose = true
          this.setData({
            option: '',
            index: ''
          })
          let option = {
            answer: this.data.randerTitle.content[index].option,
            course_id: parseInt(this.data.course_id),
            chapter_id: parseInt(this.data.chapter_id),
            exam_type: 2,//2为考试类型
            question_id: parseInt(allRender[current_no - 1].ProblemId),//题目Id
            exam_identity: this.data.exam_identity,//考试次数标志
          }
          console.log(option)
          app.encryption({//初始化加载函数获取所有题目
            url: api.default.answersave,
            data: option,
            method: 'POST',
            dataType: "json",
            success: function (res) {
              wx.showModal({
                title: '提示',
                content: '已经是最后一题了，是否交卷？',
                showCancel: true,//是否显示取消按钮
                confirmText: "确认",//默认是“确定”
                confirmColor: '#199FFF',//确定文字的颜色
                success: function (res) {
                  if (res.cancel) {
                    this.setData({
                      option: '',
                      index: ''
                    })
                  } else {
                    let option = {
                      exam_identity: that.data.exam_identity,
                      course_id: parseInt(that.data.course_id),
                      chapter_id: parseInt(that.data.chapter_id)
                    }
                    console.log(option)
                    app.encryption({//交卷动作
                      url: api.default.submitpaper,
                      data: option,
                      method: 'POST',
                      dataType: "json",
                      success: function (res) {
                        console.table(res)
                        wx.reLaunch({
                          url: `../yearTestScroll/yearTestScroll?exam_identity=${exam_identity}`
                        })
                      },
                      fail: function (n) {
                        console.log('初始化失败')
                      }
                    })
                  }

                },
                fail: function (n) {
                  console.log('初始化失败')
                }
              })
            }
          })
          return
        }
        wx.showModal({
          title: '提示',
          content: '已经是最后一题了，是否交卷？',
          showCancel: true,//是否显示取消按钮
          confirmText: "确认",//默认是“确定”
          confirmColor: '#199FFF',//确定文字的颜色
          success: function (res) {
            if (res.cancel) {
              this.setData({
                option: '',
                index: ''
              })
            } else {
              let option = {
                exam_identity: that.data.exam_identity,
                course_id: parseInt(that.data.course_id),
                chapter_id: parseInt(that.data.chapter_id)
              }
              console.log(option)
              app.encryption({//交卷动作
                url: api.default.submitpaper,
                data: option,
                method: 'POST',
                dataType: "json",
                success: function (res) {
                  console.table(res)
                  wx.reLaunch({
                    url: `../yearTestScroll/yearTestScroll?exam_identity=${exam_identity}`
                  })
                },
                fail: function (n) {
                  console.log('初始化失败')
                }
              })
            }

          },
          fail: function (n) {
            console.log('初始化失败')
          }
        })
        return
      } else {
        this.setData({
          option: '',
          index: ''
        })
        console.log('333333333')
        wx.showModal({
          title: '提示',
          content: '已经是最后一题了，是否交卷？',
          showCancel: true,//是否显示取消按钮
          confirmText: "确认",//默认是“确定”
          confirmColor: '#199FFF',//确定文字的颜色
          success: function (res) {
            if (res.cancel) {
              console.log('44444444444')
              //点击取消,默认隐藏弹框
            } else {
              console.log('5555555555')
              let option = {
                exam_identity: that.data.exam_identity,
                course_id: parseInt(that.data.course_id),
                chapter_id: parseInt(that.data.chapter_id)
              }
              console.log(option)
              app.encryption({//交卷动作
                url: api.default.submitpaper,
                data: option,
                method: 'POST',
                dataType: "json",
                success: function (res) {
                  console.table(res)
                  wx.reLaunch({
                    url: `../yearTestScroll/yearTestScroll?exam_identity=${exam_identity}`
                  })
                },
                fail: function (n) {
                  console.log('初始化失败')
                }
              })
            }

          },
          fail: function (n) {
            console.log('初始化失败')
          }
        })
        return
      }

    }
    if (allRender[current_no - 1].done) {//当前题目是否已做
      if (typeof (this.data.index) != typeof ('')) {
        let index = this.data.index
        let color = this.data.randerTitle.content[index];//获取当前点击选项的数组
        color.haschose = true
        this.setData({
          option: '',
          index: ''
        })
        let option = {
          answer: this.data.randerTitle.content[index].option,
          course_id: parseInt(this.data.course_id),
          chapter_id: parseInt(this.data.chapter_id),
          exam_type: 2,//2为考试类型
          question_id: parseInt(allRender[current_no - 1].ProblemId),//题目Id
          exam_identity: this.data.exam_identity,//考试次数标志
        }
        console.log(option)
        app.encryption({//初始化加载函数获取所有题目
          url: api.default.answersave,
          data: option,
          method: 'POST',
          dataType: "json",
          success: function (res) {
            console.table(res)
          },
          fail: function (n) {
            console.log('初始化失败')
          }
        })
      }
      if (allRender[current_no - 1].ProblemType == '2') {
        let index = this.data.index
        let answer = ''
        for (let item of this.data.multiselect) {
          answer = answer + item + ','
        }
        let option = {
          answer: answer,
          course_id: parseInt(this.data.course_id),
          chapter_id: parseInt(this.data.chapter_id),
          exam_type: 2,//2为考试类型
          question_id: parseInt(allRender[current_no - 1].ProblemId),//题目Id
          exam_identity: this.data.exam_identity,//考试次数标志
        }
        console.log(option)
        app.encryption({
          url: api.default.answersave,
          data: option,
          method: 'POST',
          dataType: "json",
          success: function (res) {
            console.log(res)
            that.setData({
              multiselect: []
            })
          },
          fail: function (n) {
            console.log('333333')
          }
        })
      }
    } else {
      this.setData({
        option: '',
        index: ''
      })
    }
    if (!that.data.allRender.includes(curReander)) {//判断下一题的渲染数据是否已存在当前已经渲染的数据集合，如果不存在则添加并初始化状态
      allRender.push(curReander)
      randerTitle = allRender[current_no]//初始化即将渲染的数据
      //如果该数据没有解析则进行解析
      randerTitle = app.testWxParse(that, randerTitle)
      that.setData({
        randerTitle: randerTitle,//挂载页面
        current_no: current_no + 1,//更新下标
        allRender: allRender,//更新已经渲染的数据
        ProblemType: randerTitle.ProblemType,//更新题目类型
        answerImg: 'https://minproimg.oss-cn-hangzhou.aliyuncs.com/images/hideAnswer.png',
        activeAnswer: 'defaultAnswer',
        option: '',
        multishowAny: true//
      })
    } else {//如果存在则直接拿取已存在的数据渲染
      let isShow
      // let index = this.data.index
      // let color = this.data.randerTitle.content[index];//获取当前点击选项的数组
      // color.haschose= true
      randerTitle = allRender[current_no]
      that.setData({
        randerTitle: randerTitle,//挂载页面
        current_no: current_no + 1,//更新下标
        allRender: allRender,//更新已经渲染的数据
        ProblemType: randerTitle.ProblemType,//更新题目类型
        answerImg: 'https://minproimg.oss-cn-hangzhou.aliyuncs.com/images/hideAnswer.png',
        activeAnswer: 'defaultAnswer',
        correctoption: '',
        showAny: isShow,
        option: '',
        multishowAny: true
      })
    }
    if (current_no > 0) {
      let icon = 'tabItems[0].icon'
      this.setData({
        [icon]: 'https://minproimg.oss-cn-hangzhou.aliyuncs.com/images/leftsing.png',
      })
    }


  },
  //选择答案
  selectAnswer(e) {
    //判断当前题目是否已做,如果已做则初始化当前题目
    if (this.data.randerTitle.done) {
      for (let i = 0; i < this.data.randerTitle.content.length; i++) {
        if (this.data.randerTitle.content[i].haschose != undefined && this.data.randerTitle.content[i].haschose) {
          this.data.randerTitle.content[i].haschose = false
          this.setData({
            randerTitle: this.data.randerTitle
          })
        }
      }
    }
    // 初始化完成
    //开始选择答案
    let index = e.currentTarget.dataset.index;//当前点击选项的index
    this.data.randerTitle.done = true//表明当前题目已做
    let option = e.currentTarget.dataset.option;//当前点击选项的option
    this.setData({
      option: option,//声名点击选项
      randerTitle: this.data.randerTitle,
      index: index//声明点击选项
    })
  },
  multiselectAnswer(e) {
    let option = e.currentTarget.dataset.option;
    let index = e.currentTarget.dataset.index;
    console.log(option, index)
    let multiselect = this.data.multiselect
    if (!multiselect.includes(option)) {
      multiselect.push(option)
      this.data.randerTitle.content[index].haschose = true
      this.data.randerTitle.done = true
      this.setData({
        multiselect: multiselect,
        randerTitle: this.data.randerTitle
      })
    } else {
      this.data.randerTitle.content[index].haschose = false
      multiselect.splice(multiselect.findIndex(item => item === option), 1);
      this.setData({
        multiselect: multiselect,
        randerTitle: this.data.randerTitle
      })
      if (multiselect.length = 0) {
        this.data.randerTitle.done = false//表明当前题目已做
        this.setData({
          randerTitle: this.data.randerTitle
        })
      }
    }
    console.log(multiselect)
    // console.log(this.data.multiselect)
    // let index = e.currentTarget.dataset.index;//当前点击选项的index
    // this.data.randerTitle.done = true//表明当前题目已做
    // this.setData({
    //   randerTitle: this.data.randerTitle
    // })
  },
  showAnswer() {
    if (this.data.activeAnswer == 'activeAnswer') {
      this.setData({
        answerImg: 'https://minproimg.oss-cn-hangzhou.aliyuncs.com/hideAnswer.png',
        activeAnswer: 'defaultAnswer',
        correctoption: '',
        multishowAny: true
      })
    } else {
      this.setData({
        answerImg: 'https://minproimg.oss-cn-hangzhou.aliyuncs.com/showAnswer (1).png',
        activeAnswer: 'activeAnswer',
        correctoption: 'activeoption',
        multishowAny: false
      })
    }
  },
  goback() {
    let that = this
    wx.showModal({
      title: '提示',
      content: '你正在进行考试，是否选择退出？',
      showCancel: true,//是否显示取消按钮
      cancelText: "取消",//默认是“取消”
      cancelColor: '#199FFF',//取消文字的颜色
      confirmText: "确认",//默认是“确定”
      confirmColor: '#333333',//确定文字的颜色
      success: function (res) {
        if (res.cancel) {
          //点击取消,默认隐藏弹框
        } else {
          //点击确定
          let option = {
            exam_identity: that.data.exam_identity,
            course_id: parseInt(that.data.course_id),
            chapter_id: parseInt(that.data.chapter_id)
          }
          console.log(option)
          let exam_identity = that.data.exam_identity
          app.encryption({//交卷动作
            url: api.default.submitpaper,
            data: option,
            method: 'POST',
            dataType: "json",
            success: function (res) {
              console.table(res)
              let type = 'mockExam';
              let id = that.data.examLogId;
              wx.navigateTo({
                url: `../yearTestScroll/yearTestScroll?exam_identity=${exam_identity}`
              })
            },
            fail: function (n) {
              console.log('初始化失败')
            }
          })
          //点击确定
        }
      },
      fail: function (res) { },//接口调用失败的回调函数
      complete: function (res) { },//接口调用结束的回调函数（调用成功、失败都会执行）
    })
  },
  onLoad: function (options = {}) {
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    console.log(options)
    var that = this;
    let times = new Date().getTime()
    that.setData({
      targetTime2: times + 1000,
      navH: app.globalData.navHeight,
      chapterName: options.chapterName,
      course_id: options.courseId,
      chapter_id: options.chapterId
    })
    let option = {
      course_id: options.courseId,
      chapter_id: options.chapterId,
      exam_type: 2
    }
    app.encryption({//初始化加载函数获取所有题目
      url: api.default.gettruthquestion,
      data: option,
      method: 'GET',
      dataType: "json",
      success: function (res) {
        console.log(res)
        let randerTitle = app.testWxParse(that, res.question_list[0])//初始化第一道题目
        that.data.allRender.push(randerTitle)//allRender为所有已经渲染页面的数据集合
        that.setData({
          targetTime2: times + res.duration * 1000,
          originTitle: res.question_list,//为所有原始数据
          randerTitle: randerTitle,//为当前渲染数据
          current_no: 1,//初始化题目标注
          ProblemType: randerTitle.ProblemType,//表明练习题类型
          all_current_no: res.total,//所有题目的数量
          exam_identity: res.exam_identity//考试次数
          // examLogId:res.examLogId
          // singleNum:res.singleList,//单选题的数量
          // multipleNum:res.multipleLis,//多选题的数量
          // judgmentNum:res.judgmentList,//判断题的数量
          // formId:res.formId//formid
        })
      },
      fail: function (n) {
        console.log('初始化失败')
      },
      complete: function () {
        wx.hideLoading();
      }
    })
    console.log(that.data.targetTime2)
    return
  },
  onReady: function () { },
  onShow: function () { },
  onHide: function () {
    clearTimeout(t);
  },
  onUnload: function () {
    clearTimeout(t);
    this.setData({
      clearTimer: true
    });
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