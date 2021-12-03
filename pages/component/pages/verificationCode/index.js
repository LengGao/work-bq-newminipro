const api = require("../../../../api.js")
const app = getApp();
Page({
  data: {
    codeSrc: '',
  },
  onLoad({
    lesson_id,
    video_time,
    strict,
    bizCode,
    codeSrc
  }) {
    this.strict = strict
    console.log('strict',strict)
    this.lesson_id = lesson_id
    this.bizCode = bizCode
    this.video_time = video_time
    this.setData({
      codeSrc
    })
    wx.removeStorageSync('faceSuccess')
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
        course_video_lesson_id: this.lesson_id,
        verification_code: this.inputValue
      },
      success: (res) => {
        console.log(res)
        if(res.code != 0 && this.strict == 1){
          wx.showToast({
            title: '验证码错误',
            icon:'error'
          })
        }else{
          wx.setStorageSync('faceSuccess', 1)
          wx.navigateBack({
            delta: 1,
          })
        }
      }
    });
  },
  handleCodeInput(e) {
    console.log(e.detail)
    this.inputValue = e.detail.value
    if( this.inputValue.length === 4){
      this.submitVerificationCode()
    }
  },
})