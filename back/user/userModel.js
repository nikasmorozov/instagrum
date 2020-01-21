const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  tokens: [
    {
      access: {
        type: String,
        required: true
      },
      token: {
        type: String,
        required: true
      }
    }
  ],
  profilePicURL: {
    type: String
  }
});

UserSchema.pre("save", function(next) {
  let user = this;
  if (user.isModified("password")) {
    bcrypt.genSalt(10, (error, salt) => {
      bcrypt.hash(user.password, salt, (error, hash) => {
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

<<<<<<< HEAD
let User = mongoose.model("Users", UserSchema);
=======
let User = mongoose.model('Users', UserSchema);;
>>>>>>> 5a8fb50aca31b373145ba7f3b2877e06e7df849f

module.exports = User;
