const { insertOnTree } = require("./insertOnTree");
const { Widget } = require("./models/widget");


function generateSelection(selection) {
    const isSymbolInstance = selection.constructor.name == "SymbolInstance";
    const items = isSymbolInstance ? selection.children : selection.items;
    let array = _xdToArray(items);
    let tree = new Widget();
    insertOnTree(array, tree);
    return "teste";
}

function _xdToArray(item) {
    let list = [];
    item.forEach(function (child) {
        let name = child.constructor.name;
        let bounds = child.globalBounds;
        if (name == "RepeatGrid") {
            child.children.forEach(function (groupComponent) {
                groupComponent.children.forEach(function (component) {
                    bounds = component.globalBounds;
                    list.push(component);
                });
            });
        } else if (name == "Group" || name == "Artboard") {
            bounds = child.globalBounds;
            if (name == "Artboard") {
                list.push(new Widget(name, bounds, child.name));
            }
            if (child.name.includes("svg") || child.mask) {
                list.push(new Widget("Path", bounds, child.name));
            } else {
                let newList = _xdToArray(child.children);
                newList.forEach(function (item) {
                    list.push(item);
                });
            }
        } else {
            list.push(new Widget(name, bounds, child.name));
        }
    });
    return list;
}

module.exports = { generateSelection };
