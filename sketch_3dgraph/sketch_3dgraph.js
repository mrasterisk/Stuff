columns = [];
function setup() {
  createCanvas(1200, 800);
  deltaT = 1;
  w = 32;
  h = 32;
  size = 3;
  grid = true;
  angle = 0;
  transX = width / 2;
  transY = 2 * height / 3;
  
  for (y = 0; y < h; y++) {
    for (x = 0; x < w; x++) {
      column = new Column(4 * size * (x - floor(w / 2)), 4 * size * (y - floor(h / 2)));
      columns.push(column);
    }
  }
  
  pressed = false;
  pressedX = 0;
  pressedY = 0;
}

function draw() {
  translate(transX, transY);
  background(50);
  therm = 0;
  for (i = 0; i < w * h; i++) {
    columns[i].update1();
    therm += columns[i].height;
  }
  
  if (grid) {
    strokeWeight(1);
  }
  else {
    strokeWeight(0);
  }
  
  for (y = 0; y < h; y++) {
    for (x = 0; x < w; x++) {
      columns[index(x, y)].update2();
      columns[index(x, y)].show();
    }
  }
  translate(-transX, -transY);
  fill(0, 0, 0);
  text(therm, 0, 16);
}

function mousePressed() {
  for (y = 0; y < h; y++) {
    for (x = 0; x < w; x++) {
      //if (round((0.5 * (mouseX - width / 2) / size + (mouseY - height / 2 + columns[index(x, y)].height / 2) / size) / 2) + w / 2 == columns[index(x, y)].gridx &&
      //round(((mouseY - height / 2 + columns[index(x, y)].height / 2) / size - 0.5 * (mouseX - width / 2) / size) / 2) + h / 2 == columns[index(x, y)].gridy) {
      if (abs((mouseX - transX) - columns[index(x, y)].x) < 2 * size) {
        if ((mouseY - transY) < columns[index(x, y)].y + size && (mouseY - transY) > columns[index(x, y)].y - columns[index(x, y)].height / 2 - (size - abs((mouseX - transX) - columns[index(x, y)].x) / 2)) {
          pressedX = columns[index(x, y)].gridx;
          pressedY = columns[index(x, y)].gridy;
          pressed = true;
        }
      }
    }
  }
}

function mouseReleased() {
  pressed = false;
}

function keyPressed() {
  if (key == 'z') {
    grid = !grid;
  }
  if (keyCode === LEFT_ARROW) {
    angle -= HALF_PI;
    columns.forEach(function(column) {
      column.newX = column.gridy;
      column.newY = -column.gridx + w - 1;
      column.gridx = column.newX;
      column.gridy = column.newY;
    });
    newW = h;
    newH = w;
    w = newW;
    h = newH;
  }
  else if (keyCode === RIGHT_ARROW) {
    angle += HALF_PI;
    columns.forEach(function(column) {
      column.newX = -column.gridy + h - 1;
      column.newY = column.gridx;
      column.gridx = column.newX;
      column.gridy = column.newY;
    });
    newW = h;
    newH = w;
    w = newW;
    h = newH;
  }
  if (angle < 0) {
      angle = 3 * HALF_PI; 
    }
    if (angle > 3 * HALF_PI) {
      angle = 0; 
    }
}

function index(x, y) {
  if (angle == 0) {
        return x + y * w;
      }
      if (angle == HALF_PI) {
        return y + (w - x - 1) * h;
      }
      if (angle == PI) {
        return w * h - x - y * w - 1;
      }
      if (angle == 3 * HALF_PI) {
        return h - y - 1 + x * h;
      }
}
