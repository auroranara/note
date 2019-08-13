// let map = {
//   array: 'Array',
//   object: 'Object',
//   function: 'Function',
//   string: 'String',
//   null: 'Null',
//   undefined: 'Undefined',
//   boolean: 'Boolean',
//   number: 'Number'
// }
// let getType = (item) => {
//   return Object.prototype.toString.call(item).slice(8, -1)
// }
// let isTypeOf = (item, type) => {
//   return map[type] && map[type] === getType(item)
// }


// const deepClone = (obj) => {
//   let temp = {}
//   if (['Array', 'Object'].includes(getType(obj))) {
//     for (const key in obj) {
//       if (obj.hasOwnProperty(key)) {
//         const value = obj[key]
//         temp[key] = typeof (value) === 'object' ? deepClone(value) : value
//       }
//     }
//   } else return obj
//   return temp
// }

// let DFSdeepClone = (obj, visitedArr = []) => {
//   let _obj = {}
//   if (isTypeOf(obj, 'array') || isTypeOf(obj, 'object')) {
//     let index = visitedArr.indexOf(obj)
//     _obj = isTypeOf(obj, 'array') ? [] : {}
//     if (~index) { // 判断环状数据
//       _obj = visitedArr[index]
//     } else {
//       visitedArr.push(obj)
//       for (let item in obj) {
//         _obj[item] = DFSdeepClone(obj[item], visitedArr)
//       }
//     }
//   } else if (isTypeOf(obj, 'function')) {
//     _obj = eval('(' + obj.toString() + ')');
//   } else {
//     _obj = obj
//   }
//   return _obj
// }

// const obj = {
//   name: 'jack',
//   desc: {
//     age: 12,
//   },
// }


