Component({
  /**
   * 组件的属性列表
   */
  properties: {
    url:{
      type:String,
      value:''
    },
    isShow:{
      type:Boolean,
      value:false,
      observer: function(newVal){
          newVal && this.showAnimate()
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    showAnimate(){
      this.animate('.poster-container', [
        { opacity:0},
        { opacity:1},
        ], 200)
    },
    handleSaveImg(){
      wx.showLoading({
        title: '保存中...'
      })
      wx.downloadFile({
        url: this.data.url,
        success:(res)=>{
          wx.saveImageToPhotosAlbum({
            filePath: res.tempFilePath,
            success: ()=>{
              wx.hideLoading()
              wx.showModal({
                title: '提示',
                content: '公开课海报已存入手机相册，赶快分享给好友吧',
                showCancel:false,
              })
            },
            fail:(err)=>{
              wx.hideLoading()
              if (err.errMsg === "saveImageToPhotosAlbum:fail:auth denied" || err.errMsg === "saveImageToPhotosAlbum:fail auth deny") {
                wx.showModal({
                  title: '提示',
                  content: '需要您授权保存相册',
                  showCancel: false,
                  success:()=>{
                    wx.openSetting({
                      success(settingdata) {
                        if (settingdata.authSetting['scope.writePhotosAlbum']) {
                          wx.showModal({
                            title: '提示',
                            content: '获取权限成功,再次点击图片即可保存',
                            showCancel: false,
                          })
                        } else {
                          wx.showModal({
                            title: '提示',
                            content: '获取权限失败，将无法保存到相册哦~',
                            showCancel: false,
                          })
                        }
                      },
                      fail(failData) {
                      },
                      complete(finishData) {
                      }
                    })
                  }
                })
              }
            }
          })
        }
      })
    },
    handleCancel(){
      this.setData({
        isShow:false
      })
    },
    handlePoster(){
      this.triggerEvent('poster');
      this.handleCancel()
    },
    hanldImgLoad(){
      wx.hideLoading()
    }
  }
})
