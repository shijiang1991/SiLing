const app = getApp()
var storage = require("../../utils/storage.js");
var toast = require("../../utils/toast.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userId: '',
    islogin: false,
    shareCode:"",
    count:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    wx.setNavigationBarTitle({
      title: '我的',
    })
    wx.showShareMenu({
      //要求小程序返回分享目标信息
      withShareTicket: true
    });
    this.setData({
      userId: wx.getStorageSync("token")
    })
    //查询邀请码 start
    if (wx.getStorageSync("token") != "") {
      wx.request({
        url: app.globalData.url + 'user/shareCode',
        header: {
          "token": wx.getStorageSync('token'),
          "Content-Type": "application/json"
        },
        success: function(res) {
          console.log(res.data)
          that.setData({
            shareCode: res.data.data.shareCode
          })
          wx.request({
            url: app.globalData.url + 'signUp/shareCode',
            data: {
              code: res.data.data.shareCode,
              userId: res.data.data.id
            },
            header: {
              "Content-Type": "application/json"
            },
            success: function(res) {
              that.setData({
                count: res.data.data
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
        },
        fail: function() {
          wx.showToast({
            title: '网络请求失败',
            icon: 'none',
            duration: 1500
          })
        }
      })
    }
    //查询邀请码 end
  },
  btn_phone: function() {
    if (wx.getStorageSync("token") == "") {
      return false;
    }
    wx.makePhoneCall({
      phoneNumber: '15286617894',
    })
  },
  btn_myCoupon: function() {
    if (wx.getStorageSync("token") == "") {
      wx.showToast({
        title: "请先登录！",
        icon: 'none',
        duration: 1500
      })
      return false;
    }
    wx.navigateTo({
      url: '/pages/my/coupon/index',
    })
  },
  //报名信息
  btn_signUp: function() {
    if (wx.getStorageSync("token") == "") {
      wx.showToast({
        title: "请先登录！",
        icon: 'none',
        duration: 1500
      })
      return false;
    }
    //查询报名信息start
    wx.request({
      url: app.globalData.url + 'signUp/signUp',
      header: {
        "token": wx.getStorageSync('token'),
        "Content-Type": "application/json"
      },
      success: function(res) {
        if (res.data.data.data == "") {
          toast.normal("您还没有报名！")
        } else {
          wx.navigateTo({
            url: '/pages/my/signUp/index',
          })
        }
      },
      fail: function() {
        wx.showToast({
          title: '网络请求失败',
          icon: 'none',
          duration: 1500
        })
      }
    })
    //查询报名信息end

  },
  btn_share: function() {
    if (wx.getStorageSync("token") != "") {
       toast.normal("请您先登录!")
       return false;
    }
  },
  //领取抵用卷
  btn_coupon: function() {
    if (wx.getStorageSync("token") == "") {
      wx.showToast({
        title: "请先登录！",
        icon: 'none',
        duration: 1500
      })
      return false;
    }
    //查询报名信息start
    wx.request({
      url: app.globalData.url + 'signUp/signUp',
      header: {
        "token": wx.getStorageSync('token'),
        "Content-Type": "application/json"
      },
      success: function(res) {
        if (res.data.data.data == "") {
          wx.switchTab({
            url: '/pages/signUp/index',
          })
        } else {
          toast.normal("您已领过！")
        }
      },
      fail: function() {
        wx.showToast({
          title: '网络请求失败',
          icon: 'none',
          duration: 1500
        })
      }
    })
    //查询报名信息end
  },
  //微信授权登录
  // getUserInfo: function (e) {
  //   var that = this;
  //   //发起微信登陆
  //   wx.login({
  //     success(res) {
  //       if (res.code) {
  //         //发起网络请求
  //         wx.request({
  //           url: "https://api.weixin.qq.com/sns/jscode2session?appid=" + app.globalData.appId + "" +
  //             "&secret=" + app.globalData.appSecret + "&js_code=" + res.code + "&grant_type=authorization_code",
  //           method: 'get',
  //           dataType: 'json',
  //           success: function (resData) {
  //             var openid = resData.data.openid
  //             // 保存用户信息到服务端
  //             wx.request({
  //               url: app.globalData.url + 'userinfo/wxLogin',
  //               data: {
  //                 openIdSmall: openid
  //               },
  //               method: "get",
  //               header: {
  //                 // 'Authorization': 'Bearer ' + token,
  //                 'content-type': 'application/json',
  //               },
  //               success: function (res) {
  //                 if (res.data.code === 200) {
  //                   wx.setStorage({
  //                     key: 'userId',
  //                     data: res.data.data.data[0].id,
  //                     success: function (r) {
  //                       that.setData({
  //                         userId: res.data.data.data[0].id
  //                       });
  //                       //关闭弹窗登录选择
  //                       that.setData({
  //                         showModal: false
  //                       })
  //                     }
  //                   });
  //                   wx.setStorage({
  //                     key: 'signName',
  //                     data: res.data.data.data[0].signName,
  //                     success: function (r) {
  //                       that.setData({
  //                         signName: res.data.data.data[0].signName
  //                       });
  //                     }
  //                   });
  //                 }
  //               },
  //               fail: function (error) {
  //                 wx.showToast({
  //                   title: '网络请求错误',
  //                   icon: 'none',
  //                   duration: 1500
  //                 })
  //               }
  //             })
  //           },
  //           fail(res) {
  //             console.log('网络请求错误')
  //           }
  //         })
  //       } else {
  //         console.log('获取code失败！' + res.errMsg)
  //       }
  //     }
  //   })
  // },
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

  },
  bindAuthor: function() {
    var $this = this;
    wx.getSetting({
      success(res) {
        console.log("res:", res)
        console.log("所有权限：", res.authSetting)
        console.log("user scope:", res.authSetting['scope.userInfo'])
        if (res.authSetting['scope.userInfo']) {
          // wx.authorize({
          //   scope: 'scope.userInfo',
          //   success() {
          //     // toast.normal("授权成功")
          //     $this.requestlogin()
          //   },
          //   fail(err) {
          //     console.log("错误信息：")
          //     console.log("授权失败err:", err)
          //     // toast.normal("授权失败,你已拒绝登录1" + JSON.stringify(err))
          //     toast.normal(JSON.stringify(err))
          //   }
          // })
          $this.requestlogin()
          // test test2
        } else {
          toast.normal("授权失败,你已拒绝登录")
          console.log("授权失败err1:")
        }
      }
    })
  },
  requestlogin() {
    var $this = this
    toast.showLoading('正在登录')
    wx.login({
      success(res) {
        wx.request({
          url: app.globalData.url + '/user/login/small?code=' + res.code,
          method: 'get',
          success: function(res) {
            console.log("res 登录返回信息：", res)
            console.log("res 登录返回信息：", res.data.code)
            console.log("res 登录返回信息：", res.data.data.token)
            if (res.data.code == 200) {
              storage.save("token", res.data.data.token)
              $this.setData({
                userId: wx.getStorageSync("token"),
              })
              //查询邀请码 start
              if (wx.getStorageSync("token") != "") {
                wx.request({
                  url: app.globalData.url + 'user/shareCode',
                  header: {
                    "token": wx.getStorageSync('token'),
                    "Content-Type": "application/json"
                  },
                  success: function(res) {
                    $this.setData({
                      shareCode: res.data.data.shareCode
                    })
                    wx.request({
                      url: app.globalData.url + 'signUp/shareCode',
                      data: {
                        code: res.data.data.shareCode,
                        userId: res.data.data.id
                      },
                      header: {
                        "Content-Type": "application/json"
                      },
                      success: function(res) {
                        $this.setData({
                          count: res.data.data
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
                  },
                  fail: function() {
                    wx.showToast({
                      title: '网络请求失败',
                      icon: 'none',
                      duration: 1500
                    })
                  }
                })
              }
              //查询邀请码 end
            } else {
              toast.normal(res.data.message)
            }
            toast.hideLoading()
          },
          fail: function() {
            toast.normal("网络请求失败")
          }
        })
      }
    })


    // wx.login({
    //   success(res) {
    //     http.post("", http.loginbywxsmall + res.code, "", function (res2) {
    //       toast.hideLoading();
    //       if (res2.data.code == 200) {
    //         toast.normal("登录成功")
    //         storage.save("token", res2.data.data.token)
    //         wx.switchTab({
    //           url: '/pages/index/index'
    //         })
    //       } else {
    //         toast.normal(res2.data.message)
    //       }
    //     })
    //   }
    // })
  }
})