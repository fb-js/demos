// Copyright (C) 2022-2023 Nurudin Imsirovic <github.com/oxou>
//
// Created: 2022-09-19 08:11 PM
// Updated: 2023-03-21 11:25 AM

resource_font_5x8  = bmp_load("../images/font/5x8/0.bmp");
resource_font_6x14 = bmp_load("../images/font/6x14/0.bmp");
resource_font_7x14 = bmp_load("../images/font/7x14/0.bmp");
resource_font_8x16 = bmp_load("../images/font/8x16/0.bmp");

var w = 200;
var h = 200;

var resource = bmp_create(w, h);

function draw_font(resource, resource_font, text) {
    var font_dim        = bmp_mod_dissect_font(resource_font);
    var font_length     = font_dim[0] * text.length;
    var resource_width  = resource.width;
    var resource_height = resource.height;
    var font_height     = font_dim[1];
    var text_pos_x      = (resource_width  / 2) - (font_length / 2);
    var text_pos_y      = (resource_height / 2) - (font_height / 2);

    bmp_plot_clear(resource, 40, 40, 40);
    bmp_plot_text(resource, resource_font, text_pos_x, text_pos_y, text);
    bmp_spawn(resource, container);
}

draw_font(resource, resource_font_5x8,  "[ resource_font_5x8 ]");
draw_font(resource, resource_font_6x14, "[ resource_font_6x14 ]");
draw_font(resource, resource_font_7x14, "[ resource_font_7x14 ]");
draw_font(resource, resource_font_8x16, "[ resource_font_8x16 ]");
