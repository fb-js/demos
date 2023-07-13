// Copyright (C) 2022-2023 Nurudin Imsirovic <github.com/oxou>
//
// Created: 2022-09-19 08:11 PM
// Updated: 2023-03-21 11:27 AM

var blur_amount = 10;

resource = bmp_load("../images/cat.bmp");

bmp_spawn(resource, container);

// Because functions like blur are intensive by nature, the more function calls
// you make or the bigger the blur_amount in this case, the longer it will take
// to update the resource
resource = bmp_mod_blur_gaussian(resource, 5);
bmp_spawn(resource, container);
