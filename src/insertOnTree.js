function insertOnTree(array, tree) {
    array.forEach(item => {
        _checkRelation(tree.no, item, tree);
    });
}

function _checkRelation(previous, later, tree) {
    if (previous != null) {
        const type = checkIfIsInside(previous, later);
        if (type == "inside") insertInside(previous, later);
        else if (type == "outside") insertOutside(previous, later);
        else insertStack(previous, later);
    } else {
        tree.no = later;
    }
}

function insertInside() {
    console.log(`insert inside`);
}

function insertOutside(previous, later) {
    const choice = choiceRowOrColumn(previous, later);
    console.log(`outside choice = ${choice}`);
}

function insertStack() {
    console.log(`insert stack`);
}

function checkIfIsInside(previous, later) {
    const previous_x = previous.bounds.x; const previous_y = previous.bounds.y; const previous_w = previous.bounds.width; const previous_h = previous.bounds.height;
    const later_x = later.bounds.x; const later_y = later.bounds.y; const later_w = later.bounds.width; const later_h = later.bounds.height;
    const later_final_h = later_y + later_h;
    const later_final_w = later_x + later_w;
    const previous_final_h = previous_y + previous_h;
    const previous_final_w = previous_x + previous_w;
    if (_checkOnly(later_y, previous_y, later_final_h, previous_final_h) &&
        _checkOnly(later_x, previous_x, later_final_w, previous_final_w)) {
        return "inside";
    } else if (later_final_w <= previous_x ||
        previous_final_w <= later_x ||
        later_final_h <= previous_y ||
        previous_final_h <= later_y) {
        return "outside";
    } else {
        return "stack";
    }
}

function _checkOnly(widget, previous, later_final, previous_final) {
    return widget >= previous - 0.2 && later_final <= previous_final + 0.2;
}

module.exports = { insertOnTree };

function choiceRowOrColumn(previous, later) {
    const previous_x = previous.bounds.x; const previous_y = previous.bounds.y; const previous_w = previous.bounds.width; const previous_h = previous.bounds.height;
    const later_x = later.bounds.x; const later_y = later.bounds.y; const later_w = later.bounds.width; const later_h = later.bounds.height;
    const later_final_h = later_y + later_h;
    const later_final_w = later_x + later_w;
    const previous_final_h = previous_y + previous_h;
    const previous_final_w = previous_x + previous_w;
    if ((previous_final_h > later_y && previous_y < later_y) || (later_final_h > previous_y && later_y < previous_y)) {
        return "row";
    } else if ((previous_final_w > later_x && previous_x < later_x) || (later_final_w > previous_x && later_x < previous_x)) {
        return "column";
    } else {
        let distX = later_x - previous_final_w;
        distX = distX > 0 ? distX : previous_x - later_final_w;
        let distY = later_y - previous_final_h;
        distY = distY > 0 ? distY : previous_y - later_final_h;
        if (distX > distY) {
            return "row";
        } else {
            return "column";
        }
    }
}