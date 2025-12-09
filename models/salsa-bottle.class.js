/**
 * Represents a collectible Salsa Bottle object sitting on the ground.
 * Extends MovableObject to inherit basic positioning and collision logic.
 */
class SalsaBottle extends MovableObject {
    height = 60;
    width = 60;

    /**
     * Offset values to adjust the collision hit box.
     * Makes the collectible area slightly smaller than the image.
     * @type {object}
     */
    offset = {
        top: 10,
        bottom: 0,
        left: 20,
        right: 20
    };

    /**
     * Initializes the Salsa Bottle.
     * @param {number} [x] - Optional X-coordinate. If not provided, a random position is calculated.
     */
    constructor(x) {
        super();
        this.loadImage("./img/6_salsa_bottle/1_salsa_bottle_on_ground.png");

        if (x !== undefined) {
            this.x = x;
        } else {
            // Random position between 200 and 700
            this.x = 200 + Math.random() * 500;
        }
        // Fixed Y position for ground placement
        this.y = 360;
    }
}