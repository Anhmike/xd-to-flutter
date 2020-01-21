function costBenefit(previous, later, onlyInside, type) {
    onlyInside = onlyInside == null ? false : onlyInside;
    let bestPosition = 0;
    let _bestCostBenefit = [];
    if (onlyInside) {
        bestPosition = 1;
        _bestCostBenefit = _costBenefit(previous.children[0], later);
    } else {
        _bestCostBenefit = _costBenefit(previous, later);
    }
    let _auxCostBenefit = [];
    for (var i = bestPosition; i < previous.children.length; i++) {
        _auxCostBenefit = _costBenefit(previous.children[i], later);
        let auxCB = _auxCostBenefit[0] + _auxCostBenefit[1];
        if (type == "Row" && _auxCostBenefit[0] == -1 || type == "Column" && _auxCostBenefit[1] == -1) {
            return new CostBenefit(
                i + 1, _auxCostBenefit[0] > _auxCostBenefit[1] ? "Row" : "Column");
        }
        let bCB = _bestCostBenefit[0] + _bestCostBenefit[1];
        if ((auxCB < bCB && onlyInside) || (auxCB <= bCB && !onlyInside)) {
            onlyInside = true;
            bestPosition = i + 1;
            _bestCostBenefit = _auxCostBenefit;
        }
    }
    return new CostBenefit(
        bestPosition, _bestCostBenefit[0] > _bestCostBenefit[1] ? "Row" : "Column");
}

function _costBenefit(ant, widget) {
    let item = [ant, widget];
    let above = 0;
    let left = 0;
    if (ant.bounds.y > widget.bounds.y) above = 1;
    if (ant.bounds.x > widget.bounds.x) left = 1;
    let distX = item[(left + 1) % 2].bounds.x - (item[left].bounds.x + item[left].bounds.width);
    let distY = item[(above + 1) % 2].bounds.y - (item[above].bounds.y + item[above].bounds.height);
    distX = distX < 0 ? -1 : distX;
    distY = distY < 0 ? -1 : distY;
    /*if (distY < 0 && type == Column) {
      distX = 0;
    } else if (distX < 0 && type == Row) {
      distY = 0;
    }*/
    return [distX, distY];
}

function choiceRowOrColumn(previous, later) {
    const previous_x = previous.bounds.x; const previous_y = previous.bounds.y; const previous_w = previous.bounds.width; const previous_h = previous.bounds.height;
    const later_x = later.bounds.x; const later_y = later.bounds.y; const later_w = later.bounds.width; const later_h = later.bounds.height;
    const later_final_h = later_y + later_h;
    const later_final_w = later_x + later_w;
    const previous_final_h = previous_y + previous_h;
    const previous_final_w = previous_x + previous_w;
    if ((previous_final_h > later_y && previous_y < later_y) || (later_final_h > previous_y && later_y < previous_y)) {
        return "Row";
    } else if ((previous_final_w > later_x && previous_x < later_x) || (later_final_w > previous_x && later_x < previous_x)) {
        return "Column";
    } else {
        let distX = later_x - previous_final_w;
        distX = distX > 0 ? distX : previous_x - later_final_w;
        let distY = later_y - previous_final_h;
        distY = distY > 0 ? distY : previous_y - later_final_h;
        if (distX > distY) {
            return "Row";
        } else {
            return "Column";
        }
    }
}


module.exports = { choiceRowOrColumn, costBenefit };

class CostBenefit {
    constructor(bestPosition, type) {
        this.bestPosition = bestPosition;
        this.type = type;
    }
}