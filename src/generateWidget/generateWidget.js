const { generateSelection } = require("./generateSelection");
let clipboard = require("clipboard");
let scenegraph = require("scenegraph");

function onTapGenerateWidget() {
    const selection = scenegraph.selection;
    let result;
    if (selection.items.length != 0) {
        result = generateSelection(selection);
    } else {
        //TODO: select something
    }
    clipboard.copyText(result);
}



module.exports = { onTapGenerateWidget };