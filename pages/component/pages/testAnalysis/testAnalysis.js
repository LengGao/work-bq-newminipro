var t, e = getApp(), a = require("../../../../api.js"), app = getApp(), wxParse = require("../../../../wxParse/wxParse.js");

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
    test_time: 30,
    paper_id: 0,
    //xin
    is_collect: 0,
    limited_time: '不限时',
    p: 1,
    //是否禁止请求
    isDisable: false,


  },
  // 选择答案
  selectAnswer(e) {
    let d = this.data;
    let answer = e.currentTarget.dataset.option;
    let index = e.currentTarget.dataset.index;
    let subject = d.question_list[d.current_no];

    // 已选
    if (subject.disabled) return;

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
      subject.userAnswer = answer;
      subject.disabled = 1;
      subject.problem_content[index].select = !subject.problem_content[index].select;
      this.setData({
        question_list: d.question_list
      })
      this.submitAnswer(subject, () => {

      });
    }
    console.log(e);
    console.log(d.question_list[d.current_no]);

  },
  // 多选确定
  selectType() {
    let d = this.data;

    let subject = d.question_list[d.current_no];
    if (subject.disabled) return;

    subject.disabled = 1;

    this.setData({
      question_list: d.question_list
    })

    this.submitAnswer(subject, () => {

    });
  },
  // 选择题目
  selectQuestion(e) {
    let d = this.data;
    this.setData({
      current_no: e.currentTarget.dataset.index,
      flag: 1
    });
    this.init();
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
    let d = this.data;
    t.data.current_no == t.data.question_list.length - 1 ? wx.showToast({
      title: "只有这么多了",
      icon: "none"
    }) : t.setData({
      current_no: t.data.current_no + 1
    });
    if (d.question_list[d.current_no]) {
      app.testQuestionCom(this);
    }
    this.init();
  },
  preQuestion: function () {
    var t = this;
    let d = this.data;
    0 == t.data.current_no ? wx.showToast({
      title: "已经是第一题了",
      icon: "none"
    }) : t.setData({
      current_no: t.data.current_no - 1
    });
    if (d.question_list[d.current_no]) {
      app.testQuestionCom(this);
    }
    this.init();
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
    this.setData({
      id: options.id,
      type: options.type || 'practice'
    })
    this.init();

  },
  init() {
    if (this.data.type == 'examination') {
      this.getPaperDetail();
    } else if (this.data.type == 'practice') {
      this.getPaperDetail2();
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
  // onShareAppMessage: function() {
  //     var t = wx.getStorageSync("user_info");
  //     return {
  //         path: "/pages/test/test?paper_id=" + this.data.paper_id + "&pid=" + t.user_id
  //     };
  // },
  // 数据
  getPaperDetail: function () {
    if (this.data.isDisable) {
      return;
    }
    var t = this;
    let d = this.data;
    wx.showLoading({
      title: "加载中"
    }), e.request({
      url: a.paper.myExamAnalyse,
      method: "POST",
      data: {
        paper_id: d.id,
        page: d.p,
        type: 3,
      },
      success: function (e) {
        console.log(e);
        if (0 == e.code) {

          if (e.data.record.total == 0) {
            wx.showModal({
              title: '提示',
              content: '您还没有做过任何题目哦！',
              showCancel: false,
              success() {
                wx.navigateBack({
                  delta: 1
                })
              }
            })
            return;
          }

          let result = e.data.info.result;
          if (result.length == 0) {
            t.setData({
              isDisable: true
            })

            return;
          }



          wx.setNavigationBarTitle({
            title: '题目解析:' + e.data.record.title
          })

          result.forEach((val) => {
            val.problem_content.forEach((v) => {
              if (val.problem_answer.includes(v.option)) {
                v.select = 1
              }
            })
          })

          d.question_list = d.question_list.concat(result);
          d.question_list[d.current_no] = app.testWxParse(t, d.question_list[d.current_no]);

          t.setData({
            question_list: d.question_list,
            p: ++d.p,
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
  // 数据2222
  getPaperDetail2: function () {

    if (this.data.isDisable) {
      return;
    }
    var t = this;
    let d = this.data;
    wx.showLoading({
      title: "加载中"
    }), e.request({
      url: a.paper.myProblemAnalyse,
      method: "POST",
      data: {
        course_id: d.id,
        p: d.p,
        type: 3,
      },
      success: function (e) {
        console.log(e);
        if (0 == e.code) {

          if (e.data.record.total == 0) {
            wx.showModal({
              title: '提示',
              content: '您还没有做过任何题目哦！',
              showCancel: false,
              success() {
                wx.navigateBack({
                  delta: 1
                })
              }
            })
            return;
          }

          let result = e.data.Info.result;
          if (result.length == 0) {
            t.setData({
              isDisable: true
            })
            return;
          }



          wx.setNavigationBarTitle({
            title: '题目解析:' + e.data.record.title
          })
          console.log(result);

          result.forEach((val) => {
            val.problem_content.forEach((v) => {
              if (val.problem_answer.includes(v.option)) {
                v.select = 1
              }
            })
          })

          d.question_list = d.question_list.concat(result);
          d.question_list[d.current_no] = app.testWxParse(t, d.question_list[d.current_no]);

          t.setData({
            question_list: d.question_list,
            p: ++d.p,
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
  submitPaper: function () {
    wx.navigateTo({
      url: "../test-report/test-report"
    });
    return;
    var t = this;
    wx.showLoading({
      title: "加载中"
    });
    var n = t.data.question_list, o = [];
    for (var s in n) o[s] = {
      id: n[s].id,
      checked: n[s].checked ? n[s].checked : "",
      answer: n[s].answer
    };
    e.request({
      url: a.paper.submit_paper,
      method: "POST",
      data: {
        paper_data: JSON.stringify(o),
        startdo_time: t.data.startdo_time
      },
      success: function (t) {
        0 == t.errcode && wx.navigateTo({
          url: "../test-report/test-report?exam_id=" + t.data
        });
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
      }), t = setTimeout(e.setCountDown, 1e3);
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