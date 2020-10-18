const mongoose = require("mongoose");

const toeicDetailSchema = new mongoose.Schema(
  {
    requestId: { type: String, default: null },
    receiptNo: { type: String, default: null },
    receiptDate: { type: Date, default: null },
    receiptAmount: { type: String, default: null },
    amountWithdrawn: { type: String, default: null},
    remark: { type: String, default: null },
  },
  {
    versionKey: false
  }
  );
// Build the Companies Model:
const collectionName = "toeic_detail";
// Expose Scheme
module.exports = mongoose.model("toeic_detail", toeicDetailSchema, collectionName);
