function updateWidgetInfo(no) {          
    if (no.widget.id == "-1") {
        let newInfo = _newWidgetInfo(no.widget.children);
        no.widget.bounds.x = newInfo[0];
        no.widget.bounds.y = newInfo[1];
        no.widget.bounds.width = newInfo[2];
        no.widget.bounds.height = newInfo[3];
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
            x = f.widget.bounds.x;
            y = f.widget.bounds.y;
            w = x + f.widget.bounds.width;
            h = y + f.widget.bounds.height;
        } else {
            x = Math.min(x, f.widget.bounds.x);
            y = Math.min(y, f.widget.bounds.y);
            w = Math.max(w, f.widget.bounds.x + f.widget.bounds.width);
            h = Math.max(h, f.widget.bounds.y + f.widget.bounds.height);
        }
    });
    return [x, y, w - x, h - y];
}

module.exports = { updateWidgetInfo };