const bcrypt = require("bcryptjs");
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var userSchema = new Schema({
  userName: { type: String, unique: true, required: true },
  password: String,
  email: String,
  loginHistory: [
    {
      dateTime: Date,
      userAgent: String,
    },
  ],
  country: String,
});

var User;

function initialize() {
  return new Promise((resolve, reject) => {
    // mongodb+srv://psi:12wq@sandbox.lkwgo.mongodb.net/web322_week8?retryWrites=true&w=majority
    // mongodb://localhost:27017/web322_week8
    let conn = mongoose.createConnection(
      `mongodb+srv://rashin:1A2B3C@senecaweb.ccyg86x.mongodb.net/?retryWrites=true&w=majority`
    );
    conn.on("error", (err) => {
      reject("Connection error: ", err);
      return;
    });

    User = conn.model("users", userSchema);
    resolve();
  });
}

function registerUser(userData) {
  let { password, password2 } = userData;
  return new Promise((resolve, reject) => {
    if (!password || !password2 || !password.trim() || !password2.trim()) {
      reject("user name cannot be empty or only white spaces!");
      return;
    }

    if (password !== password2) {
      reject("Passwords do not match");
      return;
    }

    console.log("sss");
    bcrypt
      .hash(password, 10)
      .then((hash) => {
        userData.password = hash;
        let newUser = new User(userData);
        newUser
          .save()
          .then(() => {
            resolve();
          })
          .catch((err) => {
            if (err.code === 11000) {
              reject("Error: User Name already taken");
            } else {
              reject(`There was an error creating the user: ${err}`);
            }
          });
      })
      .catch((err) => {
        reject("There was an error encrypting the password");
      });
  });
}

function checkUser(userData) {
  return new Promise((resolve, reject) => {
    User.findOne({ userName: userData.userName })
      .exec()
      .then((foundUser) => {
        if (!foundUser) {
          reject(`Unable to find user: ${userData.userName}`);
          return;
        }

        bcrypt.compare(userData.password, foundUser.password).then((res) => {
          if (res) {
            const log = {
              dateTime: new Date().toString(),
              userAgent: userData.userAgent,
            };
            // const log = { dateTime: new Date().toString(), userAgent: "ddgdg" };
            foundUser.loginHistory.push(log);

            User.updateOne(
              { userName: foundUser.userName },
              { $set: { loginHistory: foundUser.loginHistory } }
            )
              .exec()
              .then(() => {
                resolve(foundUser);
              })
              .catch((err) => {
                reject(`There was an error verifying the user: ${err}`);
              });
          } else {
            reject(`Incorrect Password for user: ${userData.userName}`);
          }
        });
      })
      .catch((err) => {
        reject(`Unable to find user: ${userData.userName}`);
      });
  });
}

module.exports = {
  initialize,
  checkUser,
  registerUser,
};
