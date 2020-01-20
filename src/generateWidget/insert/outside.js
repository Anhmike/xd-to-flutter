const { choiceRowOrColumn } = require("../costBenefit");
const { insertInType } = require("./insertInType");

function insertOutside(previous, later, tree) {
    insertInType(previous, later, tree, choiceRowOrColumn(previous, later));
}

module.exports = { insertOutside };