const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
     list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that=this;
    wx.setNavigationBarTitle({
      title: '我的抵用卷',
    })
    //查询所有优惠劵start
    wx.request({
      url: app.globalData.url + 'couponRecord/list',
      header: {
        "token": wx.getStorageSync('token'),
        "Content-Type": "application/json"
      },
      success: function(res) { 
        var temp = [];
        for (var index in res.data.data.data) {
          temp.push(res.data.data.data[index]);
        }
        that.setData({
          list: temp,
          count: res.data.data.data.length
        })
      },
      fail: function() {
        wx.showToast({
          title: '网络请求失败',
          icon: 'none',
          duration: 1500
        })
      }
    })
    //查询所有优惠劵end
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})