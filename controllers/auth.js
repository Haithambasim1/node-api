const { User, Reviewer } = require("../models");
const createError = require("http-errors");

const signup = (req, res, next) => {
  // get user
  const userData = req.body;
  // validate
  const validation = User.validator(userData);
  if (validation.error) {
    next(createError(400, validation.error.message));
  }

  // create user
  const user = new User(userData);

  // check if user exists
  user
    .isExists()
    .then((result) => {
      if (result.check) {
        next(createError(409, result.messege));
      } else {
        user.save((status) => {
          if (status.status) {
            const _user_Id = status._user_Id;

            const reviewer = new Reviewer({
              name: userData.name,
              _user_Id: _user_Id,
            });

            reviewer.save((result) => {
              if (result.status) {
                res.status(201).json({
                  status: true,
                  message: "User and Reviewer have been created",
                });
              }
            });
          } else {
            next(createError(500, status.messege));
          }
        });
      }
    })
    .catch((err) => {
      next(createError(500, err.messege));
    });
};

module.exports = {
  signup,
};
