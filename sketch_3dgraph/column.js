function Column(x, y) {
  //Position in grid (top is (0,0), x is down to the right, y is down to the left)
  this.gridx = x / (4 * size) + floor(w / 2);
  this.gridy = y / (4 * size) + floor(h / 2);
  
  //Position on screen
  this.x = (4 * size * (this.gridx - floor(w / 2))) / 2 - (4 * size * (this.gridy - floor(h / 2))) / 2;
  this.y = -(4 * size * (this.gridx - floor(w / 2))) / 4 + (4 * size * (this.gridy - floor(h / 2))) / 4;
  
  this.height = 0;
  
  this.update1 = function() {
    this.newHeight = this.height;
    this.count = 1;
    
    if (this.gridx != 0) {
      this.newHeight += columns[index(this.gridx - 1, this.gridy)].height;
      this.count++;
    }
    if (this.gridx != w - 1) {
      this.newHeight += columns[index(this.gridx + 1, this.gridy)].height;
      this.count++;
    }
    if (this.gridy != 0) {
      this.newHeight += columns[index(this.gridx, this.gridy - 1)].height;
      this.count++;
    }
    if (this.gridy != h - 1) {
      this.newHeight += columns[index(this.gridx, this.gridy + 1)].height;
      this.count++;
    }
    
    this.newHeight /= this.count;
    
  };
  this.update2 = function() {
    this.heightDiff = this.newHeight - this.height;
    this.height += deltaT * this.heightDiff;
  };
  
  this.show = function() {
    
    this.x = (4 * size * (this.gridx - floor(w / 2))) / 2 - (4 * size * (this.gridy - floor(h / 2))) / 2;
    this.y = (4 * size * (this.gridx - floor(w / 2))) / 4 + (4 * size * (this.gridy - floor(h / 2))) / 4;

    if (pressed && this.gridx == pressedX && this.gridy == pressedY) {
      this.height = max(0, 2 * (this.y - mouseY + transY));
    }
    
    colorMode(HSB);
    fill((1 - this.height / height) * 240, 100, 100);
    stroke((1 - this.height / height) * 240, 100, 50);
    quad(this.x - 2 * size, this.y - this.height / 2, this.x, this.y - size - this.height / 2, this.x + 2 * size, this.y - this.height / 2, this.x, this.y + size - this.height / 2);
    
    fill((1 - this.height / height) * 240, 100, 75);
    stroke((1 - this.height / height) * 240, 100, 37.5);
    quad(this.x - 2 * size, this.y - this.height / 2, this.x, this.y + size - this.height / 2, this.x, this.y + size, this.x - 2 * size, this.y);
     
    fill((1 - this.height / height) * 240, 100, 50);
    stroke((1 - this.height / height) * 240, 100, 25);
    quad(this.x + 2 * size, this.y - this.height / 2, this.x, this.y + size - this.height / 2, this.x, this.y + size, this.x + 2 * size, this.y);
  };
}
