class MovableObject {
    x = 120;
    y = 250;
    img;
    height = 150;
    width = 100;


    loadImage(path) {
        this.img = new Image(); // wäre wie this.img = getElementById("image") <img id="image" src>
        this.img.src = path;
    }
    moveRight() {
        console.log("Moving right");
    }

    moveLeft() {

    }
}