// pages/problem-detail/problem-detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    biaoti: '',
    content: '',
    array: [
      {
        name: '找不到已经购买的课程?',
        id: 0,
        content: [
          {
            con: '1、进入"东培学堂"小程序,点击底部菜单栏"我的中心",找到购买记录'
          },
          {
            con: '2、点击进入"购买记录",查看已支付的、待支付或已取消的订单。'
          },
          {
            con: '3、点击订单,查看订单详情。'
          }
        ]
      },
      {
        name: '手机听课出现卡顿怎么办?',
        id: 1,
        content: [
          {
            con: '1、首先检查自己所处的网络环境是否正常,可以用其他网页或者APP测试一下网络,如果网络不正常,请调试网络;'
          },
          {
            con: '2、如果网络正常，请检一下自己的微信版本是否是最新版本,如果不是,请同学更新至最新版本;'
          },
          {
            con: '3、如果已经是最新版本,请同学描述下是什么场景下出现卡顿情况,我们会及时反馈给技术解决问题'
          }
        ]
      },
      {
        name: '能用电脑上课吗?',
        id: 2,
        content: [
          {
            con: '方案一：您可以通过电脑浏览器登陆网址http://www.beiqujy.com/即可进入"东培学堂"官方网页。'
          },
          {
            con: '方案二：您可以登陆电脑微信,进入"北区教育"微信公众号,点击公众号底部菜单栏"东培学堂"按钮即可进入课程页面。'
          }
        ]
      },
      {
        name: '发生退款情况如何处理?',
        id: 3,
        content: [
          {
            con: '学员再订单付款完成后有任何的疑问及退款需求,可直接与招生老师练习,双方自行协商处理。'
          }
        ]
      }
    ]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    console.log(this.data.array)
    for (let items of this.data.array) {
      if (items.id == options.id) {
        this.setData({
          biaoti: items.name,
          content: items.content
        })
      }
    }
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
  // onShareAppMessage: function () {

  // }
})