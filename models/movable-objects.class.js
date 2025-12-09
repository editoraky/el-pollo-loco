/**
 * Base class for all objects that can move or interact physically in the game.
 * Extends DrawableObject to include position and image rendering capabilities.
 * Handles physics (gravity), collision detection, health, and animations.
 */
class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    health = 100;
    lastHit = 0;

    /**
     * Applies gravity to the object.
     * Checks periodically if the object is in the air and adjusts vertical position (y) and speed (speedY).
     */
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    /**
     * Checks if the object is currently above the ground.
     * Throwable objects (bottles) are always considered above ground until collision.
     * Other objects check against a fixed Y-coordinate (180).
     * @returns {boolean} True if in the air, false otherwise.
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        }
        return this.y < 180;
    }

    /**
     * Checks for collision with another movable object.
     * Uses the object's offset values to calculate a precise hit box.
     * @param {MovableObject} mo - The other object to check collision against.
     * @returns {boolean} True if the hit boxes overlap.
     */
    isColliding(mo) {
        return  this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
    }

    /**
     * Reduces the object's health by a specified amount.
     * Updates the timestamp of the last hit.
     * @param {number} [damage=5] - Amount of damage to deal (default is 5).
     */
    hit(damage = 5) {
        this.health -= damage;
        if (this.health < 0) {
            this.health = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * Checks if the object was hurt recently (within the last 1 second).
     * Used to trigger hurt animations or invulnerability frames.
     * @returns {boolean} True if currently in hurt state.
     */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 1;
    }

    /**
     * Checks if the object has no health left.
     * @returns {boolean} True if health is 0.
     */
    isDead() {
        return this.health === 0;
    }

    /**
     * Plays an animation loop from a given array of image paths.
     * Cycles through the array indefinitely.
     * @param {string[]} images - Array of image paths.
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /**
     * Plays an animation sequence once and stops at the last frame.
     * Useful for non-looping animations like dying.
     * @param {string[]} images - Array of image paths.
     */
    playAnimationOnce(images) {
        let i = this.currentImage % images.length;
        this.img = this.imageCache[images[i]];

        if (i < images.length - 1) {
            this.currentImage++;
        }
    }

    /** Moves the object to the right by its speed value. */
    moveRight() {
        this.x += this.speed;
    }

    /** Moves the object to the left by its speed value. */
    moveLeft() {
        this.x -= this.speed;
    }

    /**
     * Makes the object jump by setting a positive vertical speed.
     * Gravity will automatically pull it down afterwards.
     */
    jump() {
        this.speedY = 30;
    }
}