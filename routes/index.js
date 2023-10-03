const bookRouter = require("./book");
const reviwesRouter = require("./reviwes");
const authRouter = require("./auth");

module.exports = (app) => {
  app.use("/books", bookRouter);
  app.use("/reviwes", reviwesRouter);
  app.use("/auth", authRouter);
};
