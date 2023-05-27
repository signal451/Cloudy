const express = require("express")
const { getAllSubscriptionPlans } = require("../controllers/plan")

const router = express.Router()

router.get("/", getAllSubscriptionPlans)

module.exports = router
