let imgElement = document.getElementById('imageSrc');
let inputElement = document.getElementById('fileInput');
inputElement.addEventListener('change', (e) => {
  imgElement.src = URL.createObjectURL(e.target.files[0]);
}, false);

var canvas = document.getElementById('canvasOutput');
var context = canvas.getContext("2d");
var img = document.getElementById('imageSrc');

imgElement.onload = function() {
  src = cv.imread(imgElement);
  mainfunc(this);
};


let src;
let n =0;
var x = 0;
var y = 0;
var width = 600;
var height = 500;



function blurfunc(){
  console.log("blur apply");
  let dst = new cv.Mat();
  let ksize = new cv.Size(5, 5);
  // You can try more different parameters
  cv.GaussianBlur(src, dst, ksize, 0, 0, cv.BORDER_DEFAULT);
  cv.imshow('canvasOutput', dst);
  src.delete(); dst.delete();
}

function GrayFilter()
{
  let dst = new cv.Mat();
  // You can try more different parameters
  
  cv.cvtColor(src, dst, cv.COLOR_RGBA2GRAY, 0);
  cv.imshow('grayconvas', dst);
}

function sketch()
{
  let dst = new cv.Mat();
  let low = new cv.Mat(src.rows, src.cols, src.type(), [0, 0, 0, 0]);
  let high = new cv.Mat(src.rows, src.cols, src.type(), [150, 150, 150, 255]);
  // You can try more different parameters
  cv.inRange(src, low, high, dst);
  cv.imshow('sketchcanvas', dst);
}

function Binarythreshold()
{
  let dst = new cv.Mat();
  // You can try more different parameters
  cv.threshold(src, dst, 177, 200, cv.THRESH_BINARY);
  cv.imshow('binarycanvas', dst);
}

function bluefilter()
{
}

function rotate()
{
let dst = new cv.Mat();
let dsize = new cv.Size(src.rows, src.cols);
let center = new cv.Point(src.cols / 2, src.rows / 2);
// You can try more different parameters
n = n+90
let M = cv.getRotationMatrix2D(center, n, 1);
cv.warpAffine(src, dst, M, dsize, cv.INTER_LINEAR, cv.BORDER_CONSTANT, new cv.Scalar());
cv.imshow('canvasOutput', dst);
dst.delete(); M.delete();
}

function check()
{
  let row = 3, col = 4;
  let img = cv.imread(imgElement);
  let dst = new cv.Mat(img.rows, img.cols);
  // let dst = new cv.MatVector();
  // dst = img.clone();
  if (img.isContinuous()) {
    let dst = img.data[row * src.cols * src.channels() + col * src.channels()];
}
  // dst = img.ucharAt(row, col * img.channels() + 1);
//   let rgbaPlanes = new cv.MatVector();
//   // Split the Mat
//   cv.split(img, rgbaPlanes);
//   // Get R channel
//   let R = rgbaPlanes.get(2);
  cv.imshow('canvasOutput1', dst);
  
//   // Merge all channels
//   cv.merge(rgbaPlanes, img);
//  rgbaPlanes.delete(); R.delete();
      
}

function bright()
{
  // let dst = new cv.Mat();
  // src.convertTo(dst, -1,2.2,50);
  // console.log("grayscale apply")
  // var ImgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  // var pixel = ImgData.data;
  // for(var i=0 ;i<pixel.lenght; i=i+4)
  // {
  //   var average = (pixel[i] + pixel[i+1] + pixel[i+2])/3;
  //   pixel[i] = average;
  //   pixel[i+1] = average;
  //   pixel[i+2] = average;
  // }
  // ctx.putImageData(ImgData, 0, 0);
  // ctx.drawImage(img, x, y, width, height);
  // cv.imshow('canvasOutput', dst);
}

function mainfunc(img) {
  
    context.drawImage(img, 0, 0);
    var ImgData = context.getImageData(0, 0, canvas.width, canvas.height);
    var pixel = ImgData.data;
      
    var invert = function() {
      for (var i = 0; i < data.length; i += 4) {
        data[i]     = 255 - data[i];     // red
        data[i + 1] = 255 - data[i + 1]; // green
        data[i + 2] = 255 - data[i + 2]; // blue
      }
      context.putImageData(imageData, 0, 0);
    };
  
    var grayscale = function() {
      console.log("saad");
      for(var i=0 ;i<pixel.lenght; i=i+4)
      {
        var average = (pixel[i] + pixel[i+1] + pixel[i+2])/3;
        pixel[i] = average;
        pixel[i+1] = average;
        pixel[i+2] = average;
      }
      context.putImageData(ImgData, 0, 0);
    };
  
    var invertbtn = document.getElementById('invertbtn');
    invertbtn.addEventListener('click', invert);
    var grayscalebtn = document.getElementById('grayscalebtn');
    grayscalebtn.addEventListener('click', grayscale);
  }