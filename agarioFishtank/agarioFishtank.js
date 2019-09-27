let blobs = [];
eatRatio = 1.25;
timeStep = 5;

function setup() {
  createCanvas(500, 500);
  mid = createVector(width / 2, height / 2);
  
  colorMode(HSB);
  r = min(width / 2, height / 2);
  
  for (i = 0; i < 1; i++) {
    blobs.push(new Blob(
      //p5.Vector.fromAngle(random(TWO_PI), random(r)).add(mid),
      createVector(random(width), random(height)),
      eatRatio,
      random(1),
      color(random(360), 255, 255),
      'player'
    ));
  }
  /*
  for (i = 0; i < 100; i++) {
    blobs.push(new Blob(
      //p5.Vector.fromAngle(random(TWO_PI), random(r)).add(mid),
      createVector(random(width), random(height)),
      1,
      0,
      color(random(360), 255, 255),
      'food'
    ));
  }
  */
  
}

function draw() {
  background(244);
  //fill(0);
  //noStroke();
  //ellipse(mid.x, mid.y, 2 * r, 2 * r);
  
  cellCount = 0;
  foodCount = 0;
  
  maxSize = 0;
  biggestPos = createVector(0, 0);
  biggestFov = createVector(0, 0);
  
  blobs.forEach(function(blob) {
    if (blob.type == 'cell') {
      cellCount++;
      
      if(blob.size > maxSize) {
        biggestPos = blob.pos;
        biggestFov = createVector(10 * blob.radius / height, 10 * blob.radius / height);
      }
      
      maxSize = max(blob.size, maxSize);
    }
    else if (blob.type == 'food') {
      foodCount++;
    }
    else if (blob.type == 'player') {
      cellCount++;
      playerPos = blob.pos;
      playerFov = createVector(10 * blob.radius / height, 10 * blob.radius / height);
    }
  });
  
  focusPos = playerPos;
  focusFov = playerFov;
  
  blobs.forEach(function(blob) {
    blob.display();
  });
  blobs.forEach(function(blob) {
    blob.move();
  });
  
  for (i = 0; i < 1 * timeStep; i++) {
    if (cellCount < 20) {
      blobs.push(new Blob(
        //p5.Vector.fromAngle(random(TWO_PI), random(r)).add(mid),
        createVector(random(width), random(height)),
        eatRatio,
        random(0.5, 3),
        color(random(360), 255, 255),
        'cell'
      ));
    }
  }
  for (i = 0; i < ((1 - 0.9998) * (width * height) / (PI * sq(2.5))) * timeStep; i++) {
    if (foodCount < width * height / sq(40)) {
      blobs.push(new Blob(
        //p5.Vector.fromAngle(random(TWO_PI), random(r)).add(mid),
        createVector(random(width), random(height)),
        1,
        0,
        color(random(360), 255, 255),
        'food'
      ));
    }
  }
}
