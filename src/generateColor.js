let clipboard = require("clipboard");
const { showMessageWithColor } = require("./showMessageWithColor");
const { fixDouble, fixName } = require("./util");
let assets = require("assets");

function onTapGenerateColor(selection) {
    if (selection.focusedArtboard == null) {
        showMessageWithColor("Select something", "grey");
    } else if (selection.items[0].fill == null) {
        showMessageWithColor("Select only one Widget", "red");
    } else if (selection.items[0].fill.startX != null) {
        showMessageWithColor("Gradient not implemented", "red");
    } else {
        const item = selection.items[0];
        const fill = item.fill;
        const color = exportColor(fill, item.opacity);
        clipboard.copyText(color);
        showMessageWithColor("Copied to clipboard", "green");
    }
}

function generateColorClass() {
    const colors = assets.colors.get();
    let resColors = "";
    colors.forEach((color, index) => {
        let name = color.name != null ? color.name : `color${index + 1}`;
        name = fixName(name[0].toLowerCase() + name.substring(1, name.length));
        const isGradient = color.gradientType != null;
        let tempColor;
        if (isGradient) {
            tempColor = exportGradient(color, 1)
        } else {
            tempColor = exportColor(color.color, 1);
        }
        resColors += `\n  static ${isGradient ? 'Gradient' : 'Color'} get ${name} => ${tempColor};`;
    });
    if (resColors == "") return "";
    return `class AppColors {${resColors}\n}`;
}

function exportColor(color, fillOpacity, withTag) {
    const opacity = fixDouble(fillOpacity * (color.a / 255));
    if (opacity == 0) return "Colors.transparent";
    const tag = withTag ? "color: " : "";
    const end = withTag ? "," : "";
    return tag + `Color(${color.toHex(true).replace("#", "0xff")})${opacity != 1 ? `.withOpacity(${opacity})` : ""}` + end;
}

function exportGradient(color, fillOpacity) {
    //TODO: Colocar alignment caso n for exportado para Class
    let stops = [];
    let colors = [];
    for (let i = 0; i < color.colorStops.length; i++) {
        let stop = color.colorStops[i];
        stops.push(fixDouble(stop["stop"]));
        colors.push(exportColor(stop["color"], fillOpacity));
    }
    colors = `colors: [${colors},],`;
    stops = stops.length == 2 ? "" : `stops: [${stops}],`;
    const type = color.gradientType == "linear" ? "Linear" : "Radial";
    return `${type}Gradient(${colors}${stops})`;
}

module.exports = { onTapGenerateColor, generateColorClass, exportColor };