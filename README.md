# 日历组件(ie不支持, 需优化; 代码冗余, 需优化)
### 使用方法
- 在页面引入js文件
  ```html
  <script src="./utils.js"></script>
  <script src="./calendar.js"></script>
  ``` 
- 设置对应input元素的type属性: `type="calendar"`
  ```html
  <input type="calendar" />
  ```
- 可以给元素设置默认显示时间和时间显示格式(不设置的话, 默认时间为当前时间, 默认显示格式为`ZH:`)
  ```javascript
  var input = document.getElementById('inputId')
  input.calendar.setDate({
    type: 'zh:', // 时间显示格式
    defaultDate: '1998-5-6' // 指定默认显示时间
  })
  ```
- 时间显示格式参照(type属性)
  | type值 | 显示格式| 
  | :---: | :--- | 
  | - | 2019-11-15 | 
  | / | 2019/11/15 | 
  | t | 时间戳 | 
  | zh | 2019年1月1日 | 
  | ZH | 2019年01月01日 | 
  | zh: | 2019年1月1日 1时1分22秒 | 
  | ZH: | 2019年01月01日 01时01分22秒 | 