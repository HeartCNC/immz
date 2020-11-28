// const history = []
function pop () {

}

function push (name, data) {
  window.history.pushState({
    name: 'videoPlayerFull'
  }, null)
}

function init () {
  window.addEventListener('popstate', pop)
}

function destory () {

}

module.exports = {
  init,
  push,
  pop,
  destory
}
