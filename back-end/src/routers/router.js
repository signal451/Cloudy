import express from "express"
import signinRouter from "./userRouter.js"

const router = express.Router()

router.use("/auth", signinRouter)

export default router
