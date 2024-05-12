const {v4: uuid} = require("uuid")

class Travel{
    constructor(name, description, cost, photo){
        this.id = uuid();
        this.name = name;
        this.description = description;
        this.cost = cost;
        this.photo = photo;
    }
}

module.exports = Travel;