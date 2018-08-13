webpackJsonp([1],{

/***/ 56:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(57);


/***/ }),

/***/ 57:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _fetch = __webpack_require__(58);

var _fetch2 = _interopRequireDefault(_fetch);

var _navigator = __webpack_require__(115);

var _navigator2 = _interopRequireDefault(_navigator);

var _event = __webpack_require__(119);

var _event2 = _interopRequireDefault(_event);

var _system = __webpack_require__(120);

var _system2 = _interopRequireDefault(_system);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

App({
  onLaunch: function onLaunch() {
    // 调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || [];
    logs.unshift(Date.now());
    wx.setStorageSync('logs', logs);
  },


  globalData: {
    code: null,
    unionId: null, // 全局的unionId
    openId: null, //  全局的openid
    userInfo: null, //  用户信息
    // 6.5.6以下会触发page的onShow两次，故更低的版本均不可使用小程序
    isHighVersionThan656: _system2.default.getWXVersion().number >= 656,
    isHighSDKVersion170: _system2.default.getSDKVersion().number >= 170
  },
  // 自定义 request
  request: function request(apiName, reqParams) {
    for (var _len = arguments.length, option = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      option[_key - 2] = arguments[_key];
    }

    return _fetch2.default.apply(undefined, [apiName, reqParams].concat(option));
  },

  // 安装插件
  installPlugins: function installPlugins() {
    /** 安装跳转管理器
     *  可通过app.navigator.navigateTo(options)进行路由跳转
     */
    new _navigator2.default({ app: this, propertyName: 'navigator' }).install();
    this.navigateTo = this.navigator.navigateTo;

    /**
     * 安装事件管理器，用于页面间通信
     * 将会在this对象上添加四个属性：on/emit/remove/_events
     */
    new _event2.default().install(this);
  }
});

/***/ })

},[56]); function webpackJsonp() { require("./common.js"); wx.webpackJsonp.apply(null, arguments); };