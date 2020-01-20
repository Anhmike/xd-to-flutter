const { insertInType } = require("./insertInType");

function insertStack(previous, later, tree) {
    insertInType(previous, later, tree, "Stack");
}

module.exports = { insertStack };