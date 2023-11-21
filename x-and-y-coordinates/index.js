// Copyright (C) 2022-2023 Nurudin Imsirovic <github.com/oxou>
//
// Created: 2022-09-18 12:10 PM
// Updated: 2023-11-21 05:44 PM

var w = 100;
var h = 100;

var Image1 = fb_create(w, h);

for (let y = 0; y < h; y++)
    for (let x = 0; x < w; x++)
        fb_set_pixel(Image1, x, y, 0, 0, 0);

for (let y = 5; y < 5 + 10; y++)
    for (let x = 5; x < 5 + 10; x++)
        fb_set_pixel(Image1, x, y, 0, 50, 0);

fb_spawn(Image1, container);

for (let y = 5; y < 5 + 10; y++)
    for (let x = 85; x < 85 + 10; x++)
        fb_set_pixel(Image1, x, y, 0, 100, 0);

fb_spawn(Image1, container);

for (let y = 85; y < 85 + 10; y++)
    for (let x = 85; x < 85 + 10; x++)
        fb_set_pixel(Image1, x, y, 0, 150, 0);

fb_spawn(Image1, container);

for (let y = 85; y < 85 + 10; y++)
    for (let x = 5; x < 5 + 10; x++)
        fb_set_pixel(Image1, x, y, 0, 200, 0);

fb_spawn(Image1, container);
