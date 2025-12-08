class Coin extends MovableObject {
    height = 100;
    width = 100;
    offset = {
        top: 10,
        bottom: 10,
        left: 10,
        right: 10
    };

    IMAGES_COIN = ["img/8_coin/coin_1.png", "img/8_coin/coin_2.png"];

    constructor(x) {
        super();
        this.loadImage("img/8_coin/coin_1.png");
        this.loadImages(this.IMAGES_COIN);

        if (x !== undefined) {
            this.x = x;
        } else {
            this.x = 200 + Math.random() * 500;
        }
        this.y = 100 + Math.random() * 50;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_COIN);
        }, 500);
    }
}

