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
    statusBarEndboss = new StatusBarEndboss();
    gameOver = false;

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
        if (this.level && this.level.enemies) {
            const boss = this.level.enemies.find(e => e instanceof Endboss);
            if (boss) {
                boss.world = this;
                console.log("World: Endboss gefunden und verknüpft!");
        } else {
                console.warn("World: Kein Endboss im Level gefunden!");
            }
        }
    }

    // Starts the game loop to check for collisions or other game events
    run() {
        SoundManager.background_music.loop = true;
        SoundManager.background_music.play();

        SoundManager.background_sound.loop = true;
        SoundManager.background_sound.play();

        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
            this.checkCollections();
            this.checkThrowCollisions();
            this.checkGameOver();
        }, 200);
    }

    checkGameOver() {
        if (this.gameOver) return;

        if (this.character.isDead()) {
            this.gameOver = true;
            SoundManager.background_music.play();
            SoundManager.background_sound.play();

            SoundManager.lost_sound.play();
            SoundManager.lost_music.play();

            this.showGameOver();
        }
        const boss = this.level.enemies.find(e => e instanceof Endboss);
        if (boss && boss.isDead()) {
            this.gameOver = true;
            SoundManager.background_music.pause();
            SoundManager.background_sound.pause();

            setTimeout(() => {
                SoundManager.win_sound.play();
                SoundManager.win_music.play();
            }, 1000);

            this.showWin();
        }
    }

    showGameOver() {
        setTimeout(() => {
            clearAllIntervals();
            document.getElementById("game-over-screen").classList.remove("d-none");
        }, 1000);
    }

    showWin() {
        setTimeout(() => {
            clearAllIntervals();
            document.getElementById("win-screen").classList.remove("d-none");
        }, 1000);
    }

    checkThrowObjects() {
        if (this.keyboard.D) {
            if (this.canThrow && this.character.bottles > 0) {
                let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100, this.character.otherDirection);

                if (this.character.otherDirection) {
                    bottle.x = this.character.x - 10;
                }
                this.throwableObjects.push(bottle);
                this.character.bottles -= 100 / 10; // Munition verbrauchen
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
                SoundManager.collect_coin_sound.currentTime = 0;
                SoundManager.playSound(SoundManager.collect_coin_sound);
                this.character.collectCoin();
                this.level.coins.splice(index, 1);
                this.statusBarCoins.setPercentage(this.character.coins);
            }
        });

        this.level.bottles.forEach((bottle, index) => {
            if (this.character.isColliding(bottle)) {
                SoundManager.collect_bottle_sound.currentTime = 0;
                SoundManager.playSound(SoundManager.collect_bottle_sound);
                this.character.collectBottle();
                this.level.bottles.splice(index, 1);
                this.statusBarBottles.setPercentage(this.character.bottles);
            }
        });
    }

    checkCollisions() {
        this.level.enemies.forEach((enemy, index) => {
            if (this.character.isColliding(enemy) && !enemy.isDead()) {
                if (this.character.isAboveGround() && this.character.speedY < 0) {
                    enemy.kill();
                    this.character.jump();

                    setTimeout(() => {
                        this.level.enemies.splice(index, 1);
                    }, 1000);
                } else {
                    this.character.hit();
                    this.statusBar.setPercentage(this.character.health);
                }
            }
        });
    }

    checkThrowCollisions() {
        this.throwableObjects.forEach((bottle, bottleIndex) => {
            this.level.enemies.forEach((enemy, enemyIndex) => {
                if (bottle.isColliding(enemy) && !enemy.isDead()) {
                    SoundManager.playSound(SoundManager.bottle_smash_sound);
                    if (enemy instanceof Endboss) {
                        SoundManager.playSound(SoundManager.endboss_hurt_sound);
                        enemy.hit();
                        enemy.health -= 15;
                        if (enemy.health < 0) {enemy.health = 0;}
                        this.statusBarEndboss.setPercentage(enemy.health);
                        this.throwableObjects.splice(bottleIndex,1);
                    } else {
                        SoundManager.playSound(SoundManager.chicken_dead_sound);
                        enemy.kill();
                        setTimeout(() => {
                            if (this.level.enemies.includes(enemy)) {
                                this.level.enemies.splice(this.level.enemies.indexOf(enemy), 1);
                            }
                        }, 500);
                    }
                    this.throwableObjects.splice(bottleIndex,1);
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
        this.addToMap(this.statusBarEndboss);
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
        mo.drawFrame(this.ctx);
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
