# impeldown是什么？
一个浏览器端下载插件，可以监听下载进度，没有依赖任何第三方框架，压缩后大小仅4kb，小巧方便，使用灵活

# 演示地址
* <http://demo.taohuayuanskill.com/#/impeldown>

# 使用注意
* 受到浏览器同源策略的限制，impeldown无法下载跨域资源，只能下载本域资源或者服务端开启CORS
* 服务端返回的Response Headers必须包含Content-Length，否则无法监听到下载进度，但是可以正常下载

# 安装
```JavaScript
npm 的方式
npm install impeldown --save
或
cnpm insatll impeldown --save

支持CDN引入
git地址：https://github.com/cttaohua/impeldown
引入dist文件夹下的impeldown.min.js
<script src="./dist/impeldown.js"></script>
```

# 使用
- 在js中添加
```JavaScript
import impeldown from 'impeldown'
```
- 可以简单的传入一个链接
```JavaScript
new impeldown('https://taohuayuanskill.com/uploadImg/cover/97526.png') // 示例下载url
```
- 或者选择传入一个对象来监听下载进度
```JavaScript
new impeldown({
  url: 'https://taohuayuanskill.com/uploadImg/cover/97526.png',  // 必填项
  name: '下载.png', // 非必填项
  onStart: function() {  // 开始下载
    console.log('开始下载啦')
  },
  onProgress: function(p) {  // 监听进度
    console.log('现在下载了'+p)
  },
  onAbort: function() {  // 被用户中止下载
    console.log('您取消了下载')
  },
  onError: function() {   // 传输中出现错误
    console.log('出错了')
  },
  onSuccess: function() {  // 下载成功
    console.log('下载成功')
  },
  onComplete: function() {  // 下载结束（成功失败都会调用）
    console.log('下载结束啦')
  }
})
```

## 注意事项
如果没有定义name的话，impeldown会自动默认下载的文件名为静态资源的文件名，但是如果下载路径不是静态资源，而是动态生成的文件的话，impeldown会设置文件名为8位的随机字符串加文件后缀名。
