/**
 * Represents the main playable character (Pepe).
 * Handles movement, animation, collision responses, and status interactions.
 * @extends MovableObject
 */
class Character extends MovableObject {
    height = 280;
    y = 120;
    speed = 10;

    /** @type {number} Current number of collected coins. */
    coins = 0;

    /** @type {number} Current number of collected salsa bottles. */
    bottles = 0;

    /** @type {number} Timestamp of the last user input (used for idle detection). */
    lastMovement = 0;

    /** * Offset values for precise collision detection.
     * @type {{top: number, bottom: number, left: number, right: number}}
     */
    offset = {
        top: 80,
        bottom: 0,
        left: 30,
        right: 30
    };

    /** @type {number} Timestamp to throttle hurt sounds. */
    lastHurtSoundTime = 0;

    IMAGES_IDLE = [
        "./img/2_character_pepe/1_idle/idle/I-1.png",
        "./img/2_character_pepe/1_idle/idle/I-2.png",
        "./img/2_character_pepe/1_idle/idle/I-3.png",
        "./img/2_character_pepe/1_idle/idle/I-4.png",
        "./img/2_character_pepe/1_idle/idle/I-5.png",
        "./img/2_character_pepe/1_idle/idle/I-6.png",
        "./img/2_character_pepe/1_idle/idle/I-7.png",
        "./img/2_character_pepe/1_idle/idle/I-8.png",
        "./img/2_character_pepe/1_idle/idle/I-9.png",
        "./img/2_character_pepe/1_idle/idle/I-10.png"
    ];

    IMAGES_LONG_IDLE = [
        "./img/2_character_pepe/1_idle/long_idle/I-11.png",
        "./img/2_character_pepe/1_idle/long_idle/I-12.png",
        "./img/2_character_pepe/1_idle/long_idle/I-13.png",
        "./img/2_character_pepe/1_idle/long_idle/I-14.png",
        "./img/2_character_pepe/1_idle/long_idle/I-15.png",
        "./img/2_character_pepe/1_idle/long_idle/I-16.png",
        "./img/2_character_pepe/1_idle/long_idle/I-17.png",
        "./img/2_character_pepe/1_idle/long_idle/I-18.png",
        "./img/2_character_pepe/1_idle/long_idle/I-19.png",
        "./img/2_character_pepe/1_idle/long_idle/I-20.png"
    ];

    IMAGES_WALKING = [
        "./img/2_character_pepe/2_walk/W-21.png",
        "./img/2_character_pepe/2_walk/W-22.png",
        "./img/2_character_pepe/2_walk/W-23.png",
        "./img/2_character_pepe/2_walk/W-24.png",
        "./img/2_character_pepe/2_walk/W-25.png",
        "./img/2_character_pepe/2_walk/W-26.png"
    ];

    IMAGES_JUMPING = [
        "./img/2_character_pepe/3_jump/J-31.png",
        "./img/2_character_pepe/3_jump/J-32.png",
        "./img/2_character_pepe/3_jump/J-33.png",
        "./img/2_character_pepe/3_jump/J-34.png",
        "./img/2_character_pepe/3_jump/J-35.png",
        "./img/2_character_pepe/3_jump/J-36.png",
        "./img/2_character_pepe/3_jump/J-37.png",
        "./img/2_character_pepe/3_jump/J-38.png",
        "./img/2_character_pepe/3_jump/J-39.png"
    ];

    IMAGES_HURT = [
        "./img/2_character_pepe/4_hurt/H-41.png",
        "./img/2_character_pepe/4_hurt/H-42.png",
        "./img/2_character_pepe/4_hurt/H-43.png"
    ];

    IMAGES_DEAD = [
        "./img/2_character_pepe/5_dead/D-51.png",
        "./img/2_character_pepe/5_dead/D-52.png",
        "./img/2_character_pepe/5_dead/D-53.png",
        "./img/2_character_pepe/5_dead/D-54.png",
        "./img/2_character_pepe/5_dead/D-55.png",
        "./img/2_character_pepe/5_dead/D-56.png",
        "./img/2_character_pepe/5_dead/D-57.png"
    ];

    /** @type {World} Reference to the game world. */
    world;

    /** @type {Keyboard} Reference to the keyboard input. */
    keyboard;

    /** @type {boolean} Flag to ensure the death sound is played only once. */
    deadSoundPlayed = false;

    /** @type {boolean} Flag to indicate if the character is currently sleeping (long idle). */
    isSleeping = false;

    /**
     * Initializes the character, loads images, and starts gravity and animation loops.
     */
    constructor() {
        super();
        this.loadImage("./img/2_character_pepe/2_walk/W-21.png");
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

    /**
     * Starts the intervals for movement logic and animation playback.
     */
    animate() {
        setInterval(() => this.moveCharacter(), 1000 / 60);
        setInterval(() => this.playCharacterAnimation(), 1000 / 10);
    }

    /**
     * Checks if the character is in the air.
     * @returns {boolean} True if character is above ground or dead.
     */
    isAboveGround() {
        if (this.isDead()) {
            return true;
        }
        return this.y < 140;
    }

    /**
     * Resets the idle timer and stops sleeping state/sounds.
     */
    wakeUp() {
        this.lastMovement = new Date().getTime();
        if (this.isSleeping) {
            this.isSleeping = false;
            SoundManager.pepe_snore_sound.pause();
            SoundManager.pepe_snore_sound.currentTime = 0;
        }
    }

    /**
     * Handles the movement logic based on keyboard input.
     * Moves left, right, or jumps.
     */
    moveCharacter() {
        if (!this.world || !this.world.keyboard || this.world.gameOver) return;

        this.pepeMoveRight();
        this.pepeMoveLeft();
        this.pepeJump();

        if (this.world.keyboard.D) this.wakeUp();

        // Camera always follows the character
        this.world.camera_x = -this.x + 100;
    }

    /**
     * Moves the character to the right if input is active and within level bounds.
     */
    pepeMoveRight() {
        if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
            this.moveRight();
            this.otherDirection = false;
            this.wakeUp();
        }
    }

    /**
     * Moves the character to the left if input is active and within bounds.
     */
    pepeMoveLeft() {
        if (this.world.keyboard.LEFT && this.x > 0) {
            this.moveLeft();
            this.otherDirection = true;
            this.wakeUp();
        }
    }

    /**
     * Initiates a jump if the space bar is pressed and character is on the ground.
     */
    pepeJump() {
        if (this.world.keyboard.SPACE && !this.isAboveGround()) {
            this.jump();
            SoundManager.playSound(SoundManager.pepe_jump_sound);
            this.wakeUp();
        }
    }

    /**
     * Determines which animation to play based on character state (Dead, Hurt, Jump, Walk, Idle).
     */
    playCharacterAnimation() {
        if (!this.world || !this.world.keyboard) return;

        if (this.isDead()) {
            this.playDeathAnimation();
        } else if (this.isHurt()) {
            this.playHurtAnimation();
        } else if (this.isAboveGround()) {
            this.wakeUp();
            this.playJumpAnimation();
        } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
            this.playAnimation(this.IMAGES_WALKING);
        } else {
            this.playIdleAnimation();
        }
    }

    /**
     * Plays the correct frame of the jump animation based on vertical speed.
     * Maps speedY (+30 to -30) to the 9 frames of the animation for fluid physics.
     */
    playJumpAnimation() {
        let i = 0;

        if (this.speedY > 20) i = 0;       // Start of jump
        else if (this.speedY > 15) i = 1;
        else if (this.speedY > 5) i = 2;
        else if (this.speedY > 0) i = 3;
        else if (this.speedY > -5) i = 4;  // Peak
        else if (this.speedY > -15) i = 5;
        else if (this.speedY > -20) i = 6;
        else if (this.speedY > -25) i = 7;
        else i = 8;                        // Landing

        this.loadImage(this.IMAGES_JUMPING[i]);
    }

    /**
     * Plays the death animation and sound once.
     */
    playDeathAnimation() {
        this.wakeUp();
        if (!this.deadSoundPlayed) {
            if (!SoundManager.muted) {
                SoundManager.pepe_dead_sound.play();
            }
            this.deadSoundPlayed = true;
        }
        this.playAnimationOnce(this.IMAGES_DEAD);
    }

    /**
     * Plays the hurt animation and sound (throttled).
     */
    playHurtAnimation() {
        this.wakeUp();
        let now = new Date().getTime();
        if (now - this.lastHurtSoundTime > 1000) {
            SoundManager.playSound(SoundManager.pepe_hurt_sound);
            this.lastHurtSoundTime = now;
        }
        this.playAnimation(this.IMAGES_HURT);
    }

    /**
     * Plays idle or long idle (sleeping) animation based on inactivity time.
     * Triggers snoring sound if sleeping.
     */
    playIdleAnimation() {
        let timePassed = new Date().getTime() - this.lastMovement;

        if (timePassed > 15000) {
            this.playAnimation(this.IMAGES_LONG_IDLE);
            if (!this.isSleeping && !SoundManager.muted) {
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

    /**
     * Increases coin count and caps it at 100.
     */
    collectCoin() {
        this.coins += 10;
        if (this.coins > 100) {
            this.coins = 100;
        }
    }

    /**
     * Increases bottle count and caps it at 100.
     */
    collectBottle() {
        this.bottles += 10;
        if (this.bottles > 100) {
            this.bottles = 100;
        }
    }
}