/**
 * The HTML canvas element where the game is rendered.
 * @type {HTMLCanvasElement}
 */
let canvas;

/**
 * The main world object containing the character, level, and game logic.
 * @type {World}
 */
let world;

/**
 * The keyboard input handler.
 * @type {Keyboard}
 */
let keyboard = new Keyboard();

/**
 * Initialize sound manager settings immediately upon script load.
 */
SoundManager.init();

/**
 * Hides the start screen and initializes the game.
 */
function startGame() {
    document.getElementById("start-screen").classList.add("d-none");
    init();
}

/**
 * Initializes the game world, canvas, and event listeners.
 * Sets the correct mute icon based on the SoundManager state.
 */
function init() {
    canvas = document.getElementById("canvas");
    initLevel();
    world = new World(canvas, keyboard);
    let img = document.getElementById("mute-icon");
    if (SoundManager.muted) {
        img.src = "./img/sound-off-white.png";
    } else {
        img.src = "./img/sound-on-white.png";
    }
    bindBtsPressEvents();
}

/**
 * Listens for keydown events to update the keyboard state.
 * @param {KeyboardEvent} event - The keyboard event triggered.
 */
window.addEventListener("keydown", (event) => {
    if (event.keyCode == 39) {
        keyboard.RIGHT = true;
    }
    if (event.keyCode == 37) {
        keyboard.LEFT = true;
    }
    if (event.keyCode == 38) {
        keyboard.UP = true;
    }
    if (event.keyCode == 40) {
        keyboard.DOWN = true;
    }
    if (event.keyCode == 32) {
        keyboard.SPACE = true;
    }
    if (event.keyCode == 68) {
        keyboard.D = true;
    }
});

/**
 * Listens for keyup events to reset the keyboard state.
 * @param {KeyboardEvent} event - The keyboard event triggered.
 */
window.addEventListener("keyup", (event) => {
    if (event.keyCode == 39) {
        keyboard.RIGHT = false;
    }
    if (event.keyCode == 37) {
        keyboard.LEFT = false;
    }
    if (event.keyCode == 38) {
        keyboard.UP = false;
    }
    if (event.keyCode == 40) {
        keyboard.DOWN = false;
    }
    if (event.keyCode == 32) {
        keyboard.SPACE = false;
    }
    if (event.keyCode == 68) {
        keyboard.D = false;
    }
});

/**
 * Clears all active intervals (1 through 9999) to stop game loops completely.
 * Used when restarting or stopping the game.
 */
function clearAllIntervals() {
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
}

/**
 * Resets the game by clearing intervals, hiding end screens, and creating a new World instance.
 */
function restartGame() {
    clearAllIntervals();
    world = null;
    document.getElementById("game-over-screen").classList.add("d-none");
    document.getElementById("win-screen").classList.add("d-none");
    initLevel();
    world = new World(canvas, keyboard);
}

/**
 * Stops the game and returns the user to the main start screen.
 */
function goToMenu() {
    clearAllIntervals();
    world = null;
    document.getElementById("game-over-screen").classList.add("d-none");
    document.getElementById("win-screen").classList.add("d-none");
    document.getElementById("start-screen").classList.remove("d-none");
}

/**
 * Toggles the global mute state and updates the mute icon accordingly.
 */
function toggleMute() {
    SoundManager.toggleMute();
    let img = document.getElementById("mute-icon");
    if (SoundManager.muted) {
        img.src = "./img/sound-off-white.png";
    } else {
        img.src = "./img/sound-on-white.png";
    }
}

/**
 * Binds touch events to the on-screen mobile control buttons.
 * Handles touchstart and touchend to simulate keyboard presses.
 */
function bindBtsPressEvents() {
    document.getElementById("btn-left").addEventListener("touchstart", (event) => {
        event.preventDefault();
        keyboard.LEFT = true;
    });
    document.getElementById("btn-left").addEventListener("touchend", (event) => {
        event.preventDefault();
        keyboard.LEFT = false;
    });
    document.getElementById("btn-right").addEventListener("touchstart", (event) => {
        event.preventDefault();
        keyboard.RIGHT = true;
    });
    document.getElementById("btn-right").addEventListener("touchend", (event) => {
        event.preventDefault();
        keyboard.RIGHT = false;
    });
    document.getElementById("btn-jump").addEventListener("touchstart", (event) => {
        event.preventDefault();
        keyboard.SPACE = true;
    });
    document.getElementById("btn-jump").addEventListener("touchend", (event) => {
        event.preventDefault();
        keyboard.SPACE = false;
    });
    document.getElementById("btn-throw").addEventListener("touchstart", (event) => {
        event.preventDefault();
        keyboard.D = true;
    });
    document.getElementById("btn-throw").addEventListener("touchend", (event) => {
        event.preventDefault();
        keyboard.D = false;
    });
    document.getElementById("mobile-controls").addEventListener("contextmenu", (event) => {
        event.preventDefault();
        event.stopPropagation();
        return false;
    })
}

/**
 * Toggles the visibility of the imprint overlay.
 */
function toggleImprint() {
    let overlay = document.getElementById("imprint-overlay");
    overlay.classList.toggle("d-none");
}

/**
 * Toggles the visibility of the controls/how-to-play overlay.
 */
function toggleControls() {
    let overlay = document.getElementById("controls-overlay");
    overlay.classList.toggle("d-none");
}