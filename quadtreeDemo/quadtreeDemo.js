function setup() {
  createCanvas(200, 200);
  points = [];
}


function draw() {
  background(0);
  quadTree = new QuadTree(0, 0, width, height, 1);
  points.forEach(function(point){
    point.show();
    quadTree.insertDot(point);
  });
  quadTree.show();
}

function mousePressed() {
  point = new Point(mouseX, mouseY);
  points.push(point);
}
