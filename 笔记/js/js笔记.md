# 基本概念

1.Number

* isNaN 非数值

  isNaN在转换时会尝试将参数转换为数值，比如'10',true isNaN(true) //false

* 数值转化 以下三种方法将非数值转化成数值

  *  Number
      ```
      Number('')          // 0
      Number('070')       // 70 忽略前面的0
      Number(070)         // 56 如果是数值则转化为相应十进制数
      Number(true)        // 1
      Number(null)        // 0
      Number(underfined)  // NaN
      Number('asd')       // NaN
      ```
  * parseInt(value,基数) 转化为整数
    ```
    parseInt('070')       // 70
    parseInt(070)         // 56 
    parseInt(070,8)       // 46 070（八进制数）会先转化为十进制 再根据基数再次转化
    ```
        
  * ParseFloat 
      