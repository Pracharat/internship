const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, default: null },
    menuSequence: { type: String },
    status :{ type: String ,default: null },
    url : { type: String, dedfualt: null},
    subMenuList : [{ type: Object }]
  },
  {
    versionKey: false
  }
  );

// Build the Companies Model:
const collectionName = "menu";
// Expose Scheme
module.exports = mongoose.model("menu", menuSchema, collectionName);
