/**
 * Represents the status bar for collected salsa bottles (ammo).
 * Displays the current amount of bottles the character has available to throw.
 * Extends the generic StatusBar class.
 */
class StatusBarBottle extends StatusBar {
    /**
     * Initializes the bottle status bar.
     * Loads the blue status bar images.
     * Sets the position to the top left (below the coin bar).
     * Sets the initial value to 0%.
     */
    constructor() {
        super();
        this.IMAGES = [
            "./img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png",
            "./img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png",
            "./img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png",
            "./img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png",
            "./img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png",
            "./img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png"
        ];
        this.loadImages(this.IMAGES);
        this.x = 20;
        this.y = 100;
        this.width = 200;
        this.height = 60;
        this.setPercentage(0);
    }
}