const express = require("express")
const authRouter = require("./auth")
const showRouter = require("./show")
const seasonRouter = require("./season")
const libraryRouter = require("./library")
const subscriptionRouter = require("./subscription")
const paymentRouter = require("./payment")
const router = express.Router()

router.use("/auth", authRouter)
router.use("/shows", showRouter)
router.use("/season", seasonRouter)
router.use("/library", libraryRouter)
router.use("/subscription", subscriptionRouter)
router.use("/payment", paymentRouter)

module.exports = router
