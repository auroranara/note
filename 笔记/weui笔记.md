[文档](https://github.com/Tencent/weui/wiki/Button)

#使用

index.html中加入:

    <link rel="stylesheet" href="//res.wx.qq.com/open/libs/weui/1.1.2/weui.min.css" />

#Flex

快速布局：(一个weui-flex相当于一行)

    <div class="weui-flex">
      <div class="weui-flex__item"><div class="placeholder">weui</div></div>
      <div class="weui-flex__item"><div class="placeholder">weui</div></div>
    </div>

#按钮

**必加：** weui-btn

**修饰类：** 

* `weui-btn_primary`:绿色
* `weui-btn_default`:淡灰色
* `weui-btn_warn`：红
* `weui-btn_disabled`:不可选定
* `weui-btn_plain-primary/disabled`:无背景色
* `weui-btn_mini`:迷你按钮

#Badge （标记）
	带文字
    <span class="weui-badge">New</span>
	小红点
    <span class="weui-badge weui-badge_dot"></span>

#Cell

[文档](https://github.com/Tencent/weui/wiki/Cell)

列表视图，由多个section组成，每个section包含weui-cells_title和weui-cells

一个weui-cell就是一行

>weui-cells__title(双下划线)

>weui-cells
>>weui-cell
>>>`weui-cell__hd` (双下划线)
>
>>>`weui-cell__bd` (双下划线)
>
>>>`weui-cell__ft` (双下划线)

**weui-cell的修饰：**

* weui-cell_access：带跳转

#Dialog

**弹出框：**(双下划线)
>weui-dialog
>>weui-dialog__hd（包含标题`<strong class="weui-dialog__title">弹窗标题</strong>`）
>
>>weui-dialog__bd （内容）
>
>>weui-dialog__ft（包含确认按钮 `<a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_primary">确定</a>`）

背景变暗：`<div class="weui-mask"></div>`

**确认框：**

在weui-btn__ft中包含两个按钮 `<a href="" class="weui- dialog__btn weui-dialog__btn_default">取消</a>`