const express = require("express")
const { signUp, logIn } = require("../controllers/auth")
const { signUpValidation, logInValidation } = require("../middlewares/Validate")

const router = express.Router()

router.post("/signup", signUpValidation, signUp)
router.post("/login", logInValidation, logIn)

module.exports = router
