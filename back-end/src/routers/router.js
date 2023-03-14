import express from "express"
import signinRouter from "./userRouter.js"
import contentRouter from "./contentRouter.js"

const router = express.Router()

router.use("/auth", signinRouter)
router.use("/content", contentRouter)

export default router
