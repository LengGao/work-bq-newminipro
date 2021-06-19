// commons/wxShare/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
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
    handleCancel(){
      this.hideAnimate(function(){
        this.setData({
          isShow:false
        })
      })
    },
    handlePoster(){
      this.triggerEvent('poster');
      this.handleCancel()
    },
    hideAnimate(callback){
      this.animate('.share-container', [
        { bottom:0, },
        { bottom:'-320rpx', },
        ], 100,callback.bind(this))
      this.animate('.share-mask', [
        { opacity:0.5, },
        { opacity:0, },
        ], 100,callback.bind(this))
    },
    showAnimate(){
      this.animate('.share-container', [
        { bottom:' -320rpx', },
        { bottom:' 0', },
        ], 100)
      this.animate('.share-mask', [
        { opacity:0, },
        { opacity:0.5, },
        ], 100)
    }
  }
})
