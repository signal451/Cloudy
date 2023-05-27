import express from "express"
import { logIn, signUp } from "../controllers/auth.js"
import { uploadImage } from "../middleware/upload.js"

const router = express.Router()
router.post("/signin", logIn)
router.post("/signup", uploadImage.single("profile_image"), signUp)

export default router
