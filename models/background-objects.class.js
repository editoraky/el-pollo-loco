/**
 * Represents a background element in the game world.
 * These objects move relative to the camera to create a parallax effect or static scenery.
 * @extends MovableObject
 */
class BackgroundObject extends MovableObject {

    /**
     * The width of the background object (typically fullscreen width).
     * @type {number}
     */
    width = 720;

    /**
     * The height of the background object (typically fullscreen height).
     * @type {number}
     */
    height = 480;

    /**
     * Creates a new background object.
     * @param {string} imagePath - The path to the image file.
     * @param {number} x - The initial x-coordinate on the map.
     */
    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.x = x;

        // Align the bottom of the object with the bottom of the canvas (480)
        this.y = 480 - this.height;
    }
}