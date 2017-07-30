// based on Code for: https://youtu.be/bGz7mv2vD6g from Daniel Shiffman
var xoff = 0;

function DNA(genes) {
  if (genes) {
    this.genes = genes;
  } else {
    this.genes = [];
    for (var i = 0; i < lifespan; i++) {
      this.genes[i] = createVector(map(noise(xoff), 0, 1, -1, 1), map(noise(xoff + 1000), 0, 1, 1, -1));
      //this.genes[i] = p5.Vector.random2D();
      this.genes[i].setMag(maxforce);
      xoff += .01;
    }
  }
  //selecting random a pairing function for two genes
  this.pairing = function(partner) {
    switch (floor(random(3))) {
      case 0:
        return this.crossover(partner);
      case 1:
        return this.randomCrossover(partner);
      case 2:
        return this.partialSwapCrossover(partner);
    }
  }
  //pairing with partial swap crossover
  this.partialSwapCrossover = function(partner) {
    var newgenes = [];
    var mid = floor(random(this.genes.length));
    for (var i = 0; i < this.genes.length; i++) {
      if (i > mid) {
        newgenes[i] = this.genes[floor(random(this.genes.length))];
      } else {
        newgenes[i] = partner.genes[i];
      }
    }
    return new DNA(newgenes);
  }
  //pairing with normal crossover
  this.crossover = function(partner) {
    var newgenes = [];
    var mid = floor(random(this.genes.length));
    for (var i = 0; i < this.genes.length; i++) {
      if (i > mid) {
        newgenes[i] = this.genes[i];
      } else {
        newgenes[i] = partner.genes[i];
      }
    }
    return new DNA(newgenes);
  }
  //pairing with random crossover
  this.randomCrossover = function(partner) {
    var newgenes = [];
    //var mid = floor(random(this.genes.length));
    for (var i = 0; i < this.genes.length; i++) {
      if (0.5 > random()) {
        newgenes[i] = this.genes[i];
      } else {
        newgenes[i] = partner.genes[i];
      }
    }
    return new DNA(newgenes);
  }
  //muatation function with mutation rate of 5%
  this.mutation = function() {
    for (var i = 0; i < this.genes.length; i++) {
      if (random(1) < 0.05) {
        this.genes[i] = p5.Vector.random2D();
        this.genes[i].setMag(maxforce);
      }
    }
    if (random(1) < 0.05) {
      for (var i = 0; i < lifespan; i++) {
        this.genes[i] = createVector(map(noise(xoff), 0, 1, -1, 1), map(noise(xoff + 1000), 0, 1, 1, -1));
        //this.genes[i] = p5.Vector.random2D();
        this.genes[i].setMag(maxforce);
        xoff += .01;
      }
    }
  }
}
