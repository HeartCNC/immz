function loadScript (url) {
  var head = document.head || (document.getElementsByTagName('head')[0] || document.documentElement)
  var script = document.createElement('script')
  script.src = url
  head.appendChild(script)
  return new Promise((resolve, reject) => {
    script.onload = e => {
      resolve(e)
    }
    script.onerror = e => {
      reject(e)
    }
  })
}

module.exports = {
  loadScript
}
