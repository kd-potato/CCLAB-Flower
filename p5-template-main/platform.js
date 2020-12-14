function Platform(x, y, w, h) {
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;

  this.show = function () {
    push()
    rectMode(CENTER);
    colorMode(RGB)
    fill(62, 158, 91);
    rect(this.x, this.y, this.w, this.h);
  }
}