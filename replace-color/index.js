// Copyright (C) 2022-2023 Nurudin Imsirovic <github.com/oxou>
//
// Created: 2022-10-11 09:35 AM
// Updated: 2023-11-21 05:43 PM

var resource = fb_load("../images/arrow.bmp");

fb_spawn(resource, container);

resource = fb_mod_replace_color(resource, 192, 0, 0, 0, 192, 192);
fb_spawn(resource, container);

resource = fb_mod_replace_color(resource, 0, 64, 96, 192, 0, 192);
fb_spawn(resource, container);
