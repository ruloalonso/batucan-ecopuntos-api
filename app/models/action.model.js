const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ActionSchema = new Schema({
  date: { type: String, default: "" },
  user: { type: Schema.Types.ObjectId, ref: "User" },
  type: { type: Schema.Types.ObjectId, ref: "ActionType" },
});

mongoose.model("Action", ActionSchema);
