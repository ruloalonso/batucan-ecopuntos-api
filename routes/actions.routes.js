const express = require("express");
const router = express.Router();
const { getAllActions, createAction } = require("../app/controllers/actions.controller");

router.get("/", getAllActions);
router.post("/", createAction);

module.exports = router;
