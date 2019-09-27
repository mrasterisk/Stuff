function setup() {
  createCanvas(800, 800);
  res = 0.1;
  t = 0;
  gravity = 10;
  
  particles = [];
  
  for (i = 0; i < 0; i++) {
    particle = new Particle(i);
    particle.randomize();
    particles.push(particle);
  }
  
  background(69, 69, 84);
}


function draw() {
  flowFieldx = nonTileNoise(t, 0.005, 0, 10);//tileNoise(t, 4, 0, 10);
  flowFieldy = nonTileNoise(t, 0.005, 20, 5);//tileNoise(t, 4, 20, 5);
  
  for (i = 0; i < random(1000); i++) {
    particle = new Particle(particles.length);
    particle.randomize();
    particles.push(particle);
  }
  
  background(69, 69, 84, 32);
  noStroke();
  fill(105, 105, 110, 32);
  rect(0, height / 2 - 40, width, height);
  particles.forEach(function(particle) {
    particle.show();
    particle.update();
  });
  
  t += 0.01;
}

tileNoise = function(time, noiseScale, offset, strength) {
  noiseArray = [];
  outer = 0;
  inner = 0;
  for (y = 0; y < (height * res); y++) {
    for (x = 0; x < (width * res); x++) {
      outer = noise(noiseScale * (abs(x / (width * res) - 1 / 2) + 10 + offset), noiseScale * (abs(y / (height * res) - 1 / 2) + 10 + offset), time);
      outer *= (2 * abs(x / (width * res) - 1 / 2)) * (2 * abs(y / (height * res) - 1 / 2));
      inner = noise(noiseScale * (x / (width * res) + offset), noiseScale * (y / (height * res) + offset), time);
      inner *= 1 - (2 * abs(x / (width * res) - 1 / 2)) * (2 * abs(y / (height * res) - 1 / 2));
      noiseArray.push(strength * 2 * (inner + outer - 1 / 2));
    }
  }
  return noiseArray;
};

nonTileNoise = function(time, noiseScale, offset, strength) {
  noiseArray = [];
  for (y = 0; y < (height * res); y++) {
    for (x = 0; x < (width * res); x++) {
      noiseArray.push(strength * 2 * (noise(noiseScale * (x + offset), noiseScale * y, time) - 1 / 2));
    }
  }
  return noiseArray;
};
