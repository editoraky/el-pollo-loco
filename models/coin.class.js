/**
 * Represents a collectible coin in the game.
 * Coins can be collected by the character to increase the score/coin count.
 * @extends MovableObject
 */
class Coin extends MovableObject {
    height = 100;
    width = 100;

    /** * Offset for collision detection.
     * Reduces the hitbox size to make collecting feel more precise.
     * @type {{top: number, bottom: number, left: number, right: number}}
     */
    offset = {
        top: 30,
        bottom: 30,
        left: 30,
        right: 30
    };

    IMAGES_COIN = ["./img/8_coin/coin_1.png", "./img/8_coin/coin_2.png"];

    /**
     * Creates a new Coin object.
     * @param {number} [x] - Optional x-coordinate. If not provided, a random position is chosen.
     */
    constructor(x) {
        super();
        this.loadImage("./img/8_coin/coin_1.png");
        this.loadImages(this.IMAGES_COIN);

        if (x !== undefined) {
            this.x = x;
        } else {
            // Random position between 200 and 700
            this.x = 200 + Math.random() * 500;
        }

        // Random height for variety
        this.y = 100 + Math.random() * 50;

        this.animate();
    }

    /**
     * Starts the animation loop to make the coin shimmer/spin.
     */
    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_COIN);
        }, 500);
    }
}