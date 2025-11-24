class Coin extends MovableObject {
    height = 100;
    width = 100;

    constructor() {
        super();
        this.loadImage("img/8_coin/coin_1.png");
        this.x = 200 + Math.random() * 500;
        this.y = 100 + Math.random() * 50;
    }
}

