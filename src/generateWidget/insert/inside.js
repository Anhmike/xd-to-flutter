const { Widget } = require("../models/widget");
const { costBenefit } = require("../costBenefit");
const { insertStack } = require("./stack");
const { insertInType } = require("./insertInType");
var checkIfIsInside = require("../insertOnTree");
var checkRelationAndInsert = require("../insertOnTree");

function insertInside(previous, later) {
    if (previous.children.length == 0) {
        previous.children.push(later);
    } else {
        let inside;
        let isStack = 0;
        for (let i = 0; i < previous.children.length; i++) {
            const child = previous.children[i];
            const vd = checkIfIsInside.checkIfIsInside(child, later);
            if (vd == "stack" || vd == "inside") {
                if (isStack == 0) {
                    inside = child;
                }
                if (vd == "stack") {
                    isStack++;
                }
            }
        }

        if (isStack > 1) {
            insertStack(previous, later);
        } else if (inside != null && isStack < 2) {
            // It's inside something inside
            checkRelationAndInsert.checkRelationAndInsert(inside, later);
        } else {
            // It isn't inside something inside
            // Cost benefit to know where put
            let cost = costBenefit(previous, later, true, previous.type);
            let putOn = cost.bestPosition == 0
                ? previous
                : previous.children[cost.bestPosition - 1];
            insertInType(putOn, later, cost.type);
        }
    }
}

module.exports = { insertInside };

