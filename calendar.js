class Calendar {
  constructor (el) {
    var me = this
    me.el = el
    me.init(el)
    me.bindAction(el)
    me.defaultYear = new Date().getFullYear()
    me.defaultMonth = new Date().getMonth() + 1
    me.defaultDay = new Date().getDate()
  }
  init = function (el) { // 给目标表单元素添加父级元素, 便于日历组件的定位
    var oDiv = document.createElement('div')
    oDiv.style.position = 'relative'
    var parent = el.parentElement
    oDiv.appendChild(el)
    parent.appendChild(oDiv)
  }
  createContainer =  function createContainer (el) { // 创建日历外层容器
    var height = el.clientHeight
    var oDiv = document.createElement('div')
    oDiv.style.width = '270px'
    oDiv.style.backgroundColor = '#eee'
    oDiv.style.border = '1px solid #ccc'
    oDiv.style.borderRadius = '5px'
    oDiv.style.position = 'absolute'
    oDiv.style.userSelect = 'none'
    oDiv.style.top = height + 5 + 'px'
    oDiv.style.left = 2 + 'px'
    oDiv.style.zIndex = 999
    oDiv.className = 'calendar'
    oDiv.id = 'calendar'
    return oDiv
  }
  bindAction = function  bindAction(el) { // 给添加type=calendar的input元素添加点击事件
    var me = this
    var parent = el.parentElement
    var container = me.createContainer(el)
    el.onclick = function () {
      if (!this.flag) { //打开日历
        var node = me.fillHeader(container) // 初始化日历头部
        var days
        var weekIdentification
        if (me._defaultDate) { // 有默认值, 获取天数
          weekIdentification = me.identifyWeek(me._defaultDate.year, me._defaultDate.month)
          days = utils.getDays(me._defaultDate.year, me._defaultDate.month)
        } else { // 无默认值获取当月天数
          days = utils.getDays()
          weekIdentification = me.identifyWeek()
        }
        me.days = days // 第一次渲染时, 根据年月计算的天数
        me.weekNumber = weekIdentification
        var firstDaysNode = me.createBodyNode(days, weekIdentification) // 根据天数初始化的日历天数部分 
        me.bindClickAction(firstDaysNode) // 给天数部分添加点击事件
        node.appendChild(firstDaysNode) // 将添加完事件的天数节点添加到日历容器
        parent.insertBefore(node, el) // 将日历容器添加到页面
        me.bindController() // 给前进后退按钮绑定事件

        this.flag = !this.flag
        me.changeListener(parent) // 监听年份和月数的改变
      } else { // 关闭日历
        var oldNode = parent.getElementsByClassName('calendar')[0]
        parent.removeChild(oldNode)
        this.flag = !this.flag
      }
    }
  }
  fillHeader = function fillHeader (node) { // 生成日历头部节点
    var me = this
    node.innerHTML = me.createHeaderInner()
    return node
  }
  createHeaderInner = function createHeaderInner () { // 生成日历头部innerHTML
    var htmlStr = ''
    var headStr = '<div id="calendarHead" style="width: 100%;display: flex;justify-content: space-between;align-items: center;"><span>&lt;&lt;</span><span>&lt;</span>'
    var yearOptions = this.createSelect('year', 1990, 2020)
    var monthOptions = this.createSelect('month', 1, 12)
    var hourOptions = this.createSelect('hour', 0, 24)
    var minuteOptions = this.createSelect('minute', 0, 60)
    var secondOptions = this.createSelect('second', 0, 60)
    headStr += yearOptions
    headStr += monthOptions
    headStr += '<span>&gt;</span><span>&gt;&gt;</span></div>'
    var weekStr = '<div style="width: 100%;padding: 3px 0;margin: 5px 0;background:#ccc;display:flex;justify-content: space-between;">'
    var weekArr = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    for (var j = 0; j < weekArr.length; j ++) {
      weekStr += '<div style="text-align: center;">' + weekArr[j] + '</div>'
    }
    weekStr += '</div>'
    htmlStr += headStr
    htmlStr += '<div id="time" style="margin-top: 5px;width: 100%;display: flex;justify-content: space-between;align-items: center;text-align: center;"><div><span>时:</span>' + hourOptions + '</div><div><span>分:</span>' + minuteOptions + '</div><div><span>秒:</span>' + secondOptions + '</div></div>'
    htmlStr += weekStr
    return htmlStr
  }
  createSelect = function createSelect (name, start, end) { // 创建下拉框的innerHTML
    var me = this
    var str = '<select id="' + name + '1" style="width: 60px;font-size: 12px" type="text" name="' + name + '">'
    for (var i = start; i <= end; i ++) {
      if (me._defaultDate) {
        var date = me._defaultDate
        var year = Number(date.year)
        var month = Number(date.month)
        var hour = date.hour ? Number(date.hour) : 0
        var minute = date.hour ? Number(date.minute) : 0
        var second = date.hour ? Number(date.second) : 0
        if (i === year && name === 'year') {
          str += '<option value="' + i + '" selected>' + i + '</option>'
        } else if (i === month && name === 'month') {
          str += '<option value="' + i + '" selected>' + i + '</option>'
        } else if (i === hour && name === 'hour') {
          str += '<option value="' + i + '" selected>' + i + '</option>'
        } else if (i === minute && name === 'minute') {
          str += '<option value="' + i + '" selected>' + i + '</option>'
        } else if (i === second && name === 'second') {
          str += '<option value="' + i + '" selected>' + i + '</option>'
        } else {
          str += '<option value="' + i + '">' + i + '</option>'
        }
      } else {
        if (i === me.defaultYear && name === 'year') {
          str += '<option value="' + i + '" selected>' + i + '</option>'
        } else if (i === me.defaultMonth && name === 'month') {
          str += '<option value="' + i + '" selected>' + i + '</option>'
        } else if (i === new Date().getHours() && name === 'hour') {
          str += '<option value="' + i + '" selected>' + i + '</option>'
        } else if (i === new Date().getMinutes() && name === 'minute') {
          str += '<option value="' + i + '" selected>' + i + '</option>'
        } else if (i === new Date().getSeconds() && name === 'second') {
          str += '<option value="' + i + '" selected>' + i + '</option>'
        } else {
          str += '<option value="' + i + '">' + i + '</option>'
        }
      }
    }
    str += '</select>'
    return str
  }
  createBodyNode (days, weekId) { // 根据天数创建日历主体部分
    var me = this
    var oDiv = document.createElement('div')
    oDiv.id = 'days'
    oDiv.style.width = '100%'
    var daysStr = ''
    for (var i = 1 - weekId; i <= days; i ++) {
      if (me._defaultDate) {
        var day = Number(me._defaultDate.day)
        if (i <= 0) {
          daysStr += '<span style="width:38.57px;padding: 5px 0;visibility: hidden;display:inline-block;text-align: center;">' + i + '</span>'
        } else if (i === day) {
          daysStr += '<span style="width:38.57px;background: #ccc;border-radius: 50%;padding: 5px 0;display:inline-block;text-align: center;">' + i + '</span>'
        } else {
          daysStr += '<span style="width:38.57px;padding: 5px 0;display:inline-block;text-align: center;">' + i + '</span>'
        }
      } else {
        if (i <= 0) {
          daysStr += '<span style="width:38.57px;padding: 5px 0;visibility: hidden;display:inline-block;text-align: center;">' + i + '</span>'
        } else if (i === me.defaultDay) {
          daysStr += '<span style="width:38.57px;background: #ccc;border-radius: 50%;padding: 5px 0;display:inline-block;text-align: center;">' + i + '</span>'
        } else {
          daysStr += '<span style="width:38.57px;padding: 5px 0;display:inline-block;text-align: center;">' + i + '</span>'
        }
      }
    }
    oDiv.innerHTML = daysStr
    return oDiv
  }
  changeListener = function (parent) { // 监听年月改变
    var me = this
    var yearInp = document.getElementById('year1')
    var monthInp = document.getElementById('month1')
    me.bind(yearInp)
    me.bind(monthInp)
  }
  bind = function bind(el) { // 给年月下拉框绑定事件 
    var me = this
    el.onchange = function () {
      var yearValue = document.getElementById('year1').value
      var monthValue = document.getElementById('month1').value
      me.reRenderDays(yearValue, monthValue)
    }
  }
  reRenderDays = function (yearValue, monthValue) { // 判断是否需要重新渲染日历主体部分
    var me = this
    var days = utils.getDays(yearValue, monthValue) // 获取年月变化后的天数
    var weekId = me.identifyWeek(yearValue, monthValue)
    if (days !== me.days || weekId !== me.weekNumber) {
      // 重新渲染
      var daysNode = me.createBodyNode(days, weekId)
      var calendar = document.getElementById('calendar')
      var dayEl = document.getElementById('days')
      me.bindClickAction(daysNode) // 重新绑定事件
      calendar.insertBefore(daysNode, dayEl)
      calendar.removeChild(dayEl)
      me.days = days
      me.weekNumber = weekId
    }
  }
  bindClickAction = function bindClickAction (el) { // 点击某一天触发点击事件
    var me = this
    el.onclick = function (e) {
      e = e || window.event
      var targetEl = e.target || e.srcElement
      if (targetEl.tagName.toLowerCase() === 'span') {
        var yearValue = utils.getValue('year1')
        var monthValue = utils.getValue('month1')
        var hourValue = utils.getValue('hour1')
        var minuteValue = utils.getValue('minute1')
        var secondValue = utils.getValue('second1')
        var dayValue = targetEl.textContent

        me.el.value = me._dateType ? 
        utils.formatDate(me._dateType, yearValue, monthValue, dayValue, hourValue, minuteValue, secondValue)
        : utils.formatDate('ZH:', yearValue, monthValue, dayValue, hourValue, minuteValue, secondValue)
        me._defaultDate = {
          year: yearValue,
          month: monthValue,
          day: dayValue,
          hour: hourValue,
          minute: minuteValue,
          second: secondValue
        }
        // 选择某一天后删除日历
        var parent = me.el.parentElement
        var oldNode = parent.getElementsByClassName('calendar')[0]
        parent.removeChild(oldNode)
        me.el.flag = !me.el.flag
      }
    }
  }
  setDate = function (options) { // 暴露出去的方法, 可以设置时间显示格式和默认值
    var me = this
    options && options.type &&  (me._dateType = options.type) // 获取指定的时间显示格式
    if (options && options.defaultDate) {
      var defaultDate = options.defaultDate
      var arr = defaultDate.split('-')
      var defaultDateObj = { // 获取指定的日历
        year: arr[0],
        month: arr[1],
        day: arr[2]
      }
      me._defaultDate = defaultDateObj
      me.el.value = utils.formatDate(me._dateType, arr[0], arr[1], arr[2])
    }
  }
  bindController = function () {
    var me = this
    var oHead = document.getElementById('calendarHead')
    var spanList = oHead.getElementsByTagName('span')

    spanList[0].onclick = function () {
      var {yearNode, yearValue, monthValue} = me.controllerHelper()
      if (yearValue > 1990) {
        yearNode.value = yearValue - 1
        me.reRenderDays(yearNode.value, monthValue)
      }
    }
    spanList[3].onclick = function () {
      var {yearNode, yearValue, monthValue} = me.controllerHelper()
      if (yearValue < 2020) {
        yearNode.value = yearValue + 1
        me.reRenderDays(yearNode.value, monthValue)
      }
    }
    spanList[1].onclick = function () {
      var {monthNode, yearValue, monthValue} = me.controllerHelper()
      if (monthValue > 1) {
        monthNode.value = monthValue - 1
        console.log()
        me.reRenderDays(yearValue, monthNode.value)
      }
    }
    spanList[2].onclick = function () {
      var {monthNode, yearValue, monthValue} = me.controllerHelper()
      if (monthValue < 12) {
        monthNode.value = monthValue + 1
        me.reRenderDays(yearValue, monthNode.value)
      }
    }
  }
  controllerHelper = function () {
    var yearNode = document.getElementById('year1')
    var monthNode = document.getElementById('month1')
    var yearValue = Number(yearNode.value)
    var monthValue = Number(monthNode.value)
    return { yearNode, monthNode, yearValue, monthValue }
  }
  identifyWeek = function (year, month) { // 得到每月一号是星期几
    year = year || new Date().getFullYear()
    month = month || new Date().getMonth() + 1
    return new Date(year + '-' + month + '-1').getDay()
  }
}

init()
function init () {
  var oInputs = document.getElementsByTagName('input')
  for (var i = 0; i < oInputs.length; i ++) {
    if (utils.hasAttribute(oInputs[i], 'type', 'calendar')) {
      oInputs[i].flag = false
      oInputs[i].calendar = new Calendar(oInputs[i])
    }
  }
}
