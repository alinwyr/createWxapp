import request from './network/fetch'
import Navigator from './utils/navigator'
import Event from './utils/event'

App({
  onLaunch () {
    // 调用API从本地缓存中获取数据
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },

  globalData: {
    code: null,
    unionId: null, // 全局的unionId
    openId: null, //  全局的openid
    userInfo: null, //  用户信息
  },
  // 自定义 request
  request (apiName, reqParams, ...option) {
    return request(apiName, reqParams, ...option)
  },
  // 安装插件
  installPlugins () {
    /** 安装跳转管理器
     *  可通过app.navigator.navigateTo(options)进行路由跳转
     */
    new Navigator({ app: this, propertyName: 'navigator' }).install()
    this.navigateTo = this.navigator.navigateTo

    /**
     * 安装事件管理器，用于页面间通信
     * 将会在this对象上添加四个属性：on/emit/remove/_events
     */
    new Event().install(this)
  }
})
