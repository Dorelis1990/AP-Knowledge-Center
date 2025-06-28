const Guideline = require("../models/Guideline");
const multer = require("multer");
const path = require("path");

// Multer setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});

const upload = multer({ storage: storage });

module.exports = [
  upload.single("file"),
  async (req, res) => {
    const { title, type } = req.body;
    const file = req.file;

    if (!title || !type || !file) {
      
      return res.status(400).send("Missing required fields.");
    }

    try {
      await Guideline.create({
        title,
        filename: file.filename,
        type,
      });

      // Redirect back to guidelines page after successful upload
      res.redirect("/Guidelines");
    } catch (err) {
      console.error(err);
      res.status(500).send("Database error.");
    }
  }
];
