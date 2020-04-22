// import ApiList from  '../../config/api';
// import request from '../../utils/request.js';
//获取应用实例  
var app = getApp();
Page({
  data: {
    // types: null,
    typeTree: {}, // 数据缓存
    currType: 0,
    // 当前类型
    types: [{ id: "0", name: "全部" }],
    typeTree: [],
    pageIndex: 1,
    pageSize: 10,
    end: ""
  },
  onLoad: function (option) {
    var that = this;
    this.typeList();
    this.majorList();
    wx.setNavigationBarTitle({ title: '专业介绍' });
  },
  //分类查询 start
  typeList: function () {
    var that = this;
    wx.request({
      url: app.globalData.url + '/major/Type/list',
      method: 'get',
      header: {
        'content-type': 'application/json',
      },
      success: function (res) {
        if (res.data.code == 200) {
          var firstId = 0;
          var item = []
          item = that.data.types
          for (var index in res.data.data.data) {
            console.log(res.data.data.data[index])
            item.push(res.data.data.data[index])
          }
          that.setData({
            types: item,
            currType: firstId
          });

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
  //分类查询 end 
  //专业查询 start
  majorList: function () {
    var that = this;
    wx.request({
      url: app.globalData.url + 'professional/page',
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
              typeTree: res.data.data.data,
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
              typeTree: temp,
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
  },
  btn_detail: function (e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/major/detail/index?id=' + id,
    })
  },
  //专业查询 end
  tapType: function (e) {
    var that = this
    var typeId;
    const currType = e.currentTarget.dataset.typeId;
    that.setData({
      currType: currType
    });
    if (currType == 0) {
      typeId = "";
    } else {
      typeId = currType;
    }
    wx.request({
      url: app.globalData.url + 'professional/pageList',
      data: {
        page: this.data.pageIndex,
        limit: this.data.pageSize,
        typeId: typeId
      },
      method: 'get',
      header: {
        'content-type': 'application/json',
      },
      success: function (res) {
        if (res.data.code == 200) {
          if (that.data.pageIndex == 1) {
            console.log("返回了" + res.data.data.data)
            that.setData({
              typeTree: res.data.data.data,
            });
          } else {
            var temp = [];
            temp = that.data.recruitStudentList;
            for (var item in res.data.data.data) {
              temp.push(res.data.data.data[item])
            }
            console.log(temp)
            that.setData({
              typeTree: temp,
              end: ""
            });

          }
        } else {
          that.setData({
            typeTree: "",
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
  // 加载品牌、二级类目数据
  getTypeTree(currType) {
    const me = this,
      _data = me.data;
    if (!_data.typeTree[currType]) {
      request({
        url: ApiList.goodsTypeTree,
        data: {
          typeId: +currType
        },
        success: function (res) {
          _data.typeTree[currType] = res.data.data;
          me.setData({
            typeTree: _data.typeTree
          });
        }
      });
    }
  }
})