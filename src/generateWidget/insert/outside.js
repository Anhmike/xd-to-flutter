const { choiceRowOrColumn } = require("../costBenefit");
const { insertInType } = require("./insertInType");

function insertOutside(previous, later) {
    insertInType(previous, later, choiceRowOrColumn(previous, later));
}

module.exports = { insertOutside };