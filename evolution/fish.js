function Fish(parentPos, parentSize, parentSpeed, parentSight, parentDisease, parentImmunity, parentGravity) {

  
  //inherited traits
  this.size = max(parentSize * (1 + random(-mutRate, mutRate)), 1);
  this.pos = p5.Vector.random2D().mult(parentSize + this.size + 5).add(parentPos);
  this.speed = max(parentSpeed * (1 + random(-mutRate, mutRate)), 0);
  this.sight = max(parentSight  * (1 + random(-mutRate, mutRate)), 0);
  this.disease = parentDisease;
  this.immunity = max(parentImmunity * (1 + random(-mutRate, mutRate)), 0);
  this.gravity = max(parentImmunity * (1 + random(-mutRate, mutRate)), 0);
  
  this.maxEnergy = 2000;
  this.energy = this.maxEnergy / 2;
  
  this.force = createVector(0, 0);
  this.vel = createVector(0, 0);
  
  this.age = function() {
    this.income = -((3 * this.disease + 1) * (0.01 + 0.001 * this.sight + 0.1 * this.immunity + 0.0005 * pow(this.speed / 4 + 0.5, 2) * pow(this.size, 3) + 0.0005 * pow(this.size, 3)));
    
    if (!this.disease) {
      this.income += light;
      /*
      if (this.pos.dist(mid) < 0.4 * d / 2) {
        this.income += 10;
      }
      else if (this.pos.dist(mid) < 0.6 * d / 2) {
        this.income += 2;
      }
      else {
        this.income += light;
      }
      */
    }
    
    if (this.force != createVector(0, 0)) {
      this.income -= (3 * this.disease + 1) * (0.0005 * pow(this.speed + 0.5, 2) * pow(this.size, 3));
    }
    
    this.energy += this.income * timestep;
    
    if (random(5000 * this.immunity + 1) < timestep) {
      this.disease = true;
    }
    
    if (this.energy > this.maxEnergy) {
      this.reproduce();
    }
    if (this.energy <= 0) {
      this.die();
    }
  };
  
  this.die = function() {
    for(a = 0; a < fishes.length; a++){ 
      if (fishes[a] == this) {
        fishes.splice(a, 1); 
      }
    }
  };
  
  this.move = function() {
    
    this.pos.add(p5.Vector.random2D().mult(this.speed / 4));
    
    this.force.mult(0);
    this.vel.mult(0);

    for (c = 0; c < fishes.length; c++) {
      if (this.size / fishes[c].size > eatRatio || fishes[c].size / this.size > eatRatio) {
        if (this.canSee(fishes[c])) {
          
          this.force = createVector(
          
          //fishes[c].pos.x - (this.pos.x - (abs(this.pos.x - fishes[c].pos.x) / (this.pos.x - fishes[c].pos.x)) * d * (this.pos.x - fishes[c].pos.x > d / 2)),
          //fishes[c].pos.y - (this.pos.y - (abs(this.pos.y - fishes[c].pos.y) / (this.pos.y - fishes[c].pos.y)) * d * (this.pos.y - fishes[c].pos.y > d / 2))
          
          fishes[c].pos.x - this.pos.x,
          fishes[c].pos.y - this.pos.y
          
          ).mult(this.size - fishes[c].size).mult(pow(this.pos.dist(fishes[c].pos), -2)).mult(fishes[c].energy);
          
          this.vel = this.vel.add(this.force);
        }
      }
    }
    this.vel.normalize();
    this.vel.mult(this.speed / (this.disease + 1));
    this.pos.add(this.vel.mult(timestep));
    
    //this.pos.add(createVector(0, this.gravity));
    
    this.pos.sub(mid);
    this.pos.limit(d / 2 - this.size);
    this.pos.limit(this.pos.mag() - this.gravity);
    this.pos.add(mid);
    
    /*
    if (this.pos.x < 0) {
      this.pos.set(this.pos.x + d - 1, this.pos.y);
    }
    if (this.pos.x > d) {
      this.pos.set(this.pos.x - d + 1, this.pos.y);
    }
    if (this.pos.y < 0) {
      this.pos.set(this.pos.x, this.pos.y + d - 1);
    }
    if (this.pos.y > d) {
      this.pos.set(this.pos.x, this.pos.y - d + 1);
    }
    */
    
    for (b = 0; b < fishes.length; b++) {
      if (this.isTouching(fishes[b])) {
        if (this.size > eatRatio * fishes[b].size) {
          this.eat(fishes[b]);
        }
        else {
          this.overlap = (this.size + fishes[b].size) - this.pos.dist(fishes[b].pos);
          this.pos.add(p5.Vector.sub(this.pos, fishes[b].pos).normalize().mult(this.overlap / 2));
        }
      }
    }
    
  };
  
  this.reproduce = function() {
    fish = new Fish(this.pos, this.size, this.speed, this.sight, this.disease, this.immunity);
    fishes.push(fish);
    this.energy *= 0.5;
  };
  
  this.isTouching = function(other) {
    if (other != this) {
      return this.pos.dist(other.pos) <= this.size + other.size;
    }
    else {
      return false;
    }
  };
  
  this.canSee = function(other) {
    /*
    return dist(this.pos.x,                                                        this.pos.y,                                                        other.pos.x, other.pos.y) <= this.sight ||
           dist(this.pos.x - d * (abs(this.pos.x - d / 2) / (this.pos.x - d / 2)), this.pos.y,                                                        other.pos.x, other.pos.y) <= this.sight ||
           dist(this.pos.x,                                                        this.pos.y - d * (abs(this.pos.x - d / 2) / (this.pos.x - d / 2)), other.pos.x, other.pos.y) <= this.sight ||
           dist(this.pos.x - d * (abs(this.pos.x - d / 2) / (this.pos.x - d / 2)), this.pos.y - d * (abs(this.pos.x - d / 2) / (this.pos.x - d / 2)), other.pos.x, other.pos.y) <= this.sight;
           */
    return dist(this.pos.x, this.pos.y, other.pos.x, other.pos.y) - this.size - other.size <= this.sight;
  };
  
  this.eat = function(food) {
    this.energy += 0.1 * 100 * timestep;
    food.energy -= 100 * timestep;
    if (food.disease && random(this.immunity + 1) < 1 && random(1000 / (100 * timestep)) < 1) {
      this.disease = true;
    }
  };
  
  this.display = function(mode) {
    if (mode == 'normal' || mode == 'statsHidden') {
      fill(255 * this.disease, map(this.energy, 0, this.maxEnergy, 0, 255), 0);
      noStroke();
      ellipse(this.pos.x, this.pos.y, 2 * this.size, 2 * this.size);
    }
    if (mode == 'size') {
      fill(255 * this.disease, map(this.energy, 0, this.maxEnergy, 0, 255), 0);
      noStroke();
      ellipse(this.pos.x, this.pos.y, map(this.size, minSize, maxSize, 1, max(40, 2 * maxSize)), map(this.size, minSize, maxSize, 1, max(40, 2 * maxSize)));
    }
    if (mode == 'speed') {
      fill(map(this.speed, 0, maxSpeed, 64, 255));
      noStroke();
      ellipse(this.pos.x, this.pos.y, 2 * this.size, 2 * this.size);
    }
    if (mode == 'sight') {
      fill(255 * this.disease, map(this.energy, 0, this.maxEnergy, 0, 255), 0);
      noStroke();
      ellipse(this.pos.x, this.pos.y, 2 * this.size, 2 * this.size);
      fill(255, 16);
      ellipse(this.pos.x, this.pos.y, 2 * (this.sight + this.size), 2 * (this.sight + this.size));
    }
    if (mode == 'immunity') {
      fill(255 * this.disease, map(this.energy, 0, this.maxEnergy, 0, 255), 0);
      stroke(map(this.immunity, 0, 1, 0, 255));
      strokeWeight(2 * this.immunity);
      ellipse(this.pos.x, this.pos.y, 2 * this.size, 2 * this.size);
      noStroke();
    }
    if (mode == 'energy') {
      colorMode(HSB);
      fill(min(map(this.income, -light, light, 0, 120), 120), 255, map(this.energy, 0, this.maxEnergy, 0, 255));
      stroke((this.income > 0) * 120, 255, 255);
      strokeWeight(2);
      ellipse(this.pos.x, this.pos.y, 2 * this.size, 2 * this.size);
      colorMode(RGB);
      noStroke();
    }
  };
  
}
