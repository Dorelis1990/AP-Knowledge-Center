const Quiz = require("../models/Quiz");

module.exports = async (req, res) => {
  try {
    const { title, questions } = req.body;

    if (!title || !questions || !Array.isArray(questions)) {
      return res.status(400).send("Invalid quiz data.");
    }

    // Format questions and convert correctIndex from 1-based to 0-based
    const formattedQuestions = questions.map((q) => {
      const trimmedAnswers = Array.isArray(q.answers) 
        ? q.answers.filter(a => a.trim() !== "") 
        : [];

      const correctIndex = parseInt(q.correctIndex, 10) - 1; 

      return {
        text: q.text,
        answers: trimmedAnswers,
        correctIndex
      };
    });

    const quiz = new Quiz({
      title,
      questions: formattedQuestions,
      user: req.session.userId, 
      createdAt: new Date()
    });

    await quiz.save();
    res.redirect("/"); 
  } catch (error) {
    console.error("Error saving quiz:", error);
    res.status(500).send("Server error creating quiz.");
  }
};
