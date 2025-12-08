class Character extends MovableObject {
    height = 280;
    y = 120;
    speed = 10;
    coins = 0;
    bottles = 0;
    lastMovement = 0;
    offset = {
        top: 80,
        bottom: 0,
        left: 30,
        right: 30
    };
    lastHurtSoundTime = 0;

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

    IMAGES_LONG_IDLE = [
        "img/2_character_pepe/1_idle/long_idle/I-11.png",
        "img/2_character_pepe/1_idle/long_idle/I-12.png",
        "img/2_character_pepe/1_idle/long_idle/I-13.png",
        "img/2_character_pepe/1_idle/long_idle/I-14.png",
        "img/2_character_pepe/1_idle/long_idle/I-15.png",
        "img/2_character_pepe/1_idle/long_idle/I-16.png",
        "img/2_character_pepe/1_idle/long_idle/I-17.png",
        "img/2_character_pepe/1_idle/long_idle/I-18.png",
        "img/2_character_pepe/1_idle/long_idle/I-19.png",
        "img/2_character_pepe/1_idle/long_idle/I-20.png"
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
    deadSoundPlayed = false;
    isSleeping = false;

    constructor() {
        super();
        this.loadImage("img/2_character_pepe/2_walk/W-21.png");
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONG_IDLE);
        this.applyGravity();
        this.animate();
        this.lastMovement = new Date().getTime();
    }

    animate() {
        setInterval(() => this.moveCharacter(), 1000 / 60);
        setInterval(() => this.playCharacterAnimation(), 1000 / 10);
    }

    isAboveGround() {
        if (this.isDead()) {
            return true;
        }
        return this.y < 140;
    }

    wakeUp() {
        this.lastMovement = new Date().getTime();

        if (this.isSleeping) {
            this.isSleeping = false;
            SoundManager.pepe_snore_sound.pause();
            SoundManager.pepe_snore_sound.currentTime = 0;
        }
    }
    moveCharacter() {
        if (!this.world || !this.world.keyboard || this.world.gameOver) {
            return;
        }
        if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
            this.moveRight();
            this.otherDirection = false;
            this.lastMovement = new Date().getTime();
            this.wakeUp();
        }
        if (this.world.keyboard.LEFT && this.x > 0) {
            this.moveLeft();
            this.otherDirection = true;
            this.lastMovement = new Date().getTime();
            this.wakeUp();
        }
        if (this.world.keyboard.SPACE && !this.isAboveGround()) {
            this.jump();
            SoundManager.playSound(SoundManager.pepe_jump_sound);
            this.lastMovement = new Date().getTime();
            this.wakeUp();
        }
        if (this.world.keyboard.D) {
            this.wakeUp();
        }
        this.world.camera_x = -this.x + 100;
    }

    playCharacterAnimation() {
        if (!this.world || !this.world.keyboard) {
            return;
        }
        if (this.isDead()) {
            this.wakeUp();
            if (!this.deadSoundPlayed) {
                SoundManager.pepe_dead_sound.play();
                this.deadSoundPlayed = true;
            }

            this.playAnimationOnce(this.IMAGES_DEAD);
        } else if (this.isHurt()) {
            this.wakeUp();
            let now = new Date().getTime();
            if (now - this.lastHurtSoundTime > 1000) {
                SoundManager.playSound(SoundManager.pepe_hurt_sound);
                this.lastHurtSoundTime = now;
            }
            this.playAnimation(this.IMAGES_HURT);

        } else if (this.isAboveGround()) {
            this.wakeUp();
            this.playAnimation(this.IMAGES_JUMPING);
        } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
            this.playAnimation(this.IMAGES_WALKING);
        } else {
            this.playIdleAnimation();
        }
    }

    playIdleAnimation() {
        let timePassed = new Date().getTime() - this.lastMovement;

        if (timePassed > 15000) {
            this.playAnimation(this.IMAGES_LONG_IDLE);
            if (!this.isSleeping) {
                this.isSleeping = true;
                SoundManager.pepe_snore_sound.play();
            }
        } else {
            if (this.isSleeping) {
                this.wakeUp();
            }
            this.playAnimation(this.IMAGES_IDLE);
        }
    }

    collectCoin() {
        this.coins += 10;
        if (this.coins > 100) {
            this.coins = 100;
        }
    }

    collectBottle() {
        this.bottles += 10;
        if (this.bottles > 100) {
            this.bottles = 100;
        }
    }
}