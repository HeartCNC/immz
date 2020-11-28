function _isObject (o) {
  return typeof o === 'object' && o !== null
}
function stringify (o) {
  let result = ''
  if (_isObject(o)) {
    result = Object.entries(o).map(item => {
      let v = item[1]
      if (/[?/:&.=]+/.test(v)) {
        v = encodeURIComponent(v)
      } else if (_isObject(v)) {
        v = JSON.stringify(v)
      }
      return `${item[0]}=${v}`
    }).join('&')
  }
  return result
}

function parse (s) {
  let result = {}
  if (typeof s === 'string' && s !== '') {
    result = Object.fromEntries(decodeURIComponent(s).split('&').map(item => {
      const sp = item.split('=')
      return [sp[0], sp[1]]
    }))
  }
  return result
}

const hash = window.location.hash

const param = parse(window.location.search.replace('?', ''))

const path = window.location.origin + window.location.pathname

function assignParam (o) {
  return path + '?' + stringify(Object.assign({}, param, o)) + window.location.hash
}

module.exports = {
  stringify,
  parse,
  hash,
  param,
  path,
  assignParam
}
