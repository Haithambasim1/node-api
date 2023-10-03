const { MongoClient } = require("mongodb");

const _uri =
  "mongodb+srv://haithambmohasin:d8Kk48wqIqK3ubm3@cluster0.u176ip8.mongodb.net/nodejs?retryWrites=true&w=majority";

const db_connect = (collection, cb) => {
  MongoClient.connect(_uri)
    .then(async (client) => {
      const db = client.db("nodejs").collection(collection);
      await cb(db);
      client.close();
    })
    .catch();
};

module.exports = db_connect;