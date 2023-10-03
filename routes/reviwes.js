const {Router} = require('express')
const {reviewsController} = require("../controllers")
const router = Router();


router.get('/', reviewsController.getReviwes)
    .get("/:id", reviewsController.getRevById)



module.exports = router