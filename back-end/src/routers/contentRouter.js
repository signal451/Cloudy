import express from "express"
import {
  getContentDetails,
  saveContentDetails,
} from "../controllers/content.js"

const router = express.Router()
router.get("/", getContentDetails)
router.post("/", saveContentDetails)

export default router
