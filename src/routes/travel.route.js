const { Router } = require("express")

const router = Router();

const {creat, watch, remove} = require("../controllers/travel.controller")

router.get("/", watch);

router.post("/", creat);

router.delete("/:id", remove);

module.exports = router;