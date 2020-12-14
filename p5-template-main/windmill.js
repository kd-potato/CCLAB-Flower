class Windmill {
    constructor(x, y) {
        this.x = width / 2;
        this.y = height / 2;

        this.speed = 0.5;
        this.t = "We need to pick up the wind. Blow on your microphone!";
    }

    windText() {
        fill('black');
        textSize(32);
        text(this.t, 450, 500);
    }
}