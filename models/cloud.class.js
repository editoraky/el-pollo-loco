/**
 * Represents a floating cloud in the background.
 * Clouds move slowly to the left to create a dynamic background effect.
 * @extends MovableObject
 */
class Cloud extends MovableObject {
    y = 20;
    width = 500;
    height = 250;

    /**
     * Creates a new Cloud object.
     * Loads the image and assigns a random x-position.
     */
    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/1.png');

        // Random start position
        this.x = Math.random() * 7000;

        // Clouds move very slowly
        this.speed = 0.2;

        this.animate();
    }

    /**
     * Animate the cloud by moving it left continuously.
     */
    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
    }
}