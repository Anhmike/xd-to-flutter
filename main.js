const { onTapGenerateColor } = require("./src/generateColor");
const { onTapGenerateWidget } = require("./src/generateWidget");

let scenegraph = require("scenegraph");
let panel;

module.exports = {
    panels: {
        createWidgets: {
            show,
            update
        }
    },
};

function create() {
    panel = document.createElement("div");
    panel.innerHTML = generateHtml();
    panel.querySelector("#ExportForm").addEventListener("submit", function () {
        const selection = scenegraph.selection;
        if (document.querySelector("#color").checked) {
            onTapGenerateColor(selection);
        } else if (document.querySelector("#widget").checked) {
            const withSimpleCode = document.querySelector("#simpleCodeCheckbox").checked;
            const withDivision = document.querySelector("#division").checked;
            onTapGenerateWidget(withSimpleCode, withDivision);
        }
    });
    return panel;
}

function update() {
    const selection = scenegraph.selection;
    const buttons = document.querySelectorAll("button");
    buttons.forEach(function (button) {
        if (selection.items.length != 0) {
            button.setAttribute("uxp-variant", "cta");
        } else {
            button.setAttribute("uxp-variant", "");
        }
    });
}

function show(event) {
    if (!panel) event.node.appendChild(create());
}

function generateHtml() {
    return `
  <style>.hidden {opacity: 0.0;} .center {text-align: center;display: flex;justify-content: center;}</style>
  ${exportForm}
  <div class="center">
    <h2 id="message" style="color:green;" align="center"></h3>
  </div>
  `;
}
const exportForm = `<h2>Export</h2>
<form id= "ExportForm">
  ${_row(`<input type="radio" id="widget" name="exportGroup" checked>Widget<br>`)}
  ${_row(`<input type="radio" id="color" name="exportGroup" >Color<br>`)}    
  <h2>Plugins</h2>
  ${_row(`<input type="checkbox" id="division" name="exportGroup" >With Division<br>`)}
  ${_row(`<input type="checkbox" id="simpleCodeCheckbox" name="exportGroup" >With SimpleCode<br>`)}
  <button id="button" type="submit">Generate</button>
  ${_row(`<span>To SVG Folder Group use: svg_SVGNAME</span>`)}
  ${_row(`<span>ex: svg_hearth</span>`)}
</form>`;

function _row(content) {
    return `<label class="row">${content}</label>`;
}

