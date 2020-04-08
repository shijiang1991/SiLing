const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    recruitStudentList: [],
    pageIndex: 1,
    pageSize: 10,
    end: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({ title: '招生简章' });
    this.getRecruitStudentPage();
  },
  getRecruitStudentPage: function () {

    var that = this;
    //招生简章 start
    wx.request({
      url: app.globalData.url + 'recruitStudent/getRecruitStudentPage',
      data: {
        page: this.data.pageIndex,
        limit: this.data.pageSize,
      },
      method: 'get',
      header: {
        'content-type': 'application/json',
      },
      success: function (res) {
        if (res.data.code == 200) {
          if (that.data.pageIndex == 1) {
            that.setData({
              recruitStudentList: res.data.data.data,
              end: ""
            });
          } else {
            var temp = [];
            temp = that.data.recruitStudentList;
            for (var item in res.data.data.data) {
              temp.push(res.data.data.data[item])
            }
            console.log(temp)
            that.setData({
              recruitStudentList: temp,
              end: ""
            });

          }
        } else {
          that.setData({
            end: "1"
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
    //招生简章 end
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.setData({
      pageIndex: 1
    })
    this.getRecruitStudentPage()
  },
  onReachBottom: function () {
    this.setData({
      pageIndex: this.data.pageIndex + 1
    })
    this.getRecruitStudentPage()
  },
  btn_detail: function (e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/school/detail/index?id=' + id,
    })
  } ,
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