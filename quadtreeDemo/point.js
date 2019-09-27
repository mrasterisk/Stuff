function Point(x, y) {
  this.x = x;
  this.y = y;
  
  this.show = function() {
    stroke(255);
    ellipse(this.x, this.y, 1);
    this.x += random(-1, 1);
    this.y += random(-1, 1);
  };
}
