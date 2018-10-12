>详见npm社区[AmineJs](https://www.npmjs.com/package/animejs)

## 开始制作动画

	anime({
  	targets: 'div',
  	translateX: [
    	{ value: 100, duration: 1200 },
    	{ value: 0, duration: 800 }
  	],
  	rotate: '1turn',
  	backgroundColor: '#FFF',
  	duration: 2000,
  	loop: true
	});

**targets**属性定义了制作动画的元素或js对象：

* css选择器 如：'div','#el path';
* DOM元素 如： document.querySelector('.item')
* 节点列表 如： document.querySelectorAll('.item')
* 对象 
* 数组 如：['div', '.item', domNode]

## 动画属性

1. CSS：
	* opacity 透明度 0~1
	* backgroundColor
	* fontSize
	* borderRadius
	* backgroundColor
	
2. transforms变换：
	* translateX    x轴的值
	* translateY    y轴的值
	* retate   		旋转
	* scale 	    大小变换 例：scale:2
	* rotate		旋转 例：rotate:'1turn'（旋转一周）
3. 对象属性

	JS:
	<pre>var myObject = {
  		prop1: 0,
  		prop2: '0%'
	}
	var JSobjectProp = anime({
  		targets: myObject,
  		prop1: 50,
  		prop2: '100%',
  		easing: 'linear',
  		round: 1,
  		update: function() {
    	var el = document.querySelector('#JSobjectProp span');
    	el.innerHTML = JSON.stringify(myObject);
  	}
	});</pre>

	HTML:

		<div id="JSobjectProp">
			<span>{"myProperty":"0"}</span>
		</div>

4. DOM属性

	JS:
	<pre>var domAttributes = anime({
  		targets: 'input',
 		value: 1000,
  		round: 1,
  		easing: 'easeInOutExpo'
	});</pre>

	HTML:

		<input class="text-output" value="0">

5. SVG属性

	```
	<svg width="128" height="128" viewBox="0 0 128 128">
  	<polygon points="64 68.73508918222262 8.574 99.9935923731656 63.35810017508558 67.62284396863708 64 3.993592373165592 64.64189982491442 67.62284396863708 119.426 99.9935923731656"></polygon>
	</svg>
	```

	<pre>anime({
  		targets: 'polygon',
  		points: '64 128 8.574 96 8.574 32 64 0 119.426 32 119.426 96'
	});</pre>

## 属性参数

1. duration  持续时间
	* 默认1000 
	* 单位 毫秒
	* 类型number，function(target, index, totalTargets)

2. delay    延迟
	* 默认0
	* 单位 毫秒
	* 类型number，function(target, index, totalTargets)

3. easing   
	* 默认'easeOutElastic' 
	* 类型 string或自定义Bézier曲线坐标（数组）

easeIn | easeOut | easeInOut | 说明
- | :-: | :-: | -: 
easeInQuad | easeOutQuad| easeInOutQuad
easeInCubic | easeOutCubic| easeInOutCubic
easeInQuart | easeOutQuart| easeInOutQuart
easeInQuint | easeOutQuint| easeInOutQuint
easeInSine | easeOutSine| easeInOutSine|正弦
easeInExpo | easeOutExpo| easeInOutExpo
easeInCirc | easeOutCirc| easeInOutCirc
easeInBack | easeOutBack| easeInOutBack
easeInElastic | easeOutElastic| easeInOutElastic

4. elasticity 弹性
	* 默认 500
	* 类型 number，function(target, index, totalTargets)
	* range[0-1000]

5. round 通过舍入值来删除小数
	* 默认 false
	* 类型 number，boolean，function(target, index, totalTargets)
	* 10次幂 例：round:100 两位小数

6. loop 是否循环/循环次数
	* 默认 false
	* number，boolean

7. direction 方向
	* 默认 'normal'
	* 类型 'normal', 'reverse' 反向, 'alternate'会还原

8. autoplay 自动播放
	* 默认 true
	* 类型 boolean

## 属性的值

  	scale: '*=2',  

* 范围
```
anime({
  targets: 'div',
  translateX: [100, 200], // Translate X from 100 to 200
  rotate: ['.5turn', '1turn'], // Rotate from 180deg to 360deg
  scale: ['*=2', 1], // Scale from 2 times the original value to 1,
  backgroundColor: ['rgb(255,0,0)', '#FFF'],
  duration: 1500
});
```
* 基于function的值
```
anime({
  targets: 'div',
  translateX: function(el) {
    return el.getAttribute('data-x');
  },
  translateY: function(el, i) {
    return 50 + (-50 * i);
  },
  scale: function(el, i, l) {
    return (l - i) + .25;
  },
  rotate: function() { return anime.random(-360, 360); },
});
```
* keyframe 关键帧

```
translateX: [
    { value: 250, duration: 1000, delay: 500, elasticity: 0 },
    { value: 0, duration: 1000, delay: 500, elasticity: 0 }
  ],
```

## timeline

通过创建时间轴按顺序播放动画

timeline接收相同参数制作动画：
```
var myTimeline = anime.timeline({
  direction: 'alternate',
  loop: 3,
  autoplay: false
});
```
使用.add()给timeline添加动画：

```
myTimeline
  .add({
	targets: '.square',
	translateX: 250
	})
  .add({
	targets: '.circle',
	translateX: 250
	})
```

* offset

1. 定义时间轴上动画的开始时间。

type | examples | 说明
- | :-: | -:
+=| '+=100' | 在前一个动画结束后100ms开始
-=| '-=100' | 在前一个动画结束前100ms开始
*=| '*=2' | 在前一个动画结束后2倍时间开始

```
.add({
    targets: '.circle',
    translateX: 250,
    offset: '-=600' // 在前一个动画结束前600ms开始
  })
```

2. 使用数字在时间轴上定义绝对开始时间。
```
.add({
    targets: '.square',
    translateX: 250,
    offset: 1000 // Starts at 1000ms
  })
```

## 播放控制
```
var playPauseAnim = anime({
  targets: 'div',
  translateX: 250,
  direction: 'alternate',
  loop: true,
  autoplay: false // prevent the instance from playing
});
 
playPauseAnim.play(); //  播放
playPauseAnim.pause(); //  暂停
playPauseAnim.restart() // 重新播放
playPauseAnim.reverse() // 反向播放
playPauseAnim.seek(500) // 将动画当前时间设置为500ms
```


## callback回调

update | type | 参数 | 说明
- | :-: | :-: |  -:
update | function | animation Object | 在time=0时调用
begin | function | animation Object | 在动画延迟结束时调用
complete | function | animation Object | 在所有循环结束时调用
* 在实例播放时，每个帧都会调用update()。
```
	update: function(anim) {
    	console.log(anim.currentTime + 'ms'); // return value in ms.
    	console.log(anim.progress + '%'); // return value in %
  	}
```
* begin() 只会调用一次在延迟结束后
```
	begin: function(anim) {
    	console.log(anim.began); // true after 1000ms
  	}
```
* 在实例播放时，每个帧都会调用run()。
```
	run: function(anim) {
    	console.log(anim.currentTime);
  	}
```
* complete() 在实例结束后只会调用一次
```
	complete: function(anim) {
    	console.log(anim.completed);
  	}
```
## SVG

* **运动路径** 

	沿着svg路径旋转和转换DOM元素
```
// 创建一个路径`object`
var path = anime.path('#motionPath path');
 
var motionPath = anime({
  targets: '#motionPath .el',
  translateX: path('x'), // 沿着路径对象的x值
  translateY: path('y'), // 沿着路径对象的y值
  rotate: path('angle')  // 沿着路径对象的角度值
});
```
* 变形

	为两个svg形状设置动画

```
<svg class="shape" width="128" height="128" viewBox="0 0 128 128">
<polygon points="64 68.64 8.574 100 63.446 67.68 64 4 64.554 67.68 119.426 100"></polygon>
</svg>
```
```
var svgAttributes = anime({
  targets: '.shape polygon',
  points: '64 128 8.574 96 8.574 32 64 0 119.426 32 119.426 96'
});
```
* 画线

	根据svg形状线条绘制动画
```
anime({
  targets: '.shape path',
  strokeDashoffset: [anime.setDashoffset, 0]
});
```
## Helpers

* anime.speed=x 

	改变所有动画的速度，取值0~1
 	>例：anime.speed=.5
* anime.running 

	返回所有活动Anime实例的数组
* anime.remove(target)

	从动画中删除一个或多个元素
	>例：anime.remove('.item2')
* anime.getValue

	从元素中获取当前有效值
	>例：anime.getValue('div','reanslateX')
* anime.path(pathEl) 
	
	为运动路径动画创建路径功能，接收DOM元素或CSS选择器
* anime.setDashoffset(pathEl)

	返回总路径的长度
	>例：
	>```
	>anime({
  >targets: '.shape path',
  >strokeDashoffset: [anime.pathDashoffset, 0]
	>});
	>```
* anime.easings

	返回所有已设置easing function数组
* anime.random

	返回两个数字之间的一个随机数
	>例：anime.random(1,5)




