var _store = {}

function _isKey (_var) {
  return typeof _var === 'string' && _var !== ''
}

function _isObjArr (_var) {
  return (typeof _var === 'object' && _var !== null) || _var instanceof Array
}

function set (_var, data) {
  if (_isKey(_var)) {
    _store[_var] = data
    return true
  }
  return false
}

function get (_var) {
  return _store[_var] || null
}

function clear (_var) {
  if (_isKey(_var) && _var in _store) {
    delete _store[_var]
    return true
  } else if (typeof _var === 'undefined') {
    _store = {}
    return true
  }
  return false
}

function localStoreSet (_var, data) {
  const res = _isObjArr(data) ? JSON.stringify(data) : data
  window.localStorage.setItem(_var, res)
}

function localStoreGet (_var) {
  let data = window.localStorage.getItem(_var)
  if (/^(\[.*\]|\{.*\})$/.test(data)) {
    try {
      data = JSON.parse(data)
    } catch (e) {
    }
  }
  return data
}

function localStoreClear (_var) {
  if (_isKey(_var) && _var in _store) {
    window.localStorage.removeItem(_var)
    return true
  }
  return false
}

module.exports = {
  set,
  get,
  clear,
  localStoreSet,
  localStoreGet,
  localStoreClear
}
