const { generateColorClass } = require("./generateColor");
const { generateStyleClass } = require("./generateStyle");
const { showMessageWithColor } = require("./showMessageWithColor");
const { xdToFlutter } = require("./xdToFlutter");
const { statelessWidget, fixName } = require("./util");
let clipboard = require("clipboard");
let scenegraph = require("scenegraph");

function onTapGenerateWidget() {
    const selection = scenegraph.selection;
    let result;
    if (selection.items.length != 0) {
        result = _generateSelection(selection);
    } else {
        result = _generateAll();
    }
    clipboard.copyText(result);
}

function _generateSelection(selection) {
    return xdToFlutter(selection);
}

function _generateAll() {
    const widgets = _generateComponents();
    const styles = generateStyleClass();
    const colors = generateColorClass();
    return `${styles}\n${colors}\n${widgets}`;
}

function _generateComponents() {
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
            const componentWidget = xdToFlutter(item);
            components.push(statelessWidget(fixName(item.name), componentWidget));
        } else if (item.constructor.name == "Group") {
            _generateComponent(item, components, usedComponentsId);
        }
    });
}

module.exports = { onTapGenerateWidget };
