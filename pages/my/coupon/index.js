const app = getApp()
var storage = require("../../../utils/storage.js");
var toast = require("../../../utils/toast.js");
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
        if (res.data.code == 200) {
          var temp = [];
          for (var index in res.data.data.data) {
            temp.push(res.data.data.data[index]);
          }
          that.setData({
            list: temp,
            count: res.data.data.data.length
          })
        } else if (res.data.code == 401){
          that.requestlogin()
        }else{
          toast.normal("网络错误")
        }

      },
      fail: function() {
        toast.normal("请重新提交")
      }
    })
    //查询所有优惠劵end
  },
  list:function(){

  },
  requestlogin() {
    console.log('获取用户授权情况')
    var $this = this
    toast.showLoading('正在重新登录...')
    wx.login({
      success(res) {
        wx.request({
          url: app.globalData.url + '/user/login/small?code=' + res.code,
          method: 'get',
          success: function (res) {
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
                  success: function (res) {
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
                      success: function (res) {
                        toast.hideLoading()
                        $this.setData({
                          count: res.data.data
                        })
                      },
                      fail: function () {
                        toast.normal("网络请求失败")
                      }
                    })
                  },
                  fail: function () {
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
          fail: function () {
            toast.normal("网络请求失败")
          }
        })
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