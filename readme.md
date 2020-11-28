# 安装

```
npm i immz -s
```

# 导入

```javascript
import immz from 'immz'
```

# 使用方法

## init

>  初始化项目内容，返回 `Promise.resolve()` 。

`immz.init(options)`

### 示例

```javascript
immz.init({
  channel: '5718', // default channel
  name: 'imusic_s92e01', // settingId
  title: 'title', // document title
  overTime: '2020-01-01' // 2020.01.01 over time
})
```

### 参数

|     参数表列     |   类型   | 是否必须 | 默认值 | 备注                                                         |
| :--------------: | :------: | :------: | :----: | ------------------------------------------------------------ |
| options.channel  | `string` |    是    |        | 渠道号，优先选择链接中 `cc` 的值，与`http` 相关              |
|   options.name   | `string` |    是    |        | 项目标识，与`http` 相关                                      |
|  options.title   | `string` |    否    |        | 文档标题                                                     |
|  options.online  | `string` |    否    |  true  | 是否上线中，优先于 `overTime` 做判断                         |
| options.overTime | `string` |    否    |        | 结束时间，到期自动跳转到下线页面<br>支持格式： `2020-01-01`  `2020.01.01` |

## http

> 基于 `axios` 的ajax请求。

## service

> 基于 `http`  的请求封装，带有请求拦截和响应拦截。

`immz.service(config)` | `immz.service.post(url, data, options)` |  `immz.service.get(url, options)`

### 示例

```js
function sendMessage(data){
  return immz.service.post('/vapi/vue_stat/sendMessage', data, {
    useAuthorization: false,
    useFormData: true,
    loading: false
  })
}

function check_login_info(data = {}) {
  return new Promise((resolve, reject) => {
    immz.service.post('/j_api/common_api_v4/check_login_info', data, {
      loading: false
    }).then(res => {
      immz.store.set('userinfo', {
        lastLoginTimeStamp: +Date.now(),
        smsSecret: res['smsSecret'],
        phone: res['phone'],
        isDianXinUser: res['dianXinUser']
      })
      resolve(res)
    }, data => {
      immz.store.clear('userinfo')
      reject(data)
    })
  })
}
```

### 参数

|         参数表列         |   类型   | 是否必须 | 默认值 | 备注                             |
| :----------------------: | :------: | :------: | :----: | -------------------------------- |
|           url            | `string` |    是    |        | 请求链接，不带原始头部，只需路径 |
|           data           | `object` |    否    |        | 请求发送的数据                   |
| options.useAuthorization |  `bool`  |    否    |  true  | 是否使用 `Authorization`         |
|   options.useFormData    |  `bool`  |    否    | false  | 是否使用 `FormData` 格式         |
|     options.loading      |  `bool`  |    否    |  true  | 是否显示加载                     |

## store

> 仓库存储，用于存储全局变量的值。

### 示例

```js
immz.store.set('timeStamp', +Date.now())
var timeStamp = immz.store.get('timeStamp') // 1601972047177
// clear key or all
immz.store.clear('timeStamp')
immz.store.clear()

immz.store.get('timeStamp') // null
```

### set

> 将变量的值存入仓库

`immz.store.set(key, value)` 

#### 参数

| 参数表列 |   类型   | 是否必须 | 默认值 | 备注         |
| :------: | :------: | :------: | :----: | ------------ |
|   key    | `string` |    是    |        | 存储的键名   |
|  value   |    *     |    否    |        | 存储对应的值 |

### get

> 将变量的值从仓库中取出

`immz.store.get(key)` 

#### 参数

| 参数表列 |   类型   | 是否必须 | 默认值 | 备注         |
| :------: | :------: | :------: | :----: | ------------ |
|   key    | `string` |    是    |        | 对应存储的键名   |

### clear

> 将变量的值从仓库中清理

`immz.store.clear(key)` 

#### 参数

| 参数表列 |   类型   | 是否必须 | 默认值 | 备注         |
| :------: | :------: | :------: | :----: | ------------ |
|   key    | `string` |    否    |        | 对应存储的键名，不传表示清理所有 |



## setShare

> 设置分享信息

`immz.setShare(options)`

### 示例

```javascript
immz.setShare({
  link: '',
  title: '1222',
  desc: '12',
  icon: '2'
})

immz.share()
```

### 参数

| 参数表列 |   类型   | 是否必须 | 默认值 | 备注         |
| :------: | :------: | :------: | :----: | ------------ |
| options.title | `string` |    否    | document.title | 分享标题 |
| options.desc | `string` | 否 | '' | 分享描述 |
| options.icon | `string` | 否 | `prefix + '/static/x-icon.jpg'` | 通用分享小图标 |
| options.imgurl | `string` | 否 |  | 欢GO APP分享小图标 |
| options.picUrl | `string` | 否 |  | 爱音乐分享小图标 |
| options.imgUrl | `string` | 否 |  | 微信分享小图标 |
| options.shareIcon | `string` | 否 |  | 微信小程序分享小图标 |
| options.pic | `string` | 否 |  | 微博分享小图标 |

## share

> 分享

`immz.share()`

### 示例

```js
immz.share()
```

### 参数

无

## login

> 跳转至登录页面

`immz.login(data)`

### 示例

```js
immz.login()
immz.login({
  page: 'index',
  data: {
    id: 1,
    rid: '1'
  },
  action: 'getdata'
})
```

### 参数

| 参数表列 |   类型   | 是否必须 | 默认值 | 备注         |
| :------: | :------: | :------: | :----: | ------------ |
|   data    | * |    否    |        | 跳转缓存数据 |

## getBackData

> 获取跳转登录时缓存的数据

`immz.getBackData()`

### 示例

```js
const immz.getBackData()
```

### 参数

无

## ui

> ui组件，需要引入样式文件 `immz/styles/immz.min.css`

### 示例

```js
immz.showLoading() // 显示加载框
immz.hideLoading() // 隐藏加载框

immz.toast({
  msg: 'message'
})

immz.toast({
  msg: 'show 2s',
  duration: 2000
})
```

### Loading

> 加载框

`immz.showLoading()` | `immz.hideLoading()`

- showLoading

- hideLoading

### toast

> 提示框

`immz.toast(options)`

#### 参数

| 参数表列 |   类型   | 是否必须 | 默认值 | 备注         |
| :------: | :------: | :------: | :----: | ------------ |
|   options    | `string` | `object` |    是    |        | 提示语 |
| options.msg | string | 是 | | 提示语 |
| options.duration | number | 否 | 2000 | 持续时间 |

# 静态值

## ua

### platform

> 运行平台

type: `string`

| 返回值 |  备注         |
| :------: |  |
|   micromessenger    | 微信 |
|   micromessenger-miniapp    | 微信小程序 |
| imusic2 | 爱音乐 |
| ctclient | 欢GO |

### os

> 系统

type: `string`

| 返回值 |  备注         |
| :------: |  |
| ios | 苹果 |
| android | 安卓 |

### network

> 网络类型

type: `string`

| 返回值 |  备注         |
| :------: |  |
| wifi | WIFI |
| 4g | 4G |
