let level1;

function initLevel() {
    const endboss = new Endboss();
    endboss.x = 719 * 8;

    const enemies = [
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new SmallChicken(),
            new SmallChicken(),
            new SmallChicken(),
            new SmallChicken(),
            new SmallChicken(),
            new SmallChicken(),
            new SmallChicken(),
            endboss
    ];

    const clouds = [
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud()
    ];

    const backgroundObjects = [
        new BackgroundObject("img/5_background/layers/air.png",-719),
        new BackgroundObject("img/5_background/layers/3_third_layer/2.png", -719),
        new BackgroundObject("img/5_background/layers/2_second_layer/2.png", -719),
        new BackgroundObject("img/5_background/layers/1_first_layer/2.png", -719),

        new BackgroundObject("img/5_background/layers/air.png",0),
        new BackgroundObject("img/5_background/layers/3_third_layer/1.png", 0),
        new BackgroundObject("img/5_background/layers/2_second_layer/1.png", 0),
        new BackgroundObject("img/5_background/layers/1_first_layer/1.png", 0),
        new BackgroundObject("img/5_background/layers/air.png",719),
        new BackgroundObject("img/5_background/layers/3_third_layer/2.png", 719),
        new BackgroundObject("img/5_background/layers/2_second_layer/2.png", 719),
        new BackgroundObject("img/5_background/layers/1_first_layer/2.png", 719),

        new BackgroundObject("img/5_background/layers/air.png",719*2),
        new BackgroundObject("img/5_background/layers/3_third_layer/1.png", 719*2),
        new BackgroundObject("img/5_background/layers/2_second_layer/1.png", 719*2),
        new BackgroundObject("img/5_background/layers/1_first_layer/1.png", 719*2),
        new BackgroundObject("img/5_background/layers/air.png",719*3),
        new BackgroundObject("img/5_background/layers/3_third_layer/2.png", 719*3),
        new BackgroundObject("img/5_background/layers/2_second_layer/2.png", 719*3),
        new BackgroundObject("img/5_background/layers/1_first_layer/2.png", 719*3),

        new BackgroundObject("img/5_background/layers/air.png",719*4),
        new BackgroundObject("img/5_background/layers/3_third_layer/1.png", 719*4),
        new BackgroundObject("img/5_background/layers/2_second_layer/1.png", 719*4),
        new BackgroundObject("img/5_background/layers/1_first_layer/1.png", 719*4),
        new BackgroundObject("img/5_background/layers/air.png",719*5),
        new BackgroundObject("img/5_background/layers/3_third_layer/2.png", 719*5),
        new BackgroundObject("img/5_background/layers/2_second_layer/2.png", 719*5),
        new BackgroundObject("img/5_background/layers/1_first_layer/2.png", 719*5),

        new BackgroundObject("img/5_background/layers/air.png",719*6),
        new BackgroundObject("img/5_background/layers/3_third_layer/1.png", 719*6),
        new BackgroundObject("img/5_background/layers/2_second_layer/1.png", 719*6),
        new BackgroundObject("img/5_background/layers/1_first_layer/1.png", 719*6),
        new BackgroundObject("img/5_background/layers/air.png",719*7),
        new BackgroundObject("img/5_background/layers/3_third_layer/2.png", 719*7),
        new BackgroundObject("img/5_background/layers/2_second_layer/2.png", 719*7),
        new BackgroundObject("img/5_background/layers/1_first_layer/2.png", 719*7),

        new BackgroundObject("img/5_background/layers/air.png",719*8),
        new BackgroundObject("img/5_background/layers/3_third_layer/1.png", 719*8),
        new BackgroundObject("img/5_background/layers/2_second_layer/1.png", 719*8),
        new BackgroundObject("img/5_background/layers/1_first_layer/1.png", 719*8),
        new BackgroundObject("img/5_background/layers/air.png",719*9),
        new BackgroundObject("img/5_background/layers/3_third_layer/2.png", 719*9),
        new BackgroundObject("img/5_background/layers/2_second_layer/2.png", 719*9),
        new BackgroundObject("img/5_background/layers/1_first_layer/2.png", 719*9),

        new BackgroundObject("img/5_background/layers/air.png",719*10),
        new BackgroundObject("img/5_background/layers/3_third_layer/1.png", 719*10),
        new BackgroundObject("img/5_background/layers/2_second_layer/1.png", 719*10),
        new BackgroundObject("img/5_background/layers/1_first_layer/1.png", 719*10),
        new BackgroundObject("img/5_background/layers/air.png",719*11),
        new BackgroundObject("img/5_background/layers/3_third_layer/2.png", 719*11),
        new BackgroundObject("img/5_background/layers/2_second_layer/2.png", 719*11),
        new BackgroundObject("img/5_background/layers/1_first_layer/2.png", 719*11),

        new BackgroundObject("img/5_background/layers/air.png",719*12),
        new BackgroundObject("img/5_background/layers/3_third_layer/1.png", 719*12),
        new BackgroundObject("img/5_background/layers/2_second_layer/1.png", 719*12),
        new BackgroundObject("img/5_background/layers/1_first_layer/1.png", 719*12),
        new BackgroundObject("img/5_background/layers/air.png",719*13),
        new BackgroundObject("img/5_background/layers/3_third_layer/2.png", 719*13),
        new BackgroundObject("img/5_background/layers/2_second_layer/2.png", 719*13),
        new BackgroundObject("img/5_background/layers/1_first_layer/2.png", 719*13)
    ];

    const coins = [];
    const bottles = [];

    for (let i = 0; i < 20; i++) {
        coins.push(new Coin(200 + i * 150));
        bottles.push(new SalsaBottle(300 + i * 180));
    }

    level1 = new Level  (
        enemies,
        clouds,
        backgroundObjects,
        coins,
        bottles
    );
}