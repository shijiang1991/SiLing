/**
 * toast success
 * wx.showLoading 和 wx.showToast 同时只能显示一个
 * wx.showToast 应与 wx.hideToast 配对使用
 */
function success(msg) {
    wx.showToast({
        title: msg,
        icon: 'success',
        mask: true,
        duration: 2000
    });
}
/**
 * toast error
 * wx.showLoading 和 wx.showToast 同时只能显示一个
 * wx.showToast 应与 wx.hideToast 配对使用
 */
function normal(msg) {
    wx.showToast({
        title: msg,
        icon: 'none',
        mask: true,
        duration: 2000
    });
}
/**
 * 可自定义错误图标
 */
function error(msg) {
  wx.showToast({
    title: msg,
    icon: 'none',
    mask: true,
    duration: 2000
  });
}


/**
 * 回调函数 返回结果 {errMsg: "showModal:ok", cancel: true, confirm: false}
 */
function showModel(title, content, showCancel, successfunc) {
    if (!title) {
        title = '操作提示';
    }
    if (!content) {
        content = '您确定要进行当前操作吗？';
    }
    if (showCancel == null) {
        true;
    }
    wx.showModal({
        title: title,
        content: content,
        showCancel: showCancel,
        success(res) {
            if (successfunc != null && typeof successfunc === 'function') {
                successfunc(res);
            }
        }
    })
}

/**
 * 隐藏toast
 */
function hideToast(){
    wx.hideToast();
}


/**
 * 显示 loading 提示框。需主动调用 wx.hideLoading 才能关闭提示框
 * wx.showLoading 和 wx.showToast 同时只能显示一个
 */
function showLoading(title, successfunc, failfunc) {
    if (!title) {
        title = '加载中...';
    }
    wx.showLoading({
        title: title,
        mask:true,
        success() {
            if (successfunc != null && typeof successfunc === 'function') {
                successfunc(res);
            }
        },
        failfunc() {
            if (failfunc != null && typeof failfunc === 'function') {
                failfunc(res);
            }
        }
    })

}

function hideLoading() {
    wx.hideLoading();
}


module.exports = {
    success: success,
    error: error,
    normal: normal,
    hideToast: hideToast,

    showModel: showModel,

    showLoading: showLoading,
    hideLoading: hideLoading,


}