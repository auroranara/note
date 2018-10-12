#### 数组降解

降解数组（二维数组到一维数组）：

	const flatten1=arr=>[].concat(...arr)

多维数组的降解：
	
	function fun1(arr){
		const flatten=arr=>[].concat(...arr); // flatten方法可降解二维数组为一维数组
		return flatten(arr.map(item=>(Array.isArray(item) ? fun1(item) : item)))
	}

	function fun2(arr){
		return arr.reduce((a,v)=>a.concat(Array.isArray(v) ? fun2(v) : v), [])
	} 
	// reduce方法传入一个callback和一个参数[]（这个参数为第一次调用callback时初始值a的值）,
	如果没有传入初始值，初始值为数组第一个元素，并从第二个参数开始遍历
### 四舍五入

	function fun(num,x){return Number(`${Math.round(`${num}e${x}`)}e-${x}`)}
即 Math.round(2.256\*10^2)*10^-2=2.26

### 用好filter、map和其他ES6新增的高阶遍历函数

**1.数组去除空值**

	const compact=arr=>arr.filter(Boolean);

**2.判断字符串中有无元音字母**

	const isVowel=char=>['a','e','i','o','u'].includes(char);
	const containVowel=str=>[...str].some(isVowel);

**3.判断数组内元素是否都满足条件**

	const users=[{name:'jack',age:15}]
	users.every(user=>user.age>=18)

**4.找出数组中第一个满足条件的**

	const findFirst=users=>users.find(user=>user.age>=18)

**5.将数组中的重复项删除**

	const newArr=arr=>[...new Set(arr)]

Set 对象允许你存储任何类型的唯一值，无论是原始值或者是对象引用。

**6.生成由随机整数组成的数组，数组长度和元素大小可自定义**

	const gen=(length,limit)=>Array.from({length},_=>Math.floor(Math.random()*limit))

### 用递归代替循环

**将两数组一一对应相加**

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

**找出数组内的奇数**

	const test = ( f, arr) => {
  		if ( arr.length === 0) return [];
  		const [head, ...tail] = arr;
  		return f(head)? [head, ...test( f, tail)]: test(f, tail);
	};
	const isOdd= n => n % 2 === 1;
	test(isOdd,[1,2,3,4,5]) // [1,3,5]