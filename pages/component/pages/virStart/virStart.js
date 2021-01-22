var t, app = getApp(), api = require("../../../../api.js"), app = getApp();
Page({
  data: {
    start: [0, 0],//其实位置
    moveY: 0,//y轴
    moveX: 0,//x轴
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
    singleNum: '0',
    multipleNum: '0',
    judgmentNum: '0',
    formId: '',
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
    lettering: 'goback',
    ProblemType: '',
    answerImg: 'https://minproimg.oss-cn-hangzhou.aliyuncs.com/images/hideAnswer.png',
    answerSenceImg: 'https://minproimg.oss-cn-hangzhou.aliyuncs.com/images/hideAnswer.png',
    answerFillImg: 'https://minproimg.oss-cn-hangzhou.aliyuncs.com/images/hideAnswer.png',
    answerShortImg: 'https://minproimg.oss-cn-hangzhou.aliyuncs.com/images/hideAnswer.png',
    answerSceneImg:'https://minproimg.oss-cn-hangzhou.aliyuncs.com/images/hideAnswer.png',
    answerScenceShortImg:'https://minproimg.oss-cn-hangzhou.aliyuncs.com/images/hideAnswer.png',
    activeAnswer: 'defaultAnswer',
    multishowFillAny: true,
    multishowScenceShortAny:true,
    activeSenceAnswer: 'defaultAnswer',
    activeFillAnswer: 'defaultAnswer',
    activeShortAnswer: 'defaultAnswer',
    activeSceneAnswer:'defaultAnswer',
    activeScenceShortAnswer:'defaultAnswer',
    multishowShortAny: true,
    multiSceneshowAny:true,
    correcShorttoption: '',
    correctoption: '',
    correcScenceShorttoption:'',
    correctSceneoption:'',
    correctFilloption: '',
    correcSencetoption: '',
    multishowAny: true,
    multiSenceshowAny: true,
    multiselecting: [],
    multiselect: '',
    multiID: '',
    multiAnswer: '',
    title: '',
    questionHeight: "",
    correctAnswer: false,
    wrongAnswer: false,
    curID: '',
    curIndexNumber: '',
    exam_log_id: '',
    alltestID: [],
    is_lock: 0,
    senceNum: 0,
    senceIndex: 0,
    multishowFillAny: true,
    shortMap: '',
    SceneValue:'',
    shortSceneMap:'',
    fillNewAnswer:[],
    nosubmit:0,
    chapterName:'',
    clearTimer:false
  },
  starDrag(event) {
    console.log(event);
    this.data.start[1] = event.touches[0].clientY - event.target.offsetTop + this.data.moveY; //记录开始至位置
  },
  endDrag(event) {
    let tag = event.touches;

    // if () {
    //   tag[0].clientY = this.data.windowHeight
    // }
    this.data.moveY = Math.abs(this.data.start[1] - tag[0].clientY);
    if (this.data.moveY < 50) {
      this.data.moveY = 100
    }
    if (tag[0].clientY <= 66) {
      this.data.moveY = this.data.windowHeight - 20
    }
    this.setData({
      moveY: this.data.moveY,
    })
    console.log(this.data.moveY, tag);
  },
  normalGo() {
    // let that = this
    // let chapterName = that.data.chapterName;
    // let course_id = that.data.courseId;
    // let chapter_id = that.data.chapter_id;
    // let exam_log_id = that.data.exam_log_id;
    // wx.navigateTo({
    //   url: `../yearTestScroll/yearTestScroll?exam_log_id=${exam_log_id}&chapterName=${chapterName}&course_id=${course_id}&chapter_id=${chapter_id}`
    // })
       wx.navigateBack({
      delta: 1
    })
  },
  wode(ID, nosubmit = 0) { //当用户开始回顾时触发此函数
    console.log('触发')
    let that = this
     //首先接受ID作为查找题目参数
     that.setData({ //更新submit，标志用户进入回顾
      nosubmit:nosubmit,
      lettering: 'normalGo',
      showAny: false
     })
     let alltestID = this.data.alltestID;
     console.log(alltestID)
     that.findcurIndex(ID, alltestID, 0);
     that.initText(ID) // 加载题目
  },
  lastQU() {
    //如果该题目是从上次保存下来则不提交答案
    let that = this
    let curID = this.data.curID
    //首先获取上一题的ID
    let curindex = that.data.curIndexNumber - 1 // 当前下标
    console.log(curindex)
    if(that.data.randerTitle.problem_type == 6){
      let index = this.data.senceIndex - 1
      let cid = this.data.randerTitle.child[index].problem_id  //获取ID
      this.setData({
        curID: cid
      })
      this.sceneCommon()
    }else{
      if(this.data.is_lock == 1){
      }else{
        this.common()
      }
    }
    if (curindex < 1) {
      return
    }
     // 开启缓存，并去重,传入当前数据，而非下一题数据
    that.saveRander(curID)
    let curId = that.data.alltestID[curindex - 1] // 获取上一题ID
    that.findcurIndex(curId, that.data.alltestID);
    //开始加载题目详情
    that.initText(curId);
  },
  cards() {
    this.common()
    let name = "模拟考试"
    let practice_id = this.data.exam_log_id
    console.log(practice_id,name)
    wx.navigateTo({
      url: `../answerCard/answerCard?name=${name}&practice_id=${practice_id}&type=4`
    })
  },
  checkout(problem_id) {
    let that = this
    that.findcurIndex(problem_id, that.data.alltestID);
    //开始加载题目详情
    that.initText(problem_id);
  },
  myLinsterner(e) {
    let content = '考试时间到，请点击确定按钮提交答案'
    this.settlementRealTopicResult(content)
  },
  common(){ //判断当前题目是否已经提交，若没有则提交当前题目
    let that = this
    let curID = that.data.curID
    console.log(that.data.randerTitle)
    if (that.data.randerTitle.problem_type == 1 || that.data.randerTitle.problem_type == 3 ) {//单选题以及多选题在此提交答案
      if (that.data.randerTitle.hasSubmit) { // 表明已提交过答案
      } else {
        let answer = that.data.randerTitle.option
        if (answer == '') {
        } else {
          that.submitAnswer(answer, curID)
        }
      }
    }
    if (that.data.randerTitle.problem_type == 2) {//多选题在此提交答案
      if (that.data.randerTitle.hasSubmit) { // 表明已提交过答案
      } else {
        let multiselect = that.data.multiselect
        if (multiselect == '') {
        } else {
          that.submitAnswer(multiselect, curID)
        }
      }
    }
    if (that.data.randerTitle.problem_type == 6) { //场景提交
      if (that.data.randerTitle.child[this.data.senceIndex - 1].hasSubmit) {
      } else {
        if(this.data.multiselect != ''){
          this.submitAnswer(this.data.multiselect, this.data.senceIndex - 1)
        }else if( this.data.SceneValue != ''){
          this.submitAnswer(this.data.SceneValue, this.data.senceIndex - 1)
        }else if(this.data.shortSceneMap != ''){
          this.submitAnswer(this.data.shortSceneMap, this.data.senceIndex - 1)
        }
      }
    }
    if (that.data.randerTitle.hasSubmit) { // 其他模式表明已提交过答案
    } else {
      if (this.data.fillNewAnswer.length == 0) {
      } else {
        let answer = ''
        this.data.fillNewAnswer.forEach((value)=>{
          answer = answer + value + ','
        })
        that.submitAnswer(answer, curID)
      }
      if (this.data.shortMap == '') {
      } else {
        let answer = this.data.shortMap
        that.submitAnswer(answer, curID)
      }
    }
  },
  nextQU() {
    //考试模式下所有题型都以点击下一题或者上一题为提交答案的入口
    let that = this
    this.setData({
      multiselecting: []
    })
    let curID = that.data.curID
    console.log(that.data.randerTitle)
    if(that.data.randerTitle.problem_type == 6){
      let index = this.data.senceIndex - 1
      let cid = this.data.randerTitle.child[index].problem_id  //获取ID
      this.setData({
        curID: cid
      })
      this.sceneCommon()
    }else{
      if(this.data.is_lock == 1){
      }else{
        this.common()
      }
    }
    // 开启缓存，并去重,传入当前数据，而非下一题数据
    that.saveRander(curID)
    //首先获取下一题的ID
    let curindex = that.data.curIndexNumber - 1; // 当前下标
    if (curindex + 1 > that.data.all_current_no - 1) {
      this.settlementRealTopicResult()
      // this.goback()
      return
    }
    let curId = that.data.alltestID[curindex + 1]; // 获取下一题ID
    that.findcurIndex(curId, that.data.alltestID);
    //开始加载题目详情
    that.initText(curId);
  },
  saveRander(ID) {
    let that = this
    let curRander = this.data.randerTitle;
    let result = that.hasBeenLoad(ID);//检查本地是否已缓存
    if (result == undefined) {  // 未缓存
      this.data.allRender.push(curRander)
      console.log(this.data.allRender)
      return
    }
  },
  saveScenceRander(ID) {
    // console.log(ID)
    let index = this.data.senceIndex
    let hasBeenLoad = this.data.randerTitle.child[index];//本地缓存
    if (hasBeenLoad.done != undefined && hasBeenLoad.done == true) { //已缓存

    } else {

    }
    // let result = hasBeenLoad.find((value) => value.problem_id == ID);
    // console.log(result)
  },
  settlementRealTopicResult(content='已经是最后一题了，是否交卷？'){
    let that = this
    wx.showModal({
      title: '提示',
      content: content,
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
          let chapterName = "模拟考试";
          let course_id = that.data.courseId;
          let chapter_id = that.data.chapter_id;
          let exam_log_id = that.data.exam_log_id;
          clearTimeout(t);
          that.setData({
            clearTimer: true
          });
          wx.navigateTo({
            url: `../yearTestScroll/yearTestScroll?real_topic_log_id=${exam_log_id}&chapterName=${chapterName}&course_id=${course_id}&type=4`
          })
        }
      },
      fail: function (n) {
        console.log('初始化失败')
      }
    })
  },
  //选择答案
  selectAnswer(e) {
    //考试模式分为两种，其一是做题，不显示答案与对错，其二，当从结算页面跳转到试题页面时，展示答案与对错,当做题时可点击多次，回顾时模式不能点击选项与改变已做的答案，考试模式下单选题点击不触发提交答案
    
    if(this.data.nosubmit){ //nosubmit标识是否是回顾，默认值为考试,此处只负责隔断
      //点击加载运行
      return
    } else{
      if(this.data.randerTitle.child != undefined){
        if(this.data.randerTitle.child[this.data.senceIndex - 1].hasSubmit){
          wx.showToast({
            title: '该题目已经做过了',
            icon: 'none',
            duration: 2000
          })
          return 
      }
     }else{
        if(this.data.randerTitle.hasSubmit){
          wx.showToast({
            title: '该题目已经做过了',
            icon: 'none',
            duration: 2000
          })
          return 
        }
     }
      let option = e.currentTarget.dataset.option;//当前点击选项的option
      let answer = e.currentTarget.dataset.answer;//当前题目的答案
      let index = e.currentTarget.dataset.index;//当前点击选项的index
      let color = this.data.randerTitle.content[index];//获取当前点击选项的数组
      color.color = false//新增当前点击选项的color
      color.err = false//新增当前点击选项的err
      this.data.randerTitle.done = true//表明当前题目已做
      this.data.randerTitle.option = option
      if (option == answer) { //单选正确
        color.color = true//改变当前选项的颜色为true
        this.setData({
          randerTitle: this.data.randerTitle,//缓存改变后的渲染数据
        })
      } else {
        color.color = false
        color.err = true
        this.setData({
          randerTitle: this.data.randerTitle//缓存改变后的渲染数据
        })
      }
      // console.log(this.data.randerTitle)
      // if (this.data.ProblemType == 1 || this.data.ProblemType == 3) { // 单选题以及判断题直接提交答案
      //   console.log('进入单选题模式')
      //   this.submitAnswer(option)
      //   return
      // }
    }
  },
  getLogAnswer(log_id) { //获取上次的答题答案
    let that = this
    let option = {
      log_id: log_id,
      mode: 1
    }
    console.log(option)
    app.encryption({//初始化加载函数获取所有题目ID
      url: api.test.getLogAnswer,
      data: option,
      method: 'GET',
      dataType: "json",
      success: function (res) {
        console.log(res)
        let index = res.list.findIndex((value) => value.problem_id == that.data.answer_location)
        for (let i = 0; i <= index; i++) {
          if (res.list[i].problem_id == that.data.randerTitle.problem_id) {
            let answer = res.list[i].answer.split(',');
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
            that.data.randerTitle.done = true;
            that.setData({
              randerTitle: that.data.randerTitle
            })
            console.log(that.data.randerTitle)
          }
        }

      }
    })
  },
  selectSceneAnswer(e) {
    console.log(this.data.senceIndex,this.data.randerTitle)
    if(this.data.nosubmit){ //nosubmit标识是否是回顾，默认值为考试,此处只负责隔断
      //点击加载运行
      return
    } else{
      if(this.data.randerTitle.child != undefined){
        if(this.data.randerTitle.child[this.data.senceIndex - 1].hasSubmit){
          wx.showToast({
            title: '该题目已经做过了',
            icon: 'none',
            duration: 2000
          })
          return 
      }
     }else{
        if(this.data.randerTitle.hasSubmit){
          wx.showToast({
            title: '该题目已经做过了',
            icon: 'none',
            duration: 2000
          })
          return 
        }
     }
    }
    let option = e.currentTarget.dataset.option;//当前点击选项的option
    let answer = e.currentTarget.dataset.answer;//当前题目的答案
    let index = e.currentTarget.dataset.index;//当前点击选项的index
    let color = this.data.randerTitle.child[this.data.senceIndex - 1].content[index];//获取当前点击选项的数组
    color.color = false//新增当前点击选项的color
    color.err = false//新增当前点击选项的err
    this.data.randerTitle.child[this.data.senceIndex - 1].done = true//表明当前题目已做
    this.data.randerTitle.child[this.data.senceIndex - 1].option = option
    if (option == answer) { //单选正确
      color.color = true//改变当前选项的颜色为true
      this.setData({
        randerTitle: this.data.randerTitle,//缓存改变后的渲染数据
      })
    } else {
      color.color = false
      color.err = true
      this.setData({
        randerTitle: this.data.randerTitle//缓存改变后的渲染数据
      })
    }
    let curindex = this.data.senceIndex - 1
    this.setData({
          curID: this.data.randerTitle.child[curindex].problem_id
        })
    // let curindex = this.data.senceIndex - 1
    // if (this.data.randerTitle.child[curindex].problem_child_type == 1 || this.data.randerTitle.child[curindex].problem_child_type == 3) { // 单选题直接提交答案
    //   console.log('进入单选题模式')
    //   this.setData({
    //     curID: this.data.randerTitle.child[curindex].problem_id
    //   })
    //   this.submitAnswer(option)
    // }
  },
  multiselectAnswer(e) {
    if(this.data.randerTitle.child != undefined){
      if(this.data.randerTitle.child[this.data.senceIndex - 1].hasSubmit){
        wx.showToast({
          title: '该题目已经做过了',
          icon: 'none',
          duration: 2000
        })
        return 
    }
   }else{
      if(this.data.randerTitle.hasSubmit){
        wx.showToast({
          title: '该题目已经做过了',
          icon: 'none',
          duration: 2000
        })
        return 
      }
    }
    let color
    let option = e.currentTarget.dataset.option;
    let answer = e.currentTarget.dataset.answer;
    let index = e.currentTarget.dataset.index;
    if (this.data.randerTitle.content != undefined) {
      color = this.data.randerTitle.content[index];
    } else {
      color = this.data.randerTitle.child[this.data.senceIndex - 1].content[index];
    }
    this.setData({
      multiAnswer: answer
    })
    let multiselect = this.data.multiselecting
    if (!multiselect.includes(option)) {
      multiselect.push(option)
      let indexs = multiselect.findIndex((val)=>{ val == option })
      if (this.data.randerTitle.content != undefined) {
        if(indexs != -1){
          multiselect.splice(indexs,1)
          this.data.randerTitle.content[indexs].haschose = false
          this.data.randerTitle.done = true
        }else{
          this.data.randerTitle.content[index].haschose = true
          this.data.randerTitle.done = true
        }
      } else {
        this.data.randerTitle.child[this.data.senceIndex - 1].content[index].haschose = true
        this.data.randerTitle.child[this.data.senceIndex - 1].done = true
      }
      this.setData({
        multiselect: this.data.multiselect + option + ','
      })
    }else{
      let indexs = multiselect.findIndex((val)=>{ val == option })
      if (this.data.randerTitle.content != undefined) {
        if(indexs != -1){
          multiselect.splice(indexs,1)
          this.data.randerTitle.content[indexs].haschose = false
          this.data.randerTitle.done = false
        }else{
          this.data.randerTitle.content[index].haschose = false
          this.data.randerTitle.done = false
        }
      } else {
        this.data.randerTitle.child[this.data.senceIndex - 1].content[index].haschose = false
        this.data.randerTitle.child[this.data.senceIndex - 1].done = false
      }
      if(multiselect.length>=1){
        multiselect.forEach((item,i)=>{
          if(item==option){
            console.log(i)
            multiselect.splice(i,1)
          }
        })
      }
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
    console.log(option,this.data.multiselect.includes(option),this.data.multiselect)
     if(this.data.multiselect.includes(option)){//再次点击取消当前选项
      this.data.multiselect.replace(option,'')
      this.setData({
        multiselect:this.data.multiselect
      })
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
    // this.setData({
    //   wrongAnswer: true,
    //   correctAnswer: true
    // })

  },
  showSenceAnswer() {
    if (this.data.activeSenceAnswer == 'activeAnswer') {
      this.setData({
        answerSenceImg: 'https://minproimg.oss-cn-hangzhou.aliyuncs.com/images/hideAnswer.png',
        activeSenceAnswer: 'defaultAnswer',
        correcSencetoption: '',
        multiSenceshowAny: true
      })
    } else {
      this.setData({
        answerSenceImg: 'https://minproimg.oss-cn-hangzhou.aliyuncs.com/images/showAnswer (1).png',
        activeSenceAnswer: 'activeAnswer',
        correcSencetoption: 'activeoption',
        multiSenceshowAny: false
      })
    }
  },
  getAlltestNumber(options) {
    console.log(options)
    let that = this
    that.setData({
      navH: app.globalData.navHeight,
      courseId: options.courseId,
      chapter_id:options.chapter_id
    })
    let option = {
      problem_course_id: options.courseId
    }
    console.log(option)
    app.encryption({//初始化加载函数获取所有题目ID
      url: api.test.createTestExamData,
      data: option,
      method: 'POST',
      dataType: "json",
      success: function (res) {
        console.log(res)
        let list = res.info.list
        let totalNum;
        let single_problem = list.single_problem || []; //单选
        let fill_problem = list.fill_problem || [];//填空
        let judge_problem = list.judge_problem || [];//判断
        let multiple_problem = list.multiple_problem || [];//多选
        let scenes_problem = list.scenes_problem || [];//场景
        let short_problem = list.short_problem || [];//简答
        totalNum = single_problem.length + multiple_problem.length + scenes_problem.length + judge_problem.length + fill_problem.length + short_problem.length;
        //合并数组
        let alltestID = [];
        alltestID = alltestID.concat(single_problem).concat(multiple_problem).concat(scenes_problem).concat(judge_problem).concat(fill_problem).concat(short_problem);
        that.setData({
          all_current_no: totalNum,
          exam_log_id: res.info.exam_log_id,
          alltestID: alltestID
        });
        //查找当前题目下标
        that.findcurIndex(alltestID[0], alltestID, 0);
        //开始加载题目详情
        that.initText(alltestID[0]);
      }
    }
    )
  },
  findcurIndex(curId, allId, start = 1) {
    console.log(allId)
    let curIndexNumber = allId.findIndex((value) => value == curId)
    curIndexNumber += 1
    let icon = 'tabItems[0].icon'
    this.setData({
      curIndexNumber: curIndexNumber
    })
    // 边界值判断
    if (curIndexNumber <= 1 && start) {
      wx.showToast({
        title: '已经是第一题了',
        icon: 'none',
        duration: 2000
      })
      curIndexNumber = 1
      this.setData({
        [icon]: 'https://minproimg.oss-cn-hangzhou.aliyuncs.com/images/cards (4).png',
      })
    } else if (curIndexNumber >= this.data.all_current_no) {
      wx.showToast({
        title: '已经是最后一道题了',
        icon: 'none',
        duration: 2000
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
    let randerTitle = that.data.randerTitle
    console.log(randerTitle)
    let option = {
      problem_course_id: this.data.courseId,
      problem_id: this.data.curID,
      log_id: this.data.exam_log_id,
      mode: 2,
      answer: answer,
    }
    console.log(option)
    app.encryption({//初始化加载函数获取所有题目ID
      url: api.test.submitAnswer,
      data: option,
      method: 'POST',
      dataType: "json",
      success: function (res) {
        console.log(res)
        //提交完答案，清空多选题答案数组,并查看是否已缓存，并改变其中的标识符（hasSubmit）
        if (res.data.code == 200) {
          console.log(randerTitle)
          if (randerTitle.problem_type == 6) {
            console.log(curID)
            randerTitle.child[curID].hasSubmit = true
          }
          randerTitle.hasSubmit = true // 可能会出现先渲染后改变的现象
          that.setData({
            multiselect: '',//场景模式下多选清空
            randerTitle: that.data.randerTitle,//更新渲染文档
            SceneValue:'',//场景模式下填空清空
            shortSceneMap:'',//场景模式下简答清空
            shortMap:'',//简答题清空
            multiselecting:[]
          })
          let curRander = randerTitle;
          let ID = curID;
          let result = that.hasBeenLoad(ID);//检查本地是否已缓存
          if (result == undefined) {  // 未缓存
            that.data.allRender.push(curRander)
            console.log(that.data.allRender)
            return
          } else { //已缓存
            let find = that.data.allRender.findIndex((value) => value.problem_id == ID)
            console.log(that.data.allRender, ID, find)
            that.data.allRender[find].hasSubmit = true
            that.setData({
              allRender: that.data.allRender
            })
          }
        }
      }
     }
    )
  },
  sceneCommon(){
   if (this.data.randerTitle.child[this.data.senceIndex - 1].hasSubmit) { // 表明已提交过答案
     } else {
       console.log(this.data.multiselect,this.data.SceneValue,this.data.shortSceneMap,this.data.randerTitle.child[this.data.senceIndex - 1].option)
      if(this.data.multiselect != ''){
        this.submitAnswer(this.data.multiselect, this.data.senceIndex - 1)
      }else if( this.data.SceneValue != ''){
        this.submitAnswer(this.data.SceneValue, this.data.senceIndex - 1)
      }else if(this.data.shortSceneMap != ''){
        this.submitAnswer(this.data.shortSceneMap, this.data.senceIndex - 1)
      }else if (this.data.randerTitle.child[this.data.senceIndex - 1].option != ''){
        let answer = this.data.randerTitle.child[this.data.senceIndex - 1].option
        this.submitAnswer(answer, this.data.senceIndex - 1)
      }
      }
  },
  bindsenceNext() {
    console.log(this.data.senceIndex, this.data.senceNum) // 点击下一题增加+1
    if (this.data.senceIndex < this.data.senceNum) {
      this.sceneCommon()
      this.setData({
        senceIndex: this.data.senceIndex + 1
      })
    } else {
      this.setData({
        senceIndex: this.data.senceIndex
      })
      wx.showToast({
        title: '已经是最后一道题了',
        icon: 'none',
        duration: 2000
      })
      this.sceneCommon()
    }

    let index = this.data.senceIndex - 1
    let cid = this.data.randerTitle.child[index].problem_id  //获取ID
    this.setData({
      curID: cid
    })
  },
  bindsenceLast() {
    console.log(this.data.senceIndex); // 点击下一题减少-1
    if (this.data.senceIndex <= 1) {
      this.setData({
        senceIndex: 1
      })
      wx.showToast({
        title: '已经是第一道题了',
        icon: 'none',
        duration: 2000
      })
      if (this.data.randerTitle.child[this.data.senceIndex - 1].problem_child_type == 2) {//多选题在此提交答案
        if (this.data.randerTitle.child[this.data.senceIndex - 1].hasSubmit) { // 表明已提交过答案
        } else {
          let multiselect = this.data.multiselect
          this.submitAnswer(multiselect, this.data.senceIndex - 1)
        }
      }
    } else {
      if (this.data.randerTitle.child[this.data.senceIndex - 1].problem_child_type == 2) {//多选题在此提交答案
        if (this.data.randerTitle.child[this.data.senceIndex - 1].hasSubmit) { // 表明已提交过答案
        } else {
          let multiselect = this.data.multiselect
          this.submitAnswer(multiselect, this.data.senceIndex - 1)
        }
      }
      this.setData({
        senceIndex: this.data.senceIndex - 1
      })
    }
    let index = this.data.senceIndex - 1
    let cid = this.data.randerTitle.child[index].problem_id  //获取ID
    this.setData({
      curID: cid
    })
    // this.saveScenceRander(cid) // 缓存
  },
  initText(ID) {  //getProblemDetail，先去查找本地缓存
    let that = this;
    let result = that.hasBeenLoad(ID)
    if (result != undefined) { //发现有数据
      let randerTitle = result;
      that.setData({
        randerTitle: randerTitle,
        ProblemType: randerTitle.problem_type,
        curID: randerTitle.problem_id
      });
    } else {
      let option = {
        problem_id: ID,
      }
      app.encryption({  // 开始加载题目详情
        url: api.test.getProblemDetail,
        data: option,
        method: 'GET',
        dataType: "json",
        success: function (res) {
          console.log(res, res.info.problem_type)
          let randerTitle = app.testWxParse(that, res.info)//初始化并解析第一道题目,默认是从第一道题开始加载渲染
          // 判断是否为场景题，如果为场景题则需要循环child并解析富文本
          if (randerTitle.problem_type == 6) {
            if (randerTitle.child != undefined && randerTitle.child.length > 0) {
              randerTitle.child.forEach((val, index) => {
                val = app.testWxParse(that, val) //将解析后的赋值
              });
            }
            that.setData({
              randerTitle: randerTitle,
              senceNum: randerTitle.child.length,
              senceIndex: 1,
              ProblemType: res.info.problem_type,
              curID: randerTitle.child[0].problem_id
            })
            return
          }
          //判断结束
          that.setData({
            randerTitle: randerTitle,
            ProblemType: res.info.problem_type,
            curID: res.info.problem_id
          })
        }
      })
    }
   
  },
  hasBeenLoad(ID) {
    let hasBeenLoad = this.data.allRender;//本地缓存
    let result = hasBeenLoad.find((value) => value.problem_id == ID);
    return result
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
    wx.navigateBack({
      success: function () {
        beforePage.onLoad(number);
      }
    });
  },
  goback() {
    this.common()
    this.settlementRealTopicResult('你正在进行模拟考试，确定退出吗？')
  },
  onLoad: function (options = {}) {
    let times = new Date().getTime()
    let alltime = options.exam_length * 60 *1000 + times
    // let alltime =  60 *1000 + times
    this.setData({
      targetTime2: alltime,
      moveY: 313,
      chapterName:options.chapterName
    })
    //获取屏幕宽高
    let that = this
    const { windowHeight } = wx.getSystemInfoSync();
    this.data.windowHeight = windowHeight - 127 - 54
    //先去请求所有题目的id，当点击下一题目的时候用id换题目,获取上次的记录答案
    that.getAlltestNumber(options)
  },
  onReady: function () {},
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
  touchSceneEnd(e) {
    let d = this.data;
    let x = e.changedTouches[0].clientX;
    let y = e.changedTouches[0].clientY;
    let direction = app.getTouchData(x, y, d.touchX, d.touchY);
    if (direction == 'left') {
      this.bindsenceNext();
    } else if (direction == 'right') {
      this.bindsenceLast();
    }
  },
  showfillAnswer() {
    if (this.data.activeAnswer == 'activeAnswer') {
      this.setData({
        answerFillImg: 'https://minproimg.oss-cn-hangzhou.aliyuncs.com/images/hideAnswer.png',
        activeFillAnswer: 'defaultAnswer',
        correctFilloption: '',
        multishowFillAny: true
      })
    } else {
      this.setData({
        answerFillImg: 'https://minproimg.oss-cn-hangzhou.aliyuncs.com/images/showAnswer (1).png',
        activeFillAnswer: 'activeAnswer',
        correctFilloption: 'activeoption',
        multishowFillAny: false
      })
    }
  },
  showShortAnswer() {
    if (this.data.activeShortAnswer == 'activeAnswer') {
      this.setData({
        answerShortImg: 'https://minproimg.oss-cn-hangzhou.aliyuncs.com/images/hideAnswer.png',
        activeShortAnswer: 'defaultAnswer',
        correcShorttoption: '',
        multishowShortAny: true
      })
    } else {
      this.setData({
        answerShortImg: 'https://minproimg.oss-cn-hangzhou.aliyuncs.com/images/showAnswer (1).png',
        activeShortAnswer: 'activeAnswer',
        correcShorttoption: 'activeoption',
        multishowShortAny: false
      })
    }
  },
  updateShortValue(event) {
    let value = event.detail.value
    this.data.randerTitle.shortMap = value
    this.setData({
      shortMap: value,
      randerTitle:this.data.randerTitle
    })
  },
  updateSceneValue(event){
    let value = event.detail.value
    this.setData({
      SceneValue: value
    })
  },
  updateShorScenetValue(event){
    let value = event.detail.value
    this.setData({
      shortSceneMap: value
    })
  },
  bindKeyInput(e){
   console.log(e)
   let index = e.target.dataset.index
   let value = e.detail.value
   this.data.fillNewAnswer[index] = value
   this.data.randerTitle.option[index] = value
   this.setData({
    fillNewAnswer:this.data.fillNewAnswer,
    randerTitle:this.data.randerTitle
   })
   console.log(this.data.fillNewAnswer)
  },
  submitPaper(){
    this.settlementRealTopicResult()
  }
});