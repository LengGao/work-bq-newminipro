var t,
  app = getApp(),
  api = require('../../../../api.js'),
  app = getApp()
Page({
  data: {
    problem_chapter_id: '',
    start: [0, 0], //其实位置
    moveY: 0, //y轴
    moveX: 0, //x轴
    //内容可视化的宽高
    windowWidth: '',
    windowHeight: '',
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
    noexist: false,
    option: '',
    disabled: false,
    showAny: true,
    likes: false, //默认展示未收藏
    singleNum: '0',
    multipleNum: '0',
    judgmentNum: '0',
    formId: '',
    tabItems: [{
        icon: 'https://minproimg.oss-cn-hangzhou.aliyuncs.com/images/leftsing.png',
        name: '上一题',
        action: 'lastQU',
        class: '',
        id: 1,
      },
      // {
      //   icon: 'https://minproimg.oss-cn-hangzhou.aliyuncs.com/images/cards (1).png',
      //   name: '答题卡',
      //   action: 'cards',
      //   class: '',
      //   id: 2
      // },
      {
        icon: 'https://minproimg.oss-cn-hangzhou.aliyuncs.com/images/weishoucang.png',
        name: '收藏',
        action: 'likes',
        class: '',
        id: 3,
      },
      {
        icon: 'https://minproimg.oss-cn-hangzhou.aliyuncs.com/images/cards (3).png',
        name: '下一题',
        action: 'nextQU',
        class: '',
        id: 4,
      },
    ],
    ProblemType: '',
    answerImg: 'https://minproimg.oss-cn-hangzhou.aliyuncs.com/images/hideAnswer.png',
    answerSenceImg: 'https://minproimg.oss-cn-hangzhou.aliyuncs.com/images/hideAnswer.png',
    answerFillImg: 'https://minproimg.oss-cn-hangzhou.aliyuncs.com/images/hideAnswer.png',
    answerShortImg: 'https://minproimg.oss-cn-hangzhou.aliyuncs.com/images/hideAnswer.png',
    answerSceneImg: 'https://minproimg.oss-cn-hangzhou.aliyuncs.com/images/hideAnswer.png',
    answerScenceShortImg: 'https://minproimg.oss-cn-hangzhou.aliyuncs.com/images/hideAnswer.png',
    activeAnswer: 'defaultAnswer',
    multishowFillAny: true,
    multishowScenceShortAny: true,
    activeSenceAnswer: 'defaultAnswer',
    activeFillAnswer: 'defaultAnswer',
    activeShortAnswer: 'defaultAnswer',
    activeSceneAnswer: 'defaultAnswer',
    activeScenceShortAnswer: 'defaultAnswer',
    multishowShortAny: true,
    multiSceneshowAny: true,
    correcShorttoption: '',
    correctoption: '',
    correcScenceShorttoption: '',
    correctSceneoption: '',
    correctFilloption: '',
    correcSencetoption: '',
    multishowAny: true,
    multiSenceshowAny: true,
    multiselecting: [],
    multiselect: '',
    multiID: '',
    multiAnswer: '',
    title: '',
    questionHeight: '',
    correctAnswer: false,
    wrongAnswer: false,
    curID: '',
    curIndexNumber: '',
    practice_id: '',
    alltestID: [],
    answer_location: '',
    is_lock: '',
    senceNum: 0,
    senceIndex: 0,
    multishowFillAny: true,
    shortMap: '',
    SceneValue: '',
    shortSceneMap: '',
    fillNewAnswer: [],
  },
  starDrag(event) {
    console.log(event)
    this.data.start[1] =
      event.touches[0].clientY - event.target.offsetTop + this.data.moveY //记录开始至位置
  },
  endDrag(event) {
    let tag = event.touches

    // if () {
    //   tag[0].clientY = this.data.windowHeight
    // }
    this.data.moveY = Math.abs(this.data.start[1] - tag[0].clientY)
    if (this.data.moveY < 50) {
      this.data.moveY = 100
    }
    if (tag[0].clientY <= 66) {
      this.data.moveY = this.data.windowHeight - 20
    }
    this.setData({
      moveY: this.data.moveY,
    })
    console.log(this.data.moveY, tag)
  },
  lastQU() {
    this.setData({
      multiselecting: [],
      wrongAnswer: false,
      correctAnswer: false,
      donotChangeAnswer: false,
    })
    let multishowAny =true
    if(this.data.showAny==false){
      multishowAny=false
    }else{
      multishowAny=true
    }
    this.setData({
      answerImg: 'https://minproimg.oss-cn-hangzhou.aliyuncs.com/images/hideAnswer.png',
      activeAnswer: 'defaultAnswer',
      correctoption: '',
      multishowAny: multishowAny,
    })
    //如果该题目是从上次保存下来则不提交答案
    let that = this
    let curID = this.data.curID
    //首先获取上一题的ID
    let curindex = that.data.curIndexNumber - 1 // 当前下标
    console.log(curindex)
    if (this.data.is_lock == 1) {} else {
      this.common()
    }
    if (curindex < 1) {
      return
    }
    // 开启缓存，并去重,传入当前数据，而非下一题数据
    that.saveRander(curID)
    let curId = that.data.alltestID[curindex - 1] // 获取上一题ID
    that.findcurIndex(curId, that.data.alltestID)
    //开始加载题目详情
    that.initText(curId)
  },
  cards() {
    this.common()
    let name = this.data.chapterName
    let problem_chapter_id = this.data.problem_chapter_id
    wx.navigateTo({
      url: `../answerCard/answerCard?name=${name}&practice_id=${problem_chapter_id}&type=0`,
    })
  },
  checkout(problem_id) {
    let that = this
    that.findcurIndex(problem_id, that.data.alltestID)
    //开始加载题目详情
    that.initText(problem_id)
  },
  likes() {
    let that = this
    let icon = 'tabItems[1].icon'
    let classes = 'tabItems[1].class'
    let name = 'tabItems[1].name'
    let curid = that.data.curID
    console.log(curid)
    if (this.data.tabItems[1].class == 'active') {
      //取消按钮，应更新缓存状态
      let option = {
        problem_id: this.data.curID,
      }
      app.encryption({
        url: api.test.removeCollection,
        data: option,
        method: 'POST',
        dataType: 'json',
        success: function (res) {
          if (res.data.code == 200) {
            that.setData({
              likes: false, //表示当前题目未收藏
              [icon]: 'https://minproimg.oss-cn-hangzhou.aliyuncs.com/images/weishoucang.png',
              [classes]: '',
              [name]: '收藏',
            })
            wx.showToast({
              title: '收藏已取消',
              icon: 'none',
              duration: 2000,
            })
            let randerTitle = that.data.allRender.find(
              (value) => value.problem_id == curid
            )
            if (randerTitle != undefined) {
              randerTitle.isCollect = 0
            } else {
              that.data.randerTitle.isCollect = 0
            }
            return
          }
          wx.showToast({
            title: res.data.message,
            icon: 'none',
            duration: 2000,
          })
        },
        fail: function (n) {
          console.log('333333')
        },
      })
      return
    }
    let option = {
      problem_id: this.data.curID,
    }
    app.encryption({
      url: api.test.insertCollection,
      data: option,
      method: 'POST',
      dataType: 'json',
      success: function (res) {
        if (res.data.code == 200) {
          that.setData({
            likes: true,
            [icon]: 'https://minproimg.oss-cn-hangzhou.aliyuncs.com/images/yishuangcang (1).png',
            [classes]: 'active',
            [name]: '已收藏',
          })
          wx.showToast({
            title: '收藏成功',
            icon: 'none',
            duration: 2000,
          })
          let randerTitle = that.data.allRender.find(
            (value) => value.problem_id == curid
          )
          console.log(randerTitle)
          if (randerTitle != undefined) {
            randerTitle.isCollect = 1
          } else {
            that.data.randerTitle.isCollect = 1
          }
          return
        }
        wx.showToast({
          title: res.data.message,
          icon: 'none',
          duration: 2000,
        })
      },
      fail: function (n) {
        console.log('333333')
      },
    })
  },
  common() {
    //判断当前题目是否已经提交，若没有则提交当前题目
    let that = this
    let curID = that.data.curID
    console.log(curID)
    if (that.data.randerTitle.problem_type == 2) {
      //多选题在此提交答案
      if (that.data.randerTitle.hasSubmit) {
        // 表明已提交过答案
      } else {
        let multiselect = that.data.multiselect
        if (multiselect == '') {} else {
          that.submitAnswer(multiselect, curID)
        }
      }
    }
    if (that.data.randerTitle.problem_type == 6) {
      //场景提交
      if (that.data.randerTitle.child[this.data.senceIndex - 1].hasSubmit) {} else {
        if (this.data.multiselect != '') {
          this.submitAnswer(this.data.multiselect, this.data.senceIndex - 1)
        } else if (this.data.SceneValue != '') {
          this.submitAnswer(this.data.SceneValue, this.data.senceIndex - 1)
        } else if (this.data.shortSceneMap != '') {
          this.submitAnswer(this.data.shortSceneMap, this.data.senceIndex - 1)
        }
      }
    }
    if (that.data.randerTitle.hasSubmit) {
      // 其他模式表明已提交过答案
    } else {
      if (this.data.fillNewAnswer.length == 0) {} else {
        let answer = ''
        this.data.fillNewAnswer.forEach((value) => {
          answer = answer + value + ','
        })
        that.submitAnswer(answer, curID)
      }
      if (this.data.shortMap == '') {} else {
        let answer = this.data.shortMap
        that.submitAnswer(answer, curID)
      }
    }
  },
  nextQU() {
    let that = this
    let curID = that.data.curID
    let multishowAny = true
    this.setData({
      multiselecting: [],
    })
    if(this.data.showAny==false){
      multishowAny=false
    }else{
      multishowAny=true
    }
    this.setData({
      answerImg: 'https://minproimg.oss-cn-hangzhou.aliyuncs.com/images/hideAnswer.png',
      activeAnswer: 'defaultAnswer',
      correctoption: '',
      multishowAny: multishowAny,
    })
    if (this.data.is_lock == 1) {} else {
      this.common()
    }
    // 开启缓存，并去重,传入当前数据，而非下一题数据
    that.saveRander(curID)
    //首先获取下一题的ID
    let curindex = that.data.curIndexNumber - 1 // 当前下标
    if (curindex + 1 > that.data.all_current_no - 1) {
      this.goback()
      return
    }
    let curId = that.data.alltestID[curindex + 1] // 获取下一题ID
    that.findcurIndex(curId, that.data.alltestID)
    //开始加载题目详情
    that.initText(curId)
  },
  saveRander(ID) {
    let that = this
    let curRander = this.data.randerTitle
    let result = that.hasBeenLoad(ID) //检查本地是否已缓存
    if (result == undefined) {
      // 未缓存
      this.data.allRender.push(curRander)
      console.log(this.data.allRender)
      return
    }
  },
  saveScenceRander(ID) {
    // console.log(ID)
    let index = this.data.senceIndex
    let hasBeenLoad = this.data.randerTitle.child[index] //本地缓存
    if (hasBeenLoad.done != undefined && hasBeenLoad.done == true) {
      //已缓存
    } else {}
    // let result = hasBeenLoad.find((value) => value.problem_id == ID);
    // console.log(result)
  },
  //选择答案
  selectAnswer(e) {
    if (this.data.randerTitle.done) {
      //如果已选答案，再次点击不再触发
      return
    }
    let option = e.currentTarget.dataset.option //当前点击选项的option
    let answer = e.currentTarget.dataset.answer //当前题目的答案
    let index = e.currentTarget.dataset.index //当前点击选项的index
    let color = this.data.randerTitle.content[index] //获取当前点击选项的数组
    color.color = false //新增当前点击选项的color
    color.err = false //新增当前点击选项的err
    this.data.randerTitle.done = true //表明当前题目已做
    this.data.randerTitle.option = option
    if (option == answer) {
      //单选正确
      color.color = true //改变当前选项的颜色为true
      this.setData({
        randerTitle: this.data.randerTitle, //缓存改变后的渲染数据
      })
    } else {
      color.color = false
      color.err = true
      this.setData({
        randerTitle: this.data.randerTitle, //缓存改变后的渲染数据
      })
    }
    if (this.data.ProblemType == 1 || this.data.ProblemType == 3) {
      // 单选题直接提交答案
      console.log('进入单选题模式')
      this.submitAnswer(option)
      return
    }
  },
  selectSceneAnswer(e) {
    if (this.data.randerTitle.child[this.data.senceIndex - 1].done) {
      //如果已选答案，再次点击不再触发
      return
    }
    let option = e.currentTarget.dataset.option //当前点击选项的option
    let answer = e.currentTarget.dataset.answer //当前题目的答案
    let index = e.currentTarget.dataset.index //当前点击选项的index
    let color = this.data.randerTitle.child[this.data.senceIndex - 1].content[
      index
    ] //获取当前点击选项的数组
    color.color = false //新增当前点击选项的color
    color.err = false //新增当前点击选项的err
    this.data.randerTitle.child[this.data.senceIndex - 1].done = true //表明当前题目已做
    this.data.randerTitle.child[this.data.senceIndex - 1].option = option
    if (option == answer) {
      //单选正确
      color.color = true //改变当前选项的颜色为true
      this.setData({
        randerTitle: this.data.randerTitle, //缓存改变后的渲染数据
      })
    } else {
      color.color = false
      color.err = true
      this.setData({
        randerTitle: this.data.randerTitle, //缓存改变后的渲染数据
      })
    }
    let curindex = this.data.senceIndex - 1
    if (
      this.data.randerTitle.child[curindex].problem_child_type == 1 ||
      this.data.randerTitle.child[curindex].problem_child_type == 3
    ) {
      // 单选题直接提交答案
      console.log('进入单选题模式')
      this.setData({
        curID: this.data.randerTitle.child[curindex].problem_id,
      })
      this.submitAnswer(option)
    }
  },
  multiselectAnswer(e) {
    // if (!this.data.multishowAny) {
    //   return
    // }
    if (this.data.randerTitle.done) {
      //如果已选答案，再次点击不再触发
      wx.showToast({
        title: '答案已出,当前题目无法作答',
        icon: 'none',
        duration: 2000,
      })
      return
    }
    let color
    let option = e.currentTarget.dataset.option
    let answer = e.currentTarget.dataset.answer
    let index = e.currentTarget.dataset.index
    if (this.data.randerTitle.content != undefined) {
      color = this.data.randerTitle.content[index]
    } else {
      color = this.data.randerTitle.child[this.data.senceIndex - 1].content[
        index
      ]
    }
    this.setData({
      multiAnswer: answer,
    })
    console.log(option, answer, this.data.multiselect)
    let multiselect = this.data.multiselecting
    if (!multiselect.includes(option)) {
      multiselect.push(option)
      if (this.data.randerTitle.content != undefined) {
        this.data.randerTitle.content[index].haschose = true
        // this.data.randerTitle.done = true
      } else {
        this.data.randerTitle.child[this.data.senceIndex - 1].content[
          index
        ].haschose = true
        //this.data.randerTitle.child[this.data.senceIndex - 1].done = true
      }
      this.setData({
        multiselect: this.data.multiselect + option + ',',
      })
    } else {
      if (this.data.randerTitle.content != undefined) {
        this.data.randerTitle.content[index].haschose = false
        //this.data.randerTitle.done = false
      } else {
        this.data.randerTitle.child[this.data.senceIndex - 1].content[
          index
        ].haschose = false
        //this.data.randerTitle.child[this.data.senceIndex - 1].done = false
      }
      if (multiselect.length >= 1) {
        multiselect.forEach((item, i) => {
          console.log(item == option)
          if (item == option) {
            console.log(item == option)
            multiselect.splice(i, 1)
            this.setData({
              removeColorOption: option,
            })
            console.log(this.data.removeColorOption)
          }
          // else{
          //   this.setData({
          //     removeColorOption:''
          //   })
          // }
        })
        console.log(this.data.removeColorOption)
        console.log(this.data.multiselect)
      }
      this.setData({
        multiselect: multiselect.toString() + ',',
      })
    }
    if (answer.includes(option)) {
      console.log(option)
      color.color = true
      console.log(this.data.removeColorOption == option)
      if (this.data.removeColorOption == option) {
        color.color = ''
      }
      this.setData({
        randerTitle: this.data.randerTitle,
      })
    } else {
      color.color = false
      color.err = true
      console.log(this.data.removeColorOption == option)
      if (this.data.removeColorOption == option) {
        color.err = ''
        color.color = ''
      }
      this.setData({
        randerTitle: this.data.randerTitle,
      })
    }
    this.setData({
      removeColorOption: '',
    })
    console.log(this.data.randerTitle.content)
  },
  showAnswer() {
    if (this.data.activeAnswer == 'activeAnswer') {
      this.setData({
        answerImg: 'https://minproimg.oss-cn-hangzhou.aliyuncs.com/images/hideAnswer.png',
        activeAnswer: 'defaultAnswer',
        correctoption: '',
        multishowAny: true,
        'randerTitle.showAnswer': false,
      })
    } else {
      var data = this.data.randerTitle.content
      if (this.data.randerTitle.done != true) {
        var arr = this.data.multiselect
        var arr01 = this.data.multiAnswer
        let answer = this.data.randerTitle.answer
        var arr03 = answer.split(',')
        console.log(arr == '')
        if (arr != '') {
          var arr02 = [...arr01].filter((x) => [...arr].every((y) => y !== x))
          data.forEach((item) => {
            arr02.forEach((i) => {
              if (i == item.option) {
                item.nohascolor = true
              }
            })
          })
        } else {
          data.forEach((item) => {
            arr03.forEach((i) => {
              if (i == item.option) {
                item.nohascolor = true
              }
            })
          })
        }

        ;
        (arr = []), (arr01 = []), (arr02 = [])
      }
      this.setData({
        answerImg: 'https://minproimg.oss-cn-hangzhou.aliyuncs.com/images/showAnswer (1).png',
        activeAnswer: 'activeAnswer',
        correctoption: 'activeoption',
        multishowAny: false,
        'randerTitle.showAnswer': true,
        'randerTitle.done': true,
        'randerTitle.content': data,
      })
    }
  },
  showSenceAnswer() {
    if (this.data.activeSenceAnswer == 'activeAnswer') {
      this.setData({
        answerSenceImg: 'https://minproimg.oss-cn-hangzhou.aliyuncs.com/images/hideAnswer.png',
        activeSenceAnswer: 'defaultAnswer',
        correcSencetoption: '',
        multiSenceshowAny: true,
      })
    } else {
      this.setData({
        answerSenceImg: 'https://minproimg.oss-cn-hangzhou.aliyuncs.com/images/showAnswer (1).png',
        activeSenceAnswer: 'activeAnswer',
        correcSencetoption: 'activeoption',
        multiSenceshowAny: false,
      })
    }
  },
  getLogAnswer(log_id) {
    let that = this
    let option = {
      log_id: log_id,
      mode: 4,
    }
    console.log(option)
    app.encryption({
      //初始化加载函数获取所有题目ID
      url: api.test.getLogAnswer,
      data: option,
      method: 'GET',
      dataType: 'json',
      success: function (res) {
        console.log(res)
        let index = res.list.findIndex(
          (value) => value.problem_id == that.data.answer_location
        )
        for (let i = 0; i <= index; i++) {
          if (res.list[i].problem_id == that.data.randerTitle.problem_id) {
            let answer = res.list[i].answer.split(',')
            console.log(answer)
            for (let j = 0; j < that.data.randerTitle.content.length; j++) {
              for (let k = 0; k < answer.length; k++) {
                console.log(that.data.randerTitle.content[j])
                if (that.data.randerTitle.content[j].option == answer[k]) {
                  console.log(that.data.randerTitle.answer, answer[k])
                  console.log(that.data.randerTitle.answer.indexOf(answer[k]))
                  if (that.data.randerTitle.answer.indexOf(answer[k]) != -1) {
                    that.data.randerTitle.content[j].color = true
                    that.data.randerTitle.content[j].err = false
                  } else {
                    that.data.randerTitle.content[j].color = false
                    that.data.randerTitle.content[j].err = true
                  }
                }
              }
            }
            that.data.randerTitle.option = res.list[i].answer
            that.data.randerTitle.done = true
            that.setData({
              randerTitle: that.data.randerTitle,
            })
            console.log(that.data.randerTitle)
          }
        }
      },
    })
  },
  getAlltestNumber(options) {
    console.log(options)
    //开始加载题目详情 problem_id
    if (options.type == 'error') {
      this.setData({
        chapterName: '错题集',
        navH: app.globalData.navHeight,
        dialogContent: '该章节错题集练习已完成',
      })
      let that = this
      let problem_course_id = wx.getStorageSync('problem_course_id')
        .problem_course_id
      let option = {
        problem_course_id: problem_course_id,
        problem_chapter_id: this.data.problem_chapter_id,
      }
      console.log(option)
      app.encryption({
        url: api.test.getErrorProblemCollectionList,
        method: 'GET',
        data: option,
        success: function (res) {
          console.log(res)
          let list = res.list
          let totalNum
          let single_problem = list.single_problem || [] //单选
          let fill_problem = list.fill_problem || [] //填空
          let judge_problem = list.judge_problem || [] //判断
          let multiple_problem = list.multiple_problem || [] //多选
          let scenes_problem = list.scenes_problem || [] //场景
          let short_problem = list.short_problem || [] //简答
          totalNum =
            single_problem.length +
            multiple_problem.length +
            scenes_problem.length +
            judge_problem.length +
            fill_problem.length +
            short_problem.length
          //合并数组
          let alltestID = []
          alltestID = alltestID
            .concat(single_problem)
            .concat(multiple_problem)
            .concat(scenes_problem)
            .concat(judge_problem)
            .concat(fill_problem)
            .concat(short_problem)
          console.log(totalNum, alltestID)
          that.setData({
            all_current_no: totalNum, //总题数
            // challenge_id: res.challenge_id,
            alltestID: alltestID, //所有题目id
          })
          //查找当前题目下标
          that.findcurIndex(alltestID[0], alltestID, 0)
          //开始加载题目详情
          that.initText(alltestID[0])
        },
      })
    } else {
      this.setData({
        chapterName: '收藏夹',
        navH: app.globalData.navHeight,
        dialogContent: '该章节收藏夹已到底了,是否退出',
      //    nosubmit:0,
      //  lettering: 'normalGo',
        showAny: false
      })
      this.getFavoritesList(options)
     



    }
  },
  //收藏题目列表
  getFavoritesList(options) {
    var that = this
    let problem_course_id = wx.getStorageSync('problem_course_id')
    let option = {
      problem_course_id: problem_course_id.problem_course_id,
      problem_chapter_id:parseInt (options.problem_chapter_id),
      page: 1,
      limit: 99999999
    }
    console.log(option)
    app.encryption({
      url: api.test.getCollectionProblemList,
      method: 'GET',
      data: option,
      success: function (res) {
      console.log(res)
      let data =res.list
    let alltestID =  data.map((i)=>{
        return i.problem_id
      })
      console.log(alltestID)
      
      that.setData({
        all_current_no: res.list.length, //总题数
        // challenge_id: res.challenge_id,
        alltestID: alltestID, //所有题目id
        nosubmit:0,
        lettering: 'normalGo',
        showAny: false,
        multishowAny:false
      })
      console.log(that.data.showAny)
      that.findcurIndex(alltestID[0], alltestID, 0)
      //开始加载题目详情
      that.initText(alltestID[0])
      

      },
      fail: function (t) {},
      complete: function () {},
    })
  },

  findcurIndex(curId, allId, start = 1) {
    console.log(allId)
    let curIndexNumber = allId.findIndex((value) => value == curId)
    curIndexNumber += 1
    let icon = 'tabItems[0].icon'
    this.setData({
      curIndexNumber: curIndexNumber,
    })
    // 边界值判断
    if (curIndexNumber <= 1 && start) {
      wx.showToast({
        title: '已经是第一题了',
        icon: 'none',
        duration: 2000,
      })
      curIndexNumber = 1
      this.setData({
        [icon]: 'https://minproimg.oss-cn-hangzhou.aliyuncs.com/images/cards (4).png',
      })
    } else if (curIndexNumber >= this.data.all_current_no) {
      wx.showToast({
        title: '已经是最后一道题了',
        icon: 'none',
        duration: 2000,
      })
      curIndexNumber = this.data.all_current_no
    } else {
      this.setData({
        [icon]: 'https://minproimg.oss-cn-hangzhou.aliyuncs.com/images/leftsing.png',
      })
    }
    console.log(curIndexNumber)
    return curIndexNumber
  },
  submitAnswer(answer, curID = '0') {
    let that = this
    let option = {
      problem_course_id: this.data.courseId,
      problem_id: this.data.curID,
      log_id: this.data.practice_id,
      mode: 4,
      answer: answer,
    }
    console.log(option)
    app.encryption({
      //初始化加载函数获取所有题目ID
      url: api.test.answerErrorProblem,
      data: option,
      method: 'POST',
      dataType: 'json',
      success: function (res) {
        console.log(res)
        //提交完答案，清空多选题答案数组,并查看是否已缓存，并改变其中的标识符（hasSubmit）
        if (res.data.code == 200) {
          if (that.data.randerTitle.problem_type == 6) {
            console.log(curID)
            that.data.randerTitle.child[curID].hasSubmit = true
          }
          that.data.randerTitle.hasSubmit = true
          that.setData({
            multiselect: '', //场景模式下多选清空
            randerTitle: that.data.randerTitle,
            SceneValue: '', //场景模式下填空清空
            shortSceneMap: '', //场景模式下简答清空
            shortMap: '', //简答题清空
          })
          console.log(that.data.randerTitle)
          let curRander = that.data.randerTitle
          let ID = curID
          let result = that.hasBeenLoad(ID) //检查本地是否已缓存
          if (result == undefined) {
            // 未缓存
            that.data.allRender.push(curRander)
            console.log(that.data.allRender)
            return
          } else {
            //已缓存
            let find = that.data.allRender.findIndex(
              (value) => value.problem_id == ID
            )
            console.log(that.data.allRender, ID, find)
            that.data.allRender[find].hasSubmit = true
            that.setData({
              allRender: that.data.allRender,
            })
          }
        }
      },
    })
  },
  sceneCommon() {
    if (
      this.data.randerTitle.child[this.data.senceIndex - 1]
      .problem_child_type == 2
    ) {
      //多选题在此提交答案
      if (this.data.randerTitle.child[this.data.senceIndex - 1].hasSubmit) {
        // 表明已提交过答案
      } else {
        if (this.data.multiselect != '') {
          this.submitAnswer(this.data.multiselect, this.data.senceIndex - 1)
        } else if (this.data.SceneValue != '') {
          this.submitAnswer(this.data.SceneValue, this.data.senceIndex - 1)
        } else if (this.data.shortSceneMap != '') {
          this.submitAnswer(this.data.shortSceneMap, this.data.senceIndex - 1)
        }
      }
    }
  },
  bindsenceNext() {
    console.log(this.data.senceIndex, this.data.senceNum) // 点击下一题增加+1
    // this.saveScenceRander()
    if (this.data.senceIndex < this.data.senceNum) {
      this.sceneCommon()
      this.setData({
        senceIndex: this.data.senceIndex + 1,
      })
    } else {
      this.setData({
        senceIndex: this.data.senceIndex,
      })
      wx.showToast({
        title: '已经是最后一道题了',
        icon: 'none',
        duration: 2000,
      })
      this.sceneCommon()
    }

    let index = this.data.senceIndex - 1
    let cid = this.data.randerTitle.child[index].problem_id //获取ID
    this.setData({
      curID: cid,
    })
  },
  bindsenceLast() {
    console.log(this.data.senceIndex) // 点击下一题减少-1
    if (this.data.senceIndex <= 1) {
      this.setData({
        senceIndex: 1,
      })
      wx.showToast({
        title: '已经是第一道题了',
        icon: 'none',
        duration: 2000,
      })
      if (
        this.data.randerTitle.child[this.data.senceIndex - 1]
        .problem_child_type == 2
      ) {
        //多选题在此提交答案
        if (this.data.randerTitle.child[this.data.senceIndex - 1].hasSubmit) {
          // 表明已提交过答案
        } else {
          let multiselect = this.data.multiselect
          this.submitAnswer(multiselect, this.data.senceIndex - 1)
        }
      }
    } else {
      if (
        this.data.randerTitle.child[this.data.senceIndex - 1]
        .problem_child_type == 2
      ) {
        //多选题在此提交答案
        if (this.data.randerTitle.child[this.data.senceIndex - 1].hasSubmit) {
          // 表明已提交过答案
        } else {
          let multiselect = this.data.multiselect
          this.submitAnswer(multiselect, this.data.senceIndex - 1)
        }
      }
      this.setData({
        senceIndex: this.data.senceIndex - 1,
      })
    }
    let index = this.data.senceIndex - 1
    let cid = this.data.randerTitle.child[index].problem_id //获取ID
    this.setData({
      curID: cid,
    })
    // this.saveScenceRander(cid) // 缓存
  },
  initText(ID) {
    //getProblemDetail，先去查找本地缓存
    let that = this
    let result = that.hasBeenLoad(ID)
    if (result != undefined) {
      //发现有数据
      let randerTitle = result
      that.collectOrNot(randerTitle)
      that.setData({
        randerTitle: randerTitle,
        ProblemType: randerTitle.problem_type,
        curID: randerTitle.problem_id,
      })
    } else {
      let option = {
        problem_id: ID,
      }
      app.encryption({
        // 开始加载题目详情
        url: api.test.getProblemDetail,
        data: option,
        method: 'GET',
        dataType: 'json',
        success: function (res) {
          console.log(res, res.info.problem_type)
          let randerTitle = app.testWxParse(that, res.info) //初始化并解析第一道题目,默认是从第一道题开始加载渲染
          randerTitle.showAnswer = false
         console.log('哈哈哈')
          if(that.data.showAny==false){
            randerTitle.done = true
            // randerTitle.showAnswer = true
          }else{
            randerTitle.done = false
          }
          // 判断是否为场景题，如果为场景题则需要循环child并解析富文本
          if (randerTitle.problem_type == 6) {
            if (
              randerTitle.child != undefined &&
              randerTitle.child.length > 0
            ) {
              randerTitle.child.forEach((val, index) => {
                val = app.testWxParse(that, val) //将解析后的赋值
              })
            }
            // 判断当前题目是否已收藏
            that.collectOrNot(randerTitle)
            that.setData({
              randerTitle: randerTitle,
              senceNum: randerTitle.child.length,
              senceIndex: 1,
              ProblemType: res.info.problem_type,
              curID: randerTitle.child[0].problem_id,
            })
            return
          }
          // 判断当前题目是否已收藏
          that.collectOrNot(randerTitle)
          //判断结束
          that.setData({
            randerTitle: randerTitle,
            ProblemType: res.info.problem_type,
            curID: res.info.problem_id,
          })
          if (that.data.is_lock == 1) {
            //继续上次，获取记录答案接口
            that.getLogAnswer(that.data.practice_id)
          }
          console.log(that.data.randerTitle)
        },
      })
    }
  },
  hasBeenLoad(ID) {
    let hasBeenLoad = this.data.allRender //本地缓存
    let result = hasBeenLoad.find((value) => value.problem_id == ID)
    return result
  },
  collectOrNot(randerTitle) {
    let that = this
    let icon = 'tabItems[1].icon'
    let classes = 'tabItems[1].class'
    let name = 'tabItems[1].name' //以上为获取收藏按钮状态
    console.log(randerTitle.isCollect, typeof randerTitle.isCollect)
    if (randerTitle.isCollect != 'undefined' && randerTitle.isCollect == 1) {
      //是否已收藏
      that.setData({
        likes: true,
        [icon]: 'https://minproimg.oss-cn-hangzhou.aliyuncs.com/images/yishuangcang (1).png',
        [classes]: 'active',
        [name]: '已收藏',
      })
    } else {
      that.setData({
        likes: true,
        [icon]: 'https://minproimg.oss-cn-hangzhou.aliyuncs.com/images/weishoucang.png',
        [classes]: '',
        [name]: '收藏',
      })
    }
  },
  init(answering) {
    let options = []
    let rightStatus = 1
    console.log(answering)
    let randerTitle = this.data.randerTitle
    for (let i of randerTitle.content) {
      options.push(i.option)
    }
    console.log(options)
    let option = answering //当前点击选项的option
    let answer = randerTitle.answer //当前题目的答案
    let index = options.indexOf(answering) //当前点击选项的index
    let color = randerTitle.content[index] //获取当前点击选项的数组
    console.log(option)
    this.setData({
      option: option, //声名点击选项
      showAny: 0, //尚未操作前，隐藏答案
      multishowAny: 0,
    })
    color.color = false //新增当前点击选项的color
    color.err = false //新增当前点击选项的err
    randerTitle.done = true //表明当前题目已做
    randerTitle.option = option
    if (option == answer) {
      //单选正确
      color.color = true //改变当前选项的颜色为true
      rightStatus = 1
      this.setData({
        randerTitle: this.data.randerTitle, //缓存改变后的渲染数据
      })
    } else {
      rightStatus = 0
      color.color = false
      color.err = true
      this.setData({
        randerTitle: this.data.randerTitle, //缓存改变后的渲染数据
      })
    }
  },
  gobefor(e) {
    console.log(e.currentTarget.dataset.index)
    let number = e.currentTarget.dataset.index // 前一个页面
    // console.log("beforePage");
    // console.log(beforePage);
    wx.navigateBack({
      success: function () {
        beforePage.onLoad(number)
      },
    })
  },
  goback() {
    let that = this
    wx.showModal({
      title: '提示',
      content: this.data.dialogContent,
      showCancel: true, //是否显示取消按钮
      // cancelText: "不保存",//默认是“取消”
      cancelColor: '#333333', //取消文字的颜色
      confirmText: '退出', //默认是“确定”
      confirmColor: '#199FFF', //确定文字的颜色
      success: function (res) {
        let pages = getCurrentPages() // 当前页面
        let beforePage = pages[pages.length - 2]
        let courseId = that.data.courseId
        wx.navigateBack({
          success: function () {
            beforePage.onLoad({
              courseId: courseId
            })
          },
        })
        // let is_lock
        // if (res.cancel) {
        //   is_lock = 0
        //   wx.showLoading({
        //     title: '正在清除进度...',
        //   })
        //   //点击取消,默认隐藏弹框
        // } else {
        //   is_lock = 1
        //   wx.showLoading({
        //     title: '正在保存进度...',
        //   })
        // }
        // let option = {
        //   practice_id: that.data.practice_id,
        //   is_lock: is_lock
        // }
        // console.log(is_lock)
        // console.log(option)
        // app.encryption({
        //   url: api.test.archivePracticeData,
        //   data: option,
        //   method: 'POST',
        //   dataType: "json",
        //   success: function (res) {
        //     console.log(res)
        //     wx.showToast({
        //       title: res.data.message,
        //       icon: 'none',
        //       duration: 2000
        //     })
        //     wx.hideLoading()
        //     let pages = getCurrentPages(); // 当前页面
        //     let beforePage = pages[pages.length - 2];
        //     let courseId = that.data.courseId
        //     wx.navigateBack({
        //       success: function () {
        //         beforePage.onLoad({ courseId: courseId });
        //       }
        //     });
        //   },
        //   fail: function (n) {
        //     console.log('333333')
        //   }
        // })
      },
    })
  },
  onLoad: function (options = {}) {
    console.log(options)
    this.setData({
      moveY: 313,
      problem_chapter_id: options.problem_chapter_id,
    })
    //获取屏幕宽高
    const {
      windowHeight
    } = wx.getSystemInfoSync()
    this.data.windowHeight = windowHeight - 127 - 54
    //先去请求所有题目的id，当点击下一题目的时候用id换题目,获取上次的记录答案
    let that = this
    that.getAlltestNumber(options)
    // that.getErrorChapterlist(options)
  },
  onReady: function () {},
  onShow: function () {},
  onHide: function () {
    clearTimeout(t)
  },
  onUnload: function () {
    clearTimeout(t)
  },
  onPullDownRefresh: function () {},
  onReachBottom: function () {},
  // 左右滑动事件
  touchStart(e) {
    this.setData({
      touchX: e.changedTouches[0].clientX,
      touchY: e.changedTouches[0].clientY,
    })
  },
  initAlldata(options) {
    wx.showLoading({
      title: '正在加载中...',
    })
    var that = this
    this.setData({
      chapterName: options.name,
      navH: app.globalData.navHeight,
      courseId: options.courseId,
    })
    wx.getSystemInfo({
      success(res) {
        let height = res.screenHeight * 2
        let topheight = that.data.navH
        let questionHeight = height - topheight * 2 - 98 - 56 * 2 - 40
        that.setData({
          questionHeight: questionHeight,
        })
      },
    })
    let icon = 'tabItems[1].icon'
    let classes = 'tabItems[1].class'
    let name = 'tabItems[1].name' //以上为获取收藏按钮状态s
    let option = {
      courseId: options.courseId,
      chapterId: options.chapter_id,
    } //以上为初始化加载参数
    console.log(option)
    app.encryption({
      //初始化加载函数获取所有题目
      url: api.test.answerErrorProblem,
      data: option,
      method: 'GET',
      dataType: 'json',
      success: function (res) {
        console.log(res)
        let curtitle = res.list[0] //声明首次加载的题目
        let curindex = 0 //声明首次加载的下标
        let randerTitle = app.testWxParse(that, res.list[0]) //初始化并解析第一道题目,默认是从第一道题开始加载渲染
        that.data.allRender.push(randerTitle) //allRender为所有已经渲染页面的数据集合
        if (redo == 0) {
          for (let item of res.list.entries()) {
            //遍历所有原始数据并初始化首次加载数据集合
            if (item[1].ProblemId == res.lastProblemId) {
              //如果发现了此lastProblemId则需要初始化所有之前的题目
              curtitle = item[1]
              curindex = item[0] //初始化加载下标
              console.log(curindex)
              randerTitle = app.testWxParse(that, curtitle) //初始化首次加载页面数据
              if (curindex >= 1) {
                let icon = 'tabItems[0].icon'
                that.setData({
                  [icon]: 'https://minproimg.oss-cn-hangzhou.aliyuncs.com/images/leftsing.png',
                })
              }
              that.data.allRender.length = 0
              for (let i = 0; i <= curindex; i++) {
                let randerTitle = app.testWxParse(that, res.list[i]) //解析所有已经加载的题目,从第一道题开始
                that.data.allRender.push(randerTitle) //向页面渲染集合推送已做过的题目,
              }
            }
          }
        } //遍历所有题目并将上一次做过的题目找到，如果此前有记录，则需要把所有做过的题目推送到已经渲染的集合（即要初始化allRender）
        wx.hideLoading()
        that.setData({
          originTitle: res.list, //为所有原始数据
          randerTitle: randerTitle, //为当前渲染数据
          current_no: curindex, //初始化题目标注
          ProblemType: randerTitle.ProblemType, //表明练习题类型
          all_current_no: res.count, //所有题目的数量
          singleNum: res.singleList, //单选题的数量
          multipleNum: res.multipleLis, //多选题的数量
          judgmentNum: res.judgmentList, //判断题的数量
          formId: res.formId, //formid
        })
        if (randerTitle.isCollect == 1) {
          //是否已收藏
          that.setData({
            likes: true,
            [icon]: 'https://minproimg.oss-cn-hangzhou.aliyuncs.com/images/yishuangcang (1).png',
            [classes]: 'active',
            [name]: '已收藏',
          })
        }
        if (randerTitle.yourAnswer && randerTitle.yourAnswer != '') {
          that.init(randerTitle.yourAnswer)
        }
      },
      fail: function (n) {
        console.log('初始化失败')
      },
    })
  },
  touchEnd(e) {
    let d = this.data
    let x = e.changedTouches[0].clientX
    let y = e.changedTouches[0].clientY
    let direction = app.getTouchData(x, y, d.touchX, d.touchY)
    if (direction == 'left') {
      this.nextQU()
    } else if (direction == 'right') {
      this.lastQU()
    }
  },
  touchSceneEnd(e) {
    let d = this.data
    let x = e.changedTouches[0].clientX
    let y = e.changedTouches[0].clientY
    let direction = app.getTouchData(x, y, d.touchX, d.touchY)
    if (direction == 'left') {
      this.bindsenceNext()
    } else if (direction == 'right') {
      this.bindsenceLast()
    }
  },
  showfillAnswer() {
    if (this.data.activeAnswer == 'activeAnswer') {
      this.setData({
        answerFillImg: 'https://minproimg.oss-cn-hangzhou.aliyuncs.com/images/hideAnswer.png',
        activeFillAnswer: 'defaultAnswer',
        correctFilloption: '',
        multishowFillAny: true,
      })
    } else {
      this.setData({
        answerFillImg: 'https://minproimg.oss-cn-hangzhou.aliyuncs.com/images/showAnswer (1).png',
        activeFillAnswer: 'activeAnswer',
        correctFilloption: 'activeoption',
        multishowFillAny: false,
      })
    }
  },
  showShortAnswer() {
    if (this.data.activeShortAnswer == 'activeAnswer') {
      this.setData({
        answerShortImg: 'https://minproimg.oss-cn-hangzhou.aliyuncs.com/images/hideAnswer.png',
        activeShortAnswer: 'defaultAnswer',
        correcShorttoption: '',
        multishowShortAny: true,
      })
    } else {
      this.setData({
        answerShortImg: 'https://minproimg.oss-cn-hangzhou.aliyuncs.com/images/showAnswer (1).png',
        activeShortAnswer: 'activeAnswer',
        correcShorttoption: 'activeoption',
        multishowShortAny: false,
      })
    }
  },
  updateShortValue(event) {
    let value = event.detail.value
    this.data.randerTitle.shortMap = value
    this.setData({
      shortMap: value,
      randerTitle: this.data.randerTitle,
    })
  },
  updateSceneValue(event) {
    let value = event.detail.value
    this.setData({
      SceneValue: value,
    })
  },
  updateShorScenetValue(event) {
    let value = event.detail.value
    this.setData({
      shortSceneMap: value,
    })
  },
  bindKeyInput(e) {
    console.log(e)
    let index = e.target.dataset.index
    let value = e.detail.value
    this.data.fillNewAnswer[index] = value
    this.data.randerTitle.option[index] = value
    this.setData({
      fillNewAnswer: this.data.fillNewAnswer,
      randerTitle: this.data.randerTitle,
    })
    console.log(this.data.fillNewAnswer)
  },
})