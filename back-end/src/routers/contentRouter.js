import express from "express"
import {
  getContentDetails,
  saveContentDetails,
} from "../controllers/contentController.js"

const router = express.Router()
router.get("/", getContentDetails)
router.post("/", saveContentDetails)

export default router
