function Hypercube(x0, y0, z0, w0, x1, y1, z1, w1) {
  //some helpful things for other things to refer to
  this.center = [(x0 + x1) / 2, (y0 + y1) / 2, (z0 + z1) / 2, (w0 + w1) / 2,];
  this.corner0 = [x0, y0, z0, w0,];
  this.corner1 = [x1, y1, z1, w1,];
  
  this.vertices = [
    [x0, y0, z0, w0,],
    [x0, y0, z1, w0,],
    [x0, y1, z1, w0,],
    [x1, y1, z1, w0,],
    [x1, y1, z1, w1,],
    [x1, y1, z0, w1,],
    [x1, y0, z0, w1,],
    [x0, y0, z0, w1,],
    [x0, y0, z0, w0,],
    [x0, y1, z0, w0,],
    [x0, y1, z1, w0,],
    [x0, y1, z1, w1,],
    [x1, y1, z1, w1,],
    [x1, y0, z1, w1,],
    [x1, y0, z0, w1,],
    [x1, y0, z0, w0,],
    
    [x1, y0, z1, w0,],
    [x1, y1, z1, w0,],
    [x1, y1, z0, w0,],
    [x1, y1, z0, w1,],
    [x0, y1, z0, w1,],
    [x0, y0, z0, w1,],
    [x0, y0, z1, w1,],
    [x0, y0, z1, w0,],
    [x1, y0, z1, w0,],
    [x1, y0, z1, w1,],
    [x0, y0, z1, w1,],
    [x0, y1, z1, w1,],
    [x0, y1, z0, w1,],
    [x0, y1, z0, w0,],
    [x1, y1, z0, w0,],
    [x1, y0, z0, w0,],
    
    [x0, y0, z0, w0,],
  ];
  
  this.edges = [];
  
  for (j = 0; j < this.vertices.length - 1; j++) {
    this.edges.push([this.vertices[j], this.vertices[j + 1],]);
  }
  
  this.show = function() {
    /*
    this.vertices.forEach(function(vertex) {
      //if (project4to3(vertex)[2] - camZ > 0) {
        point(project3to2(project4to3(vertex))[0], project3to2(project4to3(vertex))[1]);
      //}
    });
    */
    this.edges.forEach(function(edge) {
      //if (project4to3(edge[0])[2] - camZ > 0 && project4to3(edge[1])[2] - camZ > 0) {
        stroke(255 / pow((dist4d(edge[0], [camX, camY, camZ, camW,]) + dist4d(edge[1], [camX, camY, camZ, camW,])) / (2 * 30), 3));
        line(project3to2(project4to3(edge[0]))[0], project3to2(project4to3(edge[0]))[1], project3to2(project4to3(edge[1]))[0], project3to2(project4to3(edge[1]))[1]);
      //}
    });
  };
  
  this.testRotate = function() {
    for (j = 0; j < this.vertices.length; j++) {
      //this.vertices[j] = rotate4d(this.vertices[j], "zw", 0.005);
      //this.vertices[j] = rotate4d(this.vertices[j], "xw", -0.005);
      //this.vertices[j] = rotate4d(this.vertices[j], "yw", 0.005);
      //this.vertices[j] = rotate4d(this.vertices[j], "yz", -0.005);
      //this.vertices[j] = rotate4d(this.vertices[j], "xz", 0.005);
      //this.vertices[j] = rotate4d(this.vertices[j], "xy", -0.005);
    }
    this.edges = [];
    for (j = 0; j < this.vertices.length - 1; j++) {
      this.edges.push([this.vertices[j], this.vertices[j + 1],]);
    }
  };
}
