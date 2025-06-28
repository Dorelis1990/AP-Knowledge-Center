// npm start -> to start the app with nodemon

const express = require("express");
const app = express();
const ejs = require("ejs");
const mongoose = require("mongoose");
const User = require("./models/Users");
const newPostController = require("./controllers/newPost");
const GuidelinePostId = require("./controllers/GuidelinePostId");
const getGuidelines = require("./controllers/getGuidelines");
const homeSearch = require("./controllers/homeSearch");
const postStore = require("./controllers/postStore");
const guidelinesUpload = require("./controllers/guidelinesUpload");
const home = require("./controllers/home");
const newUser = require("./controllers/newUser");
const storeUser = require("./controllers/storeUsers");
const login = require("./controllers/login");
const loginUser = require("./controllers/loginUser");
const expressSession = require("express-session");
const authMiddleware = require("./middleware/authMiddleware");
const redirectIfauthenticatedMiddleware = require("./middleware/redirectIfauthenticatedMiddleware");
const logout = require("./controllers/logout");
const editPostController = require("./controllers/editPost");
const updatePostController = require("./controllers/updatePost");
const deletePostController = require("./controllers/deletePost");
const deleteGuideline = require("./controllers/deleteGuideline");
const createQuizForm = require("./controllers/createQuizForm");
const storeQuiz = require("./controllers/storeQuiz");
const takeQuiz = require("./controllers/takeQuiz");
const submitQuiz = require("./controllers/submitQuiz");
const deleteQuizController = require("./controllers/deleteQuiz");
const verifyUser = require("./controllers/verifyUser");
const sendResetEmail = require("./controllers/sendResetEmail");
const handleResetPassword = require("./controllers/handleResetPassword");


mongoose.connect("mongodb://localhost/my_database", { useNewUrlParser: true, useUnifiedTopology: true });

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(expressSession({
  secret: "keyboard cat",
  resave: false,
  saveUninitialized: false,
}));

// Set res.locals.loggedIn as string or null for easy use in EJS
app.use(async (req, res, next) => {
  res.locals.loggedIn = req.session.userId ? req.session.userId.toString() : null;

  // Load quizExists flag for use in views
  const Quiz = require("./models/Quiz");
  res.locals.quizExists = !!(await Quiz.findOne());

  next();
});

app.use((req, res, next) => {
  res.locals.verifyMessage = req.session.verifyMessage || null;
  delete req.session.verifyMessage;
  next();
});


app.post("/upload", guidelinesUpload);

app.get("/", home);

app.get("/Guidelines", getGuidelines);

app.get("/post/new", authMiddleware, newPostController);

app.get("/post/:id", GuidelinePostId);

app.get("/search", homeSearch);

app.post("/post/store", authMiddleware, postStore);

app.get("/auth/register", redirectIfauthenticatedMiddleware, newUser);

app.post("/users/register", redirectIfauthenticatedMiddleware, storeUser);

app.get("/auth/login", redirectIfauthenticatedMiddleware, login);

app.post("/users/login", redirectIfauthenticatedMiddleware, loginUser);

app.get("/auth/logout", logout);

// GET: Show edit form
app.get("/post/edit/:id", authMiddleware, editPostController);

// POST: Submit updated post
app.post("/post/update/:id", authMiddleware, updatePostController);

// POST: Delete post
app.post("/post/delete/:id", authMiddleware, deletePostController);

app.post("/guidelines/delete/:id", deleteGuideline);

app.get("/quiz/new", authMiddleware, createQuizForm);

app.post("/quiz/create", authMiddleware, storeQuiz);

// Show quiz to take
app.get("/quiz", takeQuiz);

// Submit quiz answers
app.post("/quiz/submit", submitQuiz);

app.post("/quiz/delete", authMiddleware, deleteQuizController);

app.get("/verify/:token", verifyUser);

app.post("/auth/send-reset", sendResetEmail);

app.post("/reset-password/:token", handleResetPassword);


app.get("/reset-password/:token", async (req, res) => {
  try {
    const token = req.params.token;
    const user = await User.findOne({ verificationToken: token });

    if (!user) {
      // Token invalid or expired
      req.session.verifyMessage = "Invalid or expired reset link.";
      return res.render("resetPassword", {
        allowPasswordUpdate: false,
        verifyMessage: req.session.verifyMessage,
      });
    }

    // Token valid, show form
    res.render("resetPassword", {
      allowPasswordUpdate: true,
      token: token,
      verifyMessage: null,
    });
  } catch (error) {
    console.error("Error loading reset password page:", error);
    res.status(500).send("Server error.");
  }
});



app.get("/contact", (req, res) => {
  res.render("contact");
});

app.use((req, res) => {
  res.render("notfound");
});

const PORT = 1800;
const HOST = '0.0.0.0'; // or '127.0.0.1' or a custom IP

app.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}`);
});
