[官方文档](https://github.com/kittykatattack/learningPixi#settingup)

### 开始

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

### Pixi sprites(精灵)

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
* 完整代码
  ```
   PIXI.loader
    .add("image/pic01.jpg")
    .load(setup);

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