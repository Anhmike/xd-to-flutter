const { Widget } = require("../models/widget");
const { updateWidgetInfo } = require("../updateWidgetInfo");

function insertInType(previous, later, tree, type) {
    if (previous.type == type) {
        previous.children.push(later);
    } else {
        if (previous.father == type) {
            previous.father.children.push(later);
            _sortList(previous.father, type);
        } else if (previous.father == null) {
            //HEAD OF TREE
            tree.widget = new Widget(type, {}, "-1", [previous, later]);
            previous.father = tree;
            later.father = tree;
            _sortList(tree.widget, type);
            updateWidgetInfo(tree);
        } else {
            // create Type and insert (previus and later)
            let widget = new Widget(type, {}, "-1", [previous, later], previous.father);
            var index = widget.father.children.indexOf(previous);
            widget.father.children.splice(index, 1);
            previous.father.children.push(widget);
            previous.father = widget;
            later.father = widget;
            _sortList(previous.father, type);
            updateWidgetInfo(widget);
        }
    }
}

function _sortList(widget, type) {
    if (type == "Column") {
        widget.children.sort(_column);
    } else if (type == "Row") {
        widget.children.sort(_row);
    }
}

function _column(a, b) {
    if (a.bounds.y < b.bounds.y) {
        return -1;
    }
    return 1;
}

function _row(a, b) {
    if (a.bounds.x < b.bounds.x) {
        return -1;
    }
    return 1;
}

module.exports = { insertInType };