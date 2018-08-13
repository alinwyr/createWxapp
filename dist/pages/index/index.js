webpackJsonp([4],{

/***/ 121:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 获取应用实例
Page({
  data: {
    motto: 'Hello createWxapp!'
  },
  // 事件处理函数
  bindViewUser: function bindViewUser() {
    wx.navigateTo({
      url: '../user/user'
    });
  },
  bindViewLogs: function bindViewLogs() {
    wx.navigateTo({
      url: '../logs/logs'
    });
  },
  onLoad: function onLoad() {}
});

/***/ })

},[121]); function webpackJsonp() { require("./../../common.js"); wx.webpackJsonp.apply(null, arguments); };