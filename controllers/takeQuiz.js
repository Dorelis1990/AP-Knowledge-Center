const Quiz = require("../models/Quiz");

module.exports = async (req, res) => {
  try {
    const quiz = await Quiz.findOne(); // Assuming only one quiz is active
    if (!quiz) {
      return res.render("takeQuiz", { quiz: null });
    }

    res.render("takeQuiz", { quiz });
  } catch (error) {
    console.error("Error loading quiz:", error);
    res.status(500).send("Failed to load quiz.");
  }
};
