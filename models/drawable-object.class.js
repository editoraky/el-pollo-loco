class DrawableObject {
    img;
    imageCache = {};
    currentImage = 0;
    x = 100;
    y = 320;
    height = 120;
    width = 100;
    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    };


    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }


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
            ctx.stroke();
        }
    }

     // preloading
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

}