// Copyright (C) 2022-2023 Nurudin Imsirovic <github.com/oxou>
//
// Created: 2022-10-11 09:35 AM
// Updated: 2023-11-21 05:43 PM

var resource = fb_load("../images/arrow.bmp");

fb_spawn(resource, container);

resource = fb_mod_rotate_left(resource);
fb_spawn(resource, container);

resource = fb_mod_rotate_left(resource);
fb_spawn(resource, container);

resource = fb_mod_rotate_left(resource);
fb_spawn(resource, container);
