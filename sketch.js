// Daniel Shiffman
// http://codingrainbow.com
// http://patreon.com/codingrainbow
// Code for: https://youtu.be/bGz7mv2vD6g

var population;
var lifespan = 400;
var lifeP, genP;
var count = 0;
var target;
var maxforce = 0.2;
var blocks = [];
var rx = 100;
var ry = 150;
var rw = 200;
var rh = 10;
var xs, ys, xe, ye;
var pnt = 0;
var first = true;
var start = false;
var button;
var gen = 0;

function setup() {
    createCanvas(800, 500);
    population = new Population();
    lifeP = createP();
    genP = createP();
    target = createVector(width / 2, 50);
    blocks[pnt] = new block(rx, ry, rx + rw, ry + rh);
    pnt++;
    blocks[pnt] = new block(200, 300, 400, 320);
    pnt++;
    blocks[pnt] = new block(400, 200, 400 + 200, 200 + 20);
    pnt++;
}

function draw() {
    background(0);

    for (var i = 0; i < blocks.length; i++) {
        blocks[i].show();
    }
    lifeP.html(count);
    genP.html("Generation:" + gen);
    //population.run();

    if (population.run()) {
        count = lifespan - 1;
    }
    count++;
    if (count == lifespan) {
        population.evaluate();
        population.selection();
        gen++;
        //population = new Population();
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
