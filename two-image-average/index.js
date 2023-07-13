// Copyright (C) 2022-2023 Nurudin Imsirovic <github.com/oxou>
//
// Created: 2022-09-18 10:35 AM
// Updated: 2023-03-21 11:24 AM

var w = 100;
var h = 100;

Image1 = bmp_create(w, h);

for (let y = 30; y < h - 30; y++)
    for (let x = 30; x < w - 30; x++)
        bmp_set_pixel(Image1, x, y, 0, 255, 0);

Image2 = bmp_create(w, h);

Image3 = bmp_copy(Image1);

for (let y = 45; y < h - 45; y++)
    for (let x = 45; x < w - 45; x++)
        bmp_set_pixel(Image2, x, y, 255, 255, 255);

for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
        Image1Pixels = bmp_get_pixel(Image1, x, y);
        Image2Pixels = bmp_get_pixel(Image2, x, y);

        var Avg = [
            (Image1Pixels[0] + Image2Pixels[0]) / 2,
            (Image1Pixels[1] + Image2Pixels[1]) / 2,
            (Image1Pixels[2] + Image2Pixels[2]) / 2
        ];

        bmp_set_pixel(Image3, x, y, Avg[0], Avg[1], Avg[2]);
    }
}

bmp_spawn(Image1, container);
bmp_spawn(Image2, container);
bmp_spawn(Image3, container);
