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
        return this.y < 180; //our groundlevel
    }

    isColliding(mo) {
        return this.x + this.width > mo.x &&
            this.y + this.height > mo.y &&
            this.x < mo.x + mo.width &&
            this.y < mo.y + mo.height;
    }

    hit() {
        this.health -= 5;
        if (this.health < 0) {
            this.health = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 1;
    }

    isDead() {
        return this.energy == 0;
    }

    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
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
