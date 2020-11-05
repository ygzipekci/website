// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/IKB1hWWedMk

// Edited by SacrificeProductions

var cols, rows;
var scl = 15;
var w;
var h;

var terrain = [];

var video;

var shift = 0;
var low;
var high;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  w = width;
  h = height;
  cols = w / scl;
  rows = h / scl;

  video = createCapture(VIDEO);

  for (var x = 0; x < cols; x++) {
    terrain[x] = [];
    for (var y = 0; y < rows; y++) {
      terrain[x][y] = 0; //specify a default value for now
    }
  }
}

function draw() {
  video.size(w / scl, h / scl);
  background(0);

  video.loadPixels();
  loadPixels();
  shift -= 0.03;
  var yOffset = shift;
  //var yOffset = 0;
  for (var y = 0; y < video.height; y++) {
    var xOffset = 0;
    for (var x = 0; x < video.width; x++) {
      var index = (video.width - x - 1 + y * video.width) * 4;
      var r = video.pixels[index + 0];
      var g = video.pixels[index + 1];
      var b = video.pixels[index + 2];
      var brightness = (r + b + g) / 3;
      
      terrain[x][y] = map(brightness, 0, 255, -50, 100) + map(noise(xOffset, yOffset), 0, 1, -20, 20);
      xOffset += 0.1;      
    }
    yOffset += 0.1;
  }
 

  background(0, 29, 95);
  translate(0, 50);
  rotateX(map(mouseY, 0, height, PI/2, -PI/8));
  noFill();
  stroke(255, 0, 253);
  translate(-w / 2, -h / 2);
  for (y = 0; y < rows -2; y++) {
    beginShape(TRIANGLE_STRIP);
    for (x = 0; x < cols -1; x++) {
      vertex(x * scl, y * scl, terrain[x][y]);
      vertex(x * scl, (y + 1) * scl, terrain[x][y + 1]);
    }
    endShape();
  }
}
