[pixijs官方文档](http://pixijs.download/release/docs/index.html)

[一些例子](https://pixijs.io/examples/#/basics/basic.js)
# 开始

* 创建Pixi应用
```//Create a Pixi Application
let app = new PIXI.Application({
  width: 256,         // default: 800
  height: 256,        // default: 600
  antialias: true,    // 抗锯齿 default: false
  transparent: false, // 透明度 default: false
  resolution: 1       // 分辨率 default: 1
  });
document.body.appendChild(app.view);
```
Pixi应用的默认参数相见 [文档](http://pixijs.download/release/docs/PIXI.Application.html)

* 修改画布背景颜色：app.renderer.backgroundColor = 0x061639;
* 渲染器的宽高： app.renderer.view.width/height
* 改变canvas的宽高，使用渲染器的resize方法
  ```
  app.renderer.autoResize = true; // 为了匹配分辨率所以设置
  app.renderer.resize(512, 512);
  ```
* 想要让canvas填充整个窗口
  ```
  app.renderer.view.style.position = "absolute";
  app.renderer.view.style.display = "block";
  app.renderer.autoResize = true;
  app.renderer.resize(window.innerWidth, window.innerHeight);
  ```
  CSS设置
  ```
  * {padding: 0; margin: 0}
  ```
* 想要canvas等比例缩放
使用 [scaleToWindow ](https://github.com/kittykatattack/scaleToWindow)方法
  ```
  let app = new PIXI.Application({ width: 256, height: 256 });
  document.body.appendChild(app.view);
  scaleToWindow(app.renderer.view); // 初始化时缩放
  // 监听窗口resize事件
  window.addEventListener("resize", function (event) {
    scaleToWindow(app.renderer.view);
  });
  ```

# 记载图像、创建精灵（Sprite）

  [Sprite详细列表](http://pixijs.download/release/docs/PIXI.Sprite.html)

  >渲染器中显示的任何东西必须放在成为舞台的特殊Pixi对象中 
  ```
  app.stage 
  ```

  >特殊图像对象称为sprites(精灵)，可以控制它们的位置，大小以及许多其他对于制作交互式和动画图形有用的属性。

### 将图像加载到纹理缓存中
* 在使精灵显示图像之前，需要将普通图像文件转换为WebGL纹理。
  ```
  PIXI.utils.TextureCache["images/cat.png"];
  ```
* 然后使用Pixi的Sprite类使用纹理制作新的精灵
  ```
  let texture = PIXI.utils.TextureCache["images/anySpriteImage.png"];
  let sprite = new PIXI.Sprite(texture);
  ```
* loader加载器是加载任何类型图像所需的全部内容，如果使用加载器，则应通过引用加载器资源对象中的纹理来创建sprite
  ```
   PIXI.loader
    .add("image/pic01.jpg") // 加载图片
    .load(setup); // 所有图片加载完成后调用setup方法

  function setup() { // 加载完后制作精灵
    let sprite = new PIXI.Sprite(
      PIXI.loader.resources["image/pic01.jpg"].texture
    );
  }
  ```
* 如果要加载多个图像
  ```
  PIXI.loader
    .add("images/imageOne.png")
    .add("images/imageTwo.png")
    .add("images/imageThree.png")
    .load(setup);
  ``` 
  更好的方法
  ```
  PIXI.loader
  .add([
    "images/imageOne.png",
    "images/imageTwo.png",
    "images/imageThree.png"
  ])
  .load(setup);
  ```
* 删除精灵

      app.stage.removeChild(anySprite)

* 隐藏精灵

      anySprite.visible=false;
### 加载器对象要点

* 根据js图片对象或canvas制作精灵

  * js图片对象：
    ```
      let base = new PIXI.BaseTexture(anyImageObject),
      texture = new PIXI.Texture(base),
      sprite = new PIXI.Sprite(texture);
    ```
  * canvas：
    ```
      let base = new PIXI.BaseTexture.fromCanvas(anyCanvasElement),
    ```
* 改变精灵的纹理(外观)
    ```
    anySprite.texture=PIXI.utils.TextureCache["anyTexture.png"];
    ```
* 指定记载文件的名称(建议少使用)
  ```
  PIXI.loader
    .add("catImage", "images/cat.png")
    .load(setup);
  ```
  制作精灵
  ```
    new Sprite(PIXI.loader.rescouses.catImage.texture)
  ```
* 监听加载过程
```
PIXI.loader
    .add("images/cat.png")
    .on('progress',monitor) // 当一个文件加载就调用function
function loaderProgress(loader, resource){
  // resource.url  记载的路径
  // loader.progress 加载百分比
}
```

* PIXI.loader.add(name,url,options,callback) 

  >url是唯一必须的

1. name: 指定加载资源的名称

2. url: 加载资源的路径

3. options

    1. crossOrigin 请求是否跨域，自动确定
    2. loadType
    3. xhrType
4. callback: 资源加载完后调用

# 精灵属性

> 精灵层叠顺序：依次增加

* 位置
精灵默认添加到左上角 x=0,y=0

    sprite.x = 96;
    sprite.y = 96;
    或者
    sprite.position.set(x, y)

* 大小

    sprite.width = 96;
    sprite.height = 96;
    或者
    sprite.scale.x=0.5
    sprite.scale.y=0.5
    或者
    sprite.scale.set(0.5, 0.5);
* 旋转

    sprite.rotation =0.5
  具体值查看 [文档](https://www.mathsisfun.com/geometry/radians.html)

* 旋转中心（两种效果相同）

  anchor (锚点)：
  ```
  sprite.anchor.x=0.5
  sprite.anchor.y=0.5
  或者
  cat.anchor.set(x, y)
  ```
  pivot (枢纽)：
  ```
  cat.pivot.set(32, 32)
  ```

> 锚点和枢纽都是类似的，pivot使用像素来移动中心点

# 从图块上选取一部分制作精灵(tileset sub-image)

```
let texture = TextureCache["image/tileset.png"]
let rectangle = new PIXI.Rectangle(192, 128, 64, 64);
texture.frame = rectangle;
let recket = new Sprite(texture)
```

PIXI.Rectangle对象定义的四个参数：x和y的位置以及宽高

纹理有个参数叫frame，可以设置为任何rectangle对象，frame将纹理剪裁为rectangle的尺寸

### 使用合并图块(使用工具Texture Packer)
方法一：
```
PIXI.loader
    .add("image/treasureHunter.json")
    .load(setup);

function set(){
let dungeonTexture = PIXI.utils.TextureCache["dungeon.png"]
dungeon = new Sprite(dungeonTexture)
app.stage.addChild(dungeon)
}
```
方法二：
```
let id=PIXI.loader.resources["treasureHunter.json"].textures
dungeon = new Sprite(id["dungeon.png"])
app.stage.addChild(dungeon)
```
# 移动精灵
### 使用ticker添加一个循环函数，每秒循环60次
```
function setup() {
  app.ticker.add(delta => gameLoop(delta));
}

function gameLoop(delta){

  //Move the cat 1 pixel 
  cat.x += 1;
}
```
>将delta参数添加到猫的移动函数中，使移动和帧速率无关,一般用于慢速设备

    cat.x += 1 + delta;
### 也可以不适用ticker添加循环,使用requestAnimationFrame
```
function gameLoop() {
  requestAnimationFrame(gameLoop);
  //Move the cat
  cat.x += 1;
}

//Start the loop
gameLoop();
```
###  速度属性velocity 

vx  精灵在x轴上的速度和方向

vy  精灵在y轴上的速度和方向

    cat.x+=cat.vx;

# 精灵分组
 先创建精灵
```
// The cat
let cat = new Sprite(id["cat.png"]);
cat.position.set(16, 16);

// The hedgehog
let hedgehog = new Sprite(id["hedgehog.png"]);
hedgehog.position.set(32, 32);
```
创建container，把精灵加入分组

    let animals=new PIXI.Container()

    animals.addChild(cat);
    animals.addChild(hedgehog);
把container放入舞台

    app.stage.addChild(animals);

### 获取分组内所有精灵 

    animals.children

## 分组中本地定位和全局定位
* 本地定位：

    childSprite.x
    childSprite.y

* 全局定位：

    parentSprite.toGlobal(childSprite.position)

* 如果不知道精灵的父容器是什么：

    cat.parent.toGlobal(cat.position)

* 最好的方法，使用getGlobalPosition方法：

    cat.getGlobalPosition().x
    cat.getGlobalPosition().y

* 将全局定位转换为本地的定位：

    sprite.toLocal(sprite.position, anyOtherSprite)

# 用 ParticleContainer  对精灵进行分组
> 一种替代的、高性能分组方法，比container更快

> 缺点：
>>只有如下属性：x, y, width, height, scale, pivot, alpha(透明度), visible
>
>>不能包含嵌套子集
>
>>每个 ParticleContainer只能有一个纹理，想要精灵有不同外观不得不用spritesheet

### 在创建时可以有四个参数
    let superFastSprites = new PIXI.particles.ParticleContainer(maxSize, properties, batchSize, autoResize)

* maxSize 默认1500
* properties （如果想更改以下参数，设置为true）
  
  * scale  
  * position 默认true
  * rotation
  * uvs 只有在精灵改变纹理的时候设置为true
  * alphaAndTint 
* batchSize
* autoResize

# PIXI图像基元（Graphic Primitives）

上文都是用纹理来制作精灵，但是PIXI有低级绘图工具，可以制作矩形，形状，线条，复杂多边形和文本。

* 矩形
  ```
  let rectangle = new PIXI.Graphics();
  rectangle.lineStyle(4, 0xFF3300, 1);
  rectangle.beginFill(0x66CCFF);
  rectangle.drawRect(0, 0, 64, 64); // 开始点x y width height
  rectangle.endFill();
  rectangle.x = 170;
  rectangle.y = 170;
  rectangle.tint=0xff3300; // 着色
  app.stage.addChild(rectangle);
  ```
* 圆
  ```
  let circle = new PIXI.Graphics();
  circle.beginFill(0x9966FF);
  circle.drawCircle(0, 0, 32); // 圆心位置x y 半径
  circle.endFill();
  circle.x = 64;
  circle.y = 130;
  app.stage.addChild(circle);
  ```
* 椭圆

      drawEllipse(x, y, width, height);

* 圆角矩形

      drawRoundedRect(x, y, width, height, cornerRadius)

* 直线
  ```
  let line = new PIXI.Graphics();
  line.lineStyle(4, 0xFFFFFF, 1);
  line.moveTo(0, 0);
  line.lineTo(80, 50);
  line.x = 32;
  line.y = 32;
  app.stage.addChild(line);
  ```

* 多边形

  ```
  let triangle = new Graphics();
  let path = [
    point1X, point1Y, // 每个点的x和y
    point2X, point2Y,
    point3X, point3Y
  ];

  triangle.drawPolygon(path);
  ```
* 显示文字

  最简单的方式：
  ```
  let message = new PIXI.Text("Hello Pixi!");
  message.position.set(54, 96);
  app.stage.addChild(message);
  ```
  如果要设置更多样式：
  ```
  // 创建一个样式对象
  let style = new PIXI.TextStyle({
  fontFamily: "Arial",
  fontSize: 36,
  fill: "white",
  stroke: '#ff3300',
  strokeThickness: 4,
  dropShadow: true,
  dropShadowColor: "#000000",
  dropShadowBlur: 4,
  dropShadowAngle: Math.PI / 6,
  dropShadowDistance: 6,
  });
  // 然后将样式对象放在Text对象的第二个参数
  let message = new PIXI.Text("Hello Pixi!", style);
  ```
  创建之后改变文本内容和样式：

      message.text = "Text changed!";
      message.style = {fill: "black", font: "16px PetMe64"};

  包含很长的文本：

      message.style = {wordWrap: true, wordWrapWidth: 100, align: center};
      // 对齐不会影响单行文本

  使用自定义字体文件：
  ```
  @font-face {
    font-family: "fontFamilyName";
    src: url("fonts/fontFile.ttf");
  }
  ```
# 碰撞检测

* hitTestRectangle 检测是否有矩形精灵触碰

具体函数：

```
function hitTestRectangle(r1, r2) {

  //Define the variables we'll need to calculate
  let hit, combinedHalfWidths, combinedHalfHeights, vx, vy;

  //hit will determine whether there's a collision
  hit = false;

  //Find the center points of each sprite
  r1.centerX = r1.x + r1.width / 2;
  r1.centerY = r1.y + r1.height / 2;
  r2.centerX = r2.x + r2.width / 2;
  r2.centerY = r2.y + r2.height / 2;

  //Find the half-widths and half-heights of each sprite
  r1.halfWidth = r1.width / 2;
  r1.halfHeight = r1.height / 2;
  r2.halfWidth = r2.width / 2;
  r2.halfHeight = r2.height / 2;

  //Calculate the distance vector between the sprites
  vx = r1.centerX - r2.centerX;
  vy = r1.centerY - r2.centerY;

  //Figure out the combined half-widths and half-heights
  combinedHalfWidths = r1.halfWidth + r2.halfWidth;
  combinedHalfHeights = r1.halfHeight + r2.halfHeight;

  //Check for a collision on the x axis
  if (Math.abs(vx) < combinedHalfWidths) {

    //A collision might be occurring. Check for a collision on the y axis
    if (Math.abs(vy) < combinedHalfHeights) {

      //There's definitely a collision happening
      hit = true;
    } else {

      //There's no collision on the y axis
      hit = false;
    }
  } else {

    //There's no collision on the x axis
    hit = false;
  }

  //`hit` will be either `true` or `false`
  return hit;
};
```
>比较两个精灵中心点距离 和 两精灵一半距离相加的值

    hitTestRectangle(spriteOne, spriteTwo) // 如果触碰返回true

