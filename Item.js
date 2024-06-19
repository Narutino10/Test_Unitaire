class Item {
    constructor(name, content) {
        this.name = name;
        this.content = content;
        this.creationDate = new Date();
    }
    isValid() {
        return this.name.trim() !== "" && this.content.trim() !== "" && this.content.length <= 1000;
    }
}
module.exports = Item;
