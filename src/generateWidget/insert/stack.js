const { insertInType } = require("./insertInType");

function insertStack(previous, late) {
    insertInType(previous, late, "Stack");
}

module.exports = { insertStack };