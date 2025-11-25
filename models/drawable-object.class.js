class DrawableObject {
    img;
    imageCache = {};
    currentImage = 0;
    x = 100;
    y = 320;
    height = 120;
    width = 100;


    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }


    drawFrame(ctx) {

        if(this instanceof Character || this instanceof Chicken) {

            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'white';
            ctx.rect(this.x, this.y, this.width, this.height);
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