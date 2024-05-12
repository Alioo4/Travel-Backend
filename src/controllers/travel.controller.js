const fs = require("fs/promises")

const Io = require("../helpers/io");

const travelDb = new Io(`${process.cwd()}/database/travel.json`);

const Travel = require("../models/travel");

const {v4: uuid} = require("uuid");

let watch = async (req, res) => {
    try {
        const travel = await travelDb.read();

        res.status(203).json({ message: "Success!!!", data: travel})
    } catch (error) {
        res.status(500).json({message: "Network doesn't working!!!"})
    }
};

let creat = async (req, res) => {
    try {
        let travel = await travelDb.read();

        let { name, description, cost } = req.body;

        let { photo } = req.files;

        let mimeType = photo.mimetype.split("/")[1];

        let photoName = `${uuid()}.${mimeType}`

        photo.mv(`${process.cwd()}/uploads/${photoName}`)
        let newTravel = new Travel(name, description, cost, photoName)

        travel.push(newTravel)
        await travelDb.write(travel)

        res.status(201).json({message: "Success", data: newTravel})
    } catch (error) {
        res.status(500).json({message: "Network doesn't working!!!"})
    }
};

let remove = async (req, res) => {
    try {
        let { id } = req.params
        
        let travel = await travelDb.read(); 

        let findTravel = travel.find((note) => note.id == id )
        travel = travel.filter((note) => note.id != id )
        await fs.unlink(`${process.cwd()}/uploads/${findTravel.photo}`)
        await travelDb.write(travel)

        res.status(201).json({message: "Success delete!!!"})
    } catch (error) {
        res.status(500).json({message: "Network doesn't working!!!"})
    }
};

module.exports = {watch, creat, remove};