// Copyright (C) 2022-2023 Nurudin Imsirovic <github.com/oxou>
//
// Created: 2022-09-18 12:10 PM
// Updated: 2023-03-21 11:25 AM

var resource = bmp_load("../images/arrow.bmp");

bmp_spawn(resource, container);

resource = bmp_mod_rotate_left(resource);
bmp_spawn(resource, container);

resource = bmp_mod_rotate_left(resource);
bmp_spawn(resource, container);

resource = bmp_mod_rotate_left(resource);
bmp_spawn(resource, container);

resource = bmp_mod_replace_color(resource, 192, 0, 0, 0, 192, 192);
bmp_spawn(resource, container);

resource = bmp_mod_replace_color(resource, 0, 64, 96, 192, 0, 192);
bmp_spawn(resource, container);
