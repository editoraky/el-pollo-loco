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
        this.throwableObjects = [];
        this.draw();
        this.setWorld();
        this.run();
    }

    setWorld() {
        this.character.world = this;
        this.character.keyboard = this.keyboard;
    }

    // Starts the game loop to check for collisions or other game events
    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
        }, 200);
    }

    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                this.character.hit();
            }
        });
    }

    checkThrowObjects() {
        if (this.keyboard.D) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            this.throwableObjects.push(bottle);
        }
    }

    draw() {
       // this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);
        //this.level.backgroundObjects.forEach(bg => {
        //    this.addToMap(bg);
        //});

        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.clouds);

        this.addObjectsToMap(this.throwableObjects);

        this.addToMap(this.character);

        this.ctx.translate.(-this.camera_x, 0);
       /** this.level.clouds.forEach(cloud => {
            this.addToMap(cloud);
        });

        this.addToMap(this.character);

        this.level.enemies.forEach(enemy => {
            this.addToMap(enemy);
        });

        let self = this;
        requestAnimationFrame(function() {
            self.draw();
        }); **/
    }

    // Adds an object to the map. Flips image if needed
    // @param {MovableObject} mo - The movable object to draw
    addToMap(mo) {
        //this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }
    // Flips the image horizontally for drawing
    // @param {MovableObject} mo
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    // Restores the image orientation after drawing
    // @param {MovableObject} mo
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}
