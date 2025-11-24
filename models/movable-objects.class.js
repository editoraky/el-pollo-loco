class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    health = 100;
    lastHit = 0;


    /**
     * Applies gravity to the object by decreasing the y-coordinate
     * and reducing the vertical speed.
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
     * Checks if the object is in the air.
     * @returns {boolean} True if object is above ground or falling.
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true; //Throwable objects always fall
        }
        return this.y < 180; //our ground level
    }
    // Checks if this object is colliding with another movable object
    // @param {MovableObject} mo - The other object ot check collision with
    // @returns {boolean} True if objects are colliding
    isColliding(mo) {
        return this.x + this.width > mo.x &&
            this.y + this.height > mo.y &&
            this.x < mo.x + mo.width &&
            this.y < mo.y + mo.height;
    }
    // Reduces health by 5 and updates lastHit timestamp.
    // If health drops below 0, it is set to 0
    hit() {
        this.health -= 5;
        if (this.health < 0) {
            this.health = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }
    // Checks if the object was his within the last second.
    // @returns {boolean} True if hurt recently
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 1;
    }

    // Checks if the object has no health left
    // @returns {boolean} True if health is 0
    isDead() {
        return this.health === 0;
    }

    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    // Plays  an animation sequence once and stops at the last frame
    // @param {string[]} images - Array of image paths
    playAnimationOnce(images) {
        let i = this.currentImage % images.length;
        this.img = this.imageCache[images[i]];

        if (i < images.length - 1) {
            this.currentImage++;
        }
    }

    //Moves the object to the right by increasing the x-coordinate.
    moveRight() {
        this.x += this.speed;
    }
    //Moves the object to the left by decreasing the x-coordinate.
    moveLeft() {
        this.x -= this.speed;
    }

    //Initiates a jump by setting a positive vertical speed.
    jump() {
        this.speedY = 30;
    }
}
