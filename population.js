// based on Code for: https://youtu.be/bGz7mv2vD6g from Daniel Shiffman
function Population() {
  this.rockets = [];
  this.popsize = 150;
  this.matingpool = [];

  for (var i = 0; i < this.popsize; i++) {
    this.rockets[i] = new Rocket();
  }
  //evalute fitness of population and push quantity based on fitness in matingpool
  this.evaluate = function() {
    var maxfit = 0;
    for (var i = 0; i < this.popsize; i++) {
      this.rockets[i].calcFitness();
      if (this.rockets[i].fitness > maxfit) {
        maxfit = this.rockets[i].fitness;
      }
    }

    for (var i = 0; i < this.popsize; i++) {
      this.rockets[i].fitness /= maxfit;
    }

    this.matingpool = [];
    for (var i = 0; i < this.popsize; i++) {
      var n = this.rockets[i].fitness * 100;
      for (var j = 0; j < n; j++) {
        this.matingpool.push(this.rockets[i]);
      }
    }
  }
  //select random dna from matingpool and mate them into new matingpool
  this.selection = function() {
    var newRockets = [];
    var fittest = new Rocket();
    fittest.fitness = 0;

    for (var i = 0; i < this.rockets.length; i++) {
      if (this.rockets[i].fitness > fittest.fitness) {
        fittest = this.rockets[i];
        console.log("Fittest score: " + fittest.fitness);
      }
      var parentA = random(this.matingpool).dna;
      var parentB = random(this.matingpool).dna;
      var child = parentA.pairing(parentB);
      child.mutation();
      newRockets[i] = new Rocket(child);
    }
    fittest.resetChosen();
    newRockets[this.rockets.length - 1] = fittest;
    this.rockets = newRockets;

  }
  //updates the rockets from the current population
  this.run = function() {
    var stopEarly = true;
    for (var i = 0; i < this.popsize; i++) {
      if (this.rockets[i].crashed == false && this.rockets[i].completed == false) {
        stopEarly = false;
      }
      this.rockets[i].update();
      this.rockets[i].show();
    }
    return stopEarly;
  }
}
