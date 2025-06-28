const mongoose = require("mongoose");

const GuidelineSchema = new mongoose.Schema({
  title: { type: String, required: true },
  filename: { type: String, required: true },
  type: { type: String, enum: ["Procedure", "Template"], required: true },
  uploadedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Guideline", GuidelineSchema);
