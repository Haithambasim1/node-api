const { db_connect } = require("../config");
const { ObjectId } = require("bson");

const { createError } = require("http-errors");
const getBooks = (req, res, next) => {
  const page = parseInt(req.query.page);

  if (isNaN(page)) {
    return res.status(400).json({
      status: false,
      message: "You should insert a page number",
    });
  }

  const limit = 10;
  const skip = (page - 1) * 10;

  db_connect("books", async (collection) => {
    try {
      const books = await collection.find({}).limit(limit).skip(skip).toArray();
      res.json(books);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: false,
        message: "Internal server error",
      });
    }
  });
};

const getBookById = (req, res, next) => {
  const _id = new ObjectId(req.params.id);

  if (!ObjectId.isValid(req.params.id)) {
    const error = createError(400, "id is not valid");
    next(error);
  }

  db_connect("books", async (collection) => {
    try {
      const book = await collection.findOne({ _id });

      if (!book) {
        const error = createError(404, "book is not found");

        return res.status(error.statusCode).json({
          status: false,
          message: error.message,
        });
      }

      res.json(book);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: false,
        message: "Internal server error",
      });
    }
  });
};

module.exports = {
  getBooks,
  getBookById,
};

