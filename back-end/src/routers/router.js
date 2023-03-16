import express from "express"
import signinRouter from "./authRouter.js"
import contentRouter from "./contentRouter.js"
import userRouter from "./userRouter.js"

const router = express.Router()

router.use("/auth", signinRouter)
router.use("/content", contentRouter)
router.use("/user", userRouter)

export default router
