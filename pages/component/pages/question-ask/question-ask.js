
import api from '../../../../api'
const { $Message, $Toast } = require('../../../../utils/iview/base/index');
let app = getApp();

Page({
  data: {
    titles: '请选择建议类型',
    titleCount: 0,
    contentCount: 0,
    title: '',
    content: '',
    images: [],
    baseimage: [],
    visible1: false,
    actions1: [],
    choose: false,
    questionId: [],
    groupId: ''
  },
  onLoad(options) {
    var that = this
    console.log(api.default.proInit)
    app.encryption({
      url: api.default.proInit,
      method: 'GET',
      dataType: "json",
      success: function (res) {
        console.log(res)
        that.setData({
          actions1: res
        })
        console.log(that.data.actions1)
      }
    })

  },
  handleCancel1() {
    this.setData({
      visible1: false
    });
  },
  handleClickItem1({ detail }) {
    const index = detail.index;
    console.log(this.data.actions1[index].questionId)
    let that = this
    let uuid = wx.getStorageSync("user_info").uuid
    let token = wx.getStorageSync("user_info").token
    let titles = that.data.actions1[index].name
    that.setData({
      titles: titles,
      visible1: false,
      choose: true,
    })
    if (that.data.questionId.includes(that.data.actions1[index].questionId)) {
      console.log('已经选择了此类型')
    } else {
      let option = {
        questionId: this.data.actions1[index].questionId,
        type: 'suggestion'
      }
      let promise = new Promise((resolve, reject) => {
        app.encryption({
          url: api.default.quesList,
          data: option,
          method: 'POST',
          dataType: "json",
          success: function (res) {
            console.log(res)
            that.setData({
              questionId: that.data.questionId.concat(that.data.actions1[index].questionId),
              groupId: res.groupId
            })
            resolve(res)
          }, fail: function (n) {
            reject(n)
          }
        })
      })
      promise.catch(err => {
        $Message({
          content: '发生错误！',
          type: 'error'
        });
      })
      promise.then((res) => {
        // $Message({
        //   content: '分组已创建!'+ res.groupId,
        //   type: 'success'
        // });
      });
    }
  },
  selectTap() {
    this.setData({
      // selectShow: !this.data.selectShow,
      visible1: true,
      // triangle:!this.data.triangle
    });
  },
  handleTitleInput(e) {
    console.log(e)
    const value = e.detail.value
    this.setData({
      titleCount: value.length,
      title: value
    })
    // this.data.title = value
    // this.data.titleCount = value.length
    // $digest(this)
  },
  handleContentInput(e) {
    const value = e.detail.value
    this.setData({
      contentCount: value.length,
      content: value
    })
    // this.data.content = value
    // this.data.contentCount = value.length
    // $digest(this)
  },
  chooseImage(e) {
    wx.chooseImage({
      count: 3,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: res => {
        var that = this
        const images = this.data.images.concat(res.tempFilePaths)
        console.log(images)
        this.setData({
          images: images.length <= 3 ? images : images.slice(0, 3)
        })
        wx.getFileSystemManager().readFile({
          filePath: res.tempFilePaths[0], //选择图片返回的相对路径
          encoding: 'base64', //编码格式
          success: res => { //成功的回调
            console.log(res.data)
            that.setData({
              baseimage: that.data.baseimage.concat('data:image/png;base64,' + res.data)
            })
            console.log(that.data.baseimage)
          }
        })
      }
    })
  },
  removeImage(e) {
    const idx = e.target.dataset.idx
    console.log(e, this.data.images.splice(idx, 1))
    this.setData({
      images: this.data.images.splice(idx, 1)
    })
  },
  handleImagePreview(e) {
    const idx = e.target.dataset.idx
    const images = this.data.images
    wx.previewImage({
      current: images[idx],
      urls: images,
    })
  },
  submitForm(e) {
    let that = this
    let uuid = wx.getStorageSync("user_info").uuid
    let token = wx.getStorageSync("user_info").token
    if (!that.data.choose) {
      $Message({
        content: '请选择建议类型',
        type: 'warning'
      });
      return
    } else if (!that.data.content) {
      $Message({
        content: '请填写正文内容',
        type: 'warning'
      });
      return
    }
    let promiseimg = new Promise((resolve, reject) => {
      wx.request({
        url: api.default.newupload,
        header: {
          token: token,
          uuid: uuid
        },
        data: {
          base_img: that.data.baseimage
        },
        method: 'POST',
        dataType: "json",
        success: function (res) {
          console.log(res)
          resolve(res);
        },
        fail: function (res) {
          reject(res)
        }
      })
    });
    promiseimg.catch(err => {
      $Message({
        content: '发生错误！' + err.data.message,
        type: 'error'
      });
    })
    promiseimg.then((res) => {
      let option = {
        groupId: that.data.groupId,
        type: 'suggestion',
        content: that.data.content,
        extend: res.data.data.length == '0' ? JSON.stringify({}) : JSON.stringify(res.data.data.length),
      }
      console.log(option)
      app.encryption({
        url: api.default.foundChat,
        data: option,
        method: 'POST',
        dataType: "json",
        success: function (res) {
          $Toast({
            content: '反馈已上传，感谢你的宝贵意见',
            type: 'success'
          });
          setTimeout(() => {
            wx.navigateBack({
              delta: 2
            })
          }, 2300);

          console.log(res)
        },
        fail: function (n) {
          $Toast({
            content: '反馈出错啦！',
            type: 'error'
          });
          console.log(n)
        }
      })
    });
  }

})