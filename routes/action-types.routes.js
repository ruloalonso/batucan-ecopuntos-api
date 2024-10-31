const express = require("express");
const router = express.Router();
const { getAllActionTypes, createActionType } = require("../app/controllers/action-types.controller");

router.get("/", getAllActionTypes);
router.post("/", createActionType);

module.exports = router;
