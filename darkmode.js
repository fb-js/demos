// Dark Mode support for Demo pages
var html_template = `
<span id="dark-mode-options">
    <span class="text">Dark Mode</span>
    <span class="toggle">
        <span class="block"></span>
    </span>
</span>
`;

document.body.querySelector("h1").innerHTML += html_template;

var dark_mode_enabled = 0;
var dark_mode_options = document.querySelector("#dark-mode-options");
var dark_mode_toggle  = dark_mode_options.querySelector(".toggle");
var dark_mode_block   = dark_mode_toggle.querySelector(".block");
var _html = document.body.parentElement;

if ("dark_mode" in window.localStorage) {
    dark_mode_enabled = window.localStorage.dark_mode;
} else {
    window.localStorage.dark_mode = dark_mode_enabled;
}

if (dark_mode_enabled) {
    _html.className = "dark";
    setTimeout(function() {
        var style = document.createElement("style");
        style.innerHTML = `
* {
    transition: background-color .2s ease,
                border .2s ease,
                left .2s ease,
                color .2s ease !important;
}
`;
        document.body.append(style);
    }, 250);
}

dark_mode(dark_mode_enabled);

function dark_mode(b) {
    var ls = window.localStorage;
    if (b == 1) {
        _html.className = "dark";
        ls.dark_mode = dark_mode_enabled = 1;
    } else {
        _html.className = '';
        ls.dark_mode = dark_mode_enabled = 0;
    }
}

// Fix .dark-mode-controls height by
// inheriting through the parent
dark_mode_options.style.height = dark_mode_options.parentElement.offsetHeight + "px";

dark_mode_toggle.addEventListener("click", function(e) {
    // Primary mouse click
    if (e.which === 1)
        dark_mode(!dark_mode_enabled);
});
