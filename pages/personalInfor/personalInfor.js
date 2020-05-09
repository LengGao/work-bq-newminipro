// pages/personalInfor/personalInfor.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value1: '',
    value2: '',
    value3: '',
    images: [],
    backimages: [],
    idcardimages: [],
    idcardimage: [],
    personalimages: [],//个人证件照片
    graduationimages: [],//毕业照
    socins: [],//社保卡
    permit: [],//居住证
    permitback:[]
  },
  realName(e) {
    console.log(e)
  },
  idcardimages(e) {
    wx.chooseImage({
      count: 3,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: res => {
        var that = this
        const images = this.data.idcardimages.concat(res.tempFilePaths)
        this.setData({
          idcardimages: images.length <= 3 ? images : images.slice(0, 3)
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
  removeidcardImage(e) {
    const idx = e.target.dataset.idx
    console.log(e, this.data.images.splice(idx, 1))
    this.setData({
      idcardimages: this.data.images.splice(idx, 1)
    })
  },
  idcardimage(e) {
    wx.chooseImage({
      count: 3,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: res => {
        var that = this
        const idcardimage = this.data.idcardimage.concat(res.tempFilePaths)
        this.setData({
          idcardimage: idcardimage.length <= 3 ? idcardimage : idcardimage.slice(0, 3)
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
  removeidcardImages(e) {
    const idx = e.target.dataset.idx
    console.log(e, this.data.idcardimage.splice(idx, 1))
    this.setData({
      idcardimage: this.data.idcardimage.splice(idx, 1)
    })
  },
  idcardimage(e) {
    wx.chooseImage({
      count: 3,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: res => {
        var that = this
        const idcardimage = this.data.idcardimage.concat(res.tempFilePaths)
        this.setData({
          idcardimage: idcardimage.length <= 3 ? idcardimage : idcardimage.slice(0, 3)
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
  personalimages(e) {
    wx.chooseImage({
      count: 3,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: res => {
        var that = this
        const personalimages = this.data.personalimages.concat(res.tempFilePaths)
        this.setData({
          personalimages: personalimages.length <= 3 ? personalimages : personalimages.slice(0, 3)
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
  removeidcardImages(e) {
    const idx = e.target.dataset.idx
    console.log(e, this.data.idcardimage.splice(idx, 1))
    this.setData({
      idcardimage: this.data.idcardimage.splice(idx, 1)
    })
  },
  removepersonalImage(e) {
    const idx = e.target.dataset.idx
    console.log(e, this.data.personalimages.splice(idx, 1))
    this.setData({
      personalimages: this.data.personalimages.splice(idx, 1)
    })
  },
  graduationimages(e) {
    wx.chooseImage({
      count: 3,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: res => {
        var that = this
        const graduationimages = this.data.graduationimages.concat(res.tempFilePaths)
        this.setData({
          graduationimages: graduationimages.length <= 3 ? graduationimages : personalimages.slice(0, 3)
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
  removepersonalImage(e) {
    const idx = e.target.dataset.idx
    console.log(e, this.data.personalimages.splice(idx, 1))
    this.setData({
      personalimages: this.data.personalimages.splice(idx, 1)
    })
  },
  socins(e) {
    wx.chooseImage({
      count: 3,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: res => {
        var that = this
        const socins = this.data.socins.concat(res.tempFilePaths)
        this.setData({
          socins: socins.length <= 3 ? socins : socins.slice(0, 3)
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
  removesocinsImage(e) {
    const idx = e.target.dataset.idx
    console.log(e, this.data.socins.splice(idx, 1))
    this.setData({
      socins: this.data.socins.splice(idx, 1)
    })
  },
  removegraduationImage(e) {
    const idx = e.target.dataset.idx
    console.log(e, this.data.graduationimages.splice(idx, 1))
    this.setData({
      graduationimages: this.data.graduationimages.splice(idx, 1)
    })
  },
  choosebackImage(e) {
    wx.chooseImage({
      count: 3,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: res => {
        var that = this
        const backimages = this.data.backimages.concat(res.tempFilePaths)
        this.setData({
          backimages: backimages.length <= 3 ? backimages : backimages.slice(0, 3)
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
  removebackImage(e) {
    const idx = e.target.dataset.idx
    console.log(e, this.data.backimages.splice(idx, 1))
    this.setData({
      backimages: this.data.backimages.splice(idx, 1)
    })
  },
  choosepermitImages(){
    wx.chooseImage({
      count: 3,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: res => {
        var that = this
        const permit = this.data.permit.concat(res.tempFilePaths)
        this.setData({
          permit: permit.length <= 3 ? permit : permit.slice(0, 3)
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
  removepermitImage(e) {
    const idx = e.target.dataset.idx
    console.log(e, this.data.permit.splice(idx, 1))
    this.setData({
      permit: this.data.permit.splice(idx, 1)
    })
  },
  choosepermitbackImages(e){
    wx.chooseImage({
      count: 3,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: res => {
        var that = this
        const permitback = this.data.permitback.concat(res.tempFilePaths)
        this.setData({
          permitback: permitback.length <= 3 ? permitback : permitback.slice(0, 3)
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
  removepermitbackImage(e){
    const idx = e.target.dataset.idx
    console.log(e, this.data.permitback.splice(idx, 1))
    this.setData({
      permitback: this.data.permitback.splice(idx, 1)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})