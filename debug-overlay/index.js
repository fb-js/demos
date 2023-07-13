// Copyright (C) 2023 Nurudin Imsirovic <github.com/oxou>
//
// Created: 2023-03-23 08:11 PM
// Updated: 2023-03-27 03:17 AM

// Create resource (fb1 = framebuffer 1)
var fb1 = bmp_create(768, 432, true);
var rf1 = bmp_spawn(fb1, container); // 1st reference
var rf2 = bmp_spawn(fb1, container); // 2nd reference (debug view)

var debug = true; // Have the debug visualization enabled on the 2nd view

var render_time_last = 0;
var render_time      = 0;
var render_fps       = 24;

function draw_box(fb, x, y, w, h, r, g, b, s, o) {
    o = clamp(o, 0, 1);
    s = clamp(s, 0);

    w *= s;
    h *= s;

    var do_alpha_blending = 1 > o;

    if (do_alpha_blending) {
        var lw = w + x;
        var lh = h + y;
        for (let lx = x; lx < lw; lx++) {
            for (let ly = y; ly < lh; ly++) {
                // NOTE(oxou): This math is incorrect.
                var color_behind = bmp_get_pixel(fb, lx, ly);
                var lr = color_behind[0] + lerp(0, r, o);
                var lg = color_behind[1] + lerp(0, g, o);
                var lb = color_behind[2] + lerp(0, b, o);
                bmp_set_pixel(fb, lx, ly, lr, lg, lb);
            }
        }
    } else {
        bmp_plot_rect(
            fb,
            x, y,
            w, h,
            r, g, b,
            true
        );
    }
}

function draw_text(FB, x, y, t = null, w = true, fr = 255, fg = 255, fb = 255, br = -1, bg = -1, bb = -1) {
    if (t == null)
        return;

    bmp_plot_text(
        FB, prefetch.font,
        x, y,
        t,
        w,
        fr, fg, fb,
        br, bg, bb
    );
}

function draw_box_wrapper(fb, T) {
    draw_box(fb, T.pos_x, T.pos_y, T.dim_w, T.dim_h, T.color_r, T.color_g, T.color_b, T.scale, T.opacity);
}

function create_controls_for_object(name, parent) {
    // NOTE(oxou): Will not create controls if stated so
    if ("debug_show_controls" in parent[name])
        if (parent[name].debug_show_controls == false)
            return null;

    var html = `
<td>${name}</td>
<td><input class="object-controller" type="range" step="1"   min="0" max="${fb1.width - parent[name].dim_w}"  data-property="pos_x"   value="${parent[name].pos_x}"></td>
<td><input class="object-controller" type="range" step="1"   min="0" max="${fb1.height - parent[name].dim_h}" data-property="pos_y"   value="${parent[name].pos_y}"></td>
<td><input class="object-controller" type="range" step="1"   min="0" max="${fb1.width}"                       data-property="dim_w"   value="${parent[name].dim_w}"></td>
<td><input class="object-controller" type="range" step="1"   min="0" max="${fb1.height}"                      data-property="dim_h"   value="${parent[name].dim_h}"></td>
<td><input class="object-controller" type="range" step="1"   min="0" max="255"                                data-property="color_r" value="${parent[name].color_r}"></td>
<td><input class="object-controller" type="range" step="1"   min="0" max="255"                                data-property="color_g" value="${parent[name].color_g}"></td>
<td><input class="object-controller" type="range" step="1"   min="0" max="255"                                data-property="color_b" value="${parent[name].color_b}"></td>
<td><input class="object-controller" type="range" step=".01" min="0" max="10"                                 data-property="scale"   value="${parent[name].scale}"></td>
<td><input class="object-controller" type="range" step=".01" min="0" max="1"                                  data-property="opacity" value="${parent[name].opacity}"></td>
`;
    var element = document.createElement("tr");
    element.dataset.object = name;
    element.innerHTML = html;
    return element;
}

// Function that renders
function render(draw_func, framebuffer, reference_element) {
    // First we render and draw to the |rf1|
    for (index in objects_to_draw) {
        var object = objects_to_draw[index];

        // don't render if we don't have to
        if ("render" in object)
            if (object.render == false)
                continue;

        // find draw_func index in the
        // object and if its a Function call it
        if (draw_func in object)
            if (typeof object[draw_func] === "function")
            object[draw_func](framebuffer);
    }

    bmp_replace(reference_element, framebuffer);
}

var prefetch = {};
prefetch.font = bmp_load("../images/font/6x14/0.bmp");
prefetch.font.props = bmp_mod_dissect_font(prefetch.font);

function draw_debug_on_object(fb, object) {
    var T = object;

    var fb_w = fb.width;
    var fb_h = fb.height;

    var font_w = prefetch.font.props[0];
    var font_h = prefetch.font.props[1];

    var text_nam         = `Name: ${T.name}`;
    var text_nam_l       = text_nam.length;
    var text_nam_l_charw = font_w * text_nam_l;

    var text_pos         = `Position: {x: ${T.pos_x}, y: ${T.pos_y}}`;
    var text_pos_l       = text_pos.length;
    var text_pos_l_charw = font_w * text_pos_l;

    var text_dim         = `Dimension: {w: ${T.dim_w}, h: ${T.dim_h}}`;
    var text_dim_l       = text_dim.length;
    var text_dim_l_charw = font_w * text_dim_l;

    var text_clr         = `Color: {r: ${T.color_r}, g: ${T.color_g}, b: ${T.color_b}}`;
    var text_clr_l       = text_clr.length;
    var text_clr_l_charw = font_w * text_clr_l;

    var text_scl         = `Scale: ${T.scale}`;
    var text_scl_l       = text_scl.length;
    var text_scl_l_charw = font_w * text_scl_l;

    var text_opc         = `Opacity: ${T.opacity}`;
    var text_opc_l       = text_opc.length;
    var text_opc_l_charw = font_w * text_opc_l;

    var text_pos_x = text_dim_x = text_clr_x = text_scl_x = text_opc_x = text_nam_x = T.pos_x;
    var text_pos_y = text_dim_y = text_clr_y = text_scl_y = text_opc_y = text_nam_y = T.pos_y;

    text_nam_y -= font_h * 6;
    text_pos_y -= font_h * 5;
    text_dim_y -= font_h * 4;
    text_clr_y -= font_h * 3;
    text_scl_y -= font_h * 2;
    text_opc_y -= font_h;

    // Make sure the debug text doesn't escape the view
    text_nam_x = clamp(text_nam_x, 0, fb_w - text_nam_l_charw);
    text_nam_y = clamp(text_nam_y, 0         , fb_h - font_h);

    text_pos_x = clamp(text_pos_x, 0, fb_w - text_pos_l_charw);
    text_pos_y = clamp(text_pos_y, font_h    , fb_h - font_h);

    text_dim_x = clamp(text_dim_x, 0, fb_w - text_dim_l_charw);
    text_dim_y = clamp(text_dim_y, font_h * 2, fb_h - font_h);

    text_clr_x = clamp(text_clr_x, 0, fb_w - text_clr_l_charw);
    text_clr_y = clamp(text_clr_y, font_h * 3, fb_h - font_h);

    text_scl_x = clamp(text_scl_x, 0, fb_w - text_scl_l_charw);
    text_scl_y = clamp(text_scl_y, font_h * 4, fb_h - font_h);

    text_opc_x = clamp(text_opc_x, 0, fb_w - text_opc_l_charw);
    text_opc_y = clamp(text_opc_y, font_h * 5, fb_h - font_h);

    // For each text we first plot the shadow and then the text on top
    draw_text(fb, text_nam_x + 1, text_nam_y + 1, text_nam, false,   0,   0,   0);
    draw_text(fb, text_nam_x    , text_nam_y    , text_nam, false, 255, 255, 255);

    draw_text(fb, text_pos_x + 1, text_pos_y + 1, text_pos, false,   0,   0,   0);
    draw_text(fb, text_pos_x    , text_pos_y    , text_pos, false, 255, 255, 255);

    draw_text(fb, text_dim_x + 1, text_dim_y + 1, text_dim, false,   0,   0,   0);
    draw_text(fb, text_dim_x    , text_dim_y    , text_dim, false, 255, 255, 255);

    draw_text(fb, text_clr_x + 1, text_clr_y + 1, text_clr, false,   0,   0,   0);
    draw_text(fb, text_clr_x    , text_clr_y    , text_clr, false, 255, 255, 255);

    draw_text(fb, text_scl_x + 1, text_scl_y + 1, text_scl, false,   0,   0,   0);
    draw_text(fb, text_scl_x    , text_scl_y    , text_scl, false, 255, 255, 255);

    draw_text(fb, text_opc_x + 1, text_opc_y + 1, text_opc, false,   0,   0,   0);
    draw_text(fb, text_opc_x    , text_opc_y    , text_opc, false, 255, 255, 255);
}

var objects_to_draw = {
    background: {
        name: "background",
        debug_show_controls: false,
        render: true,
        color: {r: 40, g: 40, b: 40},
        draw_debug: function(fb) {
            var ofst_x = ofst_y = prefetch.font.props[0];
            var t = `Render Time: ${render_time} ms`;

            // Add outline
            draw_text(fb, ofst_x + 1, ofst_y + 1,  t, false,   0,   0, 0);
            draw_text(fb, ofst_x + 1, ofst_y    ,  t, false,   0,   0, 0);
            draw_text(fb, ofst_x + 1, ofst_y - 1,  t, false,   0,   0, 0);
            draw_text(fb, ofst_x    , ofst_y + 1,  t, false,   0,   0, 0);
            draw_text(fb, ofst_x    , ofst_y    ,  t, false,   0,   0, 0);
            draw_text(fb, ofst_x    , ofst_y - 1,  t, false,   0,   0, 0);
            draw_text(fb, ofst_x - 1, ofst_y + 1,  t, false,   0,   0, 0);
            draw_text(fb, ofst_x - 1, ofst_y    ,  t, false,   0,   0, 0);
            draw_text(fb, ofst_x - 1, ofst_y - 1,  t, false,   0,   0, 0);

            draw_text(fb, ofst_x    , ofst_y    ,  t, false, 255, 255, 0);
        },
        draw: function(fb) {
            bmp_plot_clear(fb, this.color.r, this.color.g, this.color.b);
        }
    },
    box1: {
        name: "box1",
        render: true,
        color_r: 255,
        color_g: 0,
        color_b: 0,
        pos_x: 44,
        pos_y: 131,
        dim_w: 40,
        dim_h: 40,
        scale: 1,
        opacity: 1,
        draw_debug: function(fb) {
            draw_debug_on_object(fb, this);
        },
        draw: function(fb) {
            draw_box_wrapper(fb, this);
        }
    },
    box2: {
        name: "box2",
        render: true,
        color_r: 0,
        color_g: 255,
        color_b: 255,
        pos_x: 556,
        pos_y: 151,
        dim_w: 50,
        dim_h: 60,
        scale: 1,
        opacity: 1,
        draw_debug: function(fb) {
            draw_debug_on_object(fb, this);
        },
        draw: function(fb) {
            draw_box_wrapper(fb, this);
        }
    },
    box3: {
        name: "box3",
        render: true,
        color_r: 0,
        color_g: 255,
        color_b: 0,
        pos_x: 308,
        pos_y: 315,
        dim_w: 50,
        dim_h: 60,
        scale: 1,
        opacity: 1,
        draw_debug: function(fb) {
            draw_debug_on_object(fb, this);
        },
        draw: function(fb) {
            draw_box_wrapper(fb, this);
        }
    }
};

var controls_table = document.createElement("table");
controls_table.className = "controls-table";
var controls_thead = document.createElement("thead");
controls_thead.innerHTML = `
<tr>
    <td>
        Object Name
    </td>
    <td>
        Position X
    </td>
    <td>
        Position Y
    </td>
    <td>
        Dimension Width
    </td>
    <td>
        Dimension Height
    </td>
    <td>
        Color Channel Red
    </td>
    <td>
        Color Channel Green
    </td>
    <td>
        Color Channel Blue
    </td>
    <td>
        Scale
    </td>
    <td>
        Opacity
    </td>
</tr>
`;
var controls_tbody = document.createElement("tbody");
controls_table.append(controls_thead, controls_tbody);

// Add HTML controls to manipulate the objects
for (object in objects_to_draw) {
    var creation = create_controls_for_object(object, objects_to_draw);

    if (creation != null)
        controls_tbody.append(creation);
}

document.body.append(controls_table);

var interval_for_render = setInterval(function() {
    render_time_last = time_precise();

    render("draw", fb1, rf1);

    if (debug)
        render("draw_debug", fb1, rf2);
    else
        bmp_replace(rf2, fb1);

    render_time = time_precise() - render_time_last;
}, 1e3 / render_fps);

document.addEventListener("mousemove", function(e) {
    var t = e.target;

    if (t.className == "object-controller") {
        var obj = t.parentElement.parentElement.dataset.object;
        var idx = t.dataset.property;

        objects_to_draw[obj][idx] = Number(t.value);
    }
});
