var loadingState = 0

function _stopPropagation (e) {
  e.stopPropagation()
}

function showLoading () {
  loadingState = 1
  var loading = document.querySelector('#_immz-loading')
  if (!loading) {
    loading = document.createElement('div')
    loading.id = '_immz-loading'
    loading.className = '_immz-mask'
    var loadingCnt = document.createElement('div')
    loadingCnt.className = '_immz-loading-content'

    var circle = document.createElement('div')
    circle.className = '_immz-loading-circle'
    loadingCnt.appendChild(circle)

    var logo = document.createElement('div')
    logo.className = '_immz-logo'
    circle.appendChild(logo)

    var loadingAm = document.createElement('div')
    loadingAm.className = '_immz-loading-anime'
    loadingCnt.appendChild(loadingAm)

    for (let i = 1; i <= 3; i++) {
      var div = document.createElement('div')
      div.className = '_immz-loading-anime-' + i
      loadingAm.appendChild(div)
    }

    loading.appendChild(loadingCnt)

    document.body.appendChild(loading)

    loading.addEventListener('click', _stopPropagation)
    loading.addEventListener('scroll', _stopPropagation)
  } else {
    loading.style.display = 'flex'
  }
  loading.classList.remove('fadeOut')
  loading.classList.add('fadeIn')
}

function hideLoading () {
  loadingState = 0
  var loading = document.querySelector('#_immz-loading')
  if (loading) {
    loading.classList.remove('fadeIn')
    loading.classList.add('fadeOut')
    loading.addEventListener('animationend', function () {
      if (!loadingState) {
        loading.style.display = 'none'
      }
    })
  }
}

function toast (data = {}) {
  var tip = document.createElement('div')
  tip.className = '_immz-tip-content'
  tip.textContent = typeof data === 'string' ? data : data.msg
  document.body.appendChild(tip)
  tip.classList.add('fadeIn')

  setTimeout(_ => {
    tip.classList.remove('fadeIn')
    tip.classList.add('fadeOut')
    tip.addEventListener('animationend', function () {
      document.body.removeChild(tip)
    })
  }, data.duration || 2000)
}

module.exports = {
  showLoading,
  hideLoading,
  toast
}
