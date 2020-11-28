import http from 'axios'
import ua from './ua'
import url from './url'
// import ui from './ui'
import wx from './wx'
// import store from './store'
import event from './event'
import func from './func'
// import core from './core'

// 防HTML缓存机制
// function _reload () {
//   window.location.href = url.assignParam({
//     _t: Date.now()
//   })
// }

// if (!url.param._t) {
//   _reload()
// } else {
//   try {
//     const nd = new Date()
//     const v = new Date(+url.param._t).getDate()
//     if (v !== nd.getDate()) {
//       _reload()
//     }
//   } catch (e) {
//   }
// }

// function _offline () {
//   window.location.href = 'https://act.imusic.cn/imusic_offline/index.html'
// }

// function _isFormatDate (time) {
//   return /^\d{4}((-|.)\d{2}){2}$/.test(time)
// }

// function _isOffline (time) {
//   var offline = false
//   var nowTime = +Date.now()
//   if (typeof time === 'string') {
//     if (_isFormatDate(time)) {
//       var hasPoint = /\./.test(time)
//       var tarr = hasPoint ? time.split('.') : time.split('-')
//       var overTime = new Date(0)
//       overTime.setFullYear(+tarr[0], +tarr[1] - 1, +tarr[2])
//       overTime.setHours(0)
//       offline = nowTime > overTime.getTime() + 86400000
//     } else {
//       throw Error('Formater of offline time is error, which need like \'2020.01.01\' or \'2020-01-01\'')
//     }
//   } else if (typeof time === 'number') {
//     offline = time > nowTime
//   }
//   return offline
// }

// function init (options = {}) {
// if ((typeof options.online !== 'undefined' && !options.online) ||
// _isOffline(options.overTime)
// ) {
//   _offline()
// }
// var app = {
//   channel: url.param.cc || options.channel,
//   settingId: options.name,
//   topicId: options.topicId
// }
// store.set('app', app)
// return Promise.resolve()
// }
const fingerprint2Url = 'https://cdn.jsdelivr.net/npm/fingerprintjs2@2.1.2/fingerprint2.min.js'
const _fingerprintKey = '_mz_device_id'

async function _getFingerprint () {
  var fingerprint = window.localStorage.getItem(_fingerprintKey)
  if (!fingerprint) {
    await func.loadScript(fingerprint2Url)
    window['Fingerprint2'].getV18({}, function (result) {
      window.localStorage.setItem(_fingerprintKey, result)
    })
  }
}

_getFingerprint()

var global = {
  // init,
  ua,
  url,
  // store,
  wx,
  event,
  http
  // ...ui
  // ...core
}

module.exports = global
