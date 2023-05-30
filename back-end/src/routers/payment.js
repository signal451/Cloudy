const express = require("express")
const { getUserPayments } = require("../controllers/payment")

const router = express.Router()

router.get("/:userId", getUserPayments)

module.exports = router
