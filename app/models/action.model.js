const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ActionSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  date: { type: String, default: "" },
  description: { type: String, default: "" },
  points: { type: Number, default: 0 },
});

mongoose.model("Action", ActionSchema);
