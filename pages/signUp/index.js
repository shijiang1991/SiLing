const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [
      { name: '0', value: '男' },
      { name: '1', value: '女', checked: 'true' },
    ],
    array: ['计算机应用专业', '会计专业', '电子技术应用专业', '老年人服务与管理专业'],
    index: 0
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({ title: '报名' });
    wx.getStorage({
      key: 'token',
      success: function(res) {
         
      },
    })
  },
  formSubmit:function(e){
    if(e.detail.value.name==""){
      wx.showToast({
        title:"姓名不能为空！",
        icon: 'none',
        duration: 1500
      })
      return false;
    }
    if (e.detail.value.phone == "") {
      wx.showToast({
        title: "电话不能为空！",
        icon: 'none',
        duration: 1500
      })
      return false;
    }
    if (e.detail.value.phone != "") {
      var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
      if (!myreg.test(e.detail.value.phone)) {
        wx.showToast({
          title: '手机格式有误！',
          icon: 'none',
          duration: 1500
        })
        return false;
      }
    }
    wx.request({
      url: app.globalData.url + 'signUp/add',
      data: {
        name: e.detail.value.name,
        gender: e.detail.value.gender,
        phone: e.detail.value.phone,
        major: e.detail.value.major,
        shareNum: e.detail.value.shareNum,
        remark: e.detail.value.remark
      },
      method: "post",
      header: {
        "Content-Type": "application/json",
      },
      success: function (res) {
        console.log(res.data)
        if (res.data.code == 200) {
          wx.showToast({
            title: '提交成功,我们会尽快与您联系！',
            icon: 'success',
            duration: 1500
          })
        } else {
          wx.showToast({
            title: res.data.message,
            icon: 'none',
            duration: 1500
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