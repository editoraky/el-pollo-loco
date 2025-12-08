let canvas;
let world;
let keyboard = new Keyboard();

function startGame() {
    document.getElementById("start-screen").classList.add("d-none");
    init();
}

function init() {
    canvas = document.getElementById("canvas");
    initLevel();
    world = new World(canvas, keyboard);
    SoundManager.init();
    let img = document.getElementById("mute-icon");
    if (SoundManager.muted) {
        img.src = "img/sound-off-white.png";
    } else {
        img.src = "img/sound-on-white.png";
    }
    bindBtsPressEvents();
}

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

function clearAllIntervals() {
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
}

function restartGame() {
    clearAllIntervals();
    world = null;
    document.getElementById("game-over-screen").classList.add("d-none");
    document.getElementById("win-screen").classList.add("d-none");
    initLevel();
    world = new World(canvas, keyboard);
}

function toggleMute() {
    SoundManager.toggleMute();

    let img = document.getElementById("mute-icon");
    if (SoundManager.muted) {
        img.src = "img/sound-off-white.png";
    } else {
        img.src = "img/sound-on-white.png";
    }
}

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

function toggleImprint() {
    let overlay = document.getElementById("imprint-overlay");
    overlay.classList.toggle("d-none");
}

function toggleControls() {
    let overlay = document.getElementById("controls-overlay");
    overlay.classList.toggle("d-none");
}
