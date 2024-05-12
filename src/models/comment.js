const {v4: uuid} = require("uuid")

class Comment{
    constructor(name, place, comment, photo){
        this.id = uuid();
        this.name = name;
        this.place = place;
        this.comment = comment;
        this.photo = photo;
    }
}

module.exports = Comment;