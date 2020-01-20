function updateWidgetInfo(no) {
    if (no.id == "-1") {
        let newInfo = _newWidgetInfo(no.children);
        no.bounds.x = newInfo[0];
        no.bounds.y = newInfo[1];
        no.bounds.width = newInfo[2];
        no.bounds.height = newInfo[3];
    }
    if (no.father != null) {
        updateWidgetInfo(no.father);
    }
    return no;
}

function _newWidgetInfo(nos) {
    let x = -1, y = -1, w = -1, h = -1;
    nos.forEach(function (f) {
        if (x == -1) {
            x = f.bounds.x;
            y = f.bounds.y;
            w = x + f.bounds.width;
            h = y + f.bounds.height;
        } else {
            x = Math.min(x, f.bounds.x);
            y = Math.min(y, f.bounds.y);
            w = Math.max(w, f.bounds.x + f.bounds.width);
            h = Math.max(h, f.bounds.y + f.bounds.height);
        }
    });
    return [x, y, w - x, h - y];
}

module.exports = { updateWidgetInfo };