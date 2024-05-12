const fs = require("fs/promises");

class Io{
    #dir
    constructor(dir){
        this.#dir = dir;
    }

    async read(){
        let data = await fs.readFile(this.#dir, "utf8")

        let res = data ? JSON.parse(data) : [];

        return res
    }

    async write(data){
        await fs.writeFile(this.#dir, JSON.stringify(data, null, 2), "utf8")
    }
}

module.exports = Io;