const load = require('load-asset');
// image process
const img = await load('/sailor-moon/moon.jpg');
let pres = 51;
let image = Array.from(Array(pres), () => new Array(pres))
let canv = document.createElement('canvas');
let ctx = canv.getContext('2d');
canv.width = pres;
canv.height = pres;
ctx.clearRect(0,0,pres,pres)
ctx.drawImage(img, 0, 0, pres, pres);
var imageData = ctx.getImageData(0, 0, pres,pres);
for (let i = 0; i < imageData.data.length; i=i+4) {
  var x = (i / 4) % pres;
  var y = Math.floor((i / 4) / pres);
  image[x][y] = imageData.data[i] ;
  image[x][y] = [imageData.data[i],imageData.data[i+1],imageData.data[i+2]] ;
}
// end image process


// non square
let image = Array.from(Array(width), () => new Array(height))
let canv = document.createElement('canvas');
let ctx = canv.getContext('2d');
canv.width = width;
canv.height = height;
ctx.clearRect(0,0,width,height)
ctx.drawImage(img, 0, 0, width, height);
var imageData = ctx.getImageData(0, 0, width,height);
for (let i = 0; i < imageData.data.length; i=i+4) {
  var x = (i / 4) % width;
  var y = Math.floor((i / 4) / width);
  image[x][y] = imageData.data[i+1]/255 ;
}