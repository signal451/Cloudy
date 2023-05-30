const express = require("express")
const authRouter = require("./authRouter")
const showRouter = require("./showRouter")
const seasonRouter = require("./seasonRouter")
const subscriptionRouter = require("./subscriptionRouter")
const paymentRouter = require("./paymentRouter")
const router = express.Router()

router.use("/auth", authRouter)
router.use("/shows", showRouter)
router.use("/season", seasonRouter)
router.use("/subscription", subscriptionRouter)
router.use("/payment", paymentRouter)

module.exports = router
