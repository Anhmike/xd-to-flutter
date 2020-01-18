const { generateColorClass } = require("./generateColor");
const { generateStyleClass } = require("./generateStyle");
const { generateSelection } = require("./generateWidget/generateSelection");
const { statelessWidget, fixName } = require("./util");
const { showMessageWithColor } = require("./showMessageWithColor");
let scenegraph = require("scenegraph");
let clipboard = require("clipboard");

function onTapGenerateGlobal(type) {
    let result;
    if (type == 'colors') {
        result = generateColorClass();
    } else if (type == 'textStyles') {
        result = generateStyleClass();
    } else {
        result = generateComponents();
    }
    clipboard.copyText(result);
    showMessageWithColor("Copied to clipboard", "green", "messageGlobal");

}

function generateComponents() {
    const components = [];
    const usedComponentsId = [];
    const artboards = scenegraph.selection.editContext.children;
    artboards.forEach(artboard => {
        let isArtboard = artboard.constructor.name == "Artboard";
        if (isArtboard) {
            _generateComponent(artboard, components, usedComponentsId);
        }
    });
    return components;
}

function _generateComponent(artboard, components, usedComponentsId) {
    artboard.children.forEach(item => {
        const isSymbolInstance = item.constructor.name == "SymbolInstance";
        const isNotIncluded = !usedComponentsId.includes(item.symbolId);
        const isMaster = item.isMaster;
        const isComponentMaster = isSymbolInstance && isNotIncluded && isMaster;
        if (isComponentMaster) {
            usedComponentsId.push(item.symbolId);
            const componentWidget = generateSelection(item);
            components.push(statelessWidget(fixName(item.name), componentWidget));
        } else if (item.constructor.name == "Group") {
            _generateComponent(item, components, usedComponentsId);
        }
    });
}

module.exports = { onTapGenerateGlobal };