const Quiz = require("../models/Quiz");
const QuizResult = require("../models/QuizResult");

module.exports = async (req, res) => {
  try {
    // Delete the quiz
    await Quiz.deleteMany({}); // delete all quizzes (assuming only one exists)

    
    await QuizResult.deleteMany({});

    res.redirect("/"); // redirect back to homepage
  } catch (error) {
    console.error("Error deleting quiz:", error);
    res.status(500).send("Failed to delete quiz.");
  }
};
