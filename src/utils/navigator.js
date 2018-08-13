/**
 * copy自微养车
 * 封装wx.navigateTo，解决多次调用方法造成的重复路由问题
*/
let PROPERTY_NAME, TIME_INTERVAL

export default class Navigator {
  /**
     * @param {Object} options -- 跳转管理器的初始化配置信息
     * @param {String} [options.propertyName] -- 跳转管理实例在app实例上的属性名称
     * @param {Number} [options.timeInterval] -- 跳转方法调用的时间间隔(ms)
    */
  constructor (options) {
    this.app = options.app
    PROPERTY_NAME = options.propertyName || 'navigator'
    TIME_INTERVAL = options.timeInterval || 350
  }

  install () {
    this.app[PROPERTY_NAME] = {
      _lastNavigateTime: '',
      navigateTo: this.navigateTo
    }

    return this.app
  }

  /**
     * this --> app
    */
  navigateTo (options) {
    const url = options.url

    if (typeof url !== 'string') throw new Error('请传入正确的url参数')

    const _this = this
    const lastNavigateTime = _this[PROPERTY_NAME]._lastNavigateTime
    const curNavigateTime = Date.now()
    const remaining = curNavigateTime - lastNavigateTime

    if (remaining >= TIME_INTERVAL || remaining < 0) {
      _this[PROPERTY_NAME]._lastNavigateTime = curNavigateTime
      wx.navigateTo({
        url,
        success () {
          options.success && options.success()
        },
        fail () { options.fail && options.fail() },
        complete () { options.complete && options.complete() }
      })
    }
  }
}
