/**
 * Represents the final boss enemy in the game.
 * Extends the MovableObject class to handle movement, animations, and collisions.
 */
class Endboss extends MovableObject {
    height = 400;
    width = 250;
    y = 55;

    /** * Reference to the game world object to access the character.
     * @type {World}
     */
    world;

    /** * Flag to indicate if the boss has spotted the character for the first time.
     * Triggers the boss movement and battle music.
     * @type {boolean}
     */
    hadFirstContact = false;

    /**
     * Offset values for precise collision detection.
     * Reduces the hit box size relative to the image size.
     * @type {object}
     */
    offset = {
        top: 50,
        bottom: 10,
        left: 20,
        right: 20
    };

    /**
     * Initializes the Endboss.
     * Loads all necessary images for different states and sets initial properties.
     */
    constructor() {
        super();
        this.loadImage("./img/4_enemie_boss_chicken/2_alert/G5.png");

        /** @type {string[]} Array of image paths for the alert animation. */
        this.IMAGES_ALERT = [
            "./img/4_enemie_boss_chicken/2_alert/G5.png",
            "./img/4_enemie_boss_chicken/2_alert/G6.png",
            "./img/4_enemie_boss_chicken/2_alert/G7.png",
            "./img/4_enemie_boss_chicken/2_alert/G8.png",
            "./img/4_enemie_boss_chicken/2_alert/G9.png",
            "./img/4_enemie_boss_chicken/2_alert/G10.png",
            "./img/4_enemie_boss_chicken/2_alert/G11.png",
            "./img/4_enemie_boss_chicken/2_alert/G12.png"
        ];

        /** @type {string[]} Array of image paths for the attack animation. */
        this.IMAGES_ATTACK = [
            "./img/4_enemie_boss_chicken/3_attack/G13.png",
            "./img/4_enemie_boss_chicken/3_attack/G14.png",
            "./img/4_enemie_boss_chicken/3_attack/G15.png",
            "./img/4_enemie_boss_chicken/3_attack/G16.png",
            "./img/4_enemie_boss_chicken/3_attack/G17.png",
            "./img/4_enemie_boss_chicken/3_attack/G18.png",
            "./img/4_enemie_boss_chicken/3_attack/G19.png",
            "./img/4_enemie_boss_chicken/3_attack/G20.png"
        ];

        /** @type {string[]} Array of image paths for the walking animation. */
        this.IMAGES_WALKING = [
            "./img/4_enemie_boss_chicken/1_walk/G1.png",
            "./img/4_enemie_boss_chicken/1_walk/G2.png",
            "./img/4_enemie_boss_chicken/1_walk/G3.png",
            "./img/4_enemie_boss_chicken/1_walk/G4.png"
        ];

        /** @type {string[]} Array of image paths for the hurt animation. */
        this.IMAGES_HURT = [
            "./img/4_enemie_boss_chicken/4_hurt/G21.png",
            "./img/4_enemie_boss_chicken/4_hurt/G22.png",
            "./img/4_enemie_boss_chicken/4_hurt/G23.png"
        ];

        /** @type {string[]} Array of image paths for the death animation. */
        this.IMAGES_DEAD = [
            "./img/4_enemie_boss_chicken/5_dead/G24.png",
            "./img/4_enemie_boss_chicken/5_dead/G25.png",
            "./img/4_enemie_boss_chicken/5_dead/G26.png"
        ];

        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);

        this.x = 2500;
        this.speed = 3.5;

        this.animate();
    }

    /**
     * Starts the animation and movement loops.
     * Contains two intervals:
     * 1. Handles state changes (Dead, Hurt, Attack, Walking, Alert) and sound playback.
     * 2. Handles the physical movement logic.
     */
    animate() {
        setInterval(() => {
            if (this.isDead()) {
                this.playAnimationOnce(this.IMAGES_DEAD);
            } else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
            } else if (this.world && this.world.character) {
                let distance = Math.abs(this.x - this.world.character.x);
                if (distance < 500 && !this.hadFirstContact) {
                    this.hadFirstContact = true;
                    SoundManager.playSound(SoundManager.endboss_alert_sound);
                }
                if (distance < 90) {
                    this.playAnimation(this.IMAGES_ATTACK);
                } else if (this.hadFirstContact) {
                    this.playAnimation(this.IMAGES_WALKING);
                } else {
                    this.playAnimation(this.IMAGES_ALERT);
                }
            }
        }, 200);

        setInterval(() => {
            if (this.hadFirstContact && !this.isDead() && !this.isHurt()) {
                if (this.world && this.world.character && Math.abs(this.x - this.world.character.x) > 10) {
                    this.moveLeft();
                }
            }
        }, 1000 / 60);
    }
}