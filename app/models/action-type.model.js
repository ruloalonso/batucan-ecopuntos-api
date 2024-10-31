const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ActionTypeSchema = new Schema({
  _id: Schema.Types.ObjectId,
  description: { type: String, default: "" },
  points: { type: Number, default: 0 },
});

mongoose.model("ActionType", ActionTypeSchema);
