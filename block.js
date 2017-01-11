function block(xs, ys, xe, ye) {
    this.x = xs;
    this.y = ys;

    this.w = abs(xe - xs);
    this.h = abs(ye - ys);

    this.show = function () {
        stroke(100);
        fill(200);
        rect(this.x, this.y, this.w, this.h);
    }
}
