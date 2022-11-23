const express = require("express");
const source = require("../controllers/source.controller");

const router = express.Router();

router.route("/")
    .get(source.findAll)
    .post(source.create)

router.route("/:id")
    .get(source.findOne)
    .put(source.update)
    .delete(source.delete);
module.exports = router;
