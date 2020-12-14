class Plains {
    constructor() {
        this.y = 400;
        this.width = rose.width / 3;
        this.height = rose.height / 3;

        this.check = true
    }

    show() {
        if (this.check) {
            // setTimeout(this.drawRose, 0) // and also play voice
            image(rose, random(200, 400), this.y - this.height, this.width, this.height);
            this.check = false;
        }
        fill('green')
        rectMode(CORNER)
        rect(0, this.y, width + 500, 200) // platform

    }

    drawRose() {
        image(rose, width / 2, this.y - this.height, this.width, this.height);
    }
}