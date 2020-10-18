const mongoose = require("mongoose");

const uploadSchema = new mongoose.Schema(
  {
    filename: { type: String, default: null },
    receiptFile: { type: String, default: null },
  },
  {
    versionKey: false
  }
  );
// Build the Companies Model:
const collectionName = "upload";
// Expose Scheme
module.exports = mongoose.model("upload", uploadSchema, collectionName);
