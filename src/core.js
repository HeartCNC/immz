import store from './store'
import ua from './ua'
import url from './url'
import iwx from './wx'
import event from './event'
import func from './func'
import services from './http'

const _shareInfo = {
  title: document.title,
  desc: '',
  link: window.location.href,
  icon: ''
}

function _setShare (options = {}) {
  Object.assign(_shareInfo, options)
  _shareInfo.imgurl = options.imgurl || options.icon
  _shareInfo.imgUrl = options.imgUrl || options.icon
  _shareInfo.shareIcon = options.shareIcon || options.icon
  _shareInfo.pic = options.pic || options.icon
  _shareInfo.picUrl = options.picUrl || options.icon
  _shareInfo.image = options.image || options.icon

  if (ua.isCt) {
    if (ua.isIos) {
      window.iOnShare = function () {
        window.location.href = 'objc://share?title=' + encodeURIComponent(_shareInfo.title) + '&content=' + encodeURIComponent(_shareInfo.desc) + '&imgurl=' + encodeURIComponent(_shareInfo.imgurl) + '&weburl=' + encodeURIComponent(_shareInfo.link)
        return 'successed'
      }
    } else {
      window.onShare = function () {
        if (window['CtclientJS']) {
          window['CtclientJS'].share(
            _shareInfo.title,
            _shareInfo.desc,
            _shareInfo.imgurl,
            _shareInfo.link)
        }
      }
    }
  } else if (window['wx']) {
    iwx.setShare(_shareInfo)
  } else if (ua.isQQ) {
    const info = {
      name: _shareInfo.title,
      image: _shareInfo.image,
      description: _shareInfo.desc
    }
    const metas = Array.from(document.getElementsByTagName('meta')).filter(item => item.hasAttribute('itemprop'))
    if (metas.length) {
      metas.map(item => {
        const key = item.getAttribute('itemprop')
        item.content = info[key]
      })
    }
  }
}

const fingerprint2Url = 'https://cdn.jsdelivr.net/npm/fingerprintjs2@2.1.2/fingerprint2.min.js'
const _fingerprintKey = 'ims_device_id'

async function _getFingerprint (callback) {
  var fingerprint = window.localStorage.getItem(_fingerprintKey)
  if (fingerprint) {
    callback(fingerprint)
  } else {
    await func.loadScript(fingerprint2Url)
    window['Fingerprint2'].getV18({}, function (result) {
      store.localStoreSet(_fingerprintKey, result)
      callback(result)
    })
  }
}

export default {
  setShare (info) {
    setTimeout(() => {
      _setShare(info)
    })
  },
  share
}
