let imgElement = document.getElementById('imageSrc');
let inputElement = document.getElementById('fileInput');
inputElement.addEventListener('change', (e) => {
  imgElement.src = URL.createObjectURL(e.target.files[0]);
}, false);

var canvas = document.getElementById('canvasOutput');
var context = canvas.getContext("2d");
var img = document.getElementById('imageSrc');
var degree = 0;
imgElement.onload = function() {
  src = cv.imread(imgElement);
  applyFilters(img);
  // sketch();
  // Binarythreshold();
};

function applyFilters(img) {

  context.drawImage(img, 0, 0);
  var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
  var data = imageData.data;
    
  var invert = function() {
    for (var i = 0; i < data.length; i += 4) {
      //red
      data[i]     = 255 - data[i];     
      //Green
      data[i + 1] = 255 - data[i + 1]; 
      //Blue
      data[i + 2] = 255 - data[i + 2]; 
    }
    context.putImageData(imageData, 0, 0);
  };

  var grayscale = function() {
    for (var i = 0; i < data.length; i += 4) {
      var avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
      data[i]     = avg; 
      data[i + 1] = avg; 
      data[i + 2] = avg; 
    }
    context.putImageData(imageData, 0, 0);
  };

  var incbrightness = function(){
    for (var i = 0; i < data.length; i += 4) {
      data[i]     = data[i]+10;
      data[i + 1] = data[i+1]+10;
      data[i + 2] = data[i+2]+10;
    }
    context.putImageData(imageData, 0, 0);
  };

  var dcrbrightness = function(){
    for (var i = 0; i < data.length; i += 4) {
      data[i]     = data[i]-10;
      data[i + 1] = data[i+1]-10;
      data[i + 2] = data[i+2]-10;
    }
    context.putImageData(imageData, 0, 0);
  };

  //Rotate clockwise and anti clockwise
var clockwiseRotate = function(){
  degree+=90;
  rotatefunc(degree);
};

var anticlockwiseRotate = function(){
  degree-=90;
  rotatefunc(degree);
};

function rotatefunc(degrees){
  context.clearRect(0,0,canvas.width,canvas.height);
  context.save();
  context.translate(canvas.width/2,canvas.height/2);
  context.rotate(degrees*Math.PI/180);
  context.drawImage(img,-img.width/2,-img.height/2);
  context.restore();
}

//Brightness function ,Value in %
var brightnessfunc = function(){
  var id = document.getElementById("brightnessId");
  var value = id.value/100;
  console.log(value);
  context.filter = "brightness("+value+")";
  context.drawImage(img,0,0);

  
};

//contrast function
var contrastfunc = function(){
  var id = document.getElementById("contrastId");
  var value = id.value/100;
  console.log(value);
  context.filter = "contrast("+value+")";
  context.drawImage(img,0,0);
};

//saturation function
var saturatefunc = function(){
  var id = document.getElementById("saturateId");
  var value = id.value/100;
  console.log(value);
  context.filter = "saturate("+value+")";
  context.drawImage(img,0,0);
};

//Hue function .Value in degree
var huefunc = function(){
  var id = document.getElementById("hueid");
  var value = id.value;
  console.log(value);
  context.filter = "hue-rotate("+value+"deg)";
  context.drawImage(img,0,0);
};

//Blur function value in pixel
var blurfunc = function(){
  var id = document.getElementById("blurId");
  var value = id.value;
  console.log(value);
  context.filter = "blur("+value+"px)";
  context.drawImage(img,0,0);
};

//undo
var undo = function()
{
  context.drawImage(img,0,0);
};

var x = 0,y=0,
currX = 0,
currY = 0;
function penDraw() {
  context.moveTo(x, y);
  context.lineTo(currX, currY);
  context.strokeStyle = "Black";
  context.lineWidth = "4px";
  context.stroke();
}
canvas.addEventListener("mousemove", function (e) {
  x = currX;
  y = currY;
  currX = e.clientX;
  currY = e.clientY;
  penDraw();
}, false);


  var invertbtn = document.getElementById('invertbtn');
  invertbtn.addEventListener('click', invert);
  var grayscalebtn = document.getElementById('grayscalebtn');
  grayscalebtn.addEventListener('click', grayscale);
  var undobtn = document.getElementById('undobtn');
  undobtn.addEventListener('click', undo);
  var brightInc = document.getElementById('brightIncbtn');
  brightInc.addEventListener('click', incbrightness);
  var brightDcr = document.getElementById('brightDcrbtn');
  brightDcr.addEventListener('click', dcrbrightness);
  var rotateright = document.getElementById('rotaterighbtn');
  rotateright.addEventListener('click', clockwiseRotate);
  var rotateleft = document.getElementById('rotateleftbtn');
  rotateleft.addEventListener('click', anticlockwiseRotate);
  var b = document.getElementById('brightnessId');
  b.addEventListener('click', brightnessfunc);
  var c = document.getElementById('contrastId');
  c.addEventListener('click', contrastfunc);
  var s = document.getElementById('saturateId');
  s.addEventListener('click', saturatefunc);
  var h = document.getElementById('hueid');
  h.addEventListener('click', huefunc);
  var bl = document.getElementById('blurId');
  bl.addEventListener('click', blurfunc);
}


// function sketch()
// {
//   let dst = new cv.Mat();
//   let low = new cv.Mat(src.rows, src.cols, src.type(), [0, 0, 0, 0]);
//   let high = new cv.Mat(src.rows, src.cols, src.type(), [150, 150, 150, 255]);
//   // You can try more different parameters
//   cv.inRange(src, low, high, dst);
//   cv.imshow('sketchcanvas', dst);
// }

// function Binarythreshold()
// {
//   let dst = new cv.Mat();
//   // You can try more different parameters
//   cv.threshold(src, dst, 177, 200, cv.THRESH_BINARY);
//   cv.imshow('binarycanvas', dst);
// }

// function rotate()
// {
// let dst = new cv.Mat();
// let dsize = new cv.Size(src.rows, src.cols);
// let center = new cv.Point(src.cols / 2, src.rows / 2);
// // You can try more different parameters
// n = n+90
// let M = cv.getRotationMatrix2D(center, n, 1);
// cv.warpAffine(src, dst, M, dsize, cv.INTER_LINEAR, cv.BORDER_CONSTANT, new cv.Scalar());
// cv.imshow('canvasOutput', dst);
// dst.delete(); M.delete();
// }


// var blurfunc = function(){
//   console.log("blur apply");
//   let dst = new cv.Mat();
//   let ksize = new cv.Size(5, 5);
//   cv.GaussianBlur(src, dst, ksize, 0, 0, cv.BORDER_DEFAULT);
//   // context.drawImage(dst, 0, 0);
//   // cv.imshow('canvasOutput', dst);
//   // dst.delete();
// }