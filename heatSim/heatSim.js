let img;
let heatArray = [];
let bufferArray = [];
deltaT = 0.5;

function setup() {
  createCanvas(200, 200);
  img = createImage(width, height);
  
  for (x = 0; x < width; x++) {
    heatArray[x] = [];
    bufferArray[x] = [];
    for (y = 0; y < height; y++) {
      heatArray[x][y] = 0;
      bufferArray[x][y] = 0;
    }
  }
  
}

function draw() {
  background(0);
  
  if (mouseIsPressed) {
    if (mouseButton === LEFT) {
      for (x = 0; x < width; x++) {
        for (y = 0; y < height; y++) {
          if (dist(x, y, mouseX, mouseY) < 10) {
            heatArray[x][y] = min(240, heatArray[x][y] + 100);
          }
        }
      }
    }
    else {
      for (x = 0; x < width; x++) {
        for (y = 0; y < height; y++) {
          if (dist(x, y, mouseX, mouseY) < 10) {
            heatArray[x][y] = max(0, heatArray[x][y] - 100);
          }
        }
      }
    }
  }

  for (x = 0; x < width; x++) {
    for (y = 0; y < height; y++) {
      count = 1;
      bufferArray[x][y] = heatArray[x][y];
      //right
      if (x < width - 1) {
        bufferArray[x][y] += heatArray[x + 1][y];
        count++;
      }

      //down
      if (y < height - 1) {
        bufferArray[x][y] += heatArray[x][y + 1];
        count++;
      }

      //left
      if (x > 0) {
        bufferArray[x][y] += heatArray[x - 1][y];
        count++;
      }

      //up
      if (y > 0) {
        bufferArray[x][y] += heatArray[x][y - 1];
        count++;
      }
      
      bufferArray[x][y] /= count;
    }
  }
  
  for (x = 0; x < width; x++) {
    for (y = 0; y < height; y++) {
      tempDiff = bufferArray[x][y] - heatArray[x][y];
      heatArray[x][y] += deltaT * tempDiff;
    }
  }

  heatArray = bufferArray;
  
  img.loadPixels();
  for (let x = 0; x < img.width; x++) {
    for (let y = 0; y < img.height; y++) {
      colorMode(HSB);
      c = color(240 - min(240, max(0, heatArray[x][y])), 100, 100, 256);
      img.set(x, y, c);
    }
  }
  img.updatePixels();
  
  image(img, 0, 0);
  
  fill(255);
  noStroke();
  //text(velocityArray[mouseX][mouseY][0], 8, 16);
}

function sign(x) {
  if (x != 0) {
    return x / abs(x);
  }
  else {
    return 0;
  }
}
