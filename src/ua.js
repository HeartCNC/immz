/* eslint-disable no-useless-escape */
// only by import
const _ua = window.navigator.userAgent

function _hasKeyWordInUa (type, rule = '') {
  return new RegExp(type, rule).test(_ua)
}
const network = _hasKeyWordInUa('wifi', 'i') ? 'wifi' : '4g'
const os = _hasKeyWordInUa('Android') || _hasKeyWordInUa('Adr') ? 'android' : (
  _hasKeyWordInUa('iPhone') ? 'ios' : null
)
const platformRules = {
  'MicroMessenger': /MicroMessenger\/([\d\.]+)/,
  'iMusic2': /iMusic2/,
  'iMusic': /iMusic/,
  'CtClient': /CtClient/,
  'QQ': /QQ\/([\d\.]+)/
}
const platform = (rules => {
  let key
  let result = null
  for (key in rules) {
    if (_hasKeyWordInUa(rules[key], 'i')) {
      result = key
      if (/miniProgram/i.test(_ua)) {
        result += '-miniapp'
      }
      break
    }
  }
  return result
})(platformRules)

const deviceRules = {
  'vivo': [/vivo/, /V\d{4,}[A-Z]+/],
  'iphone': [/iPhone/],
  'oppo': [/OPPO/, /P[A-Z]{3}\d{2}/],
  'mi': [/MI/, /M\d{4}\w+/],
  'huawei': [/HUAWEI/, /[A-Z]{2,3}-[A-Z0-9]{3,4}[a-z]{0,2}/]
}

const device = (rules => {
  let key
  let result = null
  for (key in rules) {
    const idx = rules[key].findIndex(item => {
      return _hasKeyWordInUa(item)
    })
    if (~idx) {
      result = key
      break
    }
  }
  return result
})(deviceRules)

function _isPlatform (pf) {
  return platform === pf
}

module.exports = {
  os,
  network,
  device,
  platform,
  platformi: platform && platform.toLowerCase(),
  isIos: os === 'ios',
  isAdr: os !== 'ios',
  isWx: _isPlatform('MicroMessenger'),
  isWxMiniapp: _isPlatform('MicroMessenger-miniapp'),
  isCt: _isPlatform('CtClient'),
  isIm: _isPlatform('iMusic') || _isPlatform('iMusic2'),
  isQQ: _isPlatform('QQ'),
  isBroswer: !platform
}
