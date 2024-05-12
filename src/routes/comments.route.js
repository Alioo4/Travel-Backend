const { Router } = require("express")

const router = Router();

const {watch, creat, remove} = require("../controllers/comments.controller")

router.get("/", watch);

router.post("/", creat);

router.delete("/:id", remove);

module.exports = router;