function QuadTree(x, y, w, h, cap) {
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.cap = cap;
  
  this.dots = [];
  this.branches = [];
  this.subdivided = false;
  
  this.insertDot = function(dot) {
    if (this.contains(dot)) {
      
      if (this.subdivided) {
        this.branches.forEach(function(branch) {
          branch.insertDot(dot);
        });
      }
      else {
        if (this.dots.length < this.cap) {
          this.dots.push(dot);
        }
        else {
          
          nw = new QuadTree(this.x        , this.y        , this.w / 2, this.h / 2, this.cap);
          ne = new QuadTree(this.x + w / 2, this.y        , this.w / 2, this.h / 2, this.cap);
          sw = new QuadTree(this.x        , this.y + h / 2, this.w / 2, this.h / 2, this.cap);
          se = new QuadTree(this.x + w / 2, this.y + h / 2, this.w / 2, this.h / 2, this.cap);
          this.branches = [nw, ne, sw, se,];
          this.subdivided = true;
          for (i = 0; i < this.dots.length; i++) {
            for(j = 0; j < this.branches.length; j++) {
              this.branches[j].insertDot(this.dots[i]);
            }
          }
          this.dots = [];
          
          this.branches.forEach(function(branch) {
            branch.insertDot(dot);
          });
        }
      }
      
    }
  };
  
  this.contains = function(dot) {
    return (
      dot.x >= this.x &&
      dot.x < this.x + this.w &&
      dot.y >= this.y &&
      dot.y < this.y + this.h
    );
  };
  
  this.subdivide = function() {
      
  };
  
  this.show = function() {
    if (this.subdivided) {
      this.branches.forEach(function(branch) {
        branch.show();
      });
    }
    else {
      push();
      fill(255, 0, 0, 128 * this.dots.length / this.cap);
      strokeWeight(1);
      stroke(255);
      rectMode(CORNER);
      rect(x, y, w, h);
      pop();
    }
  };
  
}
