// based on Code for: https://youtu.be/bGz7mv2vD6g from Daniel Shiffman
 
function Rocket(dna) {
    this.startx = 0;
    this.starty = height / 2;
    this.pos = createVector(this.startx, this.starty);
    this.vel = createVector();
    this.acc = createVector();
    this.completed = false;
    this.crashed = false;
    this.chosenOne = false;
    this.gravity = createVector(0,0);
    this.gravity.setMag(0.1);

    if (dna) {
        this.dna = dna;
    } else {
        this.dna = new DNA();
    }
    this.fitness = 0;

    this.applyForce = function (force) {
        this.acc.add(force);
        this.acc.add(this.gravity);
    }

    this.calcFitness = function () {
        var d = dist(this.pos.x, this.pos.y, target.x, target.y);

        this.fitness = map(d, 0, width, width, 0);
        if (this.completed) {
            if (this.chosenOne)
                this.fitness *= 15;
            else
                this.fitness *= 10;
        }

        /* if (this.crashed) {
      this.fitness /= 10;
    }*/

    }

    this.update = function () {

        var d = dist(this.pos.x, this.pos.y, target.x, target.y);
        if (d < 10) {
            this.completed = true;
            console.log("We have a winner! Generation: " + gen);
            this.pos = target.copy();
        }
        for (var i = 0; i < blocks.length; i++) {

            if (this.pos.x > blocks[i].x && this.pos.x < blocks[i].x + blocks[i].w && this.pos.y > blocks[i].y && this.pos.y < blocks[i].y + blocks[i].h) {
                this.crashed = true;
            }
        }

        if (this.pos.x > width || this.pos.x < 0) {
            this.crashed = true;
        }
        if (this.pos.y > height || this.pos.y < 0) {
            this.crashed = true;
        }



        this.applyForce(this.dna.genes[count]);
        if (!this.completed && !this.crashed) {
            this.vel.add(this.acc);
            this.pos.add(this.vel);
            this.acc.mult(0);
            this.vel.limit(4);
        }
    }

    this.resetChosen = function () {
        this.pos = createVector(this.startx, this.starty);
        this.vel = createVector();
        this.acc = createVector();
        this.completed = false;
        this.crashed = false;
        this.chosenOne = true;
        this.fitness = 0;
    }

    this.show = function () {
        push();
        noStroke();

        var d = floor(dist(this.pos.x, this.pos.y, target.x, target.y));
        fill(255, 150);
        if (this.chosenOne)
            fill(255, 255, 0);
        translate(this.pos.x, this.pos.y);
        //text(d, -12, -2);
        rotate(this.vel.heading());
        rectMode(CENTER);
        rect(0, 0, 25, 5);

        pop();
    }

}
