class SalsaBottle extends MovableObject {
    height = 60;
    width = 60;

    constructor() {
        super();
        this.loadImage("img/6_salsa_bottle/1_salsa_bottle_on_ground.png");
        this.x = 200 + Math.random() * 500;
    }
}

