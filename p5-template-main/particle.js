class Particle {

  constructor(x, y) {
    this.x = x;
    this.y = y;

    this.xSpeed = width / 800;
    this.ySpeed = height / 100;

    this.history = [];

    this.t = "Land the seed to grow a flower";
    this.t2 = "Where is the seed going?";
  }

  intersects(other) {
    if ((this.y > other.y - 40) && (this.x > 260) && (this.x < 640)) {
      return true;
    } else {
      return false;
    }
  }

  update() {
    this.y += this.ySpeed;
    if (this.y > 600) { // change to 1500
      this.y = 0;
    }

    var v = createVector(this.x, this.y);
    this.history.push(v);

    if (this.history.length > 12) {
      this.history.splice(0, 1);
    }
  }

  update2() {
    this.x += this.xSpeed;

    var v = createVector(this.x, this.y);
    this.history.push(v);

    if (this.history.length > 81) {
      this.history.splice(0, 1);
    }
  }

  show() {
    push()
    rectMode(CENTER);
    colorMode(HSB);
    stroke(0);

    fill(random(45), 100, 100);
    for (var i = 0; i < this.history.length; i++) {
      var pos = this.history[i];
      square(pos.x, pos.y, i);
    }

    fill(0, 100, 100);
    stroke(0);
    rotateAbout(radians(frameCount * 1.5), this.x, this.y)
    square(this.x, this.y, 15);
    pop()
  }

  show2() {
    push()
    rectMode(CENTER);
    colorMode(HSB);
    stroke(0);

    fill(random(45), 100, 100);
    for (var i = 0; i < this.history.length; i += 10) {
      var pos = this.history[i];
      square(pos.x, pos.y, i / 10);
    }

    fill(0, 100, 100);
    stroke(0);
    rotateAbout(radians(frameCount * 1.5), this.x, this.y)
    square(this.x, this.y, 15);
    pop()

  }

  particleText() {
    fill('black');
    textSize(32);
    text(this.t, 450, 500);
  }

  particleText2() {
    fill('black');
    textSize(32);
    text(this.t2, 450, 500);
  }
}  
