class Character extends MovableObject {
    height = 280;
    y = 120;
    speed = 10;
    coins = 0;
    bottles = 0;

    IMAGES_IDLE = [
        "img/2_character_pepe/1_idle/idle/I-1.png",
        "img/2_character_pepe/1_idle/idle/I-2.png",
        "img/2_character_pepe/1_idle/idle/I-3.png",
        "img/2_character_pepe/1_idle/idle/I-4.png",
        "img/2_character_pepe/1_idle/idle/I-5.png",
        "img/2_character_pepe/1_idle/idle/I-6.png",
        "img/2_character_pepe/1_idle/idle/I-7.png",
        "img/2_character_pepe/1_idle/idle/I-8.png",
        "img/2_character_pepe/1_idle/idle/I-9.png",
        "img/2_character_pepe/1_idle/idle/I-10.png"
    ];

    IMAGES_WALKING = [
        "img/2_character_pepe/2_walk/W-21.png",
        "img/2_character_pepe/2_walk/W-22.png",
        "img/2_character_pepe/2_walk/W-23.png",
        "img/2_character_pepe/2_walk/W-24.png",
        "img/2_character_pepe/2_walk/W-25.png",
        "img/2_character_pepe/2_walk/W-26.png"
    ];

    IMAGES_JUMPING = [
        "img/2_character_pepe/3_jump/J-31.png",
        "img/2_character_pepe/3_jump/J-32.png",
        "img/2_character_pepe/3_jump/J-33.png",
        "img/2_character_pepe/3_jump/J-34.png",
        "img/2_character_pepe/3_jump/J-35.png",
        "img/2_character_pepe/3_jump/J-36.png",
        "img/2_character_pepe/3_jump/J-37.png",
        "img/2_character_pepe/3_jump/J-38.png",
        "img/2_character_pepe/3_jump/J-39.png"
    ];

    IMAGES_HURT = [
        "img/2_character_pepe/4_hurt/H-41.png",
        "img/2_character_pepe/4_hurt/H-42.png",
        "img/2_character_pepe/4_hurt/H-43.png"
    ];

    IMAGES_DEAD = [
        "img/2_character_pepe/5_dead/D-51.png",
        "img/2_character_pepe/5_dead/D-52.png",
        "img/2_character_pepe/5_dead/D-53.png",
        "img/2_character_pepe/5_dead/D-54.png",
        "img/2_character_pepe/5_dead/D-55.png",
        "img/2_character_pepe/5_dead/D-56.png",
        "img/2_character_pepe/5_dead/D-57.png"
    ];

    world;
    keyboard;

    constructor() {
        super();
        this.loadImage("img/2_character_pepe/1_idle/idle/I-1.png");
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.applyGravity();
        this.animate();
    }

    //starts the animation loops for movement and images.
    animate() {
        setInterval(() => this.moveCharacter(), 1000 / 60);
        setInterval(() => this.playCharacterAnimation(), 1000 / 10);
    }

    //handles the movement logic based on keyboard input
    moveCharacter() {
        if (!this.world || !this.world.keyboard) {
            return;
        }

        if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
            this.moveRight();
            this.otherDirection = false;
        }
        if (this.world.keyboard.LEFT && this.x > 0) {
            this.moveLeft();
            this.otherDirection = true;
        }
        if (this.world.keyboard.SPACE && !this.isAboveGround()) {
            this.jump();
        }
        this.world.camera_x = -this.x + 100;
    }

    // Switches the character images based on the current state (dead, hurt, jumping, walking)
    playCharacterAnimation() {
        if (!this.world || !this.world.keyboard) {
            return;
        }

        if (this.isDead()) {
            this.playAnimationOnce(this.IMAGES_DEAD);
        } else if (this.isHurt()) {
            this.playAnimation(this.IMAGES_HURT);
        } else if (this.isAboveGround()) {
            this.playAnimation(this.IMAGES_JUMPING);
        } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
            this.playAnimation(this.IMAGES_WALKING);
        }
    }

    // Increases coin count. Cap is 100
    collectCoin() {
        this.coins += 20;
        if (this.coins > 100) {
            this.coins = 100;
        }
    }

    // Increases bottle count. Cap is 100
    collectBottle() {
        this.bottles += 20;
        if (this.bottles > 100) {
            this.bottles = 100;
        }
    }
}