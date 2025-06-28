const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const schema = mongoose.Schema;

const UsersSchema = new schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  verificationToken: String,
});

// Password hash middleware
UsersSchema.pre("save", function (next) {
  const user = this;
  if (!user.isModified("password")) return next();

  bcrypt.hash(user.password, 10, (error, hash) => {
    if (error) return next(error);
    user.password = hash;
    next();
  });
});

const User = mongoose.model("User", UsersSchema);
module.exports = User;
