[JS方法速查——掘金](https://juejin.im/post/5d0e3e27f265da1b7f298815)
#### 数组降解

* 降解数组（二维数组到一维数组）：

	const flatten1=arr=>[].concat(...arr)

* 多维数组的降解：
  * 递归方法：
    ```js
        function fun1(arr){
          const flatten=arr=>[].concat(...arr); // flatten方法可降解二维数组为一维数组
          return flatten(arr.map(item=>(Array.isArray(item) ? fun1(item) : item)))
        }

        function fun2(arr){
          return arr.reduce((a,v)=>a.concat(Array.isArray(v) ? fun2(v) : v), [])
        } 
        // reduce方法传入一个callback和一个参数[]（这个参数为第一次调用callback时初始值a的值）,
        如果没有传入初始值，初始值为数组第一个元素，并从第二个参数开始遍历

        flat(depth)    // depth为展开深度，默认为1，可以使用 flat(Infinity)展开全部
    ```
    * 迭代方法
    ```js
    const flatten = function (arr) {
    while (arr.some(item => Array.isArray(item))) {
        arr = [].concat(...arr)
    }
    return arr
    }
    ```
### 保持x位小数

  ```js
    function fun(num,x=0){return Number(`${Math.round(`${num}e${x}`)}e-${x}`)}
  ```
即 Math.round(2.256\*10^2)*10^-2=2.26

### 用好filter、map和其他ES6新增的高阶遍历函数

**1.数组去除空值**
```js
  const compact=arr=>arr.filter(Boolean);
```
**2.判断字符串中有无元音字母**
```js
  const isVowel=char=>['a','e','i','o','u'].includes(char);
  const containVowel=str=>[...str].some(isVowel);
```
**3.判断数组内元素是否都满足条件**
```js
  const users=[{name:'jack',age:15}]
  users.every(user=>user.age>=18)
```
**4.找出数组中第一个满足条件的**
```js
  const findFirst=users=>users.find(user=>user.age>=18)
```
**5.将数组中的重复项删除**
```js
  const newArr=arr=>[...new Set(arr)]
```
Set 对象允许你存储任何类型的唯一值，无论是原始值或者是对象引用。

**6.生成由随机整数组成的数组，数组长度和元素大小可自定义**
```js
  const gen=(length,limit)=>Array.from({length},()=>Math.floor(Math.random()*limit))
```
### 用递归代替循环

**将两数组一一对应相加**
```js
	const num1 = [3, 4, 5, 6, 7];
	const num2 = [43, 23, 5, 67, 87, 3, 6];
	const add=x=>y=>x+y;
	const zipWith=f=>xs=>ys=>{
		if(xs.length===0||ys.length===0)return []
		const [xhead,...xTail]=xs
		const [yHead,...yTail]=ys
		return [f(xHead)(yHead),...zipWith(f)(xTail)(xTail)]
	}
	zipWith(add)(num1)(num2)
```
**找出数组内的奇数**
```js
	const test = ( f, arr) => {
  		if ( arr.length === 0) return [];
  		const [head, ...tail] = arr;
  		return f(head)? [head, ...test( f, tail)]: test(f, tail);
	};
	const isOdd= n => n % 2 === 1;
	test(isOdd,[1,2,3,4,5]) // [1,3,5]
```

**判断两个字符串是否是同态**
>两个字符串，如果A字符串中的每一个字符都可以在B字符串中找到唯一对应，并且顺序一一对应；如果存在这样的函数，那么A和B同态。例如：'abb'和'cdd'
```js
const fun = (a, b) => {
  let obj = {}
  for (let i = 0; i < a.length; i++) {
    const letterA = a[i]
    const letterB = b[i]
    if (obj[letterA] === undefined) {
      obj[letterA] = letterB
    } else if (obj[letterA] !== letterB) {
      return false
    }
  }
  return true
}
```
**Math.max找出数组中最大（小）值**

`Math.max(1,2,3)` // 3

`Math.max('1','2','3')` // 3

`Math.max.apply(null,[1,2,3,4])`  // 3


**给数组定义一个function，返回重复元素**

```js
  Array.prototype.extraChar = function(){
      var cacheExtraChar = []; // 缓存重复出现的字符
      var that = this; // 缓存 this;
      this.map(function(item,index){
          // 就是向前往后查找一遍和从后往前查找一遍,不等就是没有重复
          (that.indexOf(item) !== that.lastIndexOf(item)) && cacheExtraChar.indexOf(item) === -1 ? cacheExtraChar.push(item) : -1;
      });
      return cacheExtraChar;
  }
```
	
**判断回文字符串**
```js
    const isHuiWen=str=>str===str.split('').reverse().join('')
```
**判断同字母异序字符串**
```js
    const isTong=(str1,str2)=str1.split('').sort().join('')===str2.split('').sort().join('')
```
**快速排序算法**
```js
// 一次快排 返回key值，小于key的值在key前，大于key的值在key后
const partition = (arr, left, right) => {
  const key = arr[left]
  while (left < right) {
    while (left < right && key < arr[right]) {
      right--;
    }
    arr[left] = arr[right]
    while (left < right && key > arr[left]) {
      left++;
    }
    arr[right] = arr[left]
  }
  arr[left] = key
  return left
}
// 把一次快排后的key左侧和key右侧分别进行快排
const quickSort = (arr, left = 0, right = arr.length - 1) => {
  if (left >= right) return
  const pivot = partition(arr, left, right)
  quickSort(arr, left, pivot - 1)
  quickSort(arr, pivot + 1, right)
  return arr
}
```

**二分查找**
> 传入的数组必须已排序（或者使用sort排序）,target为查找的目标参数
```js
function binSearch(target, arr, start=0, end=arr.length) {
  if(start>=end)return -1
  var mid = Math.floor((start + end) / 2);
	 // 找到直接返回
  if (target === arr[mid]) {
    return mid;
  } else if (target > arr[mid]) {
    return binSearch(target, arr, mid+1, end);
  } else {
    return binSearch(target, arr, start, mid);
  }
}
```

**请把两个数组 ['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'D1', 'D2'] 和 ['A', 'B', 'C', 'D']，合并为 ['A1', 'A2', 'A', 'B1', 'B2', 'B', 'C1', 'C2', 'C', 'D1', 'D2', 'D']**

```js
const maxNumAsc = '9'.charCodeAt(0) + 1 // 58
const arr1 = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'D1', 'D2']
const arr2 = ['A', 'B', 'C', 'D']

const newArr = [...arr1, ...arr2].sort((a, b) => {
  let i = 0
  while (true) {
    const ascA = a.charCodeAt(i) || maxNumAsc, ascB = b.charCodeAt(i) || maxNumAsc
    if (ascA !== ascB) return ascA - ascB
    i++
  }
})
```

**改写以下函数输出0-9**
```js
for (var i = 0; i< 10; i++){
	setTimeout(() => {
		console.log(i);
    }, 1000)
}

// 方法一
for (let i = 0; i< 10; i++){
	setTimeout(() => {
		console.log(i);
    }, 1000)
}

// 方法二
for (var i = 0; i< 10; i++){
	(i=>setTimeout(() => {
		console.log(i);
    }, 1000))(i)
}
```

**循环引用的输出**
```js
var a = { n: 1 };
var b = a;
a.x = a = { n: 2 };

console.log('1', a.x) // undefined
console.log('2', b.x) // { n:2 }
```
> b=a={ n:2 }
  .的优先级更高  所以先执行a.x 会查询a.x是否存在 不存在就会创建x:undefined
  a={ n:2 } a指向被改变 { n:2 }作为返回值 再赋给a.x
  而此时a.x所指向的内存 => { n:1,x:undefined } ,即b.x
  所以b.x={ n:1,x:{n:2} } a={n:2}
