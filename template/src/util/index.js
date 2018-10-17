let add = function (arg1, arg2) {
  if (!arg1) {
    arg1 = 0
  }
  if (!arg2) {
    arg2 = 0
  }
  var r1, r2, m
  try {
    r1 = (arg1 + '').split('.')[1].length
  } catch (e) {
    r1 = 0
  }
  try {
    r2 = (arg2 + '').split('.')[1].length
  } catch (e) {
    r2 = 0
  }
  m = Math.pow(10, Math.max(r1, r2))
  return (arg1 * m + arg2 * m) / m
}

let sub = function (ri, r2) {
  return add(ri, -r2)
}

let mul = function (s1, s2, scale) {
  if (!s1) {
    s1 = 0
  }
  if (!s2) {
    s2 = 0
  }
  var m = 0
  s1 = s1 + ''
  s2 = s2 + ''
  try {
    m += s1.split('.')[1].length
  } catch (e) {
  }
  try {
    m += s2.split('.')[1].length
  } catch (e) {
  }
  var result = Number(s1.replace('.', '')) * Number(s2.replace('.', '')) / Math.pow(10, m)
  if (scale === null) {
    return result
  } else {
    return result.toFixed(scale)
  }
}
/**
 * forms {
 *     fieldName: {
 *        "value": "",
 *        "logics":""//    {name: 'startWith', op: 'startWith', text: '以什么开始'},{name: 'isnull', op: 'isnull', text: '为空'},{name: 'isnotnull', op: 'isnotnull', text: '不为空'},   {name: 'between', op: 'between', text: '在二者之间'},{name: 'equal', op: 'equal', text: '等于'},name: 'like', op: 'like', text: '包含'},{name: 'greaterorequal', op: '>=', text: '大于等于'},{name: 'lessorequal', 'op': '<=', text: '小于等于'}
 *     }
 * }
 * op : and或者or,默认为and
 */
const queryBuilder = function (forms, op) {
  const rules = []
  for (const key in forms) {
    const keyValue = forms[key]
    const op = keyValue['logics']
    const value = keyValue['value']
    if (isNullOrEmpty(value)) {
      continue
    }
    rules.push({field: key, value: value, op: op})
  }
  return {
    rules: rules,
    groups: [],
    op: ifn(op, 'and')
  }
}

const buildUrl = function (url, items) {
  var query = ''
  for (var key in items) {
    query += (query ? '&' : '') + encodeURIComponent(key) + '=' + encodeURIComponent(items[key])
  }
  if (query) {
    url += (url.indexOf('?') > 0 ? '&' : '?') + query
  }

  return url
}

const ifn = function (v, bv) {
  if (v === null || v === undefined) {
    return bv
  } else if (typeof v === 'string') {
    const isWhitespace = (v === '') || (v.replace(/\s/g, '') === '')
    return isWhitespace ? bv : v
  } else {
    return v
  }
}

const isNullOrEmpty = function (s) {
  return !(s !== null && s !== '' && s !== undefined)
}

/* 用浏览器内部转换器实现html解码 */
const htmlDecode = function (text) {
  // 1.首先动态创建一个容器标签元素，如DIV
  var temp = document.createElement('div')
  // 2.然后将要转换的字符串设置为这个元素的innerHTML(ie，火狐，google都支持)
  temp.innerHTML = text
  // 3.最后返回这个元素的innerText(ie支持)或者textContent(火狐，google支持)，即得到经过HTML解码的字符串了。
  var output = temp.innerText || temp.textContent
  temp = null
  return output
}

const getImgNameByUrl = function (url) {
  var imgName = ''
  url = url.split('?')[0]
  url = url.split('@')[0]
  imgName = url.substring(url.lastIndexOf('/') + 1)
  return imgName
}

export default {
  queryBuilder,
  ifn,
  isNullOrEmpty,
  buildUrl,
  htmlDecode,
  getImgNameByUrl,
  mul,
  add,
  sub
}
