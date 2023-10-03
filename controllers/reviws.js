const { db_connect } = require("../config");
const { ObjectId } = require("bson");

const getReviwes = (req, res, next) => {
  db_connect("reviwes", async (collection) => {
    try {
      const reviwes = await collection.find({}).toArray();
      res.json(reviwes);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: false,
        message: "Internal server error",
      });
    }
  });
};

const getRevById = (req, res) => {
  const idParam = req.params.id;

  if (!ObjectId.isValid(idParam)) {
    return res.status(400).json({
      status: false,
      message: "Object id is not valid",
    });
  }

  const _id = new ObjectId(idParam);

  db_connect("reviwes", async (collection) => {
    try {
      const rev = await collection.findOne({ _id });
      if (!rev) {
        return res.status(404).json({
          status: false,
          message: "Review not found with the provided ID",
        });
      }
      res.json(rev);
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
  getReviwes,
  getRevById,
};
