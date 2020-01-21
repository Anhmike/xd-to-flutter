const { Widget } = require("../models/widget");
const { updateWidgetInfo } = require("../updateWidgetInfo");
var tree = require("../generateSelection");

function insertInType(previous, later, type) {
    if (previous.type == type) {
        previous.children.push(later);
        later.father = previous;
        updateWidgetInfo(previous);
    } else {
        if (previous.father != null && previous.father.type == type) {
            previous.father.children.push(later);
            later.father = previous.father;
            updateWidgetInfo(previous.father);
        } else if (previous.father == null) {
            //HEAD OF TREE
            tree.tree.no = new Widget(type, {}, "-1", [previous, later]);
            previous.father = tree.tree.no;
            later.father = tree.tree.no;
            updateWidgetInfo(tree.tree.no);
        } else {
            // create Type and insert (previus and later)
            let widget = new Widget(type, {}, "-1", [previous, later], previous.father);
            var index = widget.father.children.indexOf(previous);
            widget.father.children.splice(index, 1);
            widget.father.children.push(widget);
            previous.father = widget;
            later.father = widget;
            updateWidgetInfo(widget);
        }
    }
}




module.exports = { insertInType };