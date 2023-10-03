const { db_connect } = require("../config");
const { UserValidator } = require("../validator");
const { hashSync, compareSync } = require("bcryptjs");
class User {
  constructor(userData) {
    this.userData = userData;
  }
  save(cb) {
    db_connect("users", async (collection) => {
      try {
        const hashedPassword = hashSync(this.userData.password);
        this.userData.password = hashedPassword;
        await collection.insertOne(this.userData).then((result) => {
          cb({
            status: true,
            _user_Id: result.insertedId,
          });
        });
      } catch (err) {
        cb({
          status: false,
          messege: err.messege,
        });
      }
    });
  }

  isExists() {
    return new Promise((resolve, reject) => {
      db_connect("users", async (collection) => {
        try {
          const user = await collection.findOne({
            $or: [
              { email: this.userData.email },
              { userName: this.userData.userName },
            ],
          });
          if (!user) {
            resolve({
              check: false,
              messege: "User not found",
            });
          } else {
            if (user.email === this.userData.email) {
              resolve({
                check: true,
                messege: "Email already exists",
              });
            }
            if (user.userName === this.userData.userName) {``
              resolve({
                check: true,
                messege: "UserName already exists",
              });
            }
          }
        } catch (err) {
          reject(err);
        }
      });
    });
  }

  static validator(userData) {
    const validationResult = UserValidator.validate(userData);

    return validationResult;
  }

  static  login (loginData) {
    return new Promise((resolve, reject) => {
      db_connect("users", async (collection) => {
        const user = collection.findOne({
          userName: loginData.userName,
        })
        if (user) {
          if(compareSync(loginData.password, user.password)) {
            resolve({
              status: true,
              data: user,
            })
          }
        }

      })
      resolve({
        status: false,
        messege: "User not found"
      })
    })
  }
}


module.exports = User;

