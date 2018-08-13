const toasts = {
  toast (option) {
    const options = option || {}
    let optionObj = {
      title: options.title || '成功', // 提示的内容
      icon: options.icon || 'success', // 图标，只支持"success"、"loading"
      image: options.image || '', // 自定义图标的本地路径，image 的优先级高于 icon
      duration: options.duration || 1000, // 提示的延迟时间，单位毫秒，默认：1500
      mask: options.duration || true // 是否显示透明蒙层，防止触摸穿透，默认：false
    }

    // 接口调用成功的回调函数
    if (options.success) { optionObj.success = options.success }
    // 接口调用失败的回调函数
    if (options.fail) { optionObj.fail = options.fail }
    // 接口调用结束的回调函数（调用成功、失败都会执行）
    if (options.complete) { optionObj.complete = options.complete }

    wx.showToast(optionObj)
  },

  showModal (option) {
    const options = option || {}
    let optionObj = {
      title: options.title || '标题', // 提示的标题
      content: options.content || '', // 提示的内容
      showCancel: options.showCancel, // 是否显示取消按钮，默认为 true
      cancelText: options.cancelText, // 取消按钮的文字，默认为"取消"，最多 4 个字符
      confirmText: options.confirmText, // 确定按钮的文字，默认为"确定"，最多 4 个字符
      confirmColor: options.confirmColor, // 确定按钮的文字颜色，默认为"#3CC51F"
      cancelColor: options.cancelColor // 取消按钮的文字颜色，默认为"#000000"
    }

    // 接口调用成功的回调函数
    if (options.success) { optionObj.success = options.success }
    // 接口调用失败的回调函数
    if (options.fail) { optionObj.fail = options.fail }
    // 接口调用结束的回调函数（调用成功、失败都会执行）
    if (options.complete) { optionObj.complete = options.complete }

    wx.showModal(options)
  }
}

export default toasts
