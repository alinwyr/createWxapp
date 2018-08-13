/** copy自微养车
 * @file 获取客户端系统信息工具
 * @author wangkj
*/

function getFullVer (ver) {
  // 兼容android平台下出现获取微信版本时忽略最后为0的情况，如6.6.0 ==> 6.6，7.0.0 -> 7
  const len = ver.split('.').length

  if (len < 2) {
    ver = `${ver}.0.0` // 避免7.0.0 -> 7
  } else if (len < 3) {
    ver = `${ver}.0` // 避免6.6.0 -> 6.6
  }

  return {
    number: Number(ver.replace(/\./g, '')), // 数值版本6.6.0 -> 660
    ver // 完整版本
  }
}

/**
 * @returns {Object} 返回版本对象
 * o.number：表示数字化的版本
 * o.ver：表示完整的字符串版本
*/
function getSystemInfo (key) {
  const defaultRes = { number: 0, ver: '0.0.0' }

  try {
    const info = wx.getSystemInfoSync()
    let res

    switch (key) {
      case 'SDK': {
        wx.canIUse && wx.canIUse('getSystemInfoSync.return.SDKVersion')
          ? (res = getFullVer(info.SDKVersion))
          : (res = defaultRes)
        break
      }
      case 'WX': {
        res = getFullVer(info.version)
        break
      }
      default: res = info
    }

    return res
  } catch (e) {
    // 获取信息失败
    return defaultRes
  }
}

/** 获取网络类型
 * @returns {Promise}
*/
function getNetworkTypeAsync () {
  return new Promise((resolve, reject) => {
    wx.getNetworkType({
      success (res) {
        // wifi/2g/3g/4g/unknown(Android下不常见的网络类型)/none(无网络)
        resolve(res.networkType)
      },
      fail: reject
    })
  })
}

const sys = {
  // 获取基础库版本
  getSDKVersion () {
    return getSystemInfo('SDK')
  },

  // 获取微信版本
  getWXVersion () {
    return getSystemInfo('WX')
  },

  // 异步获取网络类型
  getNetworkTypeAsync () {
    return getNetworkTypeAsync()
  }
}

export default sys
