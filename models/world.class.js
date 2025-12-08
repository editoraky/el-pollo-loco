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

    /**
     * Links the character and endboss to the world.
     */
    setWorld() {
        this.character.world = this;
        if (this.level && this.level.enemies) {
            const boss = this.level.enemies.find(e => e instanceof Endboss);
            if (boss) {
                boss.world = this;
            }
        }
    }
    /**
     * Starts the game loop and music.
     */
    run() {
        this.playBackgroundMusic();
        setInterval(() => this.runGameLogic(), 20);
        setInterval(() => this.checkGameOver(), 200);
    }

    playBackgroundMusic() {
        SoundManager.background_music.loop = true;
        SoundManager.background_music.play();
        SoundManager.background_sound.loop = true;
        SoundManager.background_sound.play();
    }

    /**
     * Main game logic loop running at 60fps (approx 20ms).
     */
    runGameLogic() {
        this.checkCollisions();
        this.checkThrowObjects();
        this.checkThrowCollisions();
        this.checkCollections();
    }

    /**
     * Checks if the game is won or lost.
     */
    checkGameOver() {
        if (this.gameOver) return;

        if (this.character.isDead()) {
            this.handleLostGame();
        }
        const boss = this.level.enemies.find((e) => e instanceof Endboss);
        if (boss && boss.isDead()) {
            this.handleWonGame();
        }
    }

    handleLostGame() {
        this.gameOver = true;
        SoundManager.background_music.play();
        SoundManager.lost_sound.play();
        SoundManager.lost_music.play();
        this.showGameOverScreen();
    }

    handleWonGame() {
        this.gameOver = true;
        SoundManager.background_music.pause();
        SoundManager.background_sound.pause();
        SoundManager.playSound(SoundManager.endboss_dead_sound);
        setTimeout(() => {
            SoundManager.win_sound.play();
            SoundManager.win_music.play();
            this.showWinScreen();
        }, 1000);
    }

    showGameOverScreen() {
        setTimeout(() => {
            clearAllIntervals();
            document.getElementById('game-over-screen').classList.remove("d-none");
        }, 1000);
    }

    showWinScreen() {
        setTimeout(() => {
            clearAllIntervals();
            document.getElementById('win-screen').classList.remove("d-none");
        }, 1000);
    }

    /**
     * Handles throwing bottles when 'D' is pressed.
     */
    checkThrowObjects() {
        if (this.keyboard.D && this.canThrow && this.character.bottles > 0) {
            this.throwBottle();
        }
    }

    throwBottle() {
        let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100, this.character.otherDirection);
        if (this.character.otherDirection) bottle.x = this.character.x - 10;

        this.throwableObjects.push(bottle);
        this.character.bottles -= 10;
        if (this.character.bottles < 0) this.character.bottles = 0;

        this.statusBarBottles.setPercentage(this.character.bottles);
        this.canThrow = false;
        setTimeout(() => this.canThrow = true, 200);
    }

    /**
     * Checks collisions between character and collectables.
     */
    checkCollections() {
        this.collectCoins();
        this.collectBottles();
    }

    collectCoins() {
        this.level.coins.forEach((coin, index) => {
            if (this.character.isColliding(coin)) {
                SoundManager.collect_coin_sound.currentTime = 0;
                SoundManager.playSound(SoundManager.collect_coin_sound);
                this.character.collectCoin();
                this.level.coins.splice(index, 1);
                this.statusBarCoins.setPercentage(this.character.coins);
            }
        });
    }

    collectBottles() {
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

    /**
     * Checks collisions between character and enemies.
     */
    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) && !enemy.isDead()) {
                this.handleEnemyCollision(enemy);
            }
        });
    }

    handleEnemyCollision(enemy) {
        if (this.isJumpingOn(enemy)) {
            this.killEnemy(enemy);
        } else {
            this.hurtCharacter(enemy);
        }
    }

    isJumpingOn(enemy) {
        const enemyCenterY = enemy.y + (enemy.height / 2);
        const pepeBottomY = this.character.y + this.character.height;
        return this.character.isAboveGround() &&
               this.character.speedY <= 0 &&
               pepeBottomY <= enemyCenterY + 10 &&
               !(enemy instanceof Endboss);
    }

    killEnemy(enemy) {
        SoundManager.playSound(SoundManager.chicken_dead_sound);
        enemy.kill();
        this.character.jump();
        setTimeout(() => {
            const index = this.level.enemies.indexOf(enemy);
            if (index > -1) this.level.enemies.splice(index, 1);
        }, 500);
    }

    hurtCharacter(enemy) {
        if (this.character.isHurt())
            return;
        if (enemy instanceof Endboss) {
            this.character.hit(20);
        } else if (enemy instanceof SmallChicken) {
            this.character.hit(5);
        } else {
            this.character.hit(10);
        }
        this.statusBar.setPercentage(this.character.health);
    }

    /**
     * Checks collisions between thrown bottles and enemies.
     */
    checkThrowCollisions() {
        this.throwableObjects.forEach((bottle) => {
            if (bottle.hasHit)
                return;
            this.checkBottleHitOnEnemies(bottle);
        });
    }

    checkBottleHitOnEnemies(bottle) {
        this.level.enemies.forEach((enemy) => {
            if (bottle.isColliding(enemy) && !enemy.isDead()) {
                this.handleBottleImpact(bottle, enemy);
            }
        });
    }

    handleBottleImpact(bottle, enemy) {
        bottle.splash();
        SoundManager.playSound(SoundManager.bottle_smash_sound);

        if (enemy instanceof Endboss) {
            this.damageEndboss(enemy);
        } else {
            this.killEnemyWithBottle(enemy);
        }

        this.removeBottleAfterSplash(bottle);
    }

    damageEndboss(enemy) {
        SoundManager.playSound(SoundManager.endboss_hurt_sound);
        enemy.hit(20);
        this.statusBarEndboss.setPercentage(enemy.health);
    }

    killEnemyWithBottle(enemy) {
        SoundManager.playSound(SoundManager.chicken_dead_sound);
        enemy.kill();
        setTimeout(() => {
            let index = this.level.enemies.indexOf(enemy);
            if (index > -1) this.level.enemies.splice(index, 1);
        }, 500);
    }

    removeBottleAfterSplash(bottle) {
        setTimeout(() => {
            let bIndex = this.throwableObjects.indexOf(bottle);
            if (bIndex > -1) this.throwableObjects.splice(bIndex, 1);
        }, 100);
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);

        this.ctx.translate(-this.camera_x, 0);
        this.drawStatusBars();
        this.ctx.translate(this.camera_x, 0);

        this.drawGameObjects();

        this.ctx.translate(-this.camera_x, 0);
        requestAnimationFrame(() => this.draw());
    }

    drawStatusBars() {
        this.addToMap(this.statusBar);
        this.addToMap(this.statusBarCoins);
        this.addToMap(this.statusBarBottles);
        this.addToMap(this.statusBarEndboss);
    }

    drawGameObjects() {
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObjects);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);
    }

    addObjectsToMap(objects) {
        objects.forEach(o => this.addToMap(o));
    }

    addToMap(mo) {
        if (mo.otherDirection) this.flipImage(mo);
        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);
        if (mo.otherDirection) this.flipImageBack(mo);
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}