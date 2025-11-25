class Endboss extends MovableObject {

    height = 400;
    width = 250;
    y = 55;

    constructor() {
        super();

        this.loadImage("img/4_enemie_boss_chicken/2_alert/G5.png");

        this.IMAGES_WALKING = [
            "img/4_enemie_boss_chicken/1_walk/G1.png",
            "img/4_enemie_boss_chicken/1_walk/G2.png",
            "img/4_enemie_boss_chicken/1_walk/G3.png",
            "img/4_enemie_boss_chicken/1_walk/G4.png"
        ];

        this.IMAGES_HURT = [
            "img/4_enemie_boss_chicken/4_hurt/G21.png",
            "img/4_enemie_boss_chicken/4_hurt/G22.png",
            "img/4_enemie_boss_chicken/4_hurt/G23.png"
        ];

        this.IMAGES_DEAD = [
            "img/4_enemie_boss_chicken/5_dead/G24.png",
            "img/4_enemie_boss_chicken/5_dead/G25.png",
            "img/4_enemie_boss_chicken/5_dead/G26.png"
        ];

        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);

        this.x = 2500;
        this.animate();
    }

    animate() {
        setInterval( () => {
            if (this.isDead()) {
                this.playAnimationOnce(this.IMAGES_DEAD);
            } else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
            } else {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 200);
    }
}