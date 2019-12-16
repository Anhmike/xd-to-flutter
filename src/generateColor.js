let clipboard = require("clipboard");
const { showMessageWithColor } = require("./showMessageWithColor");
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
        name = name[0].toLowerCase() + name.substring(1, name.length);
        const tempColor = exportColor(color.color, 1);
        resColors += `\n  static Color get ${name} => ${tempColor};`
    });
    return `class AppColors {${resColors}\n}`;
}

function exportColor(color, fillOpacity, withTag) {
    const opacity = parseFloat((fillOpacity * (color.a / 255)).toFixed(2));
    if (opacity == 0) return "Colors.transparent";
    const tag = withTag ? "color: " : "";
    const end = withTag ? "," : "";
    return tag + `Color(${color.toHex(true).replace("#", "0xff")})${opacity != 1 ? `.withOpacity(${opacity})` : ""}` + end;
}

module.exports = { onTapGenerateColor, generateColorClass, exportColor };