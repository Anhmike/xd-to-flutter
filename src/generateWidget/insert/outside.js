const { Widget } = require("../models/widget");
const { updateWidgetInfo } = require("../updateWidgetInfo");
const { choiceRowOrColumn } = require("../costBenefit");

function insertOutside(previous, later) {
    const old = previous;
    const choice = choiceRowOrColumn(previous, later);
    tree.widget = new Widget(choice, {}, -1);
    tree.widget.children = [new Widget(old, tree), new Widget(later, tree)];
    updateWidgetInfo(tree);
}

module.exports = { insertOutside };