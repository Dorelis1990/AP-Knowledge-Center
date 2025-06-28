const Quiz = require("../models/Quiz");
const QuizResult = require("../models/QuizResult");

module.exports = async (req, res) => {
  try {
    const quiz = await Quiz.findOne();
    if (!quiz) {
      return res.status(404).send("No quiz available.");
    }

    const userAnswers = req.body.answers || {}; // Safeguard for undefined

    let score = 0;

    quiz.questions.forEach((question, index) => {
      const correctAnswer = question.correctIndex;  
      const userAnswer = parseInt(userAnswers[index]); 
      if (userAnswer === correctAnswer) {
        score++;
      }
    });

    const result = new QuizResult({
      user: req.session.userId,
      score,
      total: quiz.questions.length,
    });

    await result.save();

    res.redirect("/");
  } catch (error) {
    console.error("Error submitting quiz:", error);
    res.status(500).send("An error occurred while submitting the quiz.");
  }
};
