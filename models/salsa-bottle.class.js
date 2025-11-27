class SalsaBottle extends MovableObject {
    height = 60;
    width = 60;
    offset = {
        top: 10,
        bottom: 10,
        left: 10,
        right: 10
    };

    constructor(x) {
        super();
        this.loadImage("img/6_salsa_bottle/1_salsa_bottle_on_ground.png");

        if (x !== undefined) {
            this.x = x;
        } else {
            this.x = 200 + Math.random() * 500;
        }
        this.y = 360;
    }
}

