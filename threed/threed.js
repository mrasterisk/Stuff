dirLight = true;
specular = false;
ambient = [184, 217, 222, 0.5,];

lights = [];

function setup() {
  createCanvas(200, 200);
  view = createImage(width, height);
  zBuffer = [];
  lightZBuffer = [];
  for (x = 0; x < view.width; x++) {
    zBuffer[x] = [];
    lightZBuffer[x] = [];
    for (y = 0; y < view.height; y++) {
      zBuffer[x][y] = Infinity;
      lightZBuffer[x][y] = Infinity;
    }
  }
  
  view.loadPixels();
  for (y = 0; y < view.height; y++) {
    for (x = 0; x < view.width; x++) {
      i = 4 * (x + y * width);
      view.pixels[i] = 255;
      view.pixels[i + 1] = 255;
      view.pixels[i + 2] = 255;
      view.pixels[i + 3] = 0;
    }
  }
  view.updatePixels();
  
  //lightVector = createVector(-0.5, -1, -0.2).normalize();
  
  camX = -1;
  camY = -1;
  camZ = 0;
  
  camPitch = PI / 4;
  camYaw = PI / 2;
  camRoll = 0;
  
  test0 = new pSphere(12, 2.5, 0, 0, 1, [192, 192, 192, 255,], true);
  test1 = new pCube(0, 0, 0, sqrt(PI / 2), sqrt(PI / 2), sqrt(PI / 2), [0, 255, 0, 255,]);
  
  testLight = new Light(-1, -1, 0, PI / 4, PI / 2);
  
  objects = [test0, test1,];
  tris = [];
  editing = false;
  mouseZ = -1;
}

function draw() {
  background(ambient[0], ambient[1], ambient[2]);
  image(view, 0, 0);
  //test0.testShow();
  
  noStroke();
  fill(255);
  text(round(frameRate()), 0, 12);
  
  //if (mouseIsPressed && mouseButton === CENTER) {
  //  test0.testRotate();
  //}
  
  tris = [];
  objects.forEach(function(object) {
    for (i = 0; i < object.vertices.length / 3; i++) {
      tris.push([object.vertices[3 * i], object.vertices[3 * i + 1], object.vertices[3 * i + 2],]);
    }
  });
  
  
  if (keyIsDown(68)) {
    camX += camToWorld([0.05, 0, 0,], camPitch, camYaw, camRoll)[0];
    camY += camToWorld([0.05, 0, 0,], camPitch, camYaw, camRoll)[1];
    camZ += camToWorld([0.05, 0, 0,], camPitch, camYaw, camRoll)[2];
  }
  if (keyIsDown(65)) {
    camX += camToWorld([-0.05, 0, 0,], camPitch, camYaw, camRoll)[0];
    camY += camToWorld([-0.05, 0, 0,], camPitch, camYaw, camRoll)[1];
    camZ += camToWorld([-0.05, 0, 0,], camPitch, camYaw, camRoll)[2];
  }
  if (keyIsDown(16)) {
    camX += camToWorld([0, 0.05, 0,], camPitch, camYaw, camRoll)[0];
    camY += camToWorld([0, 0.05, 0,], camPitch, camYaw, camRoll)[1];
    camZ += camToWorld([0, 0.05, 0,], camPitch, camYaw, camRoll)[2];
  }
  if (keyIsDown(32)) {
    camX += camToWorld([0, -0.05, 0,], camPitch, camYaw, camRoll)[0];
    camY += camToWorld([0, -0.05, 0,], camPitch, camYaw, camRoll)[1];
    camZ += camToWorld([0, -0.05, 0,], camPitch, camYaw, camRoll)[2];
  }
  if (keyIsDown(87)) {
    camX += camToWorld([0, 0, 0.05,], camPitch, camYaw, camRoll)[0];
    camY += camToWorld([0, 0, 0.05,], camPitch, camYaw, camRoll)[1];
    camZ += camToWorld([0, 0, 0.05,], camPitch, camYaw, camRoll)[2];
  }
  if (keyIsDown(83)) {
    camX += camToWorld([0, 0, -0.05,], camPitch, camYaw, camRoll)[0];
    camY += camToWorld([0, 0, -0.05,], camPitch, camYaw, camRoll)[1];
    camZ += camToWorld([0, 0, -0.05,], camPitch, camYaw, camRoll)[2];
  }
  
  if (keyIsDown(81)) {
    camRoll += 0.04;
  }
  if (keyIsDown(69)) {
    camRoll -= 0.04;
  }
  
  camFacing = createVector(camToWorld([0, 0, 1,])[0], camToWorld([0, 0, 1,])[1], camToWorld([0, 0, 1,])[2]).normalize();
  
  for (x = 0; x < view.width; x++) {
    for (y = 0; y < view.height; y++) {
      zBuffer[x][y] = Infinity;
    }
  }
  
  for (x = 0; x < 100; x++) {
    for (y = 0; y < 100; y++) {
      lightZBuffer[x][y] = Infinity;
    }
  }
  
  view.loadPixels();
  for (y = 0; y < view.height; y++) {
    for (x = 0; x < view.width; x++) {
      index = 4 * (x + y * width);
      view.pixels[index] = 0;
      view.pixels[index + 1] = 0;
      view.pixels[index + 2] = 0;
      view.pixels[index + 3] = 0;
    }
  }
  
  
  
  
  
  //MASSIVE NOPE
  
  //for (i = 0; i < tris.length; i++) {
  //  side0 = createVector(tris[i][0][0] - tris[i][1][0], tris[i][0][1] - tris[i][1][1], tris[i][0][2] - tris[i][1][2]);
  //  side1 = createVector(tris[i][1][0] - tris[i][2][0], tris[i][1][1] - tris[i][2][1], tris[i][1][2] - tris[i][2][2]);
  //  normal = side1.cross(side0).mult(-1);
    
  //  a = project(tris[i][0], testLight.x, testLight.y, testLight.z, testLight.pitch, testLight.yaw, 0, 100, 100);
  //  b = project(tris[i][1], testLight.x, testLight.y, testLight.z, testLight.pitch, testLight.yaw, 0, 100, 100);
  //  c = project(tris[i][2], testLight.x, testLight.y, testLight.z, testLight.pitch, testLight.yaw, 0, 100, 100);
    
  //  if (a[4] == false) {
  //    a[4] = normal;
  //  }
  //  if (b[4] == false) {
  //    b[4] = normal;
  //  }
  //  if (c[4] == false) {
  //    c[4] = normal;
  //  }
    
  //  if (normal.angleBetween(createVector(tris[i][0][0] - testLight.x, tris[i][0][1] - testLight.y, tris[i][0][2] - testLight.z)) >= PI / 2) {
  //    //find bounding box
  //    minX = view.width;
  //    maxX = 0;
  //    minY = view.height;
  //    maxY = 0;
      
  //    minX = min(minX, a[0]);
  //    maxX = max(maxX, a[0]);
  //    minX = min(minX, b[0]);
  //    maxX = max(maxX, b[0]);
  //    minX = min(minX, c[0]);
  //    maxX = max(maxX, c[0]);
      
  //    minY = min(minY, a[1]);
  //    maxY = max(maxY, a[1]);
  //    minY = min(minY, b[1]);
  //    maxY = max(maxY, b[1]);
  //    minY = min(minY, c[1]);
  //    maxY = max(maxY, c[1]);
      
  //    for (y = max(0, floor(minY)); y < min(view.height, ceil(maxY)); y++) {
  //      for (x = max(0, floor(minX)); x < min(view.width, ceil(maxX)); x++) {
  //        if (inTriangle(a, b, c, [x, y,])) {
  //          z = 1 / (barycoords[0] / a[2] + barycoords[1] / b[2] + barycoords[2] / c[2]);
  //          if (z < lightZBuffer[x][y] && z > 0.1) {
  //            lightZBuffer[x][y] = z;
  //          }      
  //        }
  //      }
  //    }
  //  }
  //}
  
  
  
  
  
  
  
  
  
  
  editing = false;
  for (i = 0; i < tris.length; i++) {
    side0 = createVector(tris[i][0][0] - tris[i][1][0], tris[i][0][1] - tris[i][1][1], tris[i][0][2] - tris[i][1][2]);
    side1 = createVector(tris[i][1][0] - tris[i][2][0], tris[i][1][1] - tris[i][2][1], tris[i][1][2] - tris[i][2][2]);
    normal = side1.cross(side0).mult(-1);
    
    a = project(tris[i][0], camX, camY, camZ, camPitch, camYaw, camRoll, width, height);
    b = project(tris[i][1], camX, camY, camZ, camPitch, camYaw, camRoll, width, height);
    c = project(tris[i][2], camX, camY, camZ, camPitch, camYaw, camRoll, width, height);
    
    if (a[4] == false) {
      a[4] = normal;
    }
    if (b[4] == false) {
      b[4] = normal;
    }
    if (c[4] == false) {
      c[4] = normal;
    }
    
    if (normal.angleBetween(createVector(tris[i][0][0] - camX, tris[i][0][1] - camY, tris[i][0][2] - camZ)) >= PI / 2) {
      //find bounding box
      minX = view.width;
      maxX = 0;
      minY = view.height;
      maxY = 0;
      
      minX = min(minX, a[0]);
      maxX = max(maxX, a[0]);
      minX = min(minX, b[0]);
      maxX = max(maxX, b[0]);
      minX = min(minX, c[0]);
      maxX = max(maxX, c[0]);
      
      minY = min(minY, a[1]);
      maxY = max(maxY, a[1]);
      minY = min(minY, b[1]);
      maxY = max(maxY, b[1]);
      minY = min(minY, c[1]);
      maxY = max(maxY, c[1]);
      
      for (y = max(0, floor(minY)); y < min(view.height, ceil(maxY)); y++) {
        for (x = max(0, floor(minX)); x < min(view.width, ceil(maxX)); x++) {
          if (inTriangle(a, b, c, [x, y,])) {
            //find world position & depth
            z = 1 / (barycoords[0] / a[2] + barycoords[1] / b[2] + barycoords[2] / c[2]);
            X = tris[i][0][0] * z * barycoords[0] / a[2] + tris[i][1][0] * z * barycoords[1] / b[2] + tris[i][2][0] * z * barycoords[2] / c[2];
            Y = tris[i][0][1] * z * barycoords[0] / a[2] + tris[i][1][1] * z * barycoords[1] / b[2] + tris[i][2][1] * z * barycoords[2] / c[2];
            camToPoint = createVector(X - camX, Y - camY, camToWorld([0, 0, z,], camPitch, camYaw, camRoll)[2] - camZ).normalize();
            
            //interpolate normal
            
            //normal = createVector(
            //  a[4].x * z * barycoords[0] / a[2] + b[4].x * z * barycoords[1] / b[2] + c[4].x * z * barycoords[2] / c[2],
            //  a[4].y * z * barycoords[0] / a[2] + b[4].y * z * barycoords[1] / b[2] + c[4].y * z * barycoords[2] / c[2],
            //  a[4].z * z * barycoords[0] / a[2] + b[4].z * z * barycoords[1] / b[2] + c[4].z * z * barycoords[2] / c[2]
            //);
            
            light = 0;
            
            if (dirLight || specular) {
              lightVector = createVector(X - testLight.x, Y - testLight.y, camToWorld([0, 0, z,], testLight.pitch, testLight.yaw, 0)[2] - testLight.z).normalize().mult(-1);
            }
            
            //directional lighting
            if (dirLight) {
              light += 0.6 * max(0, cos(lightVector.angleBetween(normal)));
            }
            
            //specular reflections
            if (specular) {
              if (normal.x != 0 || normal.z != 0) {
                normTheta = atan2(normal.z, normal.x);
              }
              else {
                normTheta = 0;
              }
              normPhi = atan2(normal.y, sqrt(sq(normal.z) + sq(normal.x)));
              
              camRotated = rotate3d(rotate3d([camToPoint.x, camToPoint.y, camToPoint.z,], "y", -normTheta), "z", -normPhi);
              reflected = rotate3d(rotate3d([camRotated[0], -camRotated[1], -camRotated[2],], "z", normPhi), "y", normTheta);
              reflected = createVector(-reflected[0], -reflected[1], -reflected[2]).normalize();
              
              light += 0.6 * pow(max(0, cos(reflected.angleBetween(lightVector))), 8);
            }
            
            //interpolate colour
            col = [
              a[3][0] * z * barycoords[0] / a[2] + b[3][0] * z * barycoords[1] / b[2] + c[3][0] * z * barycoords[2] / c[2],
              a[3][1] * z * barycoords[0] / a[2] + b[3][1] * z * barycoords[1] / b[2] + c[3][1] * z * barycoords[2] / c[2],
              a[3][2] * z * barycoords[0] / a[2] + b[3][2] * z * barycoords[1] / b[2] + c[3][2] * z * barycoords[2] / c[2],
              a[3][3] * z * barycoords[0] / a[2] + b[3][3] * z * barycoords[1] / b[2] + c[3][3] * z * barycoords[2] / c[2],
              255,
            ];
            
            //shadows ARE ALSO A BIG NOPE
            //lightViewX = project([X, Y, camToWorld([0, 0, z,], camPitch, PI / 2, camRoll)[2],], testLight.x, testLight.y, testLight.z, testLight.pitch, testLight.yaw, 0, 100, 100)[0];
            //lightViewY = project([X, Y, camToWorld([0, 0, z,], camPitch, PI / 2, camRoll)[2],], testLight.x, testLight.y, testLight.z, testLight.pitch, testLight.yaw, 0, 100, 100)[1];
            //lightViewZ = project([X, Y, camToWorld([0, 0, z,], camPitch, PI / 2, camRoll)[2],], testLight.x, testLight.y, testLight.z, testLight.pitch, testLight.yaw, 0, 100, 100)[2];
            //if (lightViewX > 0 && lightViewX < 100 && lightViewY > 0 && lightViewY < 100) {
            //  if (lightViewZ > lightZBuffer[floor(lightViewX)][floor(lightViewY)] + 0.1) {
            //    light = 0;
            //  }
            //  //col = [lightZBuffer[floor(lightViewX)][floor(lightViewY)] * 255, 0, 0, 255,];
            //}
            //else {
            //  //light = 0;
            //  //col = [lightZBuffer[floor(lightViewX)][floor(lightViewY)] * 255, 0, 0, 255,];
            //}
            
            //z = max(0, z);
            if (z < zBuffer[x][y] && z > 0.1) {
              zBuffer[x][y] = z;
              index = 4 * (x + y * width);
              
              view.pixels[index] = fade(ambient[0], col[0] * ambient[0] / 256 * ambient[3] + col[0] * light + 255 * max(0, light - 1), z / 20);
              view.pixels[index + 1] = fade(ambient[1], col[1] * ambient[1] / 256 * ambient[3] + col[1] * light + 255 * max(0, light - 1), z / 20);
              view.pixels[index + 2] = fade(ambient[2], col[2] * ambient[2] / 256 * ambient[3] + col[2] * light + 255 * max(0, light - 1), z / 20);
              view.pixels[index + 3] = 255;
            }      
          }
        }
      }
    }
    
    if (mouseIsPressed && mouseZ != -1) {
      factor = -0.06;
      
      //editing vertices
      if (sqrt(sq(a[0] - mouseX) + sq(a[1] - mouseY) + sq(a[2] - mouseZ)) < 10) {
        factor = -a[2];
        tris[i][0][0] += camToWorld([2 * factor / width * (pmouseX - mouseX), 2 * factor / height * (pmouseY - mouseY), 0,], camPitch, camYaw, camRoll)[0];
        tris[i][0][1] += camToWorld([2 * factor / width * (pmouseX - mouseX), 2 * factor / height * (pmouseY - mouseY), 0,], camPitch, camYaw, camRoll)[1];
        tris[i][0][2] += camToWorld([2 * factor / width * (pmouseX - mouseX), 2 * factor / height * (pmouseY - mouseY), 0,], camPitch, camYaw, camRoll)[2];
        tris[i][0][4] = false;
        editing = true;
      }
      if (sqrt(sq(b[0] - mouseX) + sq(b[1] - mouseY) + sq(b[2] - mouseZ)) < 10) {
        factor = -b[2];
        tris[i][1][0] += camToWorld([2 * factor / width * (pmouseX - mouseX), 2 * factor / height * (pmouseY - mouseY), 0,], camPitch, camYaw, camRoll)[0];
        tris[i][1][1] += camToWorld([2 * factor / width * (pmouseX - mouseX), 2 * factor / height * (pmouseY - mouseY), 0,], camPitch, camYaw, camRoll)[1];
        tris[i][1][2] += camToWorld([2 * factor / width * (pmouseX - mouseX), 2 * factor / height * (pmouseY - mouseY), 0,], camPitch, camYaw, camRoll)[2];
        tris[i][1][4] = false;
        editing = true;
      }
      if (sqrt(sq(c[0] - mouseX) + sq(c[1] - mouseY) + sq(c[2] - mouseZ)) < 10) {
        factor = -c[2];
        tris[i][2][0] += camToWorld([2 * factor / width * (pmouseX - mouseX), 2 * factor / height * (pmouseY - mouseY), 0,], camPitch, camYaw, camRoll)[0];
        tris[i][2][1] += camToWorld([2 * factor / width * (pmouseX - mouseX), 2 * factor / height * (pmouseY - mouseY), 0,], camPitch, camYaw, camRoll)[1];
        tris[i][2][2] += camToWorld([2 * factor / width * (pmouseX - mouseX), 2 * factor / height * (pmouseY - mouseY), 0,], camPitch, camYaw, camRoll)[2];
        tris[i][2][4] = false;
        editing = true;
      }
    }
  }
  view.updatePixels();
  
  if (mouseIsPressed && !editing) {
    camYaw += 0.005 * cos(camRoll) * (pmouseX - mouseX);
    camPitch += 0.005 * -sin(camRoll) * (pmouseX - mouseX);
    
    camPitch += 0.005 * cos(camRoll)  * (pmouseY - mouseY);
    camYaw += 0.005 * sin(camRoll)  * (pmouseY - mouseY);
  }
  camPitch = min(PI / 2, max(-PI / 2, camPitch));
}

function mousePressed() {
  mouseZ = zBuffer[floor(mouseX)][floor(mouseY)];
}

function project(vertex, X, Y, Z, pitch, yaw, roll, w, h) {
  canvx = worldToCam(vertex, X, Y, Z, pitch, yaw, roll)[0];
  canvy = worldToCam(vertex, X, Y, Z, pitch, yaw, roll)[1];
  zee = worldToCam(vertex, X, Y, Z, pitch, yaw, roll)[2];
  return [
    w / 2 * canvx / max(0.001, zee) + w / 2,
    h / 2 * canvy / max(0.001, zee) + h / 2,
    max(0.001, zee),
    vertex[3],
    vertex[4],
  ];
}

function worldToCam(vertex, X, Y, Z, pitch, yaw, roll) {
  return rotate3d(rotate3d(rotate3d(translate3d(vertex, -X, -Y, -Z), "y", yaw), "x", pitch), "z", roll);
}

function camToWorld(vertex, pitch, yaw, roll) {
  return rotate3d(rotate3d(rotate3d(vertex, "z", -roll), "x", -pitch), "y", -yaw);
}

function translate3d(vertex, x, y, z) {
  return [
    vertex[0] + x,
    vertex[1] + y,
    vertex[2] + z,
  ];
}

function rotate3d(vertex, axis, angle) {
  if (axis == "x") {
    return [
      vertex[0],
      cos(angle) * vertex[1] - sin(angle) * vertex[2],
      sin(angle) * vertex[1] + cos(angle) * vertex[2],
    ];
  }
  if (axis == "y") {
    return [
      cos(angle) * vertex[0] - sin(angle) * vertex[2],
      vertex[1],
      sin(angle) * vertex[0] + cos(angle) * vertex[2],
    ];
  }
  if (axis == "z") {
    return [
      cos(angle) * vertex[0] - sin(angle) * vertex[1],
      sin(angle) * vertex[0] + cos(angle) * vertex[1],
      vertex[2],
    ];
  }
}

function inTriangle(vertex0, vertex1, vertex2, p) {
  x0 = vertex0[0];
  y0 = vertex0[1];
  x1 = vertex1[0];
  y1 = vertex1[1];
  x2 = vertex2[0];
  y2 = vertex2[1];
  xp = p[0];
  yp = p[1];
  A = abs(x0 * (y1 - y2) + x1 * (y2 - y0) + x2 * (y0 - y1)) / 2;
  A0 = abs(x0 * (y1 - yp) + x1 * (yp - y0) + xp * (y0 - y1)) / 2;
  A1 = abs(xp * (y1 - y2) + x1 * (y2 - yp) + x2 * (yp - y1)) / 2;
  A2 = abs(x0 * (yp - y2) + xp * (y2 - y0) + x2 * (y0 - yp)) / 2;
  
  barycoords = [A1 / A, A2 / A, A0 / A,];
  return (abs(A - (A0 + A1 + A2)) <= 0.1);
}

function fade(val1, val2, t) {
  t = min(1, max(0, t));
  return val1 * t + val2 * (1 - t);
}

function pCube(x, y, z, l, h, w, col) {
  this.vertices = [
    [-l / 2 + x, -h / 2 + y, -w / 2 + z, col, false,],
    [-l / 2 + x, h / 2 + y, -w / 2 + z, col, false,],
    [l / 2 + x, -h / 2 + y, -w / 2 + z, col, false,],
    
    [l / 2 + x, h / 2 + y, -w / 2 + z, col, false,],
    [l / 2 + x, -h / 2 + y, -w / 2 + z, col, false,],
    [-l / 2 + x, h / 2 + y, -w / 2 + z, col, false,],
    
    
    [l / 2 + x, h / 2 + y, w / 2 + z, col, false,],
    [l / 2 + x, -h / 2 + y, w / 2 + z, col, false,],
    [l / 2 + x, h / 2 + y, -w / 2 + z, col, false,],
    
    [l / 2 + x, -h / 2 + y, -w / 2 + z, col, false,],
    [l / 2 + x, h / 2 + y, -w / 2 + z, col, false,],
    [l / 2 + x, -h / 2 + y, w / 2 + z, col, false,],
    
    
    [l / 2 + x, -h / 2 + y, -w / 2 + z, col, false,],
    [l / 2 + x, -h / 2 + y, w / 2 + z, col, false,],
    [-l / 2 + x, -h / 2 + y, -w / 2 + z, col, false,],
    
    [-l / 2 + x, -h / 2 + y, w / 2 + z, col, false,],
    [-l / 2 + x, -h / 2 + y, -w / 2 + z, col, false,],
    [l / 2 + x, -h / 2 + y, w / 2 + z, col, false,],
    
    
    [-l / 2 + x, h / 2 + y, w / 2 + z, col, false,],
    [-l / 2 + x, -h / 2 + y, w / 2 + z, col, false,],
    [l / 2 + x, h / 2 + y, w / 2 + z, col, false,],
    
    [l / 2 + x, -h / 2 + y, w / 2 + z, col, false,],
    [l / 2 + x, h / 2 + y, w / 2 + z, col, false,],
    [-l / 2 + x, -h / 2 + y, w / 2 + z, col, false,],
    
    
    [-l / 2 + x, -h / 2 + y, w / 2 + z, col, false,],
    [-l / 2 + x, h / 2 + y, w / 2 + z, col, false,],
    [-l / 2 + x, -h / 2 + y, -w / 2 + z, col, false,],
    
    [-l / 2 + x, h / 2 + y, -w / 2 + z, col, false,],
    [-l / 2 + x, -h / 2 + y, -w / 2 + z, col, false,],
    [-l / 2 + x, h / 2 + y, w / 2 + z, col, false,],
    
    
    [l / 2 + x, h / 2 + y, -w / 2 + z, col, false,],
    [-l / 2 + x, h / 2 + y, -w / 2 + z, col, false,],
    [l / 2 + x, h / 2 + y, w / 2 + z, col, false,],
    
    [-l / 2 + x, h / 2 + y, w / 2 + z, col, false,],
    [l / 2 + x, h / 2 + y, w / 2 + z, col, false,],
    [-l / 2 + x, h / 2 + y, -w / 2 + z, col, false,],
  ];
  
  this.testRotate = function() {
    for (i = 0; i < this.vertices.length; i++) {
      this.vertices[i] = rotate3d(this.vertices[i], "y", 0.01);
    }
  };
  
  this.testShow = function() {
    for (i = 0; i < this.vertices.length; i++) {
      stroke(255, 0, 0, 64);
      strokeWeight(1);
      point(project(this.vertices[i])[0], project(this.vertices[i])[1], camX, camY, camZ, camPitch, camYaw, camRoll, width, height);
    }
    for (i = 0; i < this.vertices.length / 3; i++) {
      noFill();
      triangle(project(this.vertices[3 * i], camX, camY, camZ, camPitch, camYaw, camRoll, width, height)[0], project(this.vertices[3 * i], camX, camY, camZ, camPitch, camYaw, camRoll, width, height)[1], project(this.vertices[3 * i + 1], camX, camY, camZ, camPitch, camYaw, camRoll, width, height)[0], project(this.vertices[3 * i + 1])[1], project(this.vertices[3 * i + 2], camX, camY, camZ, camPitch, camYaw, camRoll, width, height)[0], project(this.vertices[3 * i + 2], camX, camY, camZ, camPitch, camYaw, camRoll, width, height)[1]);
    }
  };
} 

function Light(x, y, z, pitch, yaw) {
  this.x = x;
  this.y = y;
  this.z = z;
  this.pitch = pitch;
  this.yaw = yaw;
  this.col = [255, 255, 255, 1,];
}

function pSphere(res, x, y, z, r, col, smooth) {
  res = max(2, floor(res));
  //scl = 10 * r;
  
  this.vertices = [];
  for (p = 0; p < res; p++) {
    phi = map(p, 0, res, -PI / 2, PI / 2);
    for (t = 0; t < 2 * res; t++) {
      
      theta = map(t, 0, 2 * res, -PI, PI);
      
      //r = 1 - 0.5 * noise(scl * cos(phi) * cos(theta) + x, scl * sin(phi) + y, scl * cos(phi) * sin(theta) + z);
      c = 1;//noise(scl * cos(phi) * cos(theta) + x, scl * sin(phi) + y, scl * cos(phi) * sin(theta) + z);
      this.vertices.push([
        r * cos(phi) * cos(theta) + x,
        r * sin(phi) + y,
        r * cos(phi) * sin(theta) + z,
        [
          c * col[0],
          c * col[1],
          c * col[2],
          255,
        ],
        false,
      ]);
      if (smooth) {
        this.vertices[this.vertices.length - 1][4] = p5.Vector.fromAngles(phi + PI / 2, -theta + PI / 2);
      }
      
      //r = 1 - 0.5 * noise(scl * cos(phi + PI / res) * cos(theta) + x, scl * sin(phi + PI / res) + y, scl * cos(phi + PI / res) * sin(theta) + z);
      //c = 1;//noise(scl * cos(phi + PI / res) * cos(theta) + x, scl * sin(phi + PI / res) + y, scl * cos(phi + PI / res) * sin(theta) + z);
      this.vertices.push([
        r * cos(phi + PI / res) * cos(theta) + x,
        r * sin(phi + PI / res) + y,
        r * cos(phi + PI / res) * sin(theta) + z,
        [
          c * col[0],
          c * col[1],
          c * col[2],
          255,
        ],
        false,
      ]);
      if (smooth) {
        this.vertices[this.vertices.length - 1][4] = p5.Vector.fromAngles(phi + PI / res + PI / 2, -theta + PI / 2);
      }
      
      //r = 1 - 0.5 * noise(scl * cos(phi + PI / res) * cos(theta + PI / res) + x, scl * sin(phi + PI / res) + y, scl * cos(phi + PI / res) * sin(theta + PI / res) + z);
      //c = 1;//noise(scl * cos(phi + PI / res) * cos(theta + PI / res) + x, scl * sin(phi + PI / res) + y, scl * cos(phi + PI / res) * sin(theta + PI / res) + z);
      this.vertices.push([
        r * cos(phi + PI / res) * cos(theta + PI / res) + x,
        r * sin(phi + PI / res) + y,
        r * cos(phi + PI / res) * sin(theta + PI / res) + z,
        [
          c * col[0],
          c * col[1],
          c * col[2],
          255,
        ],
        false,
      ]);
      if (smooth) {
        this.vertices[this.vertices.length - 1][4] = p5.Vector.fromAngles(phi + PI / res + PI / 2, -theta - PI / res + PI / 2);
      }
      
      if (p != 0) {
        //r = 1 - 0.5 * noise(scl * cos(phi) * cos(theta) + x, scl * sin(phi) + y, scl * cos(phi) * sin(theta) + z);
        //c = 1;//noise(scl * cos(phi) * cos(theta) + x, scl * sin(phi) + y, scl * cos(phi) * sin(theta) + z);
        this.vertices.push([
          r * cos(phi) * cos(theta) + x,
          r * sin(phi) + y,
          r * cos(phi) * sin(theta) + z,
          [
            c * col[0],
            c * col[1],
            c * col[2],
            255,
          ],
          false,
        ]);
        if (smooth) {
          this.vertices[this.vertices.length - 1][4] = p5.Vector.fromAngles(phi + PI / 2, -theta  + PI / 2);
        }
        
        //r = 1 - 0.5 * noise(scl * cos(phi) * cos(theta - PI / res) + x, scl * sin(phi) + y, scl * cos(phi) * sin(theta - PI / res) + z);
        //c = 1;//noise(scl * cos(phi) * cos(theta - PI / res) + x, scl * sin(phi) + y, scl * cos(phi) * sin(theta - PI / res) + z);
        this.vertices.push([
          r * cos(phi) * cos(theta - PI / res) + x,
          r * sin(phi) + y,
          r * cos(phi) * sin(theta - PI / res) + z,
          [
            c * col[0],
            c * col[1],
            c * col[2],
            255,
          ],
          false,
        ]);
        if (smooth) {
          this.vertices[this.vertices.length - 1][4] = p5.Vector.fromAngles(phi + PI / 2, -theta + PI / res + PI / 2);
        }
        
        //r = 1 - 0.5 * noise(scl * cos(phi + PI / res) * cos(theta) + x, scl * sin(phi + PI / res) + y, scl * cos(phi + PI / res) * sin(theta) + z);
        //c = 1;//noise(scl * cos(phi + PI / res) * cos(theta) + x, scl * sin(phi + PI / res) + y, scl * cos(phi + PI / res) * sin(theta) + z);
        this.vertices.push([
          r * cos(phi + PI / res) * cos(theta) + x,
          r * sin(phi + PI / res) + y,
          r * cos(phi + PI / res) * sin(theta) + z,
          [
            c * col[0],
            c * col[1],
            c * col[2],
            255,
          ],
          false,
        ]);
        if (smooth) {
          this.vertices[this.vertices.length - 1][4] = p5.Vector.fromAngles(phi + PI / res + PI / 2, -theta + PI / 2);
        }
      }
    }
  }
  
  this.testRotate = function() {
    for (i = 0; i < this.vertices.length; i++) {
      this.vertices[i] = rotate3d(this.vertices[i], "y", 0.01);
    }
  };
  
  this.testShow = function() {
    for (i = 0; i < this.vertices.length; i++) {
      stroke(255, 0, 0, 64);
      strokeWeight(1);
      point(project(this.vertices[i])[0], project(this.vertices[i])[1]);
    }
    for (i = 0; i < this.vertices.length / 3; i++) {
      noFill();
      triangle(project(this.vertices[3 * i])[0], project(this.vertices[3 * i])[1], project(this.vertices[3 * i + 1])[0], project(this.vertices[3 * i + 1])[1], project(this.vertices[3 * i + 2])[0], project(this.vertices[3 * i + 2])[1]);
    }
  };
} 
