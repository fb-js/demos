// Copyright (C) 2023 Nurudin Imsirovic <github.com/oxou>
// Created: 2023-03-27 02:51 PM
// Updated: 2023-11-21 05:42 PM

// TODO(oxou):
// - Implement the zoom functionality so that it zooms
//   in at the center and not the upper left corner

// First we wanna load the available magnifiers
var magnifiers = {
    "Circle":         fb_load("circle.bmp", true),
    "Heart":          fb_load("heart.bmp", true),
    "Rounded Square": fb_load("rounded-square.bmp", true),
    "Star":           fb_load("star.bmp", true),
};

var select_element = document.createElement("select");
select_element.addEventListener("click", function(e) {
        magnifier = magnifiers[e.target.value];
});

for (magnifier in magnifiers) {
    var opt = document.createElement("option");
    opt.innerText = magnifier;
    select_element.append(opt);
}

document.body.append(select_element);

var magnifier = magnifiers["Circle"];

// Now we create the resource and set everything up
var cat = fb_load("../images/cat.bmp", true);
var resource = fb_create(cat.width, cat.height, true);
fb_plot_resource(resource, cat);
var reference = fb_spawn(resource, container);

var fps = 1e3 / 24;
var state = {};
state.x = 0;
state.y = 0;
state.zoom = 2;

function _render() {
    fb_plot_resource(resource, cat);
    magnify(resource, state.x, state.y, state.zoom);
    fb_replace(reference, resource);
}

function magnify(resource, x, y) {
    var mw = magnifier.width;
    var mh = magnifier.height;

    var start_x = x - (mw / 2);
    var start_y = y - (mh / 2);

    var resource_magnifier = fb_copy(magnifier);
    var resource_portion = fb_create(mw, mh);

    fb_plot_clear(resource_portion, 255, 0, 255);
    fb_plot_resource(
        resource_portion,
        resource,
        0,
        0,
        mw,
        mh,
        start_x + mw / 4,
        start_y + mh / 4
    );

    resource_portion = fb_mod_resize(
        resource_portion,
        mw * state.zoom,
        mh * state.zoom
    );

    for (let x2 = 0; x2 < mw; x2++) {
        for (let y2 = 0; y2 < mh; y2++) {
            var c = fb_get_pixel(resource_magnifier, x2, y2);

            // Match yellow color
            if (c[0] == 255 && c[1] == 255 && c[2] == 0) {
                var c2 = fb_get_pixel(resource_portion, x2, y2);
                fb_set_pixel(resource_magnifier, x2, y2, c2[0], c2[1], c2[2]);
            }
        }
    }

    fb_plot_resource(resource, resource_magnifier, start_x, start_y, -1, -1, 0, 0, true, 255, 0, 255);
}

reference.addEventListener("mousemove", function(e) {
    state.x = e.offsetX;
    state.y = e.offsetY;
    _render();
});

reference.addEventListener("mouseout", function(e) {
    state.x = -999;
    state.y = -999;
    _render();
});

reference.addEventListener("wheel", function(e) {
    e.preventDefault();
    e.stopPropagation();
    state.zoom -= e.deltaY / 200;
    state.zoom = clamp(state.zoom, 2, 4);
    _render();
});
