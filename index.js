const express = require("express");
const app = express();
const middelware = require("./middlewares");
const routes = require("./routes");

middelware(app);
routes(app);


app.use((error, req, res, next) => {
  res.status(error.statusCode || 500).json({
    status: error.statusCode || 500,
    message: error.message || "Internal Server Error",
  });
});

// Start the Express server after defining the error handler middleware
app.listen(5000, () => {
  console.log("Server works");
});

process.on("unhandledRejection", (reason) => {
  console.error("Unhandled Promise Rejection:", reason);
  process.exit(1);
});
