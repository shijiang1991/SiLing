//app.js
// itislevel
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

  },
  globalData: {
    userInfo: null,
    url: "https://api.school.itislevel.com/",
    //url: "http://192.168.2.19:8081/",
    //url: "http://192.168.0.189:8081/"
  }
})