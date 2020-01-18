function logTree(widget, dist) {
    var spacers = "";
    for (var i = 0; i < dist; i++) {
        spacers += "|  ";
    }
    if (dist == 0)
        console.log("\nStructure:");
    console.log(`${spacers}${widget.type}, id = ${widget.id}`);
    widget.children.forEach(function (f) {
        logTree(f, dist + 1);
    });
}

module.exports = { logTree };