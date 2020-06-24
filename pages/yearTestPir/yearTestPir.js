var t, app = getApp(), api = require("../../api.js"),
  app = getApp(),
  wxParse = require("../../wxParse/wxParse.js");
const util = require('../../utils/util.js')
const { $Message } = require('../../utils/iview/base/index');
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
    tabItems: [
      {
        icon: 'https://minproimg.oss-cn-hangzhou.aliyuncs.com/images/cards (4).png',
        name: '上一题',
        action: 'lastQU',
        class: ''
      },
      {
        icon: 'https://minproimg.oss-cn-hangzhou.aliyuncs.com/images/cards (1).png',
        name: '答题卡',
        action: 'cards',
        class: ''
      },
      {
        icon: 'https://minproimg.oss-cn-hangzhou.aliyuncs.com/images/weishoucang.png',
        name: '收藏',
        action: 'likes',
        class: ''
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
    multiselect: [],
    screenHeight:''
  },
  lastQU() {
    let that = this
    let icon = 'tabItems[2].icon'
    let classes = 'tabItems[2].class'
    let name = 'tabItems[2].name'//以上为收藏按钮数据
    let current_no = that.data.current_no//获取上一题的下标
    let allRenders = that.data.allRender//获取所有已经渲染的数据
    console.log(allRenders)
    if (current_no <= 1) {//如果下标小于等于1则提示当前已经是第一题
      wx.showToast({
        title: '已经是第一题了',
        icon: 'none',
        duration: 2000
      })
      let icon = 'tabItems[0].icon'
      this.setData({
        current_no: 1,
        [icon]: 'https://minproimg.oss-cn-hangzhou.aliyuncs.com/images/cards (4).png',
      })
      return
    }
    current_no = current_no - 1 //修改渲染下标（局部）
    console.log(current_no)
    if (allRenders[current_no - 1].isCollect && allRenders[current_no - 1].isCollect == '1') { //已收藏 
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
    console.log(allRenders[current_no - 1])
    if (allRenders[current_no - 1].done) {
      that.setData({
        showAny: false
      })
    } else {
      that.setData({
        showAny: true
      })
    }
    this.setData({
      randerTitle: allRenders[current_no - 1],
      current_no: current_no,
      answerImg: 'https://minproimg.oss-cn-hangzhou.aliyuncs.com/images/hideAnswer.png',
      activeAnswer: 'defaultAnswer',
      correctoption: '',
      multishowAny: true,
      ProblemType: allRenders[current_no - 1].ProblemType
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
  likes() {
    let that = this
    let icon = 'tabItems[2].icon'
    let classes = 'tabItems[2].class'
    let name = 'tabItems[2].name'
    let current_no = that.data.current_no
    let allRender = that.data.allRender//页面已经渲染的数据集合
    console.log(current_no, allRender)
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
            allRender[current_no - 1].isCollect = 0
            that.setData({
              likes: false,//表示当前题目未收藏
              [icon]: 'https://minproimg.oss-cn-hangzhou.aliyuncs.com/images/weishoucang.png',
              [classes]: '',
              [name]: '收藏',
              allRender: allRender//缓存即将需要渲染的数据
            })
            $Message({
              content: '收藏已取消',
              type: 'success'
            });
            return
          }
          $Message({
            content: res.data.message,
            type: 'warning'
          });

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
          allRender[current_no - 1].isCollect = 1
          that.setData({
            likes: true,
            [icon]: 'https://minproimg.oss-cn-hangzhou.aliyuncs.com/images/yishuangcang (1).png',
            [classes]: 'active',
            [name]: '已收藏',
            allRender: allRender
          })
          $Message({
            content: '收藏成功',
            type: 'success'
          });
          return
        }
        $Message({
          content: res.data.message,
          type: 'warning'
        });

      },
      fail: function (n) {
        console.log('333333')
      }
    })
  },
  nextQU() {
    if (this.data.current_no >= this.data.all_current_no) {
      wx.showToast({
        title: '已经是最后一题了',
        icon: 'none',
        duration: 2000
      })
      return
    }
    var that = this
    let randerTitle
    let current_no = that.data.current_no//获取下一题index
    let curReander = that.data.originTitle[current_no]//获取下一题的原始数据
    let allRender = that.data.allRender//页面已经渲染的数据集合
    let icon = 'tabItems[2].icon'
    let classes = 'tabItems[2].class'
    let name = 'tabItems[2].name'//以上为收藏按钮的数据
    if (!that.data.allRender.includes(curReander)) {//判断下一题的渲染数据是否已存在当前已经渲染的数据集合，如果不存在则添加并初始化状态
      allRender.push(curReander)
      randerTitle = allRender[current_no]//初始化即将渲染的数据
      //如果该数据没有解析则进行解析
      randerTitle = app.testWxParse(that, randerTitle)
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
        current_no: current_no + 1,//更新下标
        allRender: allRender,//更新已经渲染的数据
        showAny: true,//隐藏答案
        ProblemType: randerTitle.ProblemType,//更新题目类型
        answerImg: 'https://minproimg.oss-cn-hangzhou.aliyuncs.com/images/hideAnswer.png',
        activeAnswer: 'defaultAnswer',
        correctoption: '',
        multishowAny: true//
      })
    } else {//如果存在则直接拿取已存在的数据渲染
      let isShow
      randerTitle = allRender[current_no]
      if (randerTitle.done) {
        isShow = false //如果当前题目已做，则展示答案
      } else {
        isShow = true //否则隐藏答案
      }
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
        current_no: current_no + 1,//更新下标
        allRender: allRender,//更新已经渲染的数据
        ProblemType: randerTitle.ProblemType,//更新题目类型
        answerImg: 'https://minproimg.oss-cn-hangzhou.aliyuncs.com/images/hideAnswer.png',
        activeAnswer: 'defaultAnswer',
        correctoption: '',
        showAny: isShow,
        multishowAny: true//
      })
    }
    if (current_no > 0) {
      let icon = 'tabItems[0].icon'
      this.setData({
        [icon]: 'https://minproimg.oss-cn-hangzhou.aliyuncs.com/images/leftsing.png',
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
    this.setData({
      option: option,//声名点击选项
      showAny: false,//尚未操作前，隐藏答案
    })
    color.color = false//新增当前点击选项的color
    color.err = false//新增当前点击选项的err
    this.data.randerTitle.done = true//表明当前题目已做
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
      answer: this.data.randerTitle.content[index].option,
      course_id: parseInt(this.data.course_id),
      chapter_id: parseInt(this.data.chapter_id),
      exam_type: 1,//2为考试类型
      question_id: parseInt(this.data.randerTitle.ProblemId),//题目Id
      exam_identity: this.data.exam_identity,//考试次数标志
    }
    console.log(options)
    app.encryption({//初始化加载函数获取所有题目
      url: api.default.answersave,
      data: options,
      method: 'POST',
      dataType: "json",
      success: function (res) {
        console.table(res)
      },
      fail: function (n) {
        console.log('初始化失败')
      }
    })
  },
  multiselectAnswer(e) {
    let option = e.currentTarget.dataset.option;
    let index = e.currentTarget.dataset.index;
    let color = this.data.randerTitle.content[index];
    console.log( this.data.randerTitle.answer.indexOf(option), index)
    color.color = false//新增当前点击选项的color
    color.err = false//新增当前点击选项的err
   if(this.data.randerTitle.answer.indexOf(option) != -1){
     console.log('此选项是正确的')
     color.color = true//改变当前选项的颜色为true
    
      this.setData({
        randerTitle: this.data.randerTitle,//缓存改变后的渲染数据
      })
   }else{
    color.color = false
    color.err = true
    this.setData({
      randerTitle: this.data.randerTitle//缓存改变后的渲染数据
    })
   }
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
  wode(number) {
    let that = this
    let allRenders = that.data.allRender//获取所有已经渲染的数据
   number =  allRenders.findIndex(ite => ite.ProblemId === number)
    console.log()
    if (number== -1) {
      wx.showToast({
        title: '不能查看未做题目',
        icon: 'none',
        duration: 2000
      })
      return
    }
    if (!allRenders[number].done == true) {
      this.setData({
        showAny: true
      })
    } else {
      this.setData({
        showAny: false
      })
    }
    if (!allRenders[number].done == true) {
      this.setData({
        multishowAny: true
      })
    } else {
      this.setData({
        multishowAny: false
      })
    }
    this.setData({
      randerTitle: allRenders[number],
      current_no: number + 1,
      ProblemType: allRenders[number].ProblemType
    })
  },
  onLoad: function (options = {}) {
    var that = this
    wx.getSystemInfo({
      success(res) {
        that.setData({
          screenHeight:res.screenHeight
        })
       
      }
    }) 
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    wx.setNavigationBarTitle({
      title: options.chapterName,
      success: function () {
        console.log('setNavigationBarTitle success')
      },
      fail: function (err) {
        console.log('setNavigationBarTitle fail, err is', err)
      }
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
      exam_type: 1
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