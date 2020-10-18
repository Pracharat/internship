const mongoose = require("mongoose");

const toeicRequestSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    requestNo: { type: String, default: null },
    createDate: { type: String, default: null },
  },
  {
    versionKey: false
  }
  );
// Build the Companies Model:
const collectionName = "toeic_request";
// Expose Scheme
module.exports = mongoose.model("toeic_request", toeicRequestSchema, collectionName);
