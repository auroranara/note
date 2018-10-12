[element文档](http://element-cn.eleme.io/1.4/#/zh-CN/component/button)

# 布局

1. 通过row和col组件，并通过col的:span属性调整布局，分为24栏
 
2. **间隔：**row的:gutter属性调整布局间的间隔，默认间隔为0

3. **偏移**：
  * col组件的:offset属性 与左侧间隔格数  :offset="6"
  * push:栅格向右移动格数
  * pull:栅格向左移动格数


4. **对齐方式：**  row组件的type="flex"启动flex布局，再通过row组件的justify属性调整水平排列方式 ，justify属性值：
	* start 居前
	* center 居中
	* end 居后
	* space-between 分布式适应（首位两边无间隙）
	* around 中间-两边（首位两边有间隙）

	align：flex布局下的垂直排列方式：top/middle/bottom

5. **响应式：**四个响应式尺寸：xs、sm、md、lg

