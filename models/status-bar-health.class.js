/**
 * Represents the health status bar for the main character (Pepe).
 * Displays the current health using a green bar.
 * Extends the generic StatusBar class.
 */
class StatusBarHealth extends StatusBar {
    /**
     * Initializes the character's health bar.
     * Loads the green status bar images.
     * Sets the position to the absolute top-left corner (y=0).
     * Sets the initial value to 100%.
     */
    constructor() {
        super();
        this.IMAGES = [
            "./img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png",
            "./img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png",
            "./img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png",
            "./img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png",
            "./img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png",
            "./img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png"
        ];
        this.loadImages(this.IMAGES);
        this.x = 20;
        this.y = 0;
        this.width = 200;
        this.height = 60;
        this.setPercentage(100)
    }
}