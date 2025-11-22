class Chicken extends MovableObject {

    width = 50;
    height = 80;
    y = 360;
    x = 490;

    offset = {
        top: 120,
        bottom :30,
        left : 40,
        right : 40
    }
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);

        this.x = 200 + Math.random() * 500;
        this.speed = 0.15 + Math.random() * 0.5;
        this.animate();
    }


    animate() {
        setInterval( () => {
            this.moveLeft();
        },1000 / 60);

        setInterval (() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 200);
    }
}