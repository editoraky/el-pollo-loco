/**
 * Represents a standard enemy chicken.
 * This enemy moves left and has a random size and speed.
 * @extends MovableObject
 */
class Chicken extends MovableObject {
    y = 360;
    height = 60;
    width = 60;

    /** * Offset for collision detection to make the hit box accurate.
     * @type {{top: number, bottom: number, left: number, right: number}}
     */
    offset = {
        top: 0,
        bottom: 0,
        left: 5,
        right: 5
    };

    IMAGES_WALKING = [
        "./img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
        "./img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
        "./img/3_enemies_chicken/chicken_normal/1_walk/3_w.png"
    ];

    IMAGE_DEAD = "./img/3_enemies_chicken/chicken_normal/2_dead/dead.png";

    /**
     * Creates a new Chicken enemy.
     * Initializes images, random position, random speed, and random size.
     */
    constructor() {
        super();
        this.loadImage("./img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
        this.loadImages(this.IMAGES_WALKING);

        // Position enemy randomly between x=800 and x=5800
        this.x = 800 + Math.random() * 5000;

        // Random speed between 0.15 and 0.4
        this.speed = 0.15 + Math.random() * 0.25;

        // Random size variation (TASK-013)
        let randomSize = 60 + Math.random() * 20;
        this.width = randomSize;
        this.height = randomSize;

        // Align bottom to the ground (y = 420 is ground line)
        this.y = 420 - this.height;

        this.animate();
    }

    /**
     * Starts the movement and animation loops.
     */
    animate() {
        setInterval(() => this.moveChicken(), 1000 / 60);
        setInterval(() => this.playChickenAnimation(), 200);
    }

    /**
     * Moves the chicken to the left if it is not dead.
     */
    moveChicken() {
        if (!this.isDead()) {
            this.moveLeft();
        }
    }

    /**
     * Plays the walking animation if the chicken is not dead.
     */
    playChickenAnimation() {
        if (!this.isDead()) {
            this.playAnimation(this.IMAGES_WALKING);
        }
    }

    /**
     * Kills the chicken immediately (health = 0) and loads the dead image.
     */
    kill() {
        this.health = 0;
        this.loadImage(this.IMAGE_DEAD);
    }
}