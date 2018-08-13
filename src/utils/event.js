/**
 * cpoy自微养车
 * @file 简单的事件Event管理器
 * @author wangkj
*/

export default class Event {
  /** 注意命名空间，避免覆盖target上的同名属性
     * @param {Object} options
     * options.target 需要安装事件管理实例的应用实例
     */
  install (target) {
    Object.assign(target, {
      _events: {},
      on: this.on,
      emit: this.emit,
      remove: this.remove
    })

    return this
  }

  // 卸载管理器
  uninstall () {
    delete this.target._events
    delete this.target.on
    delete this.target.emit
    delete this.target.remove
  }

  on (event, fn) {
    let events = this._events

    if (!events[event]) events[event] = []

    events[event].push(fn)
  }

  emit (event, data) {
    const fns = this._events[event]
    let i, fn

    if (!fns) return this

    for (i = 0; fn = fns[i]; i++) fn(data)

    return this
  }

  remove (event, func) {
    const fns = this._events[event] || []
    let i, fn

    if (!fns.length) return this

    if (typeof func !== 'function') {
      fns.length = 0

      return this
    }

    for (i = 0; fn = fns[i]; i++) {
      fn === func && fns.splice(i, 1)
    }
  }
}
