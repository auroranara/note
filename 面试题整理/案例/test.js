
const url = 'https://pic4.zhimg.com/50/v2-d59417f35c710adfba8cbce8951c08d0_400x224.jpg'
let image = new Image()
image.src = url
image.onload = function () {
  const dom = document.createElement('canvas')
  const canvas = dom.getContext('2d')
  canvas.drawImage(image)
  const newUrl = canvas.toDataURL()
  console.log('newUrl', newUrl);

}
