const express = require("express");
const router = express.Router();
const {
  getAllActions,
  createAction,
  deleteById,
} = require("../app/controllers/actions.controller");

router.get("/", getAllActions);
router.post("/", createAction);
router.delete("/:id", deleteById);

module.exports = router;
