const fs = require("fs/promises");

const Io = require("../helpers/io");

const commentsDb = new Io(`${process.cwd()}/database/comment.json`);

const Comment = require("../models/comment");

const {v4:uuid} = require("uuid");

let watch = async (req, res) => {
    try {
        const comments = await commentsDb.read();
        res.status(203).json({ message: "Success!!!", data: comments})
    } catch (error) {
        res.status(500).json({message: "Network doesn't working!!!"})
    }
};

let creat = async (req, res) => {
    try {
        const comments = await commentsDb.read();
        let {name, place, comment} = req.body
        let { photo } = req.files
        let mimeType = photo.mimetype.split("/")[1];
        let photoName = `${uuid()}.${mimeType}`
        photo.mv(`${process.cwd()}/uploads/${photoName}`)
        let newComment = new Comment(name, place, comment, photoName)
        comments.push(newComment)
        await commentsDb.write(comments)

        res.status(201).json({message: "Success", data: newComment})
    } catch (error) {
        res.status(500).json({message: "Network doesn't working!!!"})
    }
};

let remove = async (req, res) => {
    try {
        let { id } = req.params

        let comments = await commentsDb.read(); 

        let findComment = comments.find((note) => note.id == id );

        comments = comments.filter((note) => note.id != id );
        
        await fs.unlink(`${process.cwd()}/uploads/${findComment.photo}`)
        await travelDb.write(travel)

        res.status(201).json({message: "Success delete!!!"})
    } catch (error) {
        res.status(500).json({message: "Network doesn't working!!!"})
    }
};

module.exports = {watch, creat, remove};