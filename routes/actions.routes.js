const express = require("express");
const router = express.Router();
const {
  getAllActions,
  createAction,
  deleteById,
  resetActions,
} = require("../app/controllers/actions.controller");
const requireAdmin = require("../app/middlewares/require-admin");

router.get("/", getAllActions);
router.post("/", createAction);
router.post("/reset", requireAdmin, resetActions);
router.delete("/:id", deleteById);

module.exports = router;
