const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  _id: Schema.Types.ObjectId,
  name: { type: String, default: "" },
});

mongoose.model("User", UserSchema);
