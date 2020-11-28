# v0.1.10（2020.10.30）

- `login` 小米浏览器直接跳验证码登录
- `style`  mask 的z-index改为`66666`



# v0.2.0（2020.11.2）

- `ua`  更新
- `store`  更新
- `url` 新增
- `init` 去除title设置
- `ctclientjs` 合并 `goLink`
- `cnzz`  新增数据统计方法自带渠道号
- `copy`
- `sengMessage`

- `share`  / `setShareInfo` : 分享新增QQ环境

- `login` : 爱音乐免密登录和欢go单点登录合并
- `getBackData`登录回调数据更新

- `localStorage` 操作

# v0.2.1（）

- `weixin-js-sdk`  `pollex` 分离
- 按需引入`js` 

- `_t=timestamp` 防止html缓存机制

```js
https://cdn.jsdelivr.net/npm/fingerprintjs2@2.1.2/fingerprint2.min.js
与pollex login绑定


主要平台
微信
https://res.wx.qq.com/open/js/jweixin-1.6.0.js
qq
meta

imusic
imusic://

欢go
```



- 埋点验证 / testid / prodid / (m.hetao6.com)



（注意：多参数，hash）

```js
let a = {
    title: '',
    shareinfo: {},
    cnzzid: '',
    cnzztid: '',
    mta_sid: '',
    mta_cid: '',
}

sendMsg // 加载即调用

// cache api缓存设计
// actInfo 数据修改时间戳
// api cache + timestamp

actInfo: {
    prize: |'timestamp'
}
api_timestamp: 1

// 图片懒加载 / 预加载

filter

directive

mixins

router


api cache
ring_info
prize_info

```

