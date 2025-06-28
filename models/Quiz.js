const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
  text: String,
  answers: [String],
  correctIndex: Number
});

const QuizSchema = new mongoose.Schema({
  title: String,
  questions: [QuestionSchema],
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Optional: link to user
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Quiz", QuizSchema);
