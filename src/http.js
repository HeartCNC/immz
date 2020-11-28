import axios from 'axios'
import url from './url'
// import store from './store'
import ui from './ui'

const api = !/act.imusic.cn$/.test(window.location.origin)
  ? 'http://test.api.m.muzhi.us'
  : window.location.origin

const service = axios.create({
  baseURL: api,
  timeout: 60000
})

service.interceptors.request.use(
  config => {
    const app = store.get('app') || {}
    const userinfo = store.get('userinfo') || {}

    var form = config.data
    if (!form) {
      form = {}
    }
    if (typeof config.useAuthorization === 'undefined' || config.useAuthorization) {
      var jwt = window.localStorage.getItem('_mz_jwt')
      if (jwt) {
        config.headers['Authorization'] = 'Bearer ' + jwt
      }
      form['channel'] = app.channel
      form['settingId'] = app.settingId
      var fingerprint = window.localStorage.getItem('_mz_device_id')
      if (fingerprint) {
        form['fingerprint'] = fingerprint
      }
      if (userinfo.smsSecret) {
        form['smsSecret'] = userinfo.smsSecret
      }
    }
    if (config.useFormData) {
      // eslint-disable-next-line no-undef
      var formData = new FormData()
      for (const key in form) {
        formData.append(key, form[key])
      }
      form = formData
    }
    config.data = form
    if (typeof config.loading === 'undefined' || config.loading) {
      ui.showLoading()
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  response => {
    ui.hideLoading()
    if (response.status === 200) {
      if (response.data.code === '0000') {
        const keys = ['code', 'data', 'msg', 'success']
        const data = response.data.data
        const hasOtherProp = Object.keys(response.data).sort().join() !== keys.join()
        var resolveData = data
        if (hasOtherProp) {
          resolveData = {
            data
          }
          for (let key in response.data) {
            if (!keys.includes(key)) {
              resolveData[key] = response.data[key]
            }
          }
        }
        return Promise.resolve(resolveData)
      } else {
        return Promise.reject(response.data)
      }
    } else {
      // 网络错误
      // eslint-disable-next-line prefer-promise-reject-errors
      return Promise.reject({
        msg: '数据请求失败，请稍后再试'
      })
    }
  },
  error => {
    ui.hideLoading()
    return Promise.reject(error)
  }
)

function sendMessage (actname, value) {
  const app = store.get('app')
  const data = {
    actname,
    actparam: value || app.topicId,
    subId: app.topicId,
    portal: 45,
    channelId: app.channel
  }
  axios.post('/vapi/vue_stat/sendMessage', url.stringify(data))
}

module.exports = {
  service,
  http: axios,
  sendMessage
}
