const mongoose = require("mongoose");

const menuListSchema = new mongoose.Schema(
  {
    text: { type: String, default: null },
    children: [{
      type: Object,
      text: { type: String },
      routerLink: { type: String }
    }]
  },
  {
    versionKey: false
  }
  );

// Build the Companies Model:
const collectionName = "menuList";
// Expose Scheme
module.exports = mongoose.model("menuList", menuListSchema, collectionName);
