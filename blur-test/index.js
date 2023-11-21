// Copyright (C) 2022-2023 Nurudin Imsirovic <github.com/oxou>
//
// Created: 2022-09-19 08:11 PM
// Updated: 2023-11-21 05:38 PM

var blur_amount = 10;

resource = fb_load("../images/cat.bmp");

fb_spawn(resource, container);

// Because functions like blur are intensive by nature, the more function calls
// you make or the bigger the blur_amount in this case, the longer it will take
// to update the resource
resource = fb_mod_blur_gaussian(resource, 5);
fb_spawn(resource, container);
