import axios from 'axios'
import url from './url'
import ua from './ua'
import event from './event'
import func from './func'

const isInWx = /MicroMessenger/i.test(ua.platform)
const appid = 'wxa082d9e1f41f929c'
const sdkapi = '/vapi/vue_weixin/getWXConfig'
const wxSdkUrl = 'https://res.wx.qq.com/open/js/jweixin-1.6.0.js'

function config (targetUrl = window.location.href) {
  axios.get(sdkapi + '?' + url.stringify({
    appid,
    sUrl: encodeURI(targetUrl)
  })).then(data => {
    return data.data
  }).then(wxconf => {
    window['wx'].config({
      debug: false,
      appId: appid,
      timestamp: wxconf.timeStamp,
      nonceStr: wxconf.nonceStr,
      signature: wxconf.signature,
      jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone', 'updateTimelineShareData', 'updateAppMessageShareData', 'startRecord', 'stopRecord', 'onVoiceRecordEnd', 'playVoice', 'pauseVoice', 'stopVoice', 'onVoicePlayEnd', 'uploadVoice', 'downloadVoice', 'translateVoice', 'chooseImage', 'previewImage', 'uploadImage', 'downloadImage', 'scanQRCode', 'launchMiniProgram', 'miniProgram']
    })
  })
}

function setShare (aOptions = {}, tOptions) {
  if (!isInWx) {
    return
  }
  const wx = window['wx']
  if (wx) {
    wx.ready(_ => {
      const options = {
        title: document.title,
        desc: '',
        link: window.location.href,
        imgUrl: ''
      }
      aOptions = Object.assign({}, options, aOptions)
      // 小程序打开
      if (ua.isWxMiniapp && wx.miniProgram) {
        wx.miniProgram.postMessage({
          data: {
            title: aOptions.title,
            desc: aOptions.desc,
            shareIcon: aOptions.shareIcon,
            link: aOptions.link
          }
        })
        return
      }
      wx.onMenuShareAppMessage({
        title: aOptions.title,
        desc: aOptions.desc,
        link: aOptions.link,
        imgUrl: aOptions.imgUrl,
        success: function (res) {
          event.emit('onMenuShareAppMessage:success')
        },
        fail: function (res) {
          event.emit('onMenuShareAppMessage:fail', res)
        },
        complete: function () {
          event.emit('onMenuShareAppMessage:complete')
        },
        cancel: function () {
          event.emit('onMenuShareAppMessage:cancel')
        },
        trigger: function () {
          event.emit('onMenuShareAppMessage:trigger')
        }
      })
      wx.onMenuShareQQ({
        title: aOptions.title,
        desc: aOptions.desc,
        link: aOptions.link,
        imgUrl: aOptions.imgUrl,
        success: function (res) {
          event.emit('onMenuShareQQ:success')
        },
        fail: function (res) {
          event.emit('onMenuShareQQ:fail', res)
        },
        complete: function () {
          event.emit('onMenuShareQQ:complete')
        },
        cancel: function () {
          event.emit('onMenuShareQQ:cancel')
        },
        trigger: function () {
          event.emit('onMenuShareQQ:trigger')
        }
      })
      wx.onMenuShareQZone({
        title: aOptions.title,
        desc: aOptions.desc,
        link: aOptions.link,
        imgUrl: aOptions.imgUrl,
        success: function (res) {
          event.emit('onMenuShareQZone:success')
        },
        fail: function (res) {
          event.emit('onMenuShareQZone:fail', res)
        },
        complete: function () {
          event.emit('onMenuShareQZone:complete')
        },
        cancel: function () {
          event.emit('onMenuShareQZone:cancel')
        },
        trigger: function () {
          event.emit('onMenuShareQZone:trigger')
        }
      })
      if (tOptions) {
        tOptions = Object.assign({}, aOptions, tOptions)
        wx.onMenuShareTimeline({
          title: tOptions.title,
          link: tOptions.link,
          imgUrl: tOptions.imgUrl,
          success: function (res) {
            event.emit('onMenuShareTimeline:success')
          },
          fail: function (res) {
            event.emit('onMenuShareTimeline:fail')
          },
          complete: function () {
            event.emit('onMenuShareTimeline:complete')
          },
          cancel: function () {
            event.emit('onMenuShareTimeline:cancel')
          },
          trigger: function () {
            event.emit('onMenuShareTimeline:trigger')
          }
        })
      }
    })
  }
}

async function _initWx () {
  await func.loadScript(wxSdkUrl)
  config()
}
// 微信或小程序
if (isInWx) {
  _initWx()
}

module.exports = {
  config,
  setShare
}
