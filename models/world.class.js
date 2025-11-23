class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext("2d");
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.setWorld();
        this.draw();
    }

    setWorld() {
        this.character.world = this;
        this.character.keyboard = this.keyboard;
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.addToMap(this.character);

        this.level.clouds.forEach(cloud => {
            this.addToMap(cloud);
        });

        this.level.backgroundObjects.forEach(bg => {
            this.addToMap(bg);
        });

        this.level.enemies.forEach(enemy => {
            this.addToMap(enemy);
        });

        let self = this;
        requestAnimationFrame(function() {
            self.draw();
        });
    }

    addToMap(mo) {
        this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
    }
}
