const joi = require("@hapi/joi");

const schema = joi.object({
  name: joi.string().required(),
  email: joi.string().email().required(),
  password: joi
    .string()
    .pattern(
      new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})")
    ).message('Password not strong enough')
    .min(4)
    .max(30)
    .required(),
  userName: joi.string().alphanum().min(4).max(15).required(),
});

module.exports = schema;
