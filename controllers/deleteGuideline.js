const Guideline = require("../models/Guideline");
const fs = require("fs");
const path = require("path");

module.exports = async (req, res) => {
  try {
    const guideline = await Guideline.findById(req.params.id);

    if (!guideline) {
      return res.status(404).send("Document not found");
    }

    // Delete file from uploads folder
    const filePath = path.join(__dirname, "..", "public", "uploads", guideline.filename);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    // Remove from database
    await Guideline.findByIdAndDelete(req.params.id);

    res.redirect("/Guidelines");
  } catch (error) {
    console.error("Error deleting guideline:", error);
    res.status(500).send("Failed to delete document.");
  }
};
