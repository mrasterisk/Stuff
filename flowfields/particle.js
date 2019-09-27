function Particle(index) {
  this.pos = createVector(0, 0, 0);

  this.index = index;
  
  this.vel = createVector(0, 0);
  this.acc = createVector(0, 0);
  this.force = createVector(0, 0);
  this.time = 0;
  
  this.update = function() {
    this.force.mult(0);
    this.force.add(0, gravity * this.mass);
    
    this.relVel = createVector(
      this.vel.x - flowFieldx[floor(this.pos.x % width * res) + floor(this.pos.y % height * res) * width * res],
      this.vel.y - flowFieldy[floor(this.pos.x % width * res) + floor(this.pos.y % height * res) * width * res]//,
      //this.vel.z - flowFieldz[floor(this.pos.x % width * res) + floor(this.pos.y % height * res) * width * res]
    );
    this.drag = createVector(this.relVel.x, this.relVel.y).mult(-0.0001 * sqrt(this.mass) * this.relVel.magSq());
    this.force.add(this.drag);
    
    //this.force.add(flowFieldx[floor(this.pos.x * res) + floor(this.pos.y * res) * width * res], flowFieldy[floor(this.pos.x * res) + floor(this.pos.y * res) * width * res]);
    
    this.acc = this.force.div(this.mass);
    this.vel.add(this.acc);
    if (this.pos.z < 1.02) {
      this.vel.set(0.5 * flowFieldx[floor(this.pos.x % width * res) + floor(this.pos.y % height * res) * width * res] + random(-1, 1), gravity / 2 + 0.5 * flowFieldy[floor(this.pos.x % width * res) + floor(this.pos.y % height * res) * width * res]);
    }
    if (this.time > 60) {
      this.pos.add(this.vel);
      if (this.pos.z > 1.02) {
        this.pos.z += random(-0.1, 0.1);
      }
    }
    
    if (abs(this.pos.y - height / 2) > height / 2) {
      //this.randomize();
      for (i = particles.length - 1; i > this.index; i--) {
        particles[i].index--;
      }
      push();
      rectMode(CENTER);
      stroke(180, 180, 192, 64 * (2 - this.pos.z) + 64);
      strokeWeight(1);
      noFill();
      ellipse(this.pos.x - this.vel.x, (this.pos.y - this.vel.y) / this.pos.z, 5 * this.radius / this.pos.z, 2.5 * this.radius / this.pos.z);
      pop();
      particles.splice(this.index, 1);
    }
    if (this.pos.x < -10) {
      this.pos.add(width + 20, 0);
    }
    if (this.pos.x > width + 10) {
      this.pos.sub(width + 20, 0);
    }
    this.time++;
  };
  
  this.show = function() {
    if (this.pos.z > 1.02) {
      this.radius = pow(this.mass, 1 / 3);
      stroke(180, 180, 192, 64 * (2 - this.pos.z) + 64);
      strokeWeight(this.radius / this.pos.z);
      line(this.pos.x, this.pos.y / this.pos.z, (this.pos.x - this.vel.x + this.radius / this.pos.z * cos(atan2(this.vel.y, this.vel.x))), (this.pos.y - this.vel.y + this.radius / this.pos.z * sin(atan2(this.vel.y, this.vel.x))) / this.pos.z);
    }
    else {
      this.radius = 1.5 * pow(this.mass, 1 / 3);
      stroke(180, 180, 192, 192);
      strokeWeight(this.radius);
      line(this.pos.x, this.pos.y / this.pos.z, (this.pos.x - this.vel.x + this.radius / this.pos.z * cos(atan2(this.vel.y, this.vel.x))), (this.pos.y - this.vel.y + this.radius / this.pos.z * sin(atan2(this.vel.y, this.vel.x))) / this.pos.z);
    }
    
  };
  
  this.randomize = function() {
    this.pos = createVector(random(-20, width + 20), 0, 2.1 - pow(random(), 2));
    this.mass = 20 * pow(random(0, 1), 3);
    
    this.vel.mult(0);
  };
}
