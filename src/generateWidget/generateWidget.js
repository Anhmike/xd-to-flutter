const { generateSelection } = require("./generateSelection");
const { showMessageWithColor } = require("../showMessageWithColor");
let clipboard = require("clipboard");
let scenegraph = require("scenegraph");

function onTapGenerateWidget() {
    const selection = scenegraph.selection;
    let result;
    if (selection.items.length != 0) {
        result = generateSelection(selection);
        clipboard.copyText(result);
    } else {
        showMessageWithColor("Select something", "grey", "messageWidget");
    }
}



module.exports = { onTapGenerateWidget };