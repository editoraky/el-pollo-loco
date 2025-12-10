/**
 * Represents a throwable object (specifically a Salsa bottle).
 * Extends MovableObject to handle physics (gravity) and animations.
 * Handles the rotation while flying and the splash animation upon impact.
 */
class ThrowableObject extends MovableObject {

    /**
     * Initializes the throwable object.
     * @param {number} x - The starting X coordinate.
     * @param {number} y - The starting Y coordinate.
     * @param {boolean} direction - The direction of the throw (true = left, false = right).
     */
    constructor(x, y, direction) {
        super();
        this.loadImage("./img/6_salsa_bottle/salsa_bottle.png");
        this.IMAGES_ROTATION = [
            "./img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
            "./img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
            "./img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
            "./img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png"
        ];
        this.IMAGES_SPLASH = [
            "./img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
            "./img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
            "./img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
            "./img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
            "./img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
            "./img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png"
        ];

        this.loadImages(this.IMAGES_ROTATION);
        this.loadImages(this.IMAGES_SPLASH);

        this.x = x;
        this.y = y;
        this.height = 60;
        this.width = 50;
        this.otherDirection = direction;
        this.throw();
    }

    /**
     * Initiates the throwing physics and animations.
     * Sets vertical speed for the arc, applies gravity, moves the object horizontally,
     * and cycles through the rotation images.
     */
    throw() {
        this.speedY = 21;
        this.applyGravity();
        this.throwInterval = setInterval(() => {
            if (this.hasHit) return;
            if (this.otherDirection) {
                this.x -= 10;
            } else {
                this.x += 10;
            }
        }, 25);

        setInterval(() => {
            if (this.hasHit) {
                this.playAnimation(this.IMAGES_SPLASH);
            } else {
                this.playAnimation(this.IMAGES_ROTATION);
            }
        }, 50);
    }

    /**
     * Triggers the splash effect.
     * Called when the bottle hits an enemy or the ground.
     * Stops vertical movement and sets the hit flag to switch animations.
     */
    splash() {
        this.hasHit = true;
        this.speedY = 0;
        clearInterval(this.throwInterval);
    }
}