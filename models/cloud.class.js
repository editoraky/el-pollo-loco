class Cloud extends MovableObject {
    y = 20;
    width = 500;
    height = 250;
    

    constructor() {
        super(); // 1. Erst den Eltern-Constructor aufrufen
        this.loadImage("img/5_background/layers/4_clouds/1.png"); // 2. Dann Methoden mit "this" nutzen

        this.x = Math.random() * 500;

    }
}