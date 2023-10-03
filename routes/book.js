const  {Router} = require('express');
const {bookController} = require("../controllers")

const router = Router();

router.get('/', bookController.getBooks)
    .get("/:id", bookController.getBookById)

module.exports = router