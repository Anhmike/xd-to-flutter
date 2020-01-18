class Widget {
    constructor(father, type, bounds, id, children) {
        this.father = father;
        this.type = type;
        this.bounds = bounds;
        this.id = id;
        this.children = children == null ? [] : children;
    };
}

module.exports = { Widget };