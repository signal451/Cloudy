const express = require("express")
const {
  getUserSubscription,
  postUserSubscription,
} = require("../controllers/subscription")
const planRouter = require("./planRouter")

const router = express.Router()

// sub router
router.use("/plan", planRouter)
// subscription router
router.get("/:userId", getUserSubscription)
router.post("/", postUserSubscription)

module.exports = router
