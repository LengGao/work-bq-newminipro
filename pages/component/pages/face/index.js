const api = require("../../../../api.js")
const app = getApp();
Page({
  data: {
    isError: false,
    faceText: '检测不到人脸',
  },
  listener: null,
  type: 1,
  isStartRecord: false,
  second: 15,
  onLoad({
    type,
    lesson_id,
    video_time
  }) {
    this.lesson_id = lesson_id
    this.video_time = video_time
    this.type = type
    this.ctx = wx.createCameraContext()
    wx.initFaceDetect()
    this.faceStart()
    if (type == 2) {
      this.getFaceCompareConfig()
    }
  },

  onUnload() {
    this.faceStop()
    wx.stopFaceDetect()
  },
  takePhoto() {
    this.ctx.takePhoto({
      quality: 'high',
      success: (res) => {
        this.setData({
          // src: res.tempImagePath,
          faceText: '认证中'
        })
        this.thirdFaceCompare(res.tempImagePath)
        this.faceStop()
      }
    })
  },
  // 验证照片 
  thirdFaceCompare(filePath) {
    const uuid = wx.getStorageSync('user_info').uuid
    const token = wx.getStorageSync('user_info').token
    wx.uploadFile({
      url: api.video.thirdFaceCompare,
      header: {
        token: token,
        uuid: uuid
      },
      filePath,
      name:'img',
      formData: {
        video_time: this.video_time,
        biz_code: this.bizCode,
        course_video_lesson_id: this.lesson_id
      },
      success: (res) => {
        const data = res.data
        console.log(data)
        this.setData({
          faceText: data.code === 0 ? '人脸认证成功' : '人脸认证失败'
        })
      },
      complete: () => {
        setTimeout(() => {
          wx.navigateBack({
            delta: 1,
          })
        }, 1000);
      }
    });
  },
  // 获取bizcode 
  getFaceCompareConfig() {
    app.encryption({
      url: api.video.getFaceCompareConfig,
      method: "GET",
      data: {
        course_video_lesson_id: this.lesson_id
      },
      success: (res) => {
        console.log(res)
        this.bizCode = res.bizCode
      }
    });
  },
  upload(filePath) {
    const uuid = wx.getStorageSync('user_info').uuid
    const token = wx.getStorageSync('user_info').token
    wx.showLoading()
    wx.uploadFile({
      url: api.video.submitRecordVideoUrl,
      filePath,
      header: {
        token: token,
        uuid: uuid
      },
      name: 'video_file',
      formData: {
        'course_video_lesson_id': this.lesson_id
      },
      success() {
        wx.navigateBack({
          delta: 1,
        })
      },
      complete() {
        wx.hideLoading()
      }
    })
  },
  startRecord() {
    this.ctx.startRecord({
      success: (res) => {
        console.log('startRecord')
      },
      fail: (err) => {
        wx.showModal({
          title: '请确保开启摄像头，麦克风权限',
          showCancel: false,
          confirmText: "去开启",
          success(res) {
            if (res.confirm) {
              wx.openSetting({
                success(res) {}
              })
            }
          }
        })
      }
    })
  },
  faceStop() {
    if (this.listener) {
      this.listener.stop()
      this.listener = null
    }
  },
  throttle(fn, wait = 300) {
    let lastTime = 0
    return function (...args) {
      const currentTime = +new Date()
      if (currentTime - lastTime >= wait) {
        fn.apply(this, args)
        lastTime = currentTime
      }
    }
  },
  faceStart() {
    this.second = 2
    this.faceStop()
    this.listener = this.ctx.onCameraFrame(this.throttle((frame) => {
      // console.log(frame.data instanceof ArrayBuffer, frame.width, frame.height)
      wx.faceDetect({
        frameBuffer: frame.data,
        width: frame.width,
        height: frame.height,
        enablePoint: true,
        enableConf: true,
        enableAngle: true,
        enableMultiFace: true,
        success: (faceData) => {
          let face = faceData.faceInfo[0]
          if (faceData.x == -1 || faceData.y == -1) {
            this.setData({
              faceText: '检测不到人脸'
            })
          }
          if (faceData.faceInfo.length > 1) {
            this.setData({
              faceText: '请保证只有一人'
            })
          } else {
            const {
              pitch,
              roll,
              yaw
            } = face.angleArray || {}
            if (Math.abs(pitch) >= 0.4 || Math.abs(roll) >= 0.2 || Math.abs(yaw) >= 0.2) {
              this.setData({
                faceText: '请平视摄像头'
              })
            } else if (face.confArray.global <= 0.8 || face.confArray.leftEye <= 0.8 || face.confArray.mouth <= 0.8 || face.confArray.nose <= 0.8 || face.confArray.rightEye <= 0.8) {
              this.setData({
                faceText: '请勿遮挡五官'
              })
            } else if(face.detectRect.height>550){
              this.setData({
                faceText: '将人脸放入圈内'
              })
            }
             else {
              if (this.type == 3) {
                if (this.isStartRecord) {
                  return
                }
                this.isStartRecord = true
                this.startRecord()
                this.setData({
                  faceText: `请保持${this.second}s`
                })
                this.faceStop()
                this.timer = setInterval(() => {
                  if (this.second == 0) {
                    this.stopRecord()
                    clearInterval(this.timer)
                    this.timer = null
                    this.isStartRecord = false
                    return
                  }
                  this.second--
                  this.setData({
                    faceText: `请保持${this.second}s`
                  })
                }, 1000);
              } else {
                !this.data.src && this.takePhoto()
              }

            }
          }
        },
        fail: (err) => {
          if (err.x == -1 || err.y == -1) {
            this.setData({
              faceText: '检测不到人脸',
            })
          }
        },
        complete: () => {}
      })
    }))
    this.listener.start()
  },
  stopRecord() {
    this.ctx.stopRecord({
      success: (res) => {
        this.setData({
          src: res.tempThumbPath,
          videoSrc: res.tempVideoPath,
          faceText: `采集成功`
        })
        this.upload(res.tempVideoPath)
      },
      fail: (err) => {
        this.setData({
          faceText: `采集失败`
        })
        this.setData({
          isError: true
        })
      }
    })
  },
  error(e) {
    console.log(e.detail)
  }
})