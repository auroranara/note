[原生JS中DOM节点API合集](https://microzz.com/2017/04/06/jsdom/)

# 基本概念
A.基本数据类型

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

    * 第二个小数点以及之后的数无效

  * 隐式转换

        '1'+12 // '112'
        '2'*3  // 6
      
2. String

    * 转义序列 如 换行符\n 只占一个字符
    * **toString(基数)** 不能转换null或undefined
    * String() 

* 位操作符

    > ECMAscript中所有数值都是以IEEE-754 64位格式存储。操作时只操作32位的整数，第一位符号位。

    * 负数存储使用二进制补码，补码=反码（按位非）+1

    * 按位非（NOT）

        按位非操作符 ~ ，返回数值的反码
    * 按位与（AND）

        操作符 & ，两操作数对应位上都是1才返回1

    * 按位或（OR）

        操作符 | ，两操作符对应位上只要有1就返回1

    * 按位异或（XOR）

        操作符 ^ ，两操作符对应位上只有一个1才返回1
    * 左移（操作符 << ）

          var old=2          // 二进制10
          var new =old << 5  // 二进制1000000
        左移不会影响符号位，将-2向左移动5位，是-64，符号不会变
    * 有符号的右移（操作符 >> ）
    * 布尔操作符

        *
        


        

          

