function setup() {
  createCanvas(100, 100);
  img = createImage(width, height);
  
  t = 0;
  
  fov = HALF_PI / 2;
  camX = 0;
  camY = 0;
  camZ = -4;
  camW = 0;
  vx = 0;
  vy = 0;
  vz = 0;
  vw = 0;
  canJump = true;
  camSpeed = 0.1;
  
  rotXY = 0;
  rotYZ = 0;
  rotXZ = 0;
  rotXW = 0;
  rotYW = 0;
  rotZW = 0;
  
  testCubes = [];
  for (i = 0; i < 1; i++) {
    test = new Hypercube(-1 + 6 * i, -1, -1, -1, 1 + 6 * i, 1, 1, 1);
    testCubes.push(test);
  }
  
}

function windowResized() {
  //resizeCanvas(windowWidth, windowHeight);
  //img.resize(width, height);
}

function draw() {
  background(0);
  /*
  t++;
  fill(255);
  noStroke();
  text(round(100 * t / 60) / 100, 0, 12);
  
  for (x = 0; x < 2; x++) {
    for (y = 0; y < 2; y++) {
      xPos = width - 160 + 80 * x;
      yPos = 16 + 80 * y;
      stroke(255);
      noFill();
      rect(xPos, yPos, 64, 64);
      circle(xPos + 32, yPos + 32, 1);
      
      i = x + 2 * y;
      push();
      
      textSize(8);
      if (i == 0) {
        stroke(255);
        line(xPos + 32, yPos + 32, xPos + 32 + 24 * cos(HALF_PI + rotXZ - fov / 2), yPos + 32 - 24 * sin(HALF_PI + rotXZ - fov / 2));
        line(xPos + 32, yPos + 32, xPos + 32 + 24 * cos(HALF_PI + rotXZ + fov / 2), yPos + 32 - 24 * sin(HALF_PI + rotXZ + fov / 2));
        noStroke();
        fill(255);
        text("XZ", xPos + 2, yPos + 10);
        testCubes.forEach(function(cube) {
          fill(255, 0, 0);
          circle(xPos + 32 + min(32, max(-32, 3 * (cube.center[0] - camX))), yPos + 32 - min(32, max(-32, 3 * (cube.center[2] - camZ))), 2);
        });
      }
      if (i == 1) {
        stroke(255);
        line(xPos + 32, yPos + 32, xPos + 32 + 24 * cos(HALF_PI + rotYZ - height / width * fov / 2), yPos + 32 - 24 * sin(HALF_PI + rotYZ - height / width * fov / 2));
        line(xPos + 32, yPos + 32, xPos + 32 + 24 * cos(HALF_PI + rotYZ + height / width * fov / 2), yPos + 32 - 24 * sin(HALF_PI + rotYZ + height / width * fov / 2));
        noStroke();
        fill(255);
        text("YZ", xPos + 2, yPos + 10);
        testCubes.forEach(function(cube) {
          fill(255, 0, 0);
          circle(xPos + 32 - min(32, max(-32, 3 * (cube.center[1] - camY))), yPos + 32 - min(32, max(-32, 3 * (cube.center[2] - camZ))), 2);
        });
      }
      if (i == 2) {
        stroke(255);
        line(xPos + 32, yPos + 32, xPos + 32 + 24 * cos(HALF_PI + rotYW - fov / 2), yPos + 32 - 24 * sin(HALF_PI + rotYW - fov / 2));
        line(xPos + 32, yPos + 32, xPos + 32 + 24 * cos(HALF_PI + rotYW + fov / 2), yPos + 32 - 24 * sin(HALF_PI + rotYW + fov / 2));
        noStroke();
        fill(255);
        text("YW", xPos + 2, yPos + 10);
        testCubes.forEach(function(cube) {
          fill(255, 0, 0);
          circle(xPos + 32 - min(32, max(-32, 3 * (cube.center[1] - camY))), yPos + 32 - min(32, max(-32, 3 * (cube.center[3] - camW))), 2);
        });
      }
      if (i == 3) {
        stroke(255);
        line(xPos + 32, yPos + 32, xPos + 32 + 24 * cos(HALF_PI + rotXW - fov / 2), yPos + 32 - 24 * sin(HALF_PI + rotXW - fov / 2));
        line(xPos + 32, yPos + 32, xPos + 32 + 24 * cos(HALF_PI + rotXW + fov / 2), yPos + 32 - 24 * sin(HALF_PI + rotXW + fov / 2));
        noStroke();
        fill(255);
        text("XW", xPos + 2, yPos + 10);
        testCubes.forEach(function(cube) {
          fill(255, 0, 0);
          circle(xPos + 32 - min(32, max(-32, 3 * (cube.center[0] - camX))), yPos + 32 - min(32, max(-32, 3 * (cube.center[3] - camW))), 2);
        });
      }
      pop();
    }
  }
  */
  
  vx = 0;
  vz = 0;
  vw = 0;
  
  if (keyIsDown(87)) {
    vx += -camSpeed * sin(rotXZ);
    vz += camSpeed * cos(rotXZ);
  }
  if (keyIsDown(83)) {
    vx += camSpeed * sin(rotXZ);
    vz += -camSpeed * cos(rotXZ);
  }
  if (keyIsDown(68)) {
    vx += camSpeed * cos(rotXZ);
    vz += camSpeed * sin(rotXZ);
  }
  if (keyIsDown(65)) {
    vx += -camSpeed * cos(rotXZ);
    vz += -camSpeed * sin(rotXZ);
  }
  if (keyIsDown(16)) {
    vy += camSpeed;
  }
  if (keyIsDown(32) && canJump) {
    vy = -0.1;
    canJump = false;
  }
  if (keyIsDown(69)) {
    vw = camSpeed;
  }
  if (keyIsDown(81)) {
    vw = -camSpeed;
  }
  camX += vx;
  camY += vy;
  camZ += vz;
  camW += vw;
  
  vy += 0.005;
  
  if (camY > -3) {
    canJump = true;
    camY = -3;
    vy = 0;
  }
  
  rotYZ = min(HALF_PI, max(-HALF_PI, rotYZ + 0.01 * (winMouseY - pwinMouseY)));
  rotXZ -= 0.01 * (winMouseX - pwinMouseX);
  
  //push();
  //stroke(255);
  //strokeWeight(2);
  //translate(width / 2, height / 2);
  //testCubes.forEach(function(cube) {
  //  cube.show();
  //});
  //pop();
  
  img.loadPixels();
  for (x = 0; x < width; x++) {
    for (y = 0; y < height; y++) {
      index = 4 * (x + y * width);
      marcherX = camX;
      marcherY = camY;
      marcherZ = camZ;
      marcherW = camW;
      marcherDir = createVector((x - width / 2) / width, (y - height / 2) / width, 1).limit(1);
      
      
      minDist = Infinity;
      testCubes.forEach(function(cube) {
        //clampX = min(max(cube.corner0[0], cube.corner1[0]), max(min(cube.corner0[0], cube.corner1[0]), marcherX));
        //clampY = min(max(cube.corner0[1], cube.corner1[1]), max(min(cube.corner0[1], cube.corner1[1]), marcherY));
        //clampZ = min(max(cube.corner0[2], cube.corner1[2]), max(min(cube.corner0[2], cube.corner1[2]), marcherZ));
        //clampW = min(max(cube.corner0[3], cube.corner1[3]), max(min(cube.corner0[3], cube.corner1[3]), marcherW));
        
        d = dist4d([marcherX, marcherY, marcherZ, marcherW,], /*[clampX, clampY, clampZ, clampW,]*/ [0, 0, 0, 0,]) - 1;
        if (d < minDist) {
          minDist = d;
        }
      });
      
      steps = 0;
      while (minDist > 0.01 && (dist4d([camX, camY, camZ, camW,], [marcherX, marcherY, marcherZ, marcherW,]) < 20)) {
        if (dist4d([camX, camY, camZ, camW,], [marcherX, marcherY, marcherZ, marcherW,]) < 20) {
          marcherDir.set(x / width, y / width, 1).limit(1);
          marcherDir.mult(minDist);
          
          marcherX += rotate3d(rotate3d([marcherDir.x, marcherDir.y, marcherDir.z,], "xz", rotXZ), "yz", rotYZ)[0];
          marcherY += rotate3d(rotate3d([marcherDir.x, marcherDir.y, marcherDir.z,], "xz", rotXZ), "yz", rotYZ)[1];
          marcherZ += rotate3d(rotate3d([marcherDir.x, marcherDir.y, marcherDir.z,], "xz", rotXZ), "yz", rotYZ)[2];
          //marcherW += marcherDir.w;
          steps++;
        }
        else {
          r = steps;
          g = steps;
          b = steps;
          a = 127;
          break;
        }
        minDist = Infinity;
        testCubes.forEach(function(cube) {
      //    //clampX = min(max(cube.corner0[0], cube.corner1[0]), max(min(cube.corner0[0], cube.corner1[0]), marcherX));
      //    //clampY = min(max(cube.corner0[1], cube.corner1[1]), max(min(cube.corner0[1], cube.corner1[1]), marcherY));
      //    //clampZ = min(max(cube.corner0[2], cube.corner1[2]), max(min(cube.corner0[2], cube.corner1[2]), marcherZ));
      //    //clampW = min(max(cube.corner0[3], cube.corner1[3]), max(min(cube.corner0[3], cube.corner1[3]), marcherW));
          
          d = dist4d([marcherX, marcherY, marcherZ, marcherW,], /*[clampX, clampY, clampZ, clampW,]*/ [0, 0, 0, 0,]) - 1;
          if (d < minDist) {
            minDist = d;
          }
        });
      }
      if (minDist <= 10) {
        r = 127;
        g = 127;
        b = 127;
        a = 127;
      }
      else {
        r = 0;
        g = 0;
        b = 0;
        a = 0;
      }
      img.pixels[index] = r;
      img.pixels[index + 1] = g;
      img.pixels[index + 2] = b;
      img.pixels[index + 3] = a;
      
    }
  }
  img.updatePixels();
  
  image(img, 0, 0);
  
  
  
  //test.testRotate();
  
}

function mouseWheel(event) {
  rotXW += 0.001 * event.delta;
}

function worldToEye4d(vertex) {
  return rotate4d(rotate4d(rotate4d(rotate4d(rotate4d(rotate4d(translate4d(vertex, -camX, -camY, -camZ, -camW), "xz", -rotXZ), "yz", -rotYZ), "xy", -rotXY), "xw", -rotXW), "yw", -rotYW), "zw", rotZW);
}

function project4to3(vertex) {
  if (worldToEye4d(vertex)[3] > 0) {
    return [
      
      worldToEye4d(vertex)[0] / (worldToEye4d(vertex)[3] * tan(fov / 2)),
      worldToEye4d(vertex)[1] / (worldToEye4d(vertex)[3] * tan(fov / 2)),
      worldToEye4d(vertex)[2] * (worldToEye4d(vertex)[3] * tan(fov / 2)),
      
      //(vertex[0] - camX) / (vertex[3] - camW) * tan(fov / 2),
      //(vertex[1] - camY) / (vertex[3] - camW) * tan(fov / 2),
      //(vertex[2] - camZ) / (vertex[3] - camW) * tan(fov / 2),
    ];
  }
  else {
    return [0, 0, -Infinity,];
  }
}

function translate4d(vertex, dx, dy, dz, dw) {
  return [vertex[0] + dx, vertex[1] + dy, vertex[2] + dz, vertex[3] + dw,];
}

function rotate4d(vertex, plane, angle) {
  if (plane == "xy") {
    return [
      cos(angle) * vertex[0] + sin(angle) * vertex[1],
      -sin(angle) * vertex[0] + cos(angle) * vertex[1],
      vertex[2],
      vertex[3],
    ];
  }
  if (plane == "yz") {
    return [
      vertex[0],
      cos(angle) * vertex[1] + sin(angle) * vertex[2],
      -sin(angle) * vertex[1] + cos(angle) * vertex[2],
      vertex[3],
    ];
  }
  if (plane == "xz") {
    return [
      cos(angle) * vertex[0] - sin(angle) * vertex[2],
      vertex[1],
      sin(angle) * vertex[0] + cos(angle) * vertex[2],
      vertex[3],
    ];
  }
  if (plane == "xw") {
    return [
      cos(angle) * vertex[0] + sin(angle) * vertex[3],
      vertex[1],
      vertex[2],
      -sin(angle) * vertex[0] + cos(angle) * vertex[3],
    ];
  }
  if (plane == "yw") {
    return [
      vertex[0],
      cos(angle) * vertex[1] - sin(angle) * vertex[3],
      vertex[2],
      sin(angle) * vertex[1] + cos(angle) * vertex[3],
    ];
  }
  if (plane == "zw") {
    return [
      vertex[0],
      vertex[1],
      cos(angle) * vertex[2] - sin(angle) * vertex[3],
      sin(angle) * vertex[2] + cos(angle) * vertex[3],
    ];
  }
}

function worldToEye3d(vertex) {
  return rotate3d(rotate3d(rotate3d(translate3d(vertex, 0, 0, 0), "xy", 0), "xz", 0), "yz", 0);
}

function project3to2(vertex) {
  if (worldToEye3d(vertex)[2] > 0) {
    return [
      worldToEye3d(vertex)[0] / (worldToEye3d(vertex)[2] * tan(fov / 2)) * width,
      worldToEye3d(vertex)[1] / (worldToEye3d(vertex)[2] * tan(fov / 2)) * width,
    ];
  }
  else {
    return false;
  }
}

function translate3d(vertex, dx, dy, dz) {
  return [vertex[0] + dx, vertex[1] + dy, vertex[2] + dz,];
}

function rotate3d(vertex, plane, angle) {
  if (plane == "yz") {
    return [
      vertex[0],
      cos(angle) * vertex[1] - sin(angle) * vertex[2],
      sin(angle) * vertex[1] + cos(angle) * vertex[2],
    ];
  }
  if (plane == "xz") {
    return [
      cos(angle) * vertex[0] + sin(angle) * vertex[2],
      vertex[1],
      -sin(angle) * vertex[0] + cos(angle) * vertex[2],
    ];
  }
  if (plane == "xy") {
    return [
      cos(angle) * vertex[0] - sin(angle) * vertex[1],
      sin(angle) * vertex[0] + cos(angle) * vertex[1],
      vertex[2],
    ];
  }
}

function dist4d(vertex0, vertex1) {
  return sqrt(sq(vertex0[0] - vertex1[0]) + sq(vertex0[1] - vertex1[1]) + sq(vertex0[2] - vertex1[2]) + sq(vertex0[3] - vertex1[3]));
}
