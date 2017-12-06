let imgElement = document.getElementById('imageSrc');
let inputElement = document.getElementById('fileInput');
let src;
let n =0;

inputElement.addEventListener('change', (e) => {
  imgElement.src = URL.createObjectURL(e.target.files[0]);
}, false);
imgElement.onload = function() {
  src = cv.imread(imgElement);
  GrayFilter();
  sketch();
  Binarythreshold();
  bluefilter();
  cv.imshow('canvasOutput', src);
};

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
  // let dst = new cv.Mat();
  // // dst = src.clone();
  // for (let i = 1; i < src.rows; i++) {
  //     for (let j = 1; j < src.cols; j++) {
  //         dst.ucharPtr(i, j)[1] = src.ucharPtr(i, j)[1];
  //     }
  // }
  // cv.imshow('bluefilter', dst);
  let dstx = new cv.Mat();
  let dsty = new cv.Mat();
  cv.cvtColor(src, src, cv.COLOR_RGB2GRAY, 0);
  // You can try more different parameters
  cv.Sobel(src, dstx, cv.CV_8U, 1, 0, 3, 1, 0, cv.BORDER_DEFAULT);
  // cv.Sobel(src, dsty, cv.CV_8U, 0, 1, 3, 1, 0, cv.BORDER_DEFAULT);
  // cv.Scharr(src, dstx, cv.CV_8U, 1, 0, 1, 0, cv.BORDER_DEFAULT);
  // cv.Scharr(src, dsty, cv.CV_8U, 0, 1, 1, 0, cv.BORDER_DEFAULT);
  cv.imshow('bluefilter', dstx);
  // cv.imshow('canvasOutputy', dsty);
  dstx.delete(); dsty.delete();
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
