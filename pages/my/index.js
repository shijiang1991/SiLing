// pages/my/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userId: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: '我的',
    })
    wx.showShareMenu({
    //要求小程序返回分享目标信息
      withShareTicket: true
    }); 
  },
  btn_phone: function() {
    wx.makePhoneCall({
      phoneNumber: '15286617894',
    })
  },
  btn_myCoupon: function() {
    wx.navigateTo({
      url: '/pages/my/coupon/index',
    })
  },
  btn_signUp: function() {
    wx.navigateTo({
      url: '/pages/my/signUp/index',
    })
  },
  btn_share:function(){
    
  },
  //微信授权登录
  getUserInfo: function (e) {
    var that = this;
    //发起微信登陆
    wx.login({
      success(res) {
        if (res.code) {
          //发起网络请求
          wx.request({
            url: "https://api.weixin.qq.com/sns/jscode2session?appid=" + app.globalData.appId + "" +
              "&secret=" + app.globalData.appSecret + "&js_code=" + res.code + "&grant_type=authorization_code",
            method: 'get',
            dataType: 'json',
            success: function (resData) {
              var openid = resData.data.openid
              // 保存用户信息到服务端
              wx.request({
                url: app.globalData.url + 'userinfo/wxLogin',
                data: {
                  openIdSmall: openid
                },
                method: "get",
                header: {
                  // 'Authorization': 'Bearer ' + token,
                  'content-type': 'application/json',
                },
                success: function (res) {
                  if (res.data.code === 200) {
                    wx.setStorage({
                      key: 'userId',
                      data: res.data.data.data[0].id,
                      success: function (r) {
                        that.setData({
                          userId: res.data.data.data[0].id
                        });
                        //关闭弹窗登录选择
                        that.setData({
                          showModal: false
                        })
                      }
                    });
                    wx.setStorage({
                      key: 'signName',
                      data: res.data.data.data[0].signName,
                      success: function (r) {
                        that.setData({
                          signName: res.data.data.data[0].signName
                        });
                      }
                    });
                  }
                },
                fail: function (error) {
                  wx.showToast({
                    title: '网络请求错误',
                    icon: 'none',
                    duration: 1500
                  })
                }
              })
            },
            fail(res) {
              console.log('网络请求错误')
            }
          })
        } else {
          console.log('获取code失败！' + res.errMsg)
        }
      }
    })
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