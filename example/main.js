// import pollex from 'pollex'
import immz from '../src/index'
console.log(immz)
// import '../dist/immz.css'
// import ua from '../src/ua'
// import url from '../src/url'
// immz.init({
//   channel: '5780',
//   name: 'imusic_s96e01',
//   topicId: 4865
// })
// immz.sendMessage('123', 546)
// console.log(immz)
// immz.setShare({
//   title: '电信双11，抢200元大奖，先到先得',
//   desc: '每天12点开抢，福利回馈'
// })

// immz.mzAuth()

// immz.service.post('/t', {a: 1})
// console.log(ua)
// console.log(url)
// console.log(url.assignParam({
//   t: 123
// }))
// immz.login({
//   action: '123'
// })

// http
// ctgolink
/**
 * VIVO
 * OPPO
 * HW
 * MI
 * IPHONE
 */

var ws = new window['WebSocket']('ws://localhost:3000/')

// Web Socket 已连接上，使用 send() 方法发送数据
ws.onopen = function () {
  // 这里用一个延时器模拟事件
  // setInterval(function () {
  //   ws.send('客户端消息')
  // }, 2000)
}
// 这里接受服务器端发过来的消息
ws.onmessage = function (e) {
  console.log(e.data)
}

document.querySelector('#rotate').addEventListener('click', e => {
  console.log(ws)
  ws.send(new Date())
})
