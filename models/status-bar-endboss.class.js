/**
 * Represents the health status bar for the final boss.
 * Unlike the other status bars, this one is positioned on the right side of the screen
 * and manages its own image resolution logic.
 */
class StatusBarEndboss extends DrawableObject {
    /** @type {string[]} Array of image paths for the blue boss health bar. */
    IMAGES = [
        "./img/7_statusbars/2_statusbar_endboss/blue/blue0.png",
        "./img/7_statusbars/2_statusbar_endboss/blue/blue20.png",
        "./img/7_statusbars/2_statusbar_endboss/blue/blue40.png",
        "./img/7_statusbars/2_statusbar_endboss/blue/blue60.png",
        "./img/7_statusbars/2_statusbar_endboss/blue/blue80.png",
        "./img/7_statusbars/2_statusbar_endboss/blue/blue100.png"
    ];

    /**
     * Initializes the Endboss status bar.
     * Loads images, sets the position to the top-right, and starts at 100% health.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 500;
        this.y = 10;
        this.width = 200;
        this.height = 60;
        this.setPercentage(100);
    }

    /**
     * Updates the percentage of the boss health bar and sets the corresponding image.
     * @param {number} percentage - The current health percentage (0-100).
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Determines which image index to use based on the current percentage.
     * @returns {number} The index of the image in the IMAGES array.
     */
    resolveImageIndex() {
        if (this.percentage === 100) {
            return 5;
        } else if (this.percentage >= 80) {
            return 4;
        } else if (this.percentage >= 60) {
            return 3;
        } else if (this.percentage >= 40) {
            return 2;
        } else if (this.percentage >= 20) {
            return 1;
        } else {
            return 0;
        }
    }
}