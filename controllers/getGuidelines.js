const Guideline = require("../models/Guideline");

module.exports = async (req, res) => {
  try {
    // Await the database query
    const guidelines = await Guideline.find().sort({ uploadedAt: -1 }); 
    
    
    res.render("Guidelines", { guidelines });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching guidelines.");
  }
};
