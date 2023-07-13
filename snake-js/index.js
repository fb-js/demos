// Copyright (C) 2023 Nurudin Imsirovic <github.com/oxou>
// Copyright (C) 2023 Salih Muratovic   <github.com/Soapbosnia>
//
// Created: 2023-05-05 11:08 PM
// Updated: 2023-06-24 02:49 PM

// Stop the page from scrolling when using
// the arrow keys to play the game.
window.addEventListener("keydown", function(e) {
    e.preventDefault();
});

/////////////////////////////////////////
// Image-related definitions/functions //
/////////////////////////////////////////
var imageWidth  = 900;
var imageHeight = 700;

function fillBlock(image, block, color) {
    var block = block - 1;
    var x = (block % 90) * 10;
    var y = Math.floor(block / 90) * 10;
    var width = 10;
    var height = 10;

    for (let y2 = y; y2 < y + height; y2++) {
        for (let x2 = x; x2 < x + width; x2++) {
            bmp_set_pixel(image, x2, y2, color[0], color[1], color[2]);
        }
    }
}

function newFoodBlock() {
    return [Math.floor(Math.random() * 8100 / 10) + 1];
}

//////////////
// Snake.JS //
//////////////
var debug           = false;
var updateInterval  = 100;
var startBlock      = 200;
var snakeWidth      =  10;
var snakeEnd        = startBlock + snakeWidth;
var playgroundColor = [ 50,  50, 50];
var snakeColor      = [200, 100,  0];
var headColor       = [220, 120,  0];
var direction       = "right";
var foodBlock       = newFoodBlock();
var blockQueue      = [200, 201, 202, 203, 204, 205, 206, 207, 208, 209];
var playground      = bmp_create(imageWidth, imageHeight, true); // Use Canvas instead of Image
var spawnReference  = bmp_spawn(playground, container);

function renderSnake() {
    var playground = bmp_create(imageWidth, imageHeight);

    for (let y = 0; y < imageHeight; y++) {
        for (let x = 0; x < imageWidth; x++) {
            bmp_set_pixel(playground, x, y, playgroundColor[0], playgroundColor[1], playgroundColor[2]);
        }
    }

    for (let y = 0; y < imageHeight; y++) {
        for (let x = 0; x < imageWidth; x++) {
            if (x == 0 || x == imageWidth - 1 || y == 0 || y == imageHeight - 1) {
                bmp_set_pixel(playground, x, y, 200, 0, 0);
            }
        }
    }

    if (debug) {
        for (let y = 0; y < imageHeight; y += 10) {
            for (let x = 0; x < imageWidth; x += 10) {
                for (let y2 = y; y2 < y + 10; y2++) {
                    for (let x2 = x; x2 < x + 10; x2++) {
                        bmp_set_pixel(playground, x2, y2, 100, 100, 100);
    
                        if (x2 == x || x2 == x + 9 || y2 == y || y2 == y + 9) {
                            bmp_set_pixel(playground, x2, y2, 200, 0, 0);
                        }
                    }
                }
            }
        }
    }

    blockQueue.shift();

    for (let i = 0; i < blockQueue.length; i++) {
        fillBlock(playground, blockQueue[i], snakeColor);
    }

    var lastBlock = blockQueue[blockQueue.length - 1];

    fillBlock(playground, lastBlock, headColor);

    if (direction == "right") {
        blockQueue.push(snakeEnd);
        snakeEnd++;
    } else if (direction == "left") {
        blockQueue.push(snakeEnd);
        snakeEnd--;
    } else if (direction == "down") {
        blockQueue.push(snakeEnd);
        snakeEnd -= 90;
    } else if (direction == "up") {
        blockQueue.push(snakeEnd);
        snakeEnd += 90;
    }

    fillBlock(playground, foodBlock[0], [0, 200, 0]);

    if (blockQueue[blockQueue.length - 1] == foodBlock[0]) {
        blockQueue.unshift(blockQueue[0]);
        foodBlock[0] = newFoodBlock();
    }

    if (snakeEnd % 90 == 0 || snakeEnd % 90 == 1 || snakeEnd > 8100 || snakeEnd < 1 || blockQueue.includes(snakeEnd)) {
        snakeEnd = startBlock + snakeWidth;
        direction = "right";
        foodBlock = newFoodBlock();
    }

    bmp_replace(spawnReference, playground);
}
setInterval(renderSnake, updateInterval);

addEventListener("keydown", function (event) {
    if (event.key == "ArrowUp" && direction != "down") {
        direction = "up";
    } else if (event.key == "ArrowDown" && direction != "up") {
        direction = "down";
    } else if (event.key == "ArrowLeft" && direction != "right") {
        direction = "left";
    } else if (event.key == "ArrowRight" && direction != "left") {
        direction = "right";
    }
});
