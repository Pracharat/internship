const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema(
  {
    name: { type: String, default: null },
    menuList: { type: Object }
  },
  {
    versionKey: false
  }
  );

// Build the Companies Model:
const collectionName = "role";
// Expose Scheme
module.exports = mongoose.model("role", roleSchema, collectionName);
