/**
 * Base class for all status bars (Health, Bottle, Coin).
 * Extends DrawableObject to handle rendering logic.
 * Manages the percentage value and selects the correct image frame based on that value.
 */
class StatusBar extends DrawableObject {
    /** @type {string[]} Array containing paths to the status bar images (0% to 100%). */
    IMAGES = [];

    /** @type {number} Current percentage value (0-100). */
    percentage = 100;

    constructor() {
        super();
    }
    /**
     * Sets the percentage of the status bar and updates the displayed image.
     * @param {number} percentage - The new percentage value (0-100).
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Resolves the percentage value to an image index (0-5).
     * Used to determine which image from the IMAGES array should be displayed.
     * @returns {number} The index of the image in the IMAGES array.
     */
    resolveImageIndex() {
        if (this.percentage >= 100) {
            return 5;
        } else if (this.percentage >= 80) {
            return 4;
        } else if (this.percentage >= 60) {
            return 3;
        } else if (this.percentage >= 40) {
            return 2;
        } else if (this.percentage > 0) {
            return 1;
        } else {
            return 0;
        }
    }
}