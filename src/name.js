//获取n位的数字字母的字符串
function getRandomStr(n) {
	var n = n || 12; //默认12位
	var res = '';
	var chars = ['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
	for(var i = 0; i < n ; i ++) {
		var id = Math.ceil(Math.random()*35);
		res += chars[id];
	}
	return res;
}

// 文件名获取
export function intitle (url, response) {
  let lastSlash = url.lastIndexOf('/') + 1,
      lastStr = url.slice(lastSlash, url.length)
  if (lastStr.indexOf('.') != -1) {  // 可以查询到文件名
    return lastStr
  } else {  // 无法查询到文件名
    let type = response.type.split('/')[1]
    return getRandomStr(8) + '.' + type
  }
}

export default {
  getRandomStr,
  intitle
}
