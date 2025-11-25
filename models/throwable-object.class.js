class ThrowableObject extends MovableObject {

    /**
     * Creates a throwable bottle at the given coordinates.
     * @param {number} x - The x-coordinate.
     * @param {number} y - The y-coordinate.
     */
    constructor(x, y) {
        super();
        this.loadImage("img/6_salsa_bottle/salsa_bottle.png");
        this.IMAGES_ROTATION = [
            "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
            "img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
            "img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
            "img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png"
        ];
        this.loadImages(this.IMAGES_ROTATION);

        this.x = x;
        this.y = y;
        this.height = 60;
        this.width = 50;
        this.throw();
    }
    /**
     * Initiates the throwing physics (gravity and forward movement).
     */
    throw() {
        this.speedY = 30;
        this.applyGravity();

        // Wurf-Intervall (Bewegung & Rotation)
        setInterval(() => {
            this.x += 10;
        }, 25);


        setInterval(() => {
            this.playAnimation(this.IMAGES_ROTATION);
        }, 100);
    }
}
