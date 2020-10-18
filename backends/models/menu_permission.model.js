const mongoose = require("mongoose");

const menu_permissionSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, default: null },
    type: { type: String },
    menuId :  { type: mongoose.Schema.Types.ObjectId, ref: 'menu' }
  },
  {
    versionKey: false
  }
  );

// Build the Companies Model:
const collectionName = "menu_permission";
// Expose Scheme
module.exports = mongoose.model("menu_permission", menu_permissionSchema, collectionName);
