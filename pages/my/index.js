// pages/my/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
     userId:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '我的',
    })
  },
  btn_phone:function(){
    wx.makePhoneCall({
      phoneNumber: '15286617894',
    })
  },
  btn_myCoupon:function(){
    wx.navigateTo({
      url: '/pages/my/coupon/index',
    })
  },
  btn_signUp:function(){
    wx.navigateTo({
      url: '/pages/my/signUp/index',
    })
  },
  btn_share:function(){
    
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