/**
 * Represents a game level containing all game entities and environment objects.
 * Acts as a container for enemies, clouds, background objects, and collectibles.
 */
class Level {
    /** @type {MovableObject[]} Array of enemy objects in the level. */
    enemies;

    /** @type {Cloud[]} Array of cloud objects for the background. */
    clouds;

    /** @type {BackgroundObject[]} Array of background layers. */
    backgroundObjects;

    /** @type {Coin[]} Array of collectible coins. */
    coins;

    /** @type {Bottle[]} Array of collectible bottles (salsa). */
    bottles;

    /** * The x-coordinate where the level ends.
     * Used to limit the camera or character movement.
     * @type {number}
     */
    level_end_x = 8400;

    /**
     * Creates a new Level instance.
     * @param {MovableObject[]} enemies - List of enemies.
     * @param {Cloud[]} clouds - List of clouds.
     * @param {BackgroundObject[]} backgroundObjects - List of background layers.
     * @param {Coin[]} coins - List of collectible coins.
     * @param {Bottle[]} bottles - List of collectible bottles.
     */
    constructor(enemies, clouds, backgroundObjects, coins, bottles) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.coins = coins;
        this.bottles = bottles;
    }
}