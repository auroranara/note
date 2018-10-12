# 简介
所有样式基于class

[官方文档](https://bulma.io/documentation/elements/button/)

**提供5个宽度断点**

* mobile：大于等于768px
* tablet（平板）：大于等于 769px
* desktop（桌面）：大于等于 1024px
* widescreen （宽屏）：大于等于 1216px
* fullhd（高清）： 大于等于 1408px

# 基本用法
1. 改变大小
    * is-small  
    * is-medium  
    * is-large

2. 默认提供6中颜色
    * is-primary
    * is-link
    * is-info
    * is-success
    * is-warning
    * is-danger

3. 按钮的修饰类
	* is-hovered
	* is-focused
	* is-active
	* is-loading：在加载
	* is-outlined
	* [disabled]:不可选定

# 网格体系
bulma的网格体系基于[Flex布局](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)

    <div class="columns">
      <div class="column">First column</div>
      <div class="column">Second column</div>
      <div class="column">Third column</div>
      <div class="column">Fourth</div>
    </div>

> is-gapless修饰columns：不需要列间距
> is-multiline修饰columns： 如果想要多行
> is-centered修饰columns：中心显示

**以下修饰类用来指定项目宽度**

* 四分之一：is-three-quarters
* 四分之一：is-one-quarter
* 三分之二：is-two-thirds
* 三分之一：is-one-third
* 二分之一：is-half
* 五分之二：is-two-fifths
* 五分之一：is-one-fifth

**指定网格偏移**

* is-offset-one-quarter
* is-offset-8

**此外，还有一些修饰类**

* is-narrow:网格宽度由内容宽度决定
* is-centered:内容局中
* is-gapless:网格间没有间距

**也支持12网格体系**

* is-2
* .
* .
* is-11

# 响应式布局
culumns布局在手机上默认是垂直堆叠的，如果希望手机上也平铺，可以加上is-mobile修饰

**如果希望在不同设备网格占据不同宽度：**
	
	<div class="
  		column
  		is-half-mobile
  		is-one-third-tablet
  		is-one-quarter-desktop"
	</div>

**隐藏某个项目的修饰类**

* is-hidden-mobile:只在手机隐藏
* is-hidden-tablet-only:只在平板
* is-hidden-desktop-only:只在桌面
* is-hidden-touch:手机和平板隐藏

# 文字
**修饰文字**

* is-size-1
* .
* .
* is-size-7

**可以为不同设备指定文字大小**

* is-size-1-mobile/tablet。。。
# 布局

**.container作为以下的子容器**

* navbar
* hero
* section
* footer

#### Level
[代码见文档](https://bulma.io/documentation/layout/level/)

1. * level：父容器
 * level-left：左侧显示
 * level-right：右侧显示
 		* level-item：作为其中子容器

2. 外层套一个level，里面多个level-item

### Media
用于写文章列表

* media-left：左侧头像
* media-content：文章主题
* media-right：右侧

[代码见文档](https://bulma.io/documentation/layout/media-object/)


### Hero
可显示标题之类

	<section class="hero is-primary">
  	<div class="hero-body">
    <div class="container">
      <h1 class="title">
        Primary title
      </h1>
      <h2 class="subtitle">
        Primary subtitle
      </h2>
    </div>
  	</div>
	</section>

### Section
一个简单的容器，把页面分成几个部分

### Title

调节器：

* is-ancestor
* is-parent
* is-child
* is-vertical：垂直分布
* 从  is-1
* 到  is-12

**至少要有下面三级：**

> title is-ancestor
>> title is-parent
>>> title is-child	

# 表单
[具体见文档](https://bulma.io/documentation/form/general/)

**field是以下类的容器：**

* label
* control
* help

**control多功能容器，因为有统一的高度，可以只包含下面的：**

* input
* select （下拉框）
* button
* icon  （图标）

**设置图标的位置**

> 修饰.control
>> .has-icons-left
>> .has-icons-right
>>> .icon还必须要使用以下修饰
>>>>is-left
>>> is-right

**control修饰符**

* 在field中加上 has-addons，field中包含几个control，比如让输入框和搜索框同行
* is-expanded：扩大

**集团化控制control:**在field后加上 is-grouped

* is-grouped-left
* is-grouped-centered
* is-grouped-right

 **常用格式**


	<!--有图标的输入框-->
    <div class="field">
     <label class="label">Username</label>
     <div class="control has-icons-left has-icons-right">
       <input class="input is-success" type="text" placeholder="Text input" value="bulma">
       <span class="icon is-small is-left">
         <i class="fa fa-user"></i>
       </span>
     </div>
     <p class="help is-success">This username is available</p>
     </div>
