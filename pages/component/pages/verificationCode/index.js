const api = require("../../../../api.js")
const app = getApp();
Page({
  data: {
    codeSrc: '',
  },
  onLoad({
    lesson_id,
    video_time
  }) {
    this.lesson_id = lesson_id
    this.video_time = video_time
    this.getVerificationCode()
  },
  // 获取验证码
  getVerificationCode() {
    app.encryption({
      url: api.video.getVerificationCode,
      method: "GET",
      data: {
        course_video_lesson_id: this.lesson_id
      },
      success: (res) => {
        this.bizCode = res.bizCode
        this.setData({
          codeSrc: res.verificationImagePath
        })
        if(res.code !== 0){
          wx.navigateBack({
            delta: 1,
          })
        }
      }
    });
  },
  // 校验验证码
  submitVerificationCode() {
    if (!this.inputValue || this.inputValue.length < 4) {
      wx.showToast({
        title: '请输入正确的验证码',
        icon:"none"
      })
      return
    }
    app.encryption({
      url: api.video.submitVerificationCode,
      method: "post",
      data: {
        biz_code: this.bizCode,
        video_time: this.video_time,
        verification_code: this.inputValue
      },
      success: (res) => {
        wx.navigateBack({
          delta: 1,
        })
      }
    });
  },
  handleCodeInput(e) {
    console.log(e.detail)
    this.inputValue = e.detail.value
  },
})