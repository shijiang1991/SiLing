const app = getApp()
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
    wx.setNavigationBarTitle({ title: '联系我们' });

    var that = this;
    wx.request({
      url: app.globalData.url + 'contactUs/contactUs',
      method: 'get',
      header: {
        'content-type': 'application/json',
      },
      success: function (res) {
        if(res.data.code==200){
         that.setData({
           logo:res.data.data.logo,
           title: res.data.data.title,
           introduce: res.data.data.introduce,
           telephone: res.data.data.telephone,
           workTime: res.data.data.workTime,
           address:res.data.data.address
         })
        }
      },
      fail: function () {
        wx.showToast({
          title: '网络请求失败',
          icon: 'none',
          duration: 1500
        })
      }
    })
    

  },
  btn_phone:function(){
    wx.makePhoneCall({
      phoneNumber: '0769-12345678',
    })
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