/**
 * Represents a small chicken enemy.
 * These enemies are smaller, have random sizes, and move at random speeds.
 */
class SmallChicken extends MovableObject {
    y = 360;
    height = 60;
    width = 60;

    /**
     * Offset values for collision detection.
     * @type {object}
     */
    offset = {
        top: 5,
        bottom: 5,
        left: 5,
        right: 5
    };

    /** @type {string[]} Array of image paths for the walking animation. */
    IMAGES_WALKING = [
        "./img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
        "./img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
        "./img/3_enemies_chicken/chicken_small/1_walk/3_w.png"
    ];

    /** @type {string} Path to the image used when the chicken is dead. */
    IMAGE_DEAD = "./img/3_enemies_chicken/chicken_small/2_dead/dead.png";

    /**
     * Initializes the Small Chicken.
     * Loads images, sets random position (x), random speed, and random size.
     * Adjusts the Y-coordinate based on the random size to keep it grounded.
     */
    constructor() {
        super();
        this.loadImage("./img/3_enemies_chicken/chicken_small/1_walk/1_w.png");
        this.loadImages(this.IMAGES_WALKING);

        this.x = 800 + Math.random() * 5000;
        this.speed = 0.15 + Math.random() * 0.5;

        // Randomize size between 45px and 65px
        let randomSize = 45 + Math.random() * 20;
        this.width = randomSize;
        this.height = randomSize;

        // Adjust Y position so the feet always touch the ground at level 420
        this.y = 420 - this.height;

        this.animate();
    }

    /**
     * Starts the movement and animation loops.
     * The chicken moves left and cycles through walking images as long as it is not dead.
     */
    animate() {
        setInterval(() => {
            if (!this.isDead()) {
                this.moveLeft();
            }
        }, 1000 / 60);

        setInterval(() => {
            if (!this.isDead()) {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 200);
    }

    /**
     * Instantly kills the chicken.
     * Sets health to 0 and changes the image to the dead state.
     */
    kill() {
        this.health = 0;
        this.loadImage(this.IMAGE_DEAD);
    }
}