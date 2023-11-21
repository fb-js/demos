// Copyright (C) 2022-2023 Nurudin Imsirovic <github.com/oxou>
//
// Created: 2022-09-18 12:10 PM
// Updated: 2023-11-21 05:42 PM

var resource = fb_load("../images/arrow.bmp");

fb_spawn(resource, container);

resource = fb_mod_rotate_left(resource);
fb_spawn(resource, container);

resource = fb_mod_rotate_left(resource);
fb_spawn(resource, container);

resource = fb_mod_rotate_left(resource);
fb_spawn(resource, container);

resource = fb_mod_replace_color(resource, 192, 0, 0, 0, 192, 192);
fb_spawn(resource, container);

resource = fb_mod_replace_color(resource, 0, 64, 96, 192, 0, 192);
fb_spawn(resource, container);
