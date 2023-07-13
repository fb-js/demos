// Copyright (C) 2022-2023 Nurudin Imsirovic <github.com/oxou>
//
// Created: 2022-10-11 09:35 AM
// Updated: 2023-03-21 11:24 AM

var resource = bmp_load("../images/arrow.bmp");

bmp_spawn(resource, container);

resource = bmp_mod_rotate_left(resource);
bmp_spawn(resource, container);

resource = bmp_mod_rotate_left(resource);
bmp_spawn(resource, container);

resource = bmp_mod_rotate_left(resource);
bmp_spawn(resource, container);
