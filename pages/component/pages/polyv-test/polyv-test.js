// pages/component//pages/polyv-test/polyv-test.js
//引用polyvlive.js
import plv from '../../../../lib/polyv-sdk/index.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const optionss = {
      channelId: '2066621', // 频道ID
      openId: 'oT1IQvz-Wt3dM6Dhv0oeEwKZdKqw', // 用户openId
      userName: 'oT1IQvz', // 用户名
      avatarUrl: 'https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIictBAcjdcyt6LibpjW3o1OHJyuk1kzQMibeZp5qWNAQnGSyJjqicuoSrgW9nrL3ViaUENy1IicOn7hfvQ/132', // 用户头像
      userid:"31762"//2.0.0及以上版本的demo需要使用userid设置学员唯一id
    };
    plv.init(optionss);

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
    plv.destroy();

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