class Widget {
    constructor(type, bounds, id, children, father, xd) {
        this.father = father;
        this.type = type;
        this.bounds = bounds;
        this.id = id;
        this.xd = xd;
        this.children = children == null ? [] : children;
    };
}

module.exports = { Widget };