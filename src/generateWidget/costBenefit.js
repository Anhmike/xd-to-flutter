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


module.exports = { choiceRowOrColumn };
