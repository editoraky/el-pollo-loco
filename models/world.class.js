/**
 * The main game engine class.
 * Connects the logic, the canvas rendering, the character, the level, and the user input.
 * Handles collision detection, game loop, and drawing objects.
 */
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

    /**
     * Initializes the game world.
     * @param {HTMLCanvasElement} canvas - The HTML canvas element to draw on.
     * @param {Keyboard} keyboard - The keyboard input handler.
     */
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext("2d");
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }

    /**
     * Links the character and endboss to the world instance.
     * This allows the character and boss to access world properties (like the other's position).
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
     * Starts the game loop and background music.
     * Sets up intervals for game logic and game-over checks.
     */
    run() {
        if (!SoundManager.muted) {
            this.playBackgroundMusic();
        }
        setInterval(() => this.runGameLogic(), 20);
        setInterval(() => this.checkGameOver(), 200);
    }

    /** Plays the background music loop. */
    playBackgroundMusic() {
        SoundManager.playBackgroundMusic();
    }

    /**
     * Main game logic loop running at approx 50-60fps.
     * Checks for collisions, throwing actions, and collection of items.
     */
    runGameLogic() {
        this.checkCollisions();
        this.checkThrowObjects();
        this.checkThrowCollisions();
        this.checkCollections();
    }

    /**
     * Checks if the game is won or lost.
     * Triggers the appropriate end-game screens.
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

    /** Handles the sequence when the player loses. */
    handleLostGame() {
        this.gameOver = true;
        if (!SoundManager.muted) {
            SoundManager.playBackgroundMusic();
            SoundManager.lost_sound.play();
            SoundManager.lost_music.play();
        }
        this.showGameOverScreen();
    }

    /** Handles the sequence when the player wins. */
    handleWonGame() {
        this.gameOver = true;

        SoundManager.playSound(SoundManager.endboss_dead_sound);
        setTimeout(() => {
            if (!SoundManager.muted) {
                SoundManager.win_sound.play();
                SoundManager.win_music.play();
            }
            this.showWinScreen();
        }, 1000);
    }

    /** Displays the Game Over HTML overlay. */
    showGameOverScreen() {
        setTimeout(() => {
            clearAllIntervals();
            document.getElementById('game-over-screen').classList.remove("d-none");
        }, 1000);
    }

    /** Displays the Win HTML overlay. */
    showWinScreen() {
        setTimeout(() => {
            clearAllIntervals();
            document.getElementById('win-screen').classList.remove("d-none");
        }, 1000);
    }

    /**
     * Checks if the 'D' key is pressed to throw a bottle.
     * Manages the cooldown and bottle count.
     */
    checkThrowObjects() {
        if (this.keyboard.D && this.canThrow && this.character.bottles > 0) {
            this.throwBottle();
        }
    }

    /** Creates a new throwable object and adds it to the game. */
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
     * Checks collisions between character and collectables (coins, bottles).
     */
    checkCollections() {
        this.collectCoins();
        this.collectBottles();
    }

    /** Handles collecting coins. */
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

    /** Handles collecting salsa bottles. */
    collectBottles() {
        this.level.bottles.forEach((bottle, index) => {
            if (this.character.isColliding(bottle) && this.character.bottles < 100) {
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
     * Decides whether the character gets hurt or the enemy gets killed (jump).
     */
    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) && !enemy.isDead()) {
                this.handleEnemyCollision(enemy);
            }
        });
    }

    /**
     * Handles logic when character collides with an enemy.
     * @param {MovableObject} enemy - The enemy involved in the collision.
     */
    handleEnemyCollision(enemy) {
        if (this.isJumpingOn(enemy)) {
            this.killEnemy(enemy);
        } else {
            this.hurtCharacter(enemy);
        }
    }

    /**
     * Checks if the character is successfully jumping on top of an enemy.
     * (Not applicable to Endboss).
     * @param {MovableObject} enemy
     * @returns {boolean}
     */
    isJumpingOn(enemy) {
        const enemyCenterY = enemy.y + (enemy.height / 2);
        const pepeBottomY = this.character.y + this.character.height;
        return this.character.isAboveGround() &&
            this.character.speedY <= 0 &&
            pepeBottomY <= enemyCenterY + 10 &&
            !(enemy instanceof Endboss);
    }

    /**
     * Kills a normal enemy (Chicken/SmallChicken).
     * @param {MovableObject} enemy
     */
    killEnemy(enemy) {
        SoundManager.playSound(SoundManager.chicken_dead_sound);
        enemy.kill();
        this.character.jump();
        setTimeout(() => {
            const index = this.level.enemies.indexOf(enemy);
            if (index > -1) this.level.enemies.splice(index, 1);
        }, 500);
    }

    /**
     * Hurts the character based on the enemy type.
     * @param {MovableObject} enemy
     */
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

    /**
     * Iterates through enemies to see if a specific bottle hit them.
     * @param {ThrowableObject} bottle
     */
    checkBottleHitOnEnemies(bottle) {
        this.level.enemies.forEach((enemy) => {
            if (bottle.isColliding(enemy) && !enemy.isDead()) {
                this.handleBottleImpact(bottle, enemy);
            }
        });
    }

    /**
     * Handles the logic when a bottle hits an enemy.
     * @param {ThrowableObject} bottle
     * @param {MovableObject} enemy
     */
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

    /**
     * Deals damage to the Endboss.
     * @param {Endboss} enemy
     */
    damageEndboss(enemy) {
        SoundManager.playSound(SoundManager.endboss_hurt_sound);
        enemy.hit(20);
        this.statusBarEndboss.setPercentage(enemy.health);
    }

    /**
     * Kills a normal enemy instantly with a bottle.
     * @param {MovableObject} enemy
     */
    killEnemyWithBottle(enemy) {
        SoundManager.playSound(SoundManager.chicken_dead_sound);
        enemy.kill();
        setTimeout(() => {
            let index = this.level.enemies.indexOf(enemy);
            if (index > -1) this.level.enemies.splice(index, 1);
        }, 500);
    }

    /**
     * Removes the bottle from the game array after the splash animation.
     * @param {ThrowableObject} bottle
     */
    removeBottleAfterSplash(bottle) {
        setTimeout(() => {
            let bIndex = this.throwableObjects.indexOf(bottle);
            if (bIndex > -1) this.throwableObjects.splice(bIndex, 1);
        }, 100);
    }

    /**
     * Clears the canvas and redraws the entire world.
     * Uses requestAnimationFrame for the render loop.
     */
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

    /** Draws all UI status bars. */
    drawStatusBars() {
        this.addToMap(this.statusBar);
        this.addToMap(this.statusBarCoins);
        this.addToMap(this.statusBarBottles);

        if (this.level && this.level.enemies) {
            const boss = this.level.enemies.find(e => e instanceof Endboss);
            if (boss && boss.hadFirstContact) {
                this.addToMap(this.statusBarEndboss);
            }
        }
    }

    /** Draws all game entities (Character, Enemies, Items). */
    drawGameObjects() {
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObjects);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);
    }

    /**
     * Helper to add a list of objects to the map.
     * @param {MovableObject[]} objects
     */
    addObjectsToMap(objects) {
        objects.forEach(o => this.addToMap(o));
    }

    /**
     * Adds a single object to the map.
     * Handles image flipping if the object is moving in the other direction.
     * @param {MovableObject} mo
     */
    addToMap(mo) {
        if (mo.otherDirection) this.flipImage(mo);
        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);
        if (mo.otherDirection) this.flipImageBack(mo);
    }

    /**
     * Flips the context horizontally to draw images facing left.
     * @param {MovableObject} mo
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    /**
     * Restores the context after drawing a flipped image.
     * @param {MovableObject} mo
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}