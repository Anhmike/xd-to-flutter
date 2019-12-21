function xdToFlutter(selection) {
    const isSymbolInstance = selection.constructor.name == "SymbolInstance";
    const items = isSymbolInstance ? selection.children : selection.items;
    items.forEach(item => {
        const widget = new Widget(item.localBounds);
    });
}

module.exports = { xdToFlutter };

class Widget {
    constructor(bounds) {
        this.bounds = bounds;
    };
}