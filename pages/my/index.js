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
    //查询是否过期
    if (!this.isTokenExipre()) {
      console.log("查询是否过期")
      this.requestlogin();
    }
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
              toast.normal("网络错误")
            }
          })
        },
        fail: function() {
          toast.normal("网络错误")
        }
      })
    }
    //查询邀请码 end
  },
  btn_phone: function() {
    if (wx.getStorageSync("token") == "") {
      return false;
    }
    wx.request({
      url: app.globalData.url + 'contactUs/contactUs',
      method: 'get',
      header: {
        'content-type': 'application/json',
      },
      success: function (res) {
        if (res.data.code == 200) {
          wx.makePhoneCall({
            phoneNumber: res.data.data.telephone,
          })
        }
      },
      fail: function () {
        toast.normal("网络错误")
      }
    })
  },
  btn_myCoupon: function() {
    if (!this.isTokenExipre()){
     this.requestlogin();
    }else{
      wx.navigateTo({
        url: '/pages/my/coupon/index',
      }) 
    }
   
  },
  /**
   * token 是否在有效期内
   * false 已过期，true未过期
   */
  isTokenExipre(){
    let that = this
    if (wx.getStorageSync("token") == "") {
      storage.save("token", "")
      storage.save("expire", 0)
      storage.save("logintime", 0)
      that.setData({
        userId: ""
      })
      return false;
    }
    let logintime = wx.getStorageSync("logintime")
    let expire = wx.getStorageSync("expire")
    let currenttime = new Date().getTime();
    if (currenttime - parseInt(logintime) > parseInt(expire)) {
      storage.save("token", "")
      storage.save("expire", 0)
      storage.save("logintime", 0)
      that.setData({
        userId: "",
      })
      return false
    } else {
      return true
    }
  },
  //报名信息
  btn_signUp: function() {
    if (!this.isTokenExipre()) {
      toast.normal("登录已过期，请重新登录！")
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
        toast.normal("网络错误")
      }
    })
    //查询报名信息end

  },
  btn_share: function() {
    if (!this.isTokenExipre()) {
      toast.normal("登录已过期，请重新登录！")
      return
    }
  },
  //领取抵用卷
  btn_coupon: function() {
    let that=this
    if (!this.isTokenExipre()) {
      toast.normal("登录已过期，请重新登录！")
      return
    }
    //查询报名信息start
    wx.request({
      url: app.globalData.url + 'signUp/signUp',
      header: {
        "token": wx.getStorageSync('token'),
        "Content-Type": "application/json"
      },
      success: function(res) {
        // 登录已过期
        console.log('res:', res)
        console.log(1)
        console.log(res.data.code)
        console.log(res.data.data.code)
        if(res.data.code==401){
          console.log(2)
          storage.save("token", "")
          that.setData({
            userId: "",
          })
          console.log(3)
          toast.normal("登录已过期，请重新登录")
          return
        }

        if (res.data.data.data == "") {
          wx.switchTab({
            url: '/pages/signUp/index',
          })
        } else {
          toast.normal("您已领过！")
        }
      },
      fail: function() {
        toast.normal("网络错误")
      }
    })
    //查询报名信息end
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
            console.log("res 登录返回信息 token：", res.data.data.token)
            console.log("res 登录返回信息 expire：", res.data.data.expire)
            if (res.data.code == 200) {
              storage.save("token", res.data.data.token)
              $this.setData({
                userId: wx.getStorageSync("token"),
              })
              // token有效时间
              storage.save("expire", res.data.data.expire*59*1000)
              storage.save("logintime", new Date().getTime())

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
                        toast.normal("网络请求失败")
                      }
                    })
                  },
                  fail: function() {
                    toast.normal("网络请求失败")
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