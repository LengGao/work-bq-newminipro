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
    test_time: 30,
    paper_id: 0,
    //xin
    is_collect: 0,
    limited_time: '不限时',

    // 新
    page: 1,
    playedNum: 0, // 做对的题目数

  },
  isGetAll: true,
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
      let select = false;
      subject.problem_content.forEach((val) => {
        if (val.select) {
          select = true;
        }
      })
      if (select) return;

      subject.userAnswer = answer;
      subject.problem_content[index].select = !subject.problem_content[index].select;

      this.submitAnswer(subject, () => {
        subject.disabled = 1;

        this.setData({
          question_list: d.question_list,
        })
      }, () => {
        if (subject.disabled != 1) {
          subject.problem_content.forEach((val) => {
            val.select = false;
          })
        }

      });
    }


  },
  // 多选确定
  selectType() {
    let d = this.data;

    let subject = d.question_list[d.current_no];
    if (subject.disabled) return;

    this.submitAnswer(subject, () => {
      subject.disabled = 1;
      this.setData({
        question_list: d.question_list
      })
    });
  },
  // 选择题目
  selectQuestion(e) {
    this.setData({
      current_no: e.currentTarget.dataset.index,
      flag: 1
    });
    let d = this.data;
    // !d.question_list[d.current_no].problem_stem ? this.getProblem() : wxParse.wxParse("content", "html", d.question_list[d.current_no].problem_stem, this, 5);
    !d.question_list[d.current_no].problem_stem ? this.getProblem() : '';
    d.current_no == d.question_list.length - 1 && this.isGetAll && this.getIdArr();

  },
  // 提交答案
  submitAnswer(obj, fn, fn2) {
    let self = this;
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
        fn2 && fn2();
      }
    });
  },
  // 下一题
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
      let d = this.data;
      !d.question_list[d.current_no].problem_stem ? this.getProblem() : '';
      d.current_no == d.question_list.length - 1 && this.isGetAll && this.getIdArr();

    }
  },
  // 上一题
  preQuestion: function () {
    var t = this;
    if (0 == t.data.current_no) {
      wx.showToast({
        title: "已经是第一题了",
        icon: "none"
      })
    } else {
      t.setData({
        current_no: t.data.current_no - 1
      })
      let d = this.data;
      !d.question_list[d.current_no].problem_stem ? this.getProblem() : '';
      d.current_no == d.question_list.length - 1 && this.isGetAll && this.getIdArr();
    }

  },
  // 滑动
  currentChange: function (t) {
    console.log('滑动');
    this.setData({
      current_no: t.detail.current
    });
    let d = this.data;

    !d.question_list[d.current_no].problem_stem ? this.getProblem() : '';
    d.current_no == d.question_list.length - 1 && this.isGetAll && this.getIdArr();
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
      chapter_id: options.chapter_id,
    })

    this.getIdArr();
  },
  // 获取id数组 一页获取100题
  getIdArr() {
    let self = this, d = this.data;

    // 是否继续加载
    if (!self.isGetAll) return;

    wx.showLoading({
      title: "加载中"
    });
    e.request({
      url: a.course.getAllCollectionId,
      method: "GET",
      data: {
        course_id: d.id,
        p: d.page,
        playedNum: d.playedNum,
      },
      success: function (e) {
        console.log(e);

        if (0 == e.code) {

          // 没有题目则后退
          if (e.data.practiceProblemList.length == 0 && d.page == 1) {
            wx.showModal({
              title: '提示',
              content: '您还没有收藏题目！',
              showCancel: false,
              success() {
                wx.navigateBack({
                  delta: 1
                })
              }
            })
            return;
          }

          wx.setNavigationBarTitle({
            title: '藏题本:' + e.data.problemInfo.title
          })

          self.setData({
            question_list: d.question_list.concat(e.data.practiceProblemList),
            page: ++d.page,
          })
          self.isGetAll = e.data.practiceProblemList.length >= 100;
          self.getProblem();

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
  //获取单个题目
  getProblem() {
    let self = this, d = this.data;
    // console.log(d.question_list[d.current_no].id);
    // console.log(d.question_list);
    wx.showLoading({
      title: "加载中"
    });
    e.request({
      url: a.course.getProblemInfo,
      method: "GET",
      data: {
        problemId: d.question_list[d.current_no].id
      },
      success: function (e) {
        console.log(e);

        if (0 == e.code) {

          d.question_list[d.current_no] = app.testWxParse(self, e.data);

          self.setData({
            question_list: d.question_list
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
    var t = this;
    let d = this.data;
    wx.showLoading({
      title: "加载中"
    }), e.request({
      url: a.paper.question_list,
      method: "POST",
      data: {
        course_id: d.id,
        chapter_id: d.chapter_id,
      },
      success: function (e) {
        console.log(e);

        if (0 == e.code) {
          let plist = e.data.practiceProblemList;

          // 没有题目则后退
          if (plist.position == 0 && !plist.problem) {
            wx.showModal({
              title: '提示',
              content: '您还没有收藏题目！',
              showCancel: false,
              success() {
                wx.navigateBack({
                  delta: 1
                })
              }
            })
            return;
          }


          wx.setNavigationBarTitle({
            title: plist.record.title
          })

          let question_list = new Array(plist.record.total_problem);
          question_list.fill({})

          question_list[plist.position] = plist.problem;

          t.setData({
            question_list,
            current_no: plist.position,
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
  // 数据 获取下一题
  getPracticeProblem: function () {
    var t = this;
    let d = this.data;
    wx.showLoading({
      title: "加载中"
    }), e.request({
      url: a.paper.getPracticeProblem,
      method: "POST",
      data: {
        course_id: d.id,
        chapter_id: d.chapter_id,
        p: d.current_no + 1,
      },
      success: function (e) {
        console.log(e);

        if (0 == e.code) {
          let plist = e.data.practiceProblemList;

          d.question_list[d.current_no] = plist[0];

          t.setData({
            question_list: d.question_list,
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
  // 藏题本
  falseCountCollection: function (isP) {
    var t = this;
    let d = this.data;
    wx.showLoading({
      title: "加载中"
    }), e.request({
      url: a.paper.falseCountCollection,
      method: "POST",
      data: {
        course_id: d.id,
        p: d.current_no + 1,
      },
      success: function (e) {
        console.log(e);
        if (0 == e.code) {

          let plist = e.data.practiceProblemList;

          if (isP) {
            d.question_list[d.current_no] = plist.problem[0];
            t.setData({
              question_list: d.question_list,
            })
          } else {

            // 没有题目则后退
            if (!plist.problem[0]) {
              wx.showModal({
                title: '提示',
                content: '你还没有做错过的题目哦！',
                showCancel: false,
                success() {
                  wx.navigateBack({
                    delta: 1
                  })
                }
              })
              return;
            }

            wx.setNavigationBarTitle({
              title: '藏题本：' + plist.record.title
            })

            let question_list = new Array(plist.record.total_problem);
            question_list.fill({})

            question_list[0] = plist.problem[0];

            t.setData({
              question_list,
            })
          }



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
  // 收藏
  doCollect() {
    let self = this;
    let d = this.data;
    let current = d.question_list[d.current_no];

    wx.showLoading({
      title: "加载中"
    });

    if (current.isCollect) {
      e.request({
        url: a.course.cancelCollection,
        method: "POST",
        data: {
          course_id: d.id,
          problem_id: current.id,
        },
        success: function (e) {
          console.log(e);

          if (0 == e.code) {
            wx.showToast({
              title: '取消收藏成功！',
              icon: 'none'
            })

            current.isCollect = !current.isCollect;
            self.setData({
              question_list: d.question_list,
              playedNum: ++d.playedNum,
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
    } else {
      e.request({
        url: a.course.collectProblem,
        method: "POST",
        data: {
          course_id: d.id,
          problem_id: current.id,
        },
        success: function (e) {
          console.log(e);

          if (0 == e.code) {
            wx.showToast({
              title: '收藏成功！',
            })

            current.isCollect = !current.isCollect;
            self.setData({
              question_list: d.question_list
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
    }

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