let t = 0;
let timestep = 1;

arrays = [
//light
[true,],
//pop
[true,],
//size
[true,],
//speed
[true,],
//sight
[true,],
//immunity
[true,],
//diseased
[true,],
];

peakLight = 10;
peakPop = 100;
peakSize = 10;
peakSpeed = 2;
peakSight = 100;
peakImmunity = 2;
peakDiseased = 100;

let mutRate = 0.15;
let light = 1;
let lightSlider;
let eatRatio = 1.2;
let displayMode = 'normal';

fishes = [];

function setup() {
  d = 800;
  createCanvas(d + 800, d);
  mid = createVector(d / 2, d / 2);
  
  for (i = 0; i < 500; i++) {
    fish = new Fish(
    
    //pos
    createVector(random(d), random(d)),
    //size
    random((peakSize / 2) / (1 + mutRate), (peakSize / 2) * (1 + mutRate)),
    //speed
    random((peakSpeed / 2) / (1 + mutRate), (peakSpeed / 2) * (1 + mutRate)),
    //sight
    random((peakSight / 2) / (1 + mutRate), (peakSight / 2) * (1 + mutRate)),
    //disease
    false,
    //immunity
    random((peakImmunity / 2) / (1 + mutRate), (peakImmunity / 2) * (1 + mutRate)),
    //gravity
    1
    
    );
    fishes.push(fish);
  }
  
  lightSlider = createSlider(0, 10, 1);
  lightSlider.position(0, height - 20);
  
}

function draw() {
  background(64);
  fill(0);
  //rect(0, 0, d, d);
  ellipse(d / 2, d / 2, d);
  
  light = lightSlider.value();
  
  minSize = Infinity;
  avgSize = 0;
  maxSize = 0;
  
  minSpeed = Infinity;
  avgSpeed = 0;
  maxSpeed = 0;
  
  minSight = Infinity;
  avgSight = 0;
  maxSight = 0;
  
  minImmunity = Infinity;
  avgImmunity = 0;
  maxImmunity = 0;
  
  percentDiseased = 0;
  
  population = fishes.length;
  
  fishes.forEach(function(fish) {
    
    minSize = min(fish.size, minSize);
    avgSize += fish.size;
    maxSize = max(fish.size, maxSize);
    
    minSpeed = min(fish.speed, minSpeed);
    avgSpeed += fish.speed;
    maxSpeed = max(fish.speed, maxSpeed);
    
    minSight = min(fish.size, minSight);
    avgSight += fish.sight;
    maxSight = max(fish.size, maxSight);
    
    minImmunity = min(fish.immunity, minImmunity);
    avgImmunity += fish.immunity;
    maxImmunity = max(fish.immunity, maxImmunity);
    
    percentDiseased += 100 * fish.disease;
    
  });
  
  avgSize /= population;
  avgSpeed /= population;
  avgSight /= population;
  avgImmunity /= population;
  percentDiseased /= population;
  
  peakLight = 10;
  peakPop = max(population, peakPop);
  peakSize = max(avgSize, peakSize);
  peakSpeed = max(avgSpeed, peakSpeed);
  peakSight = max(avgSight, peakSight);
  peakImmunity = max(avgImmunity, peakImmunity);
  peakDiseased = max(percentDiseased, peakDiseased);
  
  fishes.forEach(function(fish) {
    if (displayMode != 'allHidden') {
      fish.display(displayMode);
    }
    fish.move();
    fish.age();
  });
  
  
  textSize(8);
  fill(255);
  
  if (t / timestep % 60 == 0 && population > 0) {
    
    values = [light, population, avgSize, avgSpeed, avgSight, avgImmunity, percentDiseased,];
    peakValues = [peakLight, peakPop, peakSize, peakSpeed, peakSight, peakImmunity, peakDiseased,];
    
    for (i = 0; i < arrays.length; i++) {
      if (arrays[i][0]) {
        arrays[i].push(values[i]);
      }
    }
  }
  
  text('Time: ' + round((100 * t / 60)) / 100, d - 60, 30);
  if (displayMode != 'statsHidden' && displayMode != 'allHidden') {
    text('Avg Size: ' + round(avgSize * 10) / 10, 5, 15);
    text('Avg Speed: ' + round(avgSpeed * 100) / 100, 5, 30);
    text('Avg Sight: ' + round(avgSight), 5, 45);
    text('Avg Immunity: ' + round(avgImmunity * 100) / 100, 5, 60);
    text('Percent Diseased: ' + round(percentDiseased) + '%', 5, 75);
    text('Population: ' + population, d - 60, 15);
    
    graphHorMargin = 30;
    graphVertMargin = 10;
    graphWidth = width - d - 2 * graphHorMargin;
    graphHeight = (height - graphVertMargin * (arrays.length + 1)) / arrays.length;
    
    for (i = 0; i < arrays.length + 1; i++) {
      stroke(127);
      strokeWeight(2);
      line(
      d + graphHorMargin,
      i * graphHeight + (i + 1) * graphVertMargin,
      d + graphHorMargin + graphWidth,
      i * graphHeight + (i + 1) * graphVertMargin
      );
      line(
      d + graphHorMargin,
      (i + 1) * graphHeight + (i + 1) * graphVertMargin,
      d + graphHorMargin + graphWidth,
      (i + 1) * graphHeight + (i + 1) * graphVertMargin
      );
      noStroke();
    }
    
    for (x = 0; x < arrays.length; x++) {
      if (arrays[x][0]) {
        for (y = 1; y < arrays[x].length - 1; y++) {
          stroke(255);
          strokeWeight(2);
          line(
          d + graphHorMargin + y * min(1, graphWidth / arrays[x].length),
          (x + 1) * (graphVertMargin + graphHeight) - map(arrays[x][y], 0, peakValues[x], 0, graphHeight),
          d + graphHorMargin + 1 + y * min(1, graphWidth / arrays[x].length),
          (x + 1) * (graphVertMargin + graphHeight) - map(arrays[x][y + 1], 0, peakValues[x], 0, graphHeight)
          );
          noStroke();
        }
      }
    }
  }
  
  t += timestep;
}

function keyPressed() {
  if (key == '1') {
    displayMode = 'normal';
  }
  if (key == '2') {
    displayMode = 'size';
  }
  if (key == '3') {
    displayMode = 'speed';
  }
  if (key == '4') {
    displayMode = 'sight';
  }
  if (key == '5') {
    displayMode = 'immunity';
  }
  if (key == '6') {
    displayMode = 'energy';
  }
  if (key == '7') {
    displayMode = 'statsHidden';
  }
  if (key == '8') {
    displayMode = 'allHidden';
  }
}
