const app = getApp()
var storage = require("../../utils/storage.js");
var toast = require("../../utils/toast.js");
Page({
    
  /**
   * 页面的初始数据
   */
  data: {
    items: [
      { name: '0', value: '男' },
      { name: '1', value: '女', checked: 'true' },
    ],
    array: [],
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
    var that=this;
    wx.setNavigationBarTitle({ title: '报名' });
    //查询所有专业 start
    wx.request({
      url: app.globalData.url + 'professional/list',
      method: "get",
      header: {
        "Content-Type": "application/json"
      },
      success: function (res) {
        var temp =[];
        for (var index in res.data.data.data) {
          temp.push(res.data.data.data[index].title);
        }
        that.setData({
          array: temp,
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
    //查询所有专业 end
  },
  formSubmit:function(e){
    var that = this;
    if (wx.getStorageSync('token') == "") {
      toast.normal("您还未登录,请先登陆！")
      return false;
    }
    if(e.detail.value.name==""){
      toast.normal("姓名不能为空！")
      return false;
    }
    if (e.detail.value.phone == "") {
      toast.normal("电话不能为空！")
      return false;
    }
    if (e.detail.value.phone != "") {
      var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
      if (!myreg.test(e.detail.value.phone)) {
        toast.normal("手机格式有误！")
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
        "token": wx.getStorageSync('token'),
        "Content-Type": "application/json"
      },
      success: function (res) {
        if (res.data.code == 200) {
          toast.normal("保存成功")
        } else {
          // toast.normal(res.data.message)
          that.requestlogin()

        }
      },
      fail: function (res) {
        toast.normal("网络请求失败")
      }
    })
  },
  getPhoneNumber: function (res) {
    if (wx.getStorageSync('token') == "") {
      toast.normal("网络请求失败")
      return false;
    }
    var that=this;
    if (res.detail && res.detail.encryptedData) {
      var $this = this
      toast.showLoading('正在获取手机号')
      wx.request({
        header: {
          "token": wx.getStorageSync('token'),
          "Content-Type": "application/json"
        },
        data: {
          encryptedData: res.detail.encryptedData,
          iv: res.detail.iv,

        },
        url: app.globalData.url + 'user/decrypt/phone',
        method: 'post',
        success: function (res) {
          toast.hideLoading()
          console.log("res 获取手机号返回信息：", res)
          if (res.data.code == 200) {
            console.log("手机号获取成功:", res)
            that.setData({
              phone:res.data.data
            })
          } else {
            // toast.normal(res.data.message)
            that.requestlogin()
          }
          toast.hideLoading()
        },
        fail: function () {
          toast.normal("网络请求失败")
        }
      })
    } else {
      toast.normal("获取手机号失败")
    }
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
                        toast.normal("请重新提交")
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