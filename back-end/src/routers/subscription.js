const express = require("express")
const {
  getUserSubscription,
  postUserSubscription,
} = require("../controllers/subscription")
const planRouter = require("./plan")

const router = express.Router()

router.use("/plan", planRouter)
// subscription CRUD router
router.get("/:userId", getUserSubscription)
router.post("/", postUserSubscription)

module.exports = router
