// 获取应用实例
Page({
  data: {
    motto: 'Hello createWxapp!'
  },
  // 事件处理函数
  bindViewUser () {
    wx.navigateTo({
      url: '../user/user'
    })
  },
  bindViewLogs () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad () {

  }
})
