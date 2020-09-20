var t, app = getApp(), api = require("../../../../api.js"), app = getApp();
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
    noexist: false,
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
    ProblemType: '',
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
    wrongAnswer: false,
    curID:'',
    curIndexNumber:'',
    practice_id:'',
    alltestID:[],
    answer_location:"",
    is_lock:''
  },
  lastQU() {
    let that = this
    //首先获取下一题的ID
    let curindex = that.data.curIndexNumber - 1 // 当前下标
    let curId = that.data.alltestID[curindex - 1] // 获取上一题ID
    console.log(curindex,curId)
    let num = that.findcurIndex(curId,that.data.alltestID);
    if(num  <= 1){
      return
    }
     // 开启缓存，并去重,传入当前数据，而非下一题数据
     let curID = this.data.curID
     that.saveRander(curID)
    //开始加载题目详情
    that.initText(curId);
  },
  cards() {
    let name = this.data.chapterName
    let practice_id = this.data.practice_id
    wx.navigateTo({
      url: `../answerCard/answerCard?name=${name}&practice_id=${practice_id}`
    })
  },
  checkout(problem_id) {
    let that = this
    that.findcurIndex(problem_id,that.data.alltestID);
    //开始加载题目详情
    that.initText(problem_id);
  },
  likes() {
    let that = this;
    let icon = 'tabItems[2].icon';
    let classes = 'tabItems[2].class';
    let name = 'tabItems[2].name';
    let curid = that.data.curID;
    console.log(curid)
    if (this.data.tabItems[2].class == 'active') { //取消按钮，应更新缓存状态
      let option = {
        problem_id: this.data.curID
      }
      app.encryption({
        url: api.test.removeCollection,
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
            })
            wx.showToast({
              title: '收藏已取消',
              icon: 'none',
              duration: 2000
            })
           let randerTitle = that.data.allRender.find((value) => value.problem_id == curid);
           if(randerTitle != undefined){
            randerTitle.isCollect = 0;
           }else{
             that.data.randerTitle.isCollect = 0
           }
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
      problem_id: this.data.curID
    }
    app.encryption({
      url: api.test.insertCollection,
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
          })
          wx.showToast({
            title: '收藏成功',
            icon: 'none',
            duration: 2000
          })
          let randerTitle = that.data.allRender.find((value) => value.problem_id == curid)
          console.log(randerTitle)
          if(randerTitle != undefined){
            randerTitle.isCollect = 1;
           }else{
             that.data.randerTitle.isCollect = 1
           }
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
  },
  nextQU() {
    let that = this
     // 开启缓存，并去重,传入当前数据，而非下一题数据
    let curID = this.data.curID
    that.saveRander(curID)
    //首先获取下一题的ID
    let curindex = that.data.curIndexNumber - 1; // 当前下标
    console.log(curindex)
    if(curindex + 1  > that.data.all_current_no -1 ){
      return
    }
    let curId = that.data.alltestID[curindex + 1]; // 获取下一题ID
    that.findcurIndex(curId,that.data.alltestID);
    //开始加载题目详情
   
    that.initText(curId);
  },
  saveRander(ID){
    let that = this
    let curRander = this.data.randerTitle;
    let result = that.hasBeenLoad(ID);//检查本地是否已缓存
    if(result == undefined){  // 未缓存
      this.data.allRender.push(curRander)
      console.log(this.data.allRender)
      return
    }
  },
  //选择答案
  selectAnswer(e) {
    if (this.data.randerTitle.done) {//如果已选答案，再次点击不再触发
      return
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
    if(this.data.ProblemType == 1){ // 单选题直接提交答案
      console.log('进入单选题模式')
      this.submitAnswer(option)
      return
    }
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
  getAlltestNumber(options,is_lock){
    console.log(options,is_lock)
    let that = this 
    that.setData({
      chapterName: options.name,
      navH: app.globalData.navHeight,
      courseId: options.courseId,
      is_lock: is_lock
    })
    let option = {
      problem_course_id: options.courseId,
    }
    console.log(option)
    app.encryption({//初始化加载函数获取所有题目ID
      url: api.test.createPunchData,
      data: option,
      method: 'POST',
      dataType: "json",
      success: function (res) {
        console.log(res)
       let list = res.list
       let totalNum ;
       let single_problem = list.single_problem;
       let fill_problem = list.fill_problem;
       let judge_problem = list.judge_problem;
       let multiple_problem = list.multiple_problem;
       let scenes_problem = list.scenes_problem;
       let short_problem = list.short_problem;
       totalNum  = single_problem.length + fill_problem.length + judge_problem.length + multiple_problem.length + scenes_problem.length + short_problem.length;
       //合并数组
       let alltestID = [];
       alltestID = alltestID.concat(single_problem).concat(multiple_problem).concat(judge_problem).concat(scenes_problem).concat(fill_problem).concat(short_problem);
       that.setData({
        all_current_no:totalNum,
        practice_id:res.practice_id,
        alltestID:alltestID,
        answer_location:res.answer_location
       });
       
       //开始渲染题目,首先检测缓存是否有当前题目ID，如果有则直接提取作，没有则请求接口获取题目详情
       //查找当前题目下标
       that.findcurIndex(alltestID[0],alltestID,0);
       //开始加载题目详情
       that.initText(alltestID[0]);
      }}
      )
  },
  findcurIndex(curId,allId,start = 1){
    console.log(allId)
    let curIndexNumber = allId.findIndex((value) => value == curId)
    curIndexNumber += 1
    let icon = 'tabItems[0].icon'
    this.setData({
      curIndexNumber:curIndexNumber
    })
    // 边界值判断
    if( curIndexNumber <= 1 && start) {
      wx.showToast({
        title: '已经是第一题了',
        icon: 'none',
        duration: 2000
      })
      curIndexNumber = 1
      this.setData({
        [icon]: 'https://minproimg.oss-cn-hangzhou.aliyuncs.com/images/cards (4).png',
      })
    }else if (curIndexNumber >= this.data.all_current_no){
      wx.showToast({
        title: '已经是最后一道题了',
        icon: 'none',
        duration: 2000
      })
      curIndexNumber = this.data.all_current_no
    }else{
      this.setData({
        [icon]: 'https://minproimg.oss-cn-hangzhou.aliyuncs.com/images/leftsing.png',
      })
    }
    console.log(curIndexNumber)
    return curIndexNumber
  },
  submitAnswer(answer){
    let option = {
      problem_course_id:this.data.courseId,
      problem_id:this.data.curID,
      log_id:this.data.practice_id,
      mode:4,
      answer:answer,
    }
    console.log(option)
    app.encryption({//初始化加载函数获取所有题目ID
      url: api.test.submitAnswer,
      data: option,
      method: 'POST',
      dataType: "json",
      success: function (res) {
        console.log(res)
      }})
  },
  initText(ID){  //getProblemDetail，先去查找本地缓存
    let that = this;
    let result = that.hasBeenLoad(ID)
    if(result != undefined){ //发现有数据
      let randerTitle = result;
      that.collectOrNot(randerTitle);
      that.setData({
        randerTitle:randerTitle,
        ProblemType:randerTitle.problem_type,
        curID:randerTitle.problem_id
      });
    }else{
      let option = {
        problem_id:ID,
      }
      app.encryption({  // 开始加载题目详情
        url: api.test.getProblemDetail,
        data: option,
        method: 'GET',
        dataType: "json",
        success: function (res) {
          console.log(res,res.info.problem_type)
          let randerTitle = app.testWxParse(that, res.info)//初始化并解析第一道题目,默认是从第一道题开始加载渲染
          // 判断当前题目是否已收藏
          that.collectOrNot(randerTitle)
          //判断结束
          that.setData({
            randerTitle:randerTitle,
            ProblemType:res.info.problem_type,
            curID:res.info.problem_id
          })
        }
      })
    }
  },
  hasBeenLoad(ID){
    let hasBeenLoad = this.data.allRender;//本地缓存
    let result = hasBeenLoad.find((value) => value.problem_id == ID);
    return result
  },
  collectOrNot(randerTitle){
    let that = this
    let icon = 'tabItems[2].icon'
    let classes = 'tabItems[2].class'
    let name = 'tabItems[2].name'//以上为获取收藏按钮状态
    console.log(randerTitle.isCollect,typeof(randerTitle.isCollect))
    if (randerTitle.isCollect != 'undefined' && randerTitle.isCollect == 1) {  //是否已收藏
      that.setData({
        likes: true,
        [icon]: 'https://minproimg.oss-cn-hangzhou.aliyuncs.com/images/yishuangcang (1).png',
        [classes]: 'active',
        [name]: '已收藏'
      })
    }else{
      that.setData({
        likes: true,
        [icon]: 'https://minproimg.oss-cn-hangzhou.aliyuncs.com/images/weishoucang.png',
        [classes]: '',
        [name]: '收藏'
      })
    }
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
    let that = this
    wx.showModal({
      title: '提示',
      content: '你正在进行章节练习，是否保存当前做题记录？',
      showCancel: true,//是否显示取消按钮
      cancelText: "不保存",//默认是“取消”
      cancelColor: '#333333',//取消文字的颜色
      confirmText: "保存",//默认是“确定”
      confirmColor: '#199FFF',//确定文字的颜色
      success: function (res) {
        let is_lock
        if (res.cancel) {
          is_lock  = 0
          wx.showLoading({
            title: '正在清除进度...',
          })
          //点击取消,默认隐藏弹框
        } else {
          is_lock  = 1
          wx.showLoading({
            title: '正在保存进度...',
          })
        }
        let option = {
          practice_id: that.data.practice_id,
          is_lock:is_lock
        }
        console.log(is_lock)
        console.log(option)
        app.encryption({
          url: api.test.archivePracticeData,
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
            let courseId = that.data.courseId
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
    })
  },
  onLoad: function (options = {}) {
    this.getAlltestNumber(options)
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