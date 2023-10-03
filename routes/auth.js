const { Router } = require("express");
const { authController } = require("../controllers");

const router = Router();

router.post("/", authController.signup);

module.exports = router;
