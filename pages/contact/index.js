const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    markers: [{
      iconPath: "/resources/others.png",
      id: 0,
      latitude: 28.1001683300,
      longitude: 112.9946422600,
      width: 50,
      height: 50
    }],
    polyline: [{
      points: [{
        longitude: 28.1001683300,
        latitude: 112.9946422600
      }, {
          longitude:28.1001683300,
          latitude: 112.9946422600
      }],
      color: "#FF0000DD",
      width: 2,
      dottedLine: true
    }],
    controls: [{
      id: 1,
      iconPath: '/resources/location.png',
      position: {
        left: 0,
        top: 300 - 50,
        width: 50,
        height: 50
      },
      clickable: true
    }]
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
  btn_phone:function(e){
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.phone,
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