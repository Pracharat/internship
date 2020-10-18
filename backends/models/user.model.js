const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    roleList : { type: mongoose.Schema.Types.ObjectId }
  },
  {
    versionKey: false
  }
  );
userSchema.plugin(uniqueValidator);
// Build the Companies Model:
const collectionName = "user";
// Expose Scheme
module.exports = mongoose.model("user", userSchema, collectionName);
