function Blob(pos, size, reflex, colour, type) {
  this.pos = pos;
  this.size = size;
  this.reflex = reflex;
  this.colour = colour;
  this.type = type;
  this.vel = createVector(0, 0);
  this.radius = 2.5 * pow(this.size, 0.5);
  
  this.t = 0;
  
  this.move = function() {
    if (this.type == 'cell' || this.type == 'player') {
      
      this.speed = (this.size / pow(this.size, 1.1)) * 10 / 60;
      
      if (this.type == 'cell') {
        
        if (random() < 0.0001) {
          this.die();
        }
        
        this.pos.add(p5.Vector.random2D().mult(this.speed));
        
        if (this.t % 60 * this.reflex / timeStep < 1) {
          this.vel.mult(0);
          
          for (c = 0; c < blobs.length; c++) {
            if (abs(blobs[c].pos.x - this.pos.x - blobs[c].radius) < 10 * this.radius * (width / height) && abs(blobs[c].pos.y - this.pos.y - blobs[c].radius) < 10 * this.radius) {
              if (blobs[c].size * eatRatio <= this.size) {
                this.vel.add(p5.Vector.sub(blobs[c].pos, this.pos).mult(blobs[c].size * pow(this.pos.dist(blobs[c].pos), -2)));
              }
              if (blobs[c].size > this.size * eatRatio) {
                this.vel.add(p5.Vector.sub(this.pos, blobs[c].pos).mult(10 * pow(this.pos.dist(blobs[c].pos) - blobs[c].radius, -2)));
              }
            }
          }
        }
        
        //this.pos.sub(mid);
        //this.pos.limit(r - this.radius);
        //this.pos.add(mid);
        
        this.t += timeStep;
      }
      else {
        this.vel = createVector(mouseX - width / 2, mouseY - height / 2);
      }
      
      this.vel.normalize();
      this.pos.add(this.vel.mult(10 * timeStep * this.speed).limit(2 * this.radius));
      
      if (this.pos.x < 0) {
        this.pos.set(0, this.pos.y);
      }
      if (this.pos.y < 0) {
        this.pos.set(this.pos.x, 0);
      }
      if (this.pos.x > width) {
        this.pos.set(width, this.pos.y);
      }
      if (this.pos.y > height) {
        this.pos.set(this.pos.x, height);
      }
      
      
      for (b = 0; b < blobs.length; b++) {
        this.other = blobs[b];
        if (this.isTouching()) {
          if (this.size >= eatRatio * this.other.size) {
            this.eat(this.other);
          }
        }
      }
      
      this.size *= pow(0.9998, timeStep);
      this.size = max(this.size, eatRatio);
      
    }
  };
  
  this.eat = function(other) {
    this.size += 0.8 * other.size;
    other.die();
  };
  
  this.die = function() {
    for(a = 0; a < blobs.length; a++){ 
      if (blobs[a] == this) {
        blobs.splice(a, 1); 
      }
    }
  };
  
  this.isTouching = function() {
    if (this.other != this) {
      return this.pos.dist(this.other.pos) <= this.radius;
    }
    else {
      return false;
    }
  };
  
  this.display = function() {
    this.radius = 2.5 * pow(this.size, 0.5);
    stroke(0);
    if (this.size == maxSize) {
      strokeWeight(4);
    }
    else {
      strokeWeight(1);
    }
    fill(this.colour);
    if (this.type == 'cell' || this.type == 'player') {
      ellipse((this.pos.x - focusPos.x) / focusFov.x + width / 2, (this.pos.y - focusPos.y) / focusFov.y + height / 2, 2 * this.radius / focusFov.x, 2 * this.radius / focusFov.y);
    }
    else {
      quad(
        (this.pos.x - focusPos.x + 5 * noise(this.pos.x, 1)) / focusFov.x + width / 2,
        (this.pos.y - focusPos.y + 5 * noise(this.pos.x, 2)) / focusFov.y + height / 2,
        (this.pos.x - focusPos.x + 5 * noise(this.pos.x, 3)) / focusFov.x + width / 2,
        (this.pos.y - focusPos.y - 5 * noise(this.pos.x, 4)) / focusFov.y + height / 2,
        (this.pos.x - focusPos.x - 5 * noise(this.pos.x, 5)) / focusFov.x + width / 2,
        (this.pos.y - focusPos.y - 5 * noise(this.pos.x, 6)) / focusFov.y + height / 2,
        (this.pos.x - focusPos.x - 5 * noise(this.pos.x, 7)) / focusFov.x + width / 2,
        (this.pos.y - focusPos.y + 5 * noise(this.pos.x, 8)) / focusFov.y + height / 2
      );
    }
  }
}
