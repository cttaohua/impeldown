import { intitle } from './name.js'
import { saveAs } from 'file-saver'
class ImpelDown {
  constructor (params) {
    try {
      if (!params) {
        throw new Error('No parameters！')
      }
      if (typeof params === 'string') {
        this.params = {
          url: params
        }
        this.req = new XMLHttpRequest()
        this.createXML()
      } else if (typeof params === 'object') {
        if (!params.url) {
          throw new Error('The url is a required parameter！')
        }
        this.params = params
        this.req = new XMLHttpRequest()
        this.createXML()
      } else {
        throw new Error('The argument is expected to be in the format of a string or object！')
      }
    } catch (e) {
      console.error(e)
    }
  }
  createXML () {
    let resource_url = this.params.url
    let req = this.req
    req.open("GET", resource_url, true)
    req.responseType = 'blob'
    req.onreadystatechange = () => {
      if (req.readyState === 4 && req.status === 200) {
        let filename = ''
        if (this.params.name) {
          filename = this.params.name
        } else {
          filename = intitle(this.params.url, req.response)
        }
        let blob = new Blob([req.response], { type: 'application/force-download' })
        saveAs(blob, filename)
      }
    }

    req.send(null)

    this.onStart.call(this)
    req.addEventListener('progress',this.onProgress.bind(this), false)
    req.addEventListener('abort',this.onAbort.bind(this), false)
    req.addEventListener('load',this.onSuccess.bind(this), false)
    req.addEventListener('loadend',this.onComplete.bind(this), false)

  }

  // 取消下载
  abort () {
    if (this.req) {
      try {
        this.req.abort()
      } catch (e) {
        console.warn('Nothing can be cancelled！')
        return false
      }
    }
    return true
  }

  // 开始下载
  onStart () {
    this.params.onStart ? this.params.onStart() : null
  }
  // 监听进度
  onProgress (evt) {
    if (this.params.onProgress) {
      if (evt.lengthComputable) {
        let percentComplete = evt.loaded / evt.total
        this.params.onProgress(percentComplete)
      }
    }
  }
  // 被用户中止下载
  onAbort () {
    this.params.onAbort ? this.params.onAbort() : null
  }
  // 传输中出现错误
  onError () {
    this.params.onError ? this.params.onError() : null
  }
  // 下载成功
  onSuccess () {
    this.params.onSuccess ? this.params.onSuccess() : null
    this.params.onProgress ? this.params.onProgress(1) : null  // 结束之后再次调用进度方法
  }
  // 下载结束 （成功失败都会调用）
  onComplete () {
    this.params.onComplete ? this.params.onComplete() : null
    this.req = null // 下载结束后重置req对象
  }
}

window.impeldown = ImpelDown;

export default ImpelDown
