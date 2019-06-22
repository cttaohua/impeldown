import { intitle } from './name.js'
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
        this.createXML()
      } else if (typeof params === 'object') {
        if (!params.url) {
          throw new Error('The url is a required parameter！')
        }
        this.params = params
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
    let req = new XMLHttpRequest()
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
        if (typeof window.chrome !== 'undefined') {  // Chrome version
          let link = document.createElement('a')
          link.href = window.URL.createObjectURL(req.response)
          link.download = filename
          link.click()
        } else if (typeof window.navigator.msSaveBlob !== 'undefined') {  // IE version
          let blob = new Blob([req.response], { type: 'application/force-download' })
          window.navigator.msSaveBlob(blob, filename)
        } else {  // Firefox version
          let file = new File([req.response], filename, { type: 'application/force-download' });
          window.open(URL.createObjectURL(file));
        }
      }
    }

    req.send(null)

    this.onStart.call(this)
    req.addEventListener('progress',this.onProgress.bind(this), false)
    req.addEventListener('abort',this.onAbort.bind(this), false)
    req.addEventListener('load',this.onSuccess.bind(this), false)
    req.addEventListener('loadend',this.onComplete.bind(this), false)

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
  }
}

window.impeldown = ImpelDown;

export default ImpelDown
