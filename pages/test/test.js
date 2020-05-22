var t, app = getApp(), api = require("../../api.js"),
  app = getApp(),
  wxParse = require("../../wxParse/wxParse.js");
Page({
  data: {
    current_no: -1, 
    all_current_no:'0', //当前题目
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
    singleNum:'0',
    multipleNum:'0',
    judgmentNum:'0',
    formId:'',
    tabItems: [
      {
        icon: 'https://minproimg.oss-cn-hangzhou.aliyuncs.com/images/cards (4).png',
        name: '上一题',
        action: 'lastQU',
        class: '',
        id:1
      },
      {
        icon: 'https://minproimg.oss-cn-hangzhou.aliyuncs.com/images/cards (1).png',
        name: '答题卡',
        action: 'cards',
        class: '',
        id:2
      },
      {
        icon: 'https://minproimg.oss-cn-hangzhou.aliyuncs.com/images/weishoucang.png',
        name: '收藏',
        action: 'likes',
        class: '',
        id:3
      },
      {
        icon: 'https://minproimg.oss-cn-hangzhou.aliyuncs.com/images/cards (3).png',
        name: '下一题',
        action: 'nextQU',
        class: '',
        id:4
      }
    ],
    ProblemType:'1',
    answerImg:'https://minproimg.oss-cn-hangzhou.aliyuncs.com/images/hideAnswer.png',
    activeAnswer:'defaultAnswer',
    correctoption:'',
    multishowAny:true,
    multiselect:''
  },
  lastQU() {
    let that = this
    let icon = 'tabItems[2].icon'
    let classes = 'tabItems[2].class'
    let name = 'tabItems[2].name'//以上为收藏按钮数据
    let current_no = that.data.current_no//获取当前标题数
    let allRenders = that.data.allRender//获取所有已经渲染的数据
    console.log(allRenders)
    if(current_no < 1){//如果下标小于等于1则提示当前已经是第一题
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
    current_no = current_no - 1 //获取上一题的下标（局部）
    console.log(current_no)
    if(allRenders[current_no].isCollect && allRenders[current_no].isCollect == '1'){ //已收藏 
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
      console.log(allRenders[current_no])
      if(allRenders[current_no].done){
        that.setData({
          showAny:false
        })
      }else{
        that.setData({
          showAny:true
        })
      }
    this.setData({
      randerTitle: allRenders[current_no],
      current_no: current_no,
      answerImg:'https://minproimg.oss-cn-hangzhou.aliyuncs.com/images/hideAnswer.png',
      activeAnswer:'defaultAnswer',
      correctoption:'',
      multishowAny:true,
      ProblemType:allRenders[current_no].ProblemType
    })
    if(allRenders[current_no].yourAnswer && allRenders[current_no].yourAnswer!= '' ){ //如果改题目已经做过
      that.init(allRenders[current_no].yourAnswer)
  }
  },
  cards() {
    let judgmentNum = JSON.stringify(this.data.judgmentNum)
    let singleNum =JSON.stringify(this.data.singleNum)
    let multipleNum = JSON.stringify(this.data.multipleNum)
    let formId = this.data.formId
    wx.navigateTo({
      url: `../answerCard/answerCard?name=第一章&formId=${ formId }&judgmentNum=${ judgmentNum}&singleNum=${ singleNum }&multipleNum=${ multipleNum }`
    })
  },
  wode(number){
    let that = this
    let allRenders = that.data.allRender//获取所有已经渲染的数据
    console.log(allRenders.length)
    if(number>=allRenders.length){
      wx.showToast({
        title: '不能查看未做题目',
        icon: 'none',
        duration: 2000
       })
     
       return
    }
    if(!allRenders[number].done == true){
        this.setData({
          showAny:true
        })
    }
    this.setData({
      randerTitle: allRenders[number],
      current_no: number,
      ProblemType:allRenders[number].ProblemType
    })
  },
  likes() {
    let that = this
    let icon = 'tabItems[2].icon'
    let classes = 'tabItems[2].class'
    let name = 'tabItems[2].name'
    let current_no = that.data.current_no
    let allRender = that.data.allRender//页面已经渲染的数据集合
    console.log(current_no,allRender)
    if (this.data.tabItems[2].class == 'active') {
      let option = {
        problemId:this.data.randerTitle.ProblemId,
        behavior: 2
      }
      app.encryption({
        url: api.default.makeCollection,
        data: option,
        method: 'POST',
        dataType: "json",
        success: function (res) {
          if (res.data.code == 200) {
            allRender[current_no-1].isCollect = 0
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
          allRender[current_no-1].isCollect = 1
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
    console.log(this.data.current_no,this.data.all_current_no)
    if(this.data.current_no+1 >= this.data.all_current_no){
      wx.showToast({
        title: '已经是最后一题了',
        icon: 'none',
        duration: 2000
       })
      return
    }
    var that = this
    let randerTitle
    let current_no = that.data.current_no + 1
    let curReander = that.data.originTitle[current_no]//获取下一题的原始数据
    let allRender = that.data.allRender//页面已经渲染的数据集合
    console.log(curReander)
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
        showAny: true,//隐藏答案
        ProblemType: randerTitle.ProblemType,//更新题目类型
        answerImg: 'https://minproimg.oss-cn-hangzhou.aliyuncs.com/images/hideAnswer.png',
        activeAnswer: 'defaultAnswer',
        correctoption: '',
        multishowAny: true//
      })
    }else{//如果存在则直接拿取已存在的数据渲染
      let isShow
      randerTitle = allRender[current_no]
      if (randerTitle.done){
        isShow = false //如果当前题目已做，则展示答案
      }else{
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
        current_no: current_no,//更新下标
        allRender: allRender,//更新已经渲染的数据
        ProblemType: randerTitle.ProblemType,//更新题目类型
        answerImg: 'https://minproimg.oss-cn-hangzhou.aliyuncs.com/images/hideAnswer.png',
        activeAnswer: 'defaultAnswer',
        correctoption: '',
        showAny:isShow,
        multishowAny: true//
      })
    }
    if (current_no > 0) {
      let icon = 'tabItems[0].icon'
      this.setData({
        [icon]: 'https://minproimg.oss-cn-hangzhou.aliyuncs.com/images/leftsing.png',
      })
    }
    if( randerTitle.ProblemType == '2' ){
        let options= {
          problemId:randerTitle.ProblemId,
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
    if(randerTitle.yourAnswer && randerTitle.yourAnswer!= '' ){ //如果改题目已经做过
      that.init(randerTitle.yourAnswer)
  }
  },
  //选择答案
  selectAnswer(e) {
    if (!this.data.showAny ) {//如果已选答案，再次点击不在触发
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
    let options= {
      problemId:id,
      answe:option,
      formId:formId,
      rightStatus:rightStatus
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
  multiselectAnswer(e){
    if (!this.data.multishowAny) {
      return
    }
    let option = e.currentTarget.dataset.option;
    let answer = e.currentTarget.dataset.answer;
    let index = e.currentTarget.dataset.index;
    let color = this.data.randerTitle.content[index];
    let id = e.currentTarget.dataset.id;
    console.log(option,answer)
    let multiselect = []
    if(!multiselect.includes(option)){
      multiselect.push(option)
      this.setData({
        multiselect:this.data.multiselect  + option+ ','
      })
    }
    if( answer.includes(option) ){
      color.color = true
      this.setData({
        randerTitle: this.data.randerTitle,
      })
    }else {
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
  showAnswer(){
    if(this.data.activeAnswer == 'activeAnswer'){
      this.setData({
        answerImg:'https://minproimg.oss-cn-hangzhou.aliyuncs.com/images/hideAnswer.png',
        activeAnswer:'defaultAnswer',
        correctoption:'',
        multishowAny:true
      })
    }else{
      this.setData({
        answerImg:'https://minproimg.oss-cn-hangzhou.aliyuncs.com/images/showAnswer (1).png',
        activeAnswer:'activeAnswer',
        correctoption:'activeoption',
        multishowAny:false
      })
    }
  },
  init(answering){
    let options = []
    let rightStatus = 1;
    console.log(answering)
    let randerTitle =this.data.randerTitle
    for(let i of randerTitle.content){
      options.push(i.option)
    }
    console.log(options)
    let option = answering//当前点击选项的option
    let answer = randerTitle.answer;//当前题目的答案
    let index =options.indexOf(answering);//当前点击选项的index
    let color = randerTitle.content[index];//获取当前点击选项的数组
    console.log(index)
    this.setData({
      option: option,//声名点击选项
      showAny: false,//尚未操作前，隐藏答案
    })
    color.color = false//新增当前点击选项的color
    color.err = false//新增当前点击选项的err
    randerTitle.done = true//表明当前题目已做
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
  onLoad: function (options = {}) {
    console.log(options)
    wx.setNavigationBarTitle({
      title: options.name
    })
    var that = this;
    let icon = 'tabItems[2].icon'
    let classes = 'tabItems[2].class'
    let name = 'tabItems[2].name'//以上为获取收藏按钮状态
    let option = {
      courseId: options.courseId,
      chapterId: options.chapter_id
    }//以上为初始化加载参数
    app.encryption({//初始化加载函数获取所有题目
      url: api.default.getProblems,
      data: option,
      method: 'GET',
      dataType: "json",
      success: function (res) {
        console.log(res)
        let curtitle = res.list[0] //声明首次加载的题目
        let curindex = 0 //声明首次加载的下标
        let randerTitle = app.testWxParse(that,res.list[0])//初始化并解析第一道题目,默认是从第一道题开始加载渲染
        that.data.allRender.push(randerTitle)//allRender为所有已经渲染页面的数据集合
        for(let item of res.list.entries()){//遍历所有原始数据并初始化首次加载数据集合
          if( item[1].ProblemId == res.lastProblemId ){//如果发现了此lastProblemId则需要初始化所有之前的题目
              curtitle =  item[1]
              curindex =  item[0]//初始化加载下标
              console.log(curindex)
              randerTitle = app.testWxParse(that,curtitle)//初始化首次加载页面数据
              if(curindex>=1){
                let icon = 'tabItems[0].icon'
                that.setData({
                  [icon]: 'https://minproimg.oss-cn-hangzhou.aliyuncs.com/images/leftsing.png',
                })
              }
              that.data.allRender.length = 0
              for(let i = 0 ; i <= curindex; i ++){
                let randerTitle = app.testWxParse(that,res.list[i])//解析所有已经加载的题目,从第一道题开始
                that.data.allRender.push(randerTitle)//向页面渲染集合推送已做过的题目,
              }   
        }
      }//遍历所有题目并将上一次做过的题目找到，如果此前有记录，则需要把所有做过的题目推送到已经渲染的集合（即要初始化allRender）
        that.setData({
          originTitle: res.list,//为所有原始数据
          randerTitle: randerTitle,//为当前渲染数据
          current_no: curindex,//初始化题目标注
          ProblemType:randerTitle.ProblemType,//表明练习题类型
          all_current_no:res.count,//所有题目的数量
          singleNum:res.singleList,//单选题的数量
          multipleNum:res.multipleLis,//多选题的数量
          judgmentNum:res.judgmentList,//判断题的数量
          formId:res.formId//formid
        })
        if (randerTitle.isCollect == 1) {  //是否已收藏
          that.setData({
            likes: true,
            [icon]: 'https://minproimg.oss-cn-hangzhou.aliyuncs.com/images/yishuangcang (1).png',
            [classes]: 'active',
            [name]: '已收藏'
          })
        }
        if(randerTitle.yourAnswer && randerTitle.yourAnswer!= '' ){
            that.init(randerTitle.yourAnswer)
        }
      },
      fail: function (n) {
        console.log('初始化失败')
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
  }
});