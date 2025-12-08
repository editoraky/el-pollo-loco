class ThrowableObject extends MovableObject {

    constructor(x, y, direction) {
        super();
        this.loadImage("img/6_salsa_bottle/salsa_bottle.png");
        this.IMAGES_ROTATION = [
            "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
            "img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
            "img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
            "img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png"
        ];
        this.IMAGES_SPLASH = [
            "img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
            "img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
            "img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
            "img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
            "img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
            "img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png"
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

    throw() {
        this.speedY = 30;
        this.applyGravity();
        this.throwInterval = setInterval(() => {
            if (this.hasHit) return;
                if (this.otherDirection) {
                this.x -= 10;
                } else {
                this.x += 10;
            }
        }, 25);

        this.animationInterval = setInterval(() => {
            if (this.hasHit) {
                this.playAnimation(this.IMAGES_SPLASH);
            } else {
                this.playAnimation(this.IMAGES_ROTATION);
            }
        }, 50);
    }

    splash() {
        this.hasHit = true;
        this.speedY = 0;
    }
}
