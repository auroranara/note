function myPromise(evaluator) {
  let self = this;
  self.status = 'pending';
  self.value = undefined;
  self.reason = undefined;
  function resolve(value) {
    if (self.status === 'pending') {
      self.value = value;
      self.status = 'resolved';
    }
  }
  function reject(reason) {
    if (self.status === 'pending') {
      self.reason = reason;
      self.status = 'rejected';
    }
  }
  try {
    evaluator(resolve, reject)
  } catch (e) {
    reject(e)
  }
}
// 在myPromise的原型上定义链式调用的then方法
myPromise.prototype.then = function (resolve, reject) {
  // let self = this;
  switch (this.status) {
    case 'resolved':
      resolve(this.value);
      break;
    case 'rejected':
      reject(this.reason);
    default:
      break;
  }
}
// new myPromise((resolve, reject) => {
//   resolve('resolve')
// }).then((value) => { console.log(value) }, (reason) => { console.log(reason) })

const a = new myPromise((resolve, reject) => {
  resolve('resolve')
})
a.then((value) => { console.log(value) }, (reason) => { console.log(reason) })