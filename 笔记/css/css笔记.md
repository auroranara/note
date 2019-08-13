### 元素的分类和布局特性

1. 块级元素
2. 行内元素
3. 行内块元素

### BFC 元素(block formatting context)

* 创建方式
 1. 根元素(html)或其他包含它的元素
 2. float不为none
 3. overflow不为visible
 4. position为absolute或fixed
 5. dispaly为inline-block或table(包括table-cell或table-caption)

* 特性
 1. 对应一个独立、封闭的渲染区域，子元素的CSS样式不会影响BFC父元素;
 2. 浮动子元素参与BFC父元素高度计算，解决高度坍塌;
 3. 占据文档流的BFC元素，可以识别浮动兄弟元素（不会被覆盖）;
 4. 占据文档流的BFC元素,width为auto时，会占满当前行剩余宽度;
 5. 属于同一个BFC的两个相邻Box的margin会发生重叠;
 6. BFC中的子元素不会超出包含块;
# 2选择器
### 2.1常用选择器
* 类型选择器（元素选择器）

		p{color:red;}
		h1{color:red;}
* 后代选择器

	作用于元素的所有后代
		
		.main h1{color:red;} 

* 伪类

		:before
		:after
		:link  //未访问的链接
		:visited  //已访问的链接
		:hover  //:hover必须放在:link、:visited之后才生效
		:active  //:active必须放在:hover之后才生效
		.main div:nth-child()  // main类子元素中第n个div
		.main div:nth-of-type(n)  //main类子元素为div中的第n个div

* 伪元素(IE8不支持双冒号)

		::first-line  //向文本首行设置特殊样式
		::first-letter  //向文本首字母设置特殊样式
		::before
		::after

	> 伪元素::before和伪类:before的比较
	>>相同点：
	>> 1. 写法是等效的;
	>> 2. 都可以用来表示伪类对象，设置对象前的内容;
	>>
	>>不同点：
	>> 1. 双冒号是CSS3的写法
	>> 2. 单冒号兼容性好，但推荐双冒号
	>>
	>> 注意点：
	>> 1. 伪类对象需要配合content属性使用 
	>> 2. 伪类对象不会出现再DOM中，仅仅在CSS渲染层加入

### 2.2通用选择器

		*{padding:0;}

### 2.3高级选择器

* 子选择器

	子选择器和后代选择器不同，只选择元素的**直接后代**

		#nav>li{padding:10px;}

	使用后代选择器和通用选择器实现子选择器
	
		#nav li{padding:10px;}
		#nav li *{padding:10px;}

* 相邻同胞选择器

		h2+p{color:red;}
		
	选择h2标签之后的第一个p标签

* ~选择器

		h2~p{color:red;}
选择h2标签之后所有的p标签

* 属性选择器

	根据属性是否存在或者属性的值来寻找元素
	
	html:

		<test title="111 222">look</title>

	css:

		test[title]{cursor:help;color:red;}
		test[title="111"]{cursor:help;color:yellow;}
		[title="111"]{cursor:help;color:red;}
		
	 根据属性值之一寻找元素。多个属性值用**空格间隔**
		
		test[title~="111"]
		test[title^="a"]{}//title属性以a开头
		test[title$="a"]//title属性以a结尾
		test[title*="a"]//title属性包含a
		test[title|="a"]//title等于a或者以a-开头

# 3.可视化格式模型

**3个最重要的css概念：浮动、定位、盒模型**

### 盒模型

`页面渲染时，dom元素所采用的布局模型。可通过box-sizing进行设置`

* content-box (W3C标准盒模型)
* border-box	（IE盒模型）
* padding-box
* margin-box

页面上每个元素可以看作一个矩形框，由元素内容、内边距、边框和外边距组成。

* 外边距叠加

	>当一个元素出现在另一个元素上面，上面元素的底外边距和下面元素的顶外边距叠加
	
	>margin-bottom:20px;margin-top:10px;就会叠加变成margin-bottom:20px;

### 定位
`position:static(默认)/relative/absolute/flexed`
>相对定位元素位置是相对于它在普通流中的初始位置；绝对定位与之相反，使元素的位置与文档流无关，不占据空间。

>绝对定位是“相对于”距离它最近的已定位的祖先元素。

#### 定位叠加

* 同辈元素定位方式相同，且没设置z-index，后来者在上；
	* relative定位和absolute定位优先级相同
* 同辈元素都是relative定位，z-index大的在上；
* relative和absolute定位在static定位（默认）上面；


### 浮动与清除浮动
>清除前一个元素的浮动可以让当前元素换行显示

>当父元素里都是浮动元素时，会造成高度坍塌,解决有两个思路：

* 父级元素设置为BFC元素
* 清除浮动
1. 最后面给一个空元素css设置clear:both
2. 父容器添加一个clear类,使用伪类
		
		.clear:after{
			content: '';
    		display: block;//display:table;
    		clear: both;
		}

# 4.背景图像的效果

## 背景图像基础

		background:url(/img/a.png);
		background-size:100% 100%;// 水平和垂直大小
		background-position:center center;//两个参数分别为水平和垂直，可用像素和百分比和left、center、right来显示
		background-repeat:no-repeat;// repeat-x表是x轴平铺

此外还可以简写：

		background:url(/img/a.png) no-repeat left center;

## 圆角框

* border-radius
		
		border-radius:1em;
		-webkit-border-radius:1em;// 在chrome浏览器中支持使用 -webkit


## 不透明度

* css不透明度

		opacity:0.8;

## 渐变

1. liner-gradient

	> 线性渐变。语法如下：

	`linear-gradient( 
  [ <angle> | to <side-or-corner> ,]? <color-stop> ,<color-stop>...)`

	`<side-or-corner>`：[ left | right ] || [ top | bottom ]  

	如果是to right ,渐变从左侧边开始

	`<angle>` ：

	![liner-gradient001](./image/liner-gradient001.png)

	例： `background: linear-gradient(45deg, blue 20%, transparent 50%);`

	![liner-gradient003](./image/liner-gradient003.png)

	例： `background: linear-gradient(45deg, blue 50%, transparent 0);`

	如果第一个颜色比例大于或等于第二个颜色的比例，渐变没有过渡

	![liner-gradient002](./image/liner-gradient002.png)

	例： `background: linear-gradient(45deg, blue, blue 20%, green 20%, green 50%);`

	从0到20%为蓝色，从20%到结束为绿色

	![liner-gradient004](./image/liner-gradient004.png)

2. repeating-liner-gradient 参数与liner-gradient相似

3. [radial-gradient](https://developer.mozilla.org/zh-CN/docs/Web/CSS/radial-gradient)

	> 径向渐变不同于线性渐变，他是从“一个点”向四周的颜色渐变。语法如下：

	>`radial-gradient([shape||length||extend-keyword] at position, start color,...,end color)`

	`<shape>`：circle | ellipse（椭圆）

	`<length>`：圆的半径（10px） 或 椭圆的半径（需要两个参数如 10px 10px）

	`<position>`： 设置起点位置 参数：
	top | left top | 10px 10px | 50% 50% ，如果缺少 默认为center；

	`<extend-keyword>` ： 表示径向渐变的结束方式，如下所示
	
	| 值 | 描述 |
	| :-- | :-- |
	| closest-side | 指定渐变的半径长度为从圆心到离圆形最近的边 |
	| closest-corner | 指定渐变的半径长度为从圆形到离圆心最近的角 |
	| farthest-side | 指定径向渐变的半径长度为从圆心到离圆心最远的边 |
	| farthest-corner | 指定径向渐变的半径长度为从圆心到离圆心最远的角 |
	|-|

	例：	`background: radial-gradient(blue 0%,green 20%,red 100%);`
	  
	从中心点开始，渐变色为blue，结束渐变色为red,默认从圆心开始渐变

	![radial-gradient001](./image/radial-gradient001.png)

	例： `background: radial-gradient(blue 50%,green 0);`

	如果第一个颜色比例更大，渐变没有过渡

	![radial-gradient002](./image/radial-gradient002.png)

4. repeating-radial-gradient 参数与radial-gradient相似

## 混合模式

## 基线

