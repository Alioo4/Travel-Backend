require("dotenv/config");

const express = require("express");

const cors = require("cors")

const config = require("../config/index");

const travelRoute = require("./routes/travel.route");

const commentsRoute = require("./routes/comments.route");

const fileUpload = require("express-fileupload")

const app = express()

app.use(cors({origin: "http://localhost:5500"}))
app.use(express.json())
app.use(fileUpload())
app.use(express.static(`${process.cwd()}/uploads`))
app.use("/travel", travelRoute);
app.use("/comments", commentsRoute);

app.listen(config.port, () => {
    console.log(`Server working on PORT: ${config.port}`);
})