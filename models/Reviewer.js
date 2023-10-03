const { db_connect } = require("../config");

class Reviewer {
  constructor(reviewerData) {
    this.reviewerData = reviewerData;
  }

  save(cb) {
    db_connect("reviewers", async (collection) => {
      try {

         collection.updateOne(
            //  condition
            { name: this.reviewerData.name, _user_Id: null},
            //  update if not found insert if found
            { $set: { _user_Id: this.reviewerData._user_Id, name: this.reviewerData.name } },
             //  options
             { upsert: true }
        );
        cb({
          status: true,
        });
      }

      catch (err) {
        cb({
          status: false,
          error: err.messege,
        });
      }
    });
  }
}

module.exports = Reviewer;
