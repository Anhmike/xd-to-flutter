class Widget {
    constructor(type, bounds, id, children, father) {
        this.father = father;
        this.type = type;
        this.bounds = bounds;
        this.id = id;
        this.children = children == null ? [] : children;
    };
}

module.exports = { Widget };