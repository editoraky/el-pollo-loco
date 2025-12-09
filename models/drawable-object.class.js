/**
 * Base class for all visual elements in the game.
 * Handles image loading, caching, and drawing to the canvas.
 */
class DrawableObject {
    /** @type {HTMLImageElement} The current image being displayed. */
    img;

    /** @type {Object.<string, HTMLImageElement>} Cache for preloaded images to prevent flickering. */
    imageCache = {};

    /** @type {number} Index of the current image in an animation sequence. */
    currentImage = 0;

    x = 100;
    y = 320;
    height = 120;
    width = 100;

    /** * Collision box offsets.
     * Can be overridden by subclasses to adjust hitboxes.
     * @type {{top: number, bottom: number, left: number, right: number}}
     */
    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    };

    /**
     * Loads a single image from a path.
     * @param {string} path - The path to the image file.
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * Draws the current image onto the canvas context.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     */
    draw(ctx) {
        // Note: We added a try-catch block here in previous steps for safety.
        // If you want that safety back, you can wrap this line in try { ... } catch(e) { ... }
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    /**
     * Draws a rectangular frame around the object for debugging purposes.
     * Useful for visualizing the hitbox/collision box.
     * Currently commented out (ctx.stroke) for production.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     */
    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof Endboss || this instanceof SmallChicken || this instanceof ThrowableObject) {
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'white';
            ctx.rect(
                this.x + this.offset.left,
                this.y + this.offset.top,
                this.width - this.offset.right - this.offset.left,
                this.height - this.offset.bottom - this.offset.top
            );
            // ctx.stroke(); // Debugging frame is disabled for release
        }
    }

    /**
     * Preloads multiple images into the image cache.
     * @param {string[]} arr - Array of image paths.
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }
}