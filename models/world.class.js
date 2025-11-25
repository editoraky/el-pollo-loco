class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    throwableObjects = [];
    canThrow = true;
    statusBar = new StatusBarHealth();
    statusBarCoins = new StatusBarCoin();
    statusBarBottles = new StatusBarBottle();

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext("2d");
        this.canvas = canvas;
        this.keyboard = keyboard;

        this.draw();
        this.setWorld();
        this.run();
    }

    setWorld() {
        this.character.world = this;
    }

    // Starts the game loop to check for collisions or other game events
    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
            this.checkCollections();
            this.checkThrowCollisions();
        }, 200);
    }

    checkThrowObjects() {
        if (this.keyboard.D) {
            if (this.canThrow && this.character.bottles > 0) {
                let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
                this.throwableObjects.push(bottle);
                this.character.bottles -= 20; // Munition verbrauchen
                this.statusBarBottles.setPercentage(this.character.bottles);
                this.canThrow = false;
                setTimeout(() => {
                    this.canThrow = true
                }, 200);
            }
        }
    }
    checkCollections() {
        this.level.coins.forEach((coin, index) => {
            if (this.character.isColliding(coin)) {
                this.character.collectCoin();
                this.level.coins.splice(index, 1);
                this.statusBarCoins.setPercentage(this.character.coins);
            }
        });

        this.level.bottles.forEach((bottle, index) => {
            if (this.character.isColliding(bottle)) {
                this.character.collectBottle();
                this.level.bottles.splice(index, 1);
                this.statusBarBottles.setPercentage(this.character.bottles);
            }
        });
    }

    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                this.character.hit();
                this.statusBar.setPercentage(this.character.health);
            }
        });
    }

    checkThrowCollisions() {
        this.throwableObjects.forEach((bottle, bottleIndex) => {
            this.level.enemies.forEach((enemy, enemyIndex) => {
                if (bottle.isColliding(enemy)) {
                    this.level.enemies.splice(enemyIndex, 1);

                    this.throwableObjects.splice(bottleIndex, 1);
                }
            });
        });
    }

    draw() {
       this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);

        this.ctx.translate(-this.camera_x, 0); // Kamera zurück
        this.addToMap(this.statusBar);
        this.addToMap(this.statusBarCoins);
        this.addToMap(this.statusBarBottles);
        this.ctx.translate(this.camera_x, 0);

        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObjects);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);

        this.ctx.translate(-this.camera_x, 0);

        let self = this;
        requestAnimationFrame(function() {
            self.draw();
        });
    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
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
