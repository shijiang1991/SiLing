
/**
 * 异步
 * 将数据存储在本地缓存中指定的 key 中。会覆盖掉原来该 key 对应的内容。
 * 除非用户主动删除或因存储空间原因被系统清理，否则数据都一直可用。
 * 单个 key 允许存储的最大数据长度为 1MB，所有数据存储上限为 10MB。
 * 
 */
function save(key, data, successfunc,failfunc){
    if (!key) {
        console.error('key不能为空');
        return;
    }
    if(typeof data==='object'){
        data=JSON.stringify(data);
    }
    wx.setStorage({
        key: key,
        data: data,
        success(res) {
            if (successfunc != null && typeof successfunc === 'function') {
                successfunc(res);
            }
        },
        fail(res) {
            if (failfunc != null && typeof failfunc === 'function') {
                failfunc(res);
            }
        }
    })
}

/**
 * 异步
 * 
 */
function remove(key, successfunc, failfunc) {
    if (!key) {
        console.error('key不能为空');
        return;
    }
    wx.removeStorage({
        key: key,
        success(res) {
            if (successfunc != null && typeof successfunc === 'function') {
                successfunc(res);
            }
        },
        fail(res) {
            if (failfunc != null && typeof failfunc === 'function') {
                failfunc(res);
            }
        }

    })

}

/**
 * 异步
 * 
 */
function getVal(key, successfunc, failfunc){
    if(!key){
        console.error('key不能为空');
        return;
    }
    wx.getStorage({
        key: key,
        success(res) {
            if (successfunc != null && typeof successfunc === 'function') {
                successfunc(res.data);
            }
        },
        fail(res) {
            if (failfunc != null && typeof failfunc === 'function') {
                failfunc(res);
            }
        }
    })

}

/**
 * 异步
 * 返回结果{keys,currentSize,limitSize}
 */
function getAll( successfunc, failfunc) {
    wx.getStorageInfo({
        success(res) {
            if (successfunc != null && typeof successfunc === 'function') {
                successfunc(res);
            }
        },
        fail(res){
            if (failfunc != null && typeof failfunc === 'function') {
                failfunc(res);
            }
        }
    })

}




module.exports = {
    save: save,
    remove: remove,
    get: getVal,
    getAll: getAll,


}
