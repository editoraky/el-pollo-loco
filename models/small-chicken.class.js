class SmallChicken extends MovableObject {
    y = 360;
    height = 60;
    width = 60;
    IMAGES_WALKING = [
        "img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
        "img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
        "img/3_enemies_chicken/chicken_small/1_walk/3_w.png"
    ];
    IMAGE_DEAD = "img/3_enemies_chicken/chicken_small/2_dead/dead.png";

    constructor() {
        super();
        this.loadImage("img/3_enemies_chicken/chicken_small/1_walk/1_w.png");
        this.loadImages(this.IMAGES_WALKING);

        this.x = 400 + Math.random() * 500;
        this.speed = 0.15 + Math.random() * 0.5; // Etwas schneller als normale Hühner

        this.animate();
    }

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

    kill() {
        this.health = 0;
        this.loadImage(this.IMAGE_DEAD);
    }
}