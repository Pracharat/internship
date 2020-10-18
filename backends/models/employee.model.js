const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
  {
    pin: { type: Number, default: null },
    firstname: { type: String, default: null },
    lastname: { type: String, default: null },
  },
  {
    versionKey: false
  }
  );
// Build the Companies Model:
const collectionName = "employee";
// Expose Scheme
module.exports = mongoose.model("employee", employeeSchema, collectionName);
