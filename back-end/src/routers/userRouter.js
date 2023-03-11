import express from "express"
import { logIn, signUp } from "../controllers/userController.js"
const router = express.Router()

router.post("/signin", logIn)
router.post("/signup", signUp)

export default router
