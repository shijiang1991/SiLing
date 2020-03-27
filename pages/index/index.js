//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    bannerItem: [],
    recruitStudentList: [],
    pageIndex: 1,
    pageSize: 10,
    end:""
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function() {
    var that = this;
    this.getRecruitStudentPage();
    wx.showShareMenu({
      // 要求小程序返回分享目标信息
      withShareTicket: true
    });
    //加载轮播图 start
    wx.request({
      url: app.globalData.url + '/schoolIntroduce/getBannerList',
      method: 'get',
      header: {
        'content-type': 'application/json',
      },
      success: function(res) {
        if (res.data.code == 200) {
          var strTemp = res.data.data.data[0].banner;
          var aryTemp = strTemp.split(",");
          var json = []
          for (var i = 0; i < aryTemp.length; i++) {
            var j = {}
            j.banner = aryTemp[i]
            j.id = i
            json.push(j)
          }
          that.setData({
            bannerItem: json
          })

        } else {
          wx.showToast({
            title: '加载后台数据库失败',
            icon: 'none',
            duration: 1500
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
    //加载轮播图 end

    //加载分类 start
    wx.request({
      url: app.globalData.url + '/type/getTypeList',
      method: 'get',
      header: {
        'content-type': 'application/json',
      },
      success: function(res) {
        that.setData({
          schoolIntroduceName: res.data.data.data[0].name,
          schoolIntroduceIcon: res.data.data.data[0].icon,
          recruitStudentName: res.data.data.data[1].name,
          recruitStudentIcon: res.data.data.data[1].icon,
          recruitStudentEnglishName: res.data.data.data[1].englishName,
          professionalIntroductionName: res.data.data.data[2].name,
          professionalIntroductionIcon: res.data.data.data[2].icon,
          contactUsName: res.data.data.data[3].name,
          contactUsIcon: res.data.data.data[3].icon,
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
    //加载分类 end

    //查询抵用卷栏目数据 start
    wx.request({
      url: app.globalData.url + '/coupon/getCouponList',
      method: 'get',
      header: {
        'content-type': 'application/json',
      },
      success: function(res) {
        var startTime;
        var endTime;
        if (res.data.data.startTime == "") {
          startTime = ""
        } else {
          startTime = res.data.data.startTime.substring(0, 10);
        }
        if (res.data.data.endTime == "") {
          endTime = ""
        } else {
          endTime = res.data.data.endTime.substring(0, 10);
        }
        that.setData({
          couponTitle: res.data.data.title,
          couponName: res.data.data.name,
          couponMoney: res.data.data.money,
          couponStartTime: startTime,
          couponEndTime: endTime,
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
    //查询抵用卷栏目数据 end

    //查询领取优惠劵人数 start
    wx.request({
      url: app.globalData.url + '/signUp/getSignUpList',
      method: 'get',
      header: {
        'content-type': 'application/json',
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
    //查询抵用卷栏目数据 end


    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  btn_phone: function() {
    wx.navigateTo({
      url: '/pages/contact/index',
    })
  },
  btn_student: function() {
    wx.navigateTo({
      url: '/pages/student/index',
    })
  },
  btn_school: function() {
    wx.navigateTo({
      url: '/pages/school/index',
    })
  },
  btn_major: function() {
    wx.navigateTo({
      url: '/pages/major/index',
    })
  },
  getRecruitStudentPage: function() {

    var that = this;
    //招生简章 start
    wx.request({
      url: app.globalData.url + 'recruitStudent/getRecruitStudentPage',
      data: {
        pageIndex: this.data.pageIndex,
        pageSize: this.data.pageSize,
      },
      method: 'get',
      header: {
        'content-type': 'application/json',
      },
      success: function(res) {
        if (res.data.code == 200) {
          if (that.data.pageIndex == 1) {
            that.setData({
              recruitStudentList: res.data.data.data,
              end: ""
            });
          } else {
            var temp = [];
            temp = that.data.recruitStudentList;
            for (var item in res.data.data.data){    
              temp.push(res.data.data.data[item])
            }
            console.log(temp)
            that.setData({
              recruitStudentList: temp,
              end: ""
            });

          }
        }else{
          that.setData({
            end:"1"
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
    //招生简章 end
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    this.setData({
      pageIndex: 1
    })
    this.getRecruitStudentPage()
  },
  onReachBottom: function() {
    this.setData({
      pageIndex: this.data.pageIndex + 1
    })
    this.getRecruitStudentPage()
  },
  //btn_draw
  btn_draw:function(){
    wx.showModal({
      title: '提示',
      content: '报名领取抵用卷',
      success: function (res) {
        if (res.confirm) {
          wx.switchTab({
            url: '/pages/signUp/index',
          })
        }
      }
    })
  }  
})