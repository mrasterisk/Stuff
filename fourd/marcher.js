function Marcher(x, y, z, w, screenX, screenY) {
  this.x = x;
  this.y = y;
  this.z = z;
  this.w = w;
  this.screenX = screenX;
  this.screenY = screenY;
  this.direction = createVector(this.screenX / width, this.screenY / width, 1).limit(1);
  this.stepCount = 0;
  
  this.findDist = function() {
    minDist = Infinity;
    testCubes.forEach(function(cube) {
      clampX = min(max(cube.corner[0][0], cube.corner[1][0]), max(min(cube.corner[0][0], cube.corner[1][0]), this.x));
      clampY = min(max(cube.corner[0][1], cube.corner[1][1]), max(min(cube.corner[0][1], cube.corner[1][1]), this.y));
      clampZ = min(max(cube.corner[0][2], cube.corner[1][2]), max(min(cube.corner[0][2], cube.corner[1][2]), this.z));
      clampW = min(max(cube.corner[0][3], cube.corner[1][3]), max(min(cube.corner[0][3], cube.corner[1][3]), this.w));
      
      d = dist4d([this.x, this.y, this.z, this.w,], [clampX, clampY, clampZ, clampW,]);
      if (d < minDist) {
        minDist = d;
      }
    });
    return minDist;
  };
  
  this.step = function() {
    this.direction.set((this.screenX - width / 2) / width, (this.screenY - height / 2) / width, 1).limit(1);
    this.direction.mult(this.findDist());
    
    this.x += this.direction.x;
    this.y += this.direction.y;
    this.z += this.direction.z;
    this.w += this.direction.w;
    this.stepCount++;
    return this.stepCount;
    
  };
}
