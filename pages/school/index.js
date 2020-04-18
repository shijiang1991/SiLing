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
    var that=this;
    //学校简介内容 start
    wx.request({
      url: app.globalData.url + '/schoolIntroduce/getBannerList',
      method: 'get',
      header: {
        'content-type': 'application/json',
      },
      success: function (res) {
         console.log(res.data.data.data[0].id)
         that.setData({
           picture: res.data.data.data[0].picture,
           name: res.data.data.data[0].name,
           address: res.data.data.data[0].address,
           content: res.data.data.data[0].content.replace(/\<img/gi, '<img style="max-width:100%;height:auto" ')
         })
      },
      fail: function () {
        wx.showToast({
          title: '网络请求失败',
          icon: 'none',
          duration: 1500
        })
      }
    })
    //学校简介内容 end
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