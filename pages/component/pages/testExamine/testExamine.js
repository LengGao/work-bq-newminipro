var t, e = getApp(), a = require("../../../../api.js"), app = getApp();

Page({
  data: {
    current_no: 0,  //当前题目
    exam_id: 1,
    question_list: [],
    question_no: 1,
    test_anwser: [],
    indicatorDots: !1,
    autoplay1: !1,
    interval1: 500,
    duration: 200,
    startdo_time: 0,
    flag: !0,
    pusher: !1,
    test_time: 300,
    paper_id: 0,
    //xin
    is_collect: 0,
    limited_time: '',
    ExamRecordId: '',


  },
  radioChange: function (t) {
    var e = this;
    console.log(t), console.log("radio发生change事件，携带value值为：", t.currentTarget.dataset.key);
    var a = e.data.question_list, n = e.data.test_anwser, o = t.currentTarget.dataset.key, s = t.currentTarget.dataset.index;
    n.push({
      value: o,
      no: a[s].question_number
    }), a[s].answer.length > 1 ? a[s].checked ? -1 == a[s].checked.indexOf(o) ? a[s].checked.push(o) : splice(a[s].checked.indexOf(o), 1, a[s].checked) : (a[s].checked = [],
      a[s].checked.push(o)) : a[s].checked = [o], this.setData({
        test_anwser: n,
        seleted: "选中的value：" + o,
        question_list: a
      }), s < e.data.question_list.length - 1 && 1 == a[s].answer.length && setTimeout(function () {
        e.setData({
          current_no: s + 1
        });
      }, 500), s == e.data.question_list.length - 1 && wx.showToast({
        title: "只有这么多了",
        icon: "none"
      });
  },
  // 选择答案
  selectAnswer(e) {
    let d = this.data;
    let answer = e.currentTarget.dataset.option;
    let index = e.currentTarget.dataset.index;
    let subject = d.question_list[d.current_no];

    // 已选
    // if (subject.disabled)return;  

    if (subject.problem_type == 2) {
      // 多选
      let arr = [];
      subject.problem_content[index].select = !subject.problem_content[index].select;
      console.log(subject.problem_content);
      subject.problem_content.forEach((val) => {
        if (val.select) {
          arr.push(val.option);
        }
      })
      subject.userAnswer = arr.join(',') + ',';

      this.setData({
        question_list: d.question_list
      })
    } else {
      subject.problem_content.forEach((v) => {
        v.select = 0;
      })

      subject.userAnswer = answer;
      subject.disabled = 1;
      subject.problem_content[index].select = !subject.problem_content[index].select;
      this.setData({
        question_list: d.question_list
      })
      this.nextQuestion();

    }
    console.log(e);
    console.log(d.question_list[d.current_no]);

  },
  // 多选确定
  selectType() {
    let d = this.data;

    let subject = d.question_list[d.current_no];
    // if (subject.disabled) return;

    subject.disabled = 1;

    this.setData({
      question_list: d.question_list
    })
    this.nextQuestion();

  },
  // 选择题目
  selectQuestion(e) {
    this.setData({
      current_no: e.currentTarget.dataset.index,
      flag: 1
    });
    let d = this.data;
    if (d.question_list[d.current_no]) {
      app.testQuestionCom(this);
    }
  },
  // 提交答案
  submitAnswer(obj, fn) {
    let d = this.data;
    e.request({
      url: a.paper.doUserPracticeProblemLog,
      method: "POST",
      data: {
        problem_id: obj.id,
        chapter_id: obj.chapter_id,
        user_answer: obj.userAnswer,
      },
      success: function (e) {
        if (0 == e.code) {

          fn && fn();
        }

      },
      fail: function (t) {
        wx.showModal({
          title: "警告",
          content: t.msg,
          showCancel: !1
        });
      },
      complete: function () {
        wx.hideLoading();
      }
    });
  },
  nextQuestion: function () {
    var t = this;
    if (t.data.current_no == t.data.question_list.length - 1) {
      wx.showToast({
        title: "只有这么多了",
        icon: "none"
      })
    } else {
      t.setData({
        current_no: t.data.current_no + 1
      });
    }
    let d = this.data;
    if (d.question_list[d.current_no]) {
      app.testQuestionCom(this);
    }

  },
  preQuestion: function () {
    var t = this;
    0 == t.data.current_no ? wx.showToast({
      title: "已经是第一题了",
      icon: "none"
    }) : t.setData({
      current_no: t.data.current_no - 1
    });
    let d = this.data;
    if (d.question_list[d.current_no]) {
      app.testQuestionCom(this);
    }
  },
  currentChange: function (t) {
    this.setData({
      current_no: t.detail.current
    });
  },
  toggleShare: function () {
    this.data.pusher;
    this.setData({
      pusher: !this.data.pusher
    });
  },
  showcardpop: function () {
    this.setData({
      flag: !1
    });
  },
  hidecardpop: function () {
    this.setData({
      flag: !0
    });
  },
  onLoad: function (options = {}) {

    // 默认值改
    this.setData({
      id: options.id
    })
    this.getPaperDetail();
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
  onShareAppMessage: function () {
    var t = wx.getStorageSync("user_info");
    return {
      path: "../test/test?paper_id=" + this.data.paper_id + "&pid=" + t.user_id
    };
  },
  // 数据
  getPaperDetail: function () {
    var t = this;
    let d = this.data;
    wx.showLoading({
      title: "加载中"
    }), e.request({
      url: a.paper.startExam,
      method: "POST",
      data: {
        paper_id: d.id,
      },
      success: function (e) {
        console.log(e);
        if (0 == e.code) {
          wx.setNavigationBarTitle({
            title: e.data.record.name,
          })

          d.question_list = e.data.problemList;
          d.question_list[d.current_no] = app.testWxParse(t, d.question_list[d.current_no]);

          t.setData({
            question_list: d.question_list,
            ExamRecordId: e.data.ExamRecordId,
            test_time: e.data.record.limited_time * 60,
          })

          t.setCountDown()

        }

      },
      fail: function (t) {
        wx.showModal({
          title: "警告",
          content: t.msg,
          showCancel: !1
        });
      },
      complete: function () {
        wx.hideLoading();
      }
    });
  },
  // 是否交卷
  isSubmitPaper() {
    let self = this;
    wx.showModal({
      title: '提示',
      content: '确定交卷吗？',
      success(res) {
        if (res.confirm) {
          self.submitPaper();
        }
      }
    })
  },
  // 交卷
  submitPaper: function () {

    var t = this;
    let d = this.data;
    wx.showLoading({
      title: "加载中"
    });

    let user_answerList = d.question_list.map(val => {
      return val.userAnswer
    })
    // console.log(d.question_list);
    // console.log(user_answerList);

    e.request({
      url: a.paper.doUserPaperProblemLog,
      method: "POST",
      contentType: 'application/json',
      data: {
        paper_id: d.id,
        problemList: d.question_list,
        user_answerList,
        id: d.ExamRecordId,
      },
      success: function (t) {
        if (0 == t.code) {
          wx.showModal({
            title: '提示',
            content: t.msg,
            showCancel: !1,
            success() {
              wx.redirectTo({
                url: "../myExamine/myExamine"
              });
            }
          })
        }

      },
      fail: function (t) {
        wx.showModal({
          title: "警告",
          content: t.msg,
          showCancel: !1
        });
      },
      complete: function () {
        wx.hideLoading();
      }
    });
  },
  collect: function () {
    var t = this;
    wx.showLoading({
      title: "加载中"
    });
    t.data.is_collect;
    e.request({
      url: a.paper.collect_paper,
      method: "POST",
      data: {
        paper_id: t.data.paper_id
      },
      success: function (e) {
        0 == e.errcode && (1 == t.data.is_collect ? (t.setData({
          is_collect: !1
        }), wx.showToast({
          title: "取消收藏"
        })) : (t.setData({
          is_collect: !0
        }), wx.showToast({
          title: "收藏成功"
        })));
      },
      fail: function (t) {
        wx.showModal({
          title: "警告",
          content: t.errmsg,
          showCancel: !1
        });
      },
      complete: function () {
        wx.hideLoading();
      }
    });
  },
  setCountDown: function () {
    var e = this, a = e.data.test_time;

    if ((a -= 1) > 0) {
      var n = e.getFormat(a), o = n.hh + ":" + n.mm + ":" + n.ss;
      e.setData({
        test_time: a,
        formatTime: n,
        countDown: o
      }), t = setTimeout(e.setCountDown, 1000);
    } else wx.showToast({
      title: "考试时间到"
    }), e.submitPaper();
  },
  getFormat: function (t) {
    var e = parseInt(t), a = 0, n = 0;
    return e > 60 && (a = parseInt(e / 60), e = parseInt(e % 60), a > 60 && (n = parseInt(a / 60),
      a = parseInt(a % 60))), e = e > 9 ? e : "0" + e, a = a > 9 ? a : "0" + a, n = n > 9 ? n : "0" + n,
    {
      ss: e,
      mm: a,
      hh: n
    };
  },
  // 获取题目目录
  getTopQuestion() {
    let d = this.data, self = this;
    console.log(d.total_problem)
    console.log(d.question_list2.length)

    if (d.total_problem > d.question_list2.length) {
      let num = d.total_problem - d.question_list2.length;
      let question_list2 = [];

      if (num >= d.question_num) {
        question_list2 = new Array(d.question_num)
      } else {
        question_list2 = new Array(num)
      }

      d.question_list2 = d.question_list2.concat(question_list2);

      if (d.question_list2.length > d.question_list.length) {
        let nu = d.question_list2.length - d.question_list.length;
        let num2 = question_list2.slice(0, nu);
        d.question_list = d.question_list.concat(num2)
      }

      this.setData({
        question_list2: d.question_list2,
        question_list: d.question_list,
      })
    }

    wx.showLoading({
      title: "加载中",
      mask: true
    })
    setTimeout(() => {
      wx.hideLoading();
    }, 800)

  },
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
      this.nextQuestion();
    } else if (direction == 'right') {

      this.preQuestion();
    }
  },
});