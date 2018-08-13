// const delay = (t = 0) => new Promise((resolve) => setTimeout(resolve, t))
// 获取应用实例
const app = getApp() //  eslint-disable-line no-undef

Page({
  data: {
    userInfo: {}
  },
  onLoad () {
    app.request('user', {
      name: 'test'
    }).then(res => {
      this.setData({
        userInfo: res
      })
    })
  }
})
