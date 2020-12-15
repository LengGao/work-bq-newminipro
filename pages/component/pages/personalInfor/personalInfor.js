import api from '../../api'
let app = getApp();
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
    permitback:[]//
  },
  upload(data){
    console.log(data)
    let that = this
    let uuid = wx.getStorageSync("user_info").uuid
    let token = wx.getStorageSync("user_info").token
    wx.request({
      url:api.default.upload,
      header: {
        token:token,
        uuid:uuid
      },
      data:{
        base_img: data.img
      },
      method:'POST',
      dataType: "json",
      success:function(res){
        console.log(res.data.data.param.img)
        let haha = data.type
        let option = {
          [haha]:res.data.data.param.img
        }
        console.log(option)
        app.encryption({
          url: api.default.userident,
          method: "POST",
          data: option,
          success: function (res) {
            console.log(res)
        },
          fail: function (t) {
            return reject()
          },
          complete: function () {
    
          }
        })
      },
      fail:function(res){
      }
    })
  },
  idcardimages(e) {
    let that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: res => {
        const idcardimage = that.data.idcardimages.concat(res.tempFilePaths)
        if(idcardimage[0] == '')
        {
          idcardimage.splice(0,1)
        }
        that.setData({
          idcardimages: idcardimage
        })
        wx.getFileSystemManager().readFile({
          filePath: res.tempFilePaths[0], //选择图片返回的相对路径
          encoding: 'base64', //编码格式
          success: res => { //成功的回调
            console.log(res)
            that.upload({
              img: 'data:image/png;base64,' + res.data,
              type:'id_card_positive'
            })
          }
        })
      }
    })
    console.log(this.data.idcardimages)
  },
  handleImagePreview: function(t) {
    var a = t.target.dataset.idx, e = this.data.idcardimages;
    wx.previewImage({
        current: e[a],
        urls: e
    });
},
handleImagePreviewback:function(t){
  var a = t.target.dataset.idx, e = this.data.idcardimage;
  wx.previewImage({
      current: e[a],
      urls: e
  });
},
  removeidcardImage(e) {
    const idx = e.target.dataset.idx
    console.log(e, this.data.images.splice(idx, 1))
    this.setData({
      idcardimages: this.data.images.splice(idx, 1)
    })
  },
  idcardimage(e) {
    let that = this
    wx.chooseImage({
      count: 3,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: res => {
        const idcardimage = that.data.idcardimage.concat(res.tempFilePaths)
        if(idcardimage[0] == '')
        {
          idcardimage.splice(0,1)
        }
        that.setData({
          idcardimage: idcardimage
        })
        wx.getFileSystemManager().readFile({
          filePath: res.tempFilePaths[0], //选择图片返回的相对路径
          encoding: 'base64', //编码格式
          success: res => { //成功的回调
            console.log(res.data)
            that.upload({
              img: 'data:image/png;base64,' + res.data,
              type:'id_card_side'
            })
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
  personalimages(e) {
    let that = this
    wx.chooseImage({
      count: 3,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: res => {
        const personalimages = that.data.personalimages.concat(res.tempFilePaths)
        if(personalimages[0] == '')
        {
          personalimages.splice(0,1)
        }
        that.setData({
          personalimages: personalimages
        })
        that.setData({
          personalimages: personalimages.concat(res.tempFilePaths)
        })
        wx.getFileSystemManager().readFile({
          filePath: res.tempFilePaths[0], //选择图片返回的相对路径
          encoding: 'base64', //编码格式
          success: res => { //成功的回调
            console.log(res.data)
            that.upload({
              img: 'data:image/png;base64,' + res.data,
              type:'head_sticker'
            })
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
    let that = this
    wx.chooseImage({
      count: 3,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: res => {
        const graduationimages = that.data.graduationimages.concat(res.tempFilePaths)
        if(graduationimages[0] == '')
        {
          graduationimages.splice(0,1)
        }
        that.setData({
          graduationimages: graduationimages
        })
        wx.getFileSystemManager().readFile({
          filePath: res.tempFilePaths[0], //选择图片返回的相对路径
          encoding: 'base64', //编码格式
          success: res => { //成功的回调
            console.log(res.data)
            that.upload({
              img: 'data:image/png;base64,' + res.data,
              type:'diploma'
            })
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
    let that = this
    wx.chooseImage({
      count: 3,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: res => {
        const socins = that.data.socins.concat(res.tempFilePaths)
        console.log(socins[0])
        if(socins[0] == '')
        {
          socins.splice(0,1)
        }
        console.log(socins)
        that.setData({
          socins: socins
        })
       console.log(that.data.socins)
        that.setData({
          socins:  socins.slice(0,socins.length )
        })
        console.log(socins)
        wx.getFileSystemManager().readFile({
          filePath: res.tempFilePaths[0], //选择图片返回的相对路径
          encoding: 'base64', //编码格式
          success: res => { //成功的回调
            console.log(res.data)
            that.upload({
              img: 'data:image/png;base64,' + res.data,
              type:'social_security_card'
            })
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
    let that = this
    wx.chooseImage({
      count: 3,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: res => {
        const backimages = that.data.backimages.concat(res.tempFilePaths)
        console.log(backimages)
        if(backimages[0] == '')
        {
          backimages.splice(0,1)
        }
        that.setData({
          backimages: backimages
        })
       console.log(that.data.backimages)
        wx.getFileSystemManager().readFile({
          filePath: res.tempFilePaths[0], //选择图片返回的相对路径
          encoding: 'base64', //编码格式
          success: res => { //成功的回调
            console.log(res.data)
            that.upload({
              img: 'data:image/png;base64,' + res.data,
              type:'social_security_card_side'
            })
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
    let that = this
    wx.chooseImage({
      count: 3,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: res => {
        const permit = that.data.permit.concat(res.tempFilePaths)
        console.log(permit)
        if(permit[0] == '')
        {
          permit.splice(0,1)
        }
        that.setData({
          permit: permit
        })
        console.log(permit)
        console.log(that.data.permit)
        wx.getFileSystemManager().readFile({
          filePath: res.tempFilePaths[0], //选择图片返回的相对路径
          encoding: 'base64', //编码格式
          success: res => { //成功的回调
            console.log(res.data)
            that.upload({
              img: 'data:image/png;base64,' + res.data,
              type:'live_permit'
            })
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
    let that = this
    wx.chooseImage({
      count: 3,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: res => {
        const permitback = that.data.permitback.concat(res.tempFilePaths)
        if(permitback[0] == '')
        {
          permitback.splice(0,1)
        }
        that.setData({
          permitback: permitback
        })
        console.log(that.data.permitback)
        wx.getFileSystemManager().readFile({
          filePath: res.tempFilePaths[0], //选择图片返回的相对路径
          encoding: 'base64', //编码格式
          success: res => { //成功的回调
            console.log(res.data)
            that.upload({
              img: 'data:image/png;base64,' + res.data,
              type:'live_permit_side'
            })
          }
        })
        console.log(that.data.permitback)
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
  updateuserident(){
    let that = this
    app.encryption({
      url: api.default.updateuserident,
      method: "GET",
      success: function (res) {
        console.log(res,that.data.idcardimages)
        that.setData({
          idcardimages: that.data.idcardimages.concat(res.id_card_positive),
          idcardimage:  that.data.idcardimages.concat(res.id_card_side),
          personalimages:  that.data.idcardimages.concat(res.head_sticker),
          graduationimages:  that.data.idcardimages.concat(res.diploma),
          socins: that.data.idcardimages.concat(res.social_security_card),
          backimages:that.data.idcardimages.concat(res.social_security_card_side),
          permit:that.data.idcardimages.concat(res.live_permit),
          permitback:that.data.idcardimages.concat(res.live_permit_side),
          value1:res.real_name,
          value2:res.phone_number,
          value3:res.id_card_number
        })
        console.log(that.data.idcardimage)
    },
      fail: function (t) {
        return reject()
      },
      complete: function () {

      }
    })
  },
  realName(e){
    console.log(e.detail.detail.value)
    this.setData({
      value1:e.detail.detail.value
    })
  },
  phoneNum(e){
    console.log(e.detail.detail.value)
    this.setData({
      value2:e.detail.detail.value
    })
  },
  Idcard(e){
    console.log(e.detail.detail.value)
    this.setData({
      value3:e.detail.detail.value
    })
  },
  submitForm(){
    if(this.data.value1=='' || this.data.value2=='' || this.data.value3=='' ){
        wx.showToast({
          title: '请完善个人信息',//提示文字
          duration: 1300,//显示时长
          mask: false,//是否显示透明蒙层，防止触摸穿透，默认：false  
          icon: 'none', //图标，支持"success"、"loading"  
          success: function () { },//接口调用成功
          fail: function () { },  //接口调用失败的回调函数  
          complete: function () { } //接口调用结束的回调函数  
        })
      return
    }
    let option = {
      real_name:this.data.value1,
      phone_number:this.data.value2,
      id_card_number:this.data.value3
    }
    app.encryption({
      url: api.default.userident,
      method: "POST",
      data: option,
      success: function (res) {
        wx.showToast({
          title: '资料上传成功！',//提示文字
          duration: 1300,//显示时长
          mask: false,//是否显示透明蒙层，防止触摸穿透，默认：false  
          icon: 'none', //图标，支持"success"、"loading"  
          success: function () {
            wx.redirectTo({
              url: '../personal-center/personal-center',
            }
            )
           },//接口调用成功
          fail: function () { },  //接口调用失败的回调函数  
          complete: function () { } //接口调用结束的回调函数  
        })
    },
      fail: function (t) {
        return reject()
      },
      complete: function () {

      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.updateuserident()//初始化数据
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