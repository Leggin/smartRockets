// based on Code for: https://youtu.be/bGz7mv2vD6g from Daniel Shiffman

var population;
var lifespan = 600;
var lifeP, genP;
var count = 0;
var target;
var maxforce = 0.2;
var blocks = [];
var xs, ys, xe, ye;
var pnt = 0;
var first = true;
var start = false;
var button;
var gen = 0;

function setup() {
    createCanvas(1000, 500);
    population = new Population();
    lifeP = createP();
    genP = createP();
    target = createVector(width - 50, height / 2);
    blocks[pnt] = new block(220, 4, 220 + 20, height / 2 + 100);
    pnt++;
    blocks[pnt] = new block(450, height / 2 - 100, 450 + 20, height);
    pnt++;
    blocks[pnt] = new block(700, 0 + 4, 700 + 20, height / 2 + 100);
    pnt++;
}

function draw() {
    background(0);

    for (var i = 0; i < blocks.length; i++) {
        blocks[i].show();
    }

    lifeP.html(count);
    genP.html("Generation:" + gen);

    if (population.run()) {
        count = lifespan - 1;
    }
    count++;
    if (count == lifespan) {
        population.evaluate();
        population.selection();
        gen++;
        count = 0;
    }

    fill(255);
    ellipse(target.x, target.y, 16, 16);

}


this.start = function () {
    start = true;
}

function mouseClicked() {

    if (first) {
        xs = mouseX;
        ys = mouseY;
        first = false;
    } else {


        xe = mouseX;
        ye = mouseY;
        if (xs > xe) {
            var tmpx = xs;
            xs = xe;
            xe = tmpx;
        }
        var b = new block(xs, ys, xe, ye);
        blocks[pnt] = b;
        pnt++;
        first = true;
    }
}
