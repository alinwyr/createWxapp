webpackJsonp([2],{

/***/ 124:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// const delay = (t = 0) => new Promise((resolve) => setTimeout(resolve, t))
// 获取应用实例
var app = getApp(); //  eslint-disable-line no-undef

Page({
  data: {
    userInfo: {}
  },
  onLoad: function onLoad() {
    var _this = this;

    app.request('user', {
      name: 'test'
    }).then(function (res) {
      _this.setData({
        userInfo: res
      });
    });
  }
});

/***/ })

},[124]); function webpackJsonp() { require("./../../common.js"); wx.webpackJsonp.apply(null, arguments); };