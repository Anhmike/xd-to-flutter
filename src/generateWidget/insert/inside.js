const { Widget } = require("../models/widget");
const { costBenefit } = require("../costBenefit");
const { insertStack } = require("./stack");
const { insertInType } = require("./insertInType");
var checkIfIsInside = require("../insertOnTree");
var checkRelationAndInsert = require("../insertOnTree");

function insertInside(previous, later, tree) {

    if (previous.children.length == 0) {
        previous.children.push(new Widget("rectangle", later.bounds, later.id, [], previous));
    } else {
        let inside;
        let isStack = 0;
        console.log(`inside, id = ${later.id}`);
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
            insertStack(previous, later, tree);
        } else if (inside != null && isStack < 2) {
            // It's inside something inside
            checkRelationAndInsert.checkRelationAndInsert(inside, later, tree);
        } else {
            // It isn't inside something inside
            // Cost benefit to know where put
            let cost = costBenefit(previous, later, true);
            console.log(`bestPosition = ${cost.bestPosition}, type = ${cost.type}`);
            let putOn = cost.bestPosition == 0
                ? previous
                : previous.children[cost.bestPosition - 1];
            insertInType(putOn, later, tree, cost.type);
        }
    }
}

module.exports = { insertInside };

