const { Widget } = require("../models/widget");
const { checkRelationAndInsert } = require("../insertOnTree");

function insertInside(previous, later) {
    if (previous.children.length == 0) {
        previous.children.push(new Widget(later, previous));
    } else {
        for (let i = 0; i < previous.children.length; i++) {
            const child = previous.children[i];
            break;
        }
    }
}

module.exports = { insertInside };