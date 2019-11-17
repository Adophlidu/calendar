var utils = {
  forEach: function (arr, cb) { // 循环数组/伪数组
    for (var i = 0; i < arr.length; i ++) {
      cb(arr[i], i)
    }
  },
  hasAttribute: function (node, attr, value) { // 判断节点是否有某属性(和指定值)
    var attrs = node.attributes
    var length = arguments.length
    if (length === 2) {
      for (var i = 0; i < attrs.length; i ++) {
        if (attrs[i].name === attr) {
          return true
        }
      }
    } else if (length === 3) {
      for (var k = 0; k < attrs.length; k ++) {
        if (attrs[k].name === attr && attrs[k].value === value) {
          return true
        }
      }
    }
  },
  getElementPageLeft: function (element) { // 获取某元素相对于当前页面的左偏移
    var actualLeft = element.offsetLeft
    var parent = element.offsetParent
    while(parent !== null){
      actualLeft += parent.offsetLeft + (parent.offsetWidth-parent.clientWidth) / 2
      parent = parent.offsetParent
    }
    return actualLeft
  },
  getElementPageTop: function (element) { // 获取某元素相对于当前页面的右偏移
    var actualTop = element.offsetTop
    var parent = element.offsetParent
    while (parent !== null) {
      actualTop += parent.offsetTop + (parent.offsetHeight-parent.clientHeight) / 2
      parent = parent.offsetParent
    }
    return actualTop;
  },
  getDays: function (year, month) { // 根据年和月计算当月的天数
    year = year ? Number(year) : new Date().getFullYear()
    month = month ? Number(month) : (new Date().getMonth() + 1)
    var days
    switch(month) {
      case 1:
      case 3:
      case 5:
      case 7:
      case 8:
      case 10:
      case 12:
      days = 31;
      break;
      case 4:
      case 6:
      case 9:
      case 11:
      days = 30;
      break;
      case 2:
      if(year % 4 === 0 && year % 100 !== 0 || year % 400 === 0) { // 闰年 普通闰年: 被4整除, 不能被100整除; 世纪闰年: 被400整除
        days = 29
      } else {
        days = 28
      }
      break;
    }
    return days
  },
  toTimeStamp: function (year1, month1, day1, hour1, minute1, second1) { // 将时分秒转换为时间戳
    let str = year1 + '-' + month1 + '-' + day1 + ' ' + utils.fillZero(hour1) + ':' + utils.fillZero(minute1) + ':' + utils.fillZero(second1)
    let date = new Date(str)
    return date.getTime() / 1000
  },
  formatDate: function (type = 'ZH:', year = 2019, month = 11, day = 11, hour = 0, minute = 0, second = 0) { // 格式化时间
    switch (type) {
      case '-':
      case '/':
        return year + type + month + type + day
      case 't':
        return utils.toTimeStamp(year, month, day, hour, minute, second)
      case 'zh':
        return year + '年' + month + '月' + day + '日'
      case 'ZH':
        return year + '年' + utils.fillZero(month) + '月' + utils.fillZero(day) + '日'
      case 'zh:':
        return year + '年' + month + '月' + day + '日' + ' ' + hour + '时' + minute + '分' + second + '秒'
      case 'ZH:':
        return year + '年' + utils.fillZero(month) + '月' + utils.fillZero(day) + '日' + ' ' + utils.fillZero(hour) + '时' + utils.fillZero(minute) + '分' + utils.fillZero(second) + '秒'
    }
  },
  fillZero: function (str) {
    str = String(str)
    return str.length === 1 ? ('0' + str) : str
  },
  getValue: function (id) {
    return document.getElementById(id) ? document.getElementById(id).value : false
  }
}