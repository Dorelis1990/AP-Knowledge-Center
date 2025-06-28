const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const QuizResultSchema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  score: Number,
  total: Number,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("QuizResult", QuizResultSchema);
