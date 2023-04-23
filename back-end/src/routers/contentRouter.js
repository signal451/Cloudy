import express from "express"
import {
  getContentList,
  getContentDetails,
  saveContentDetails,
  getContentById,
  saveContentEpisode,
} from "../controllers/content.js"

import { uploadImage } from "../middleware/upload.js"

const router = express.Router()
router.get("/", getContentList)
router.get("/details", getContentDetails)
router.get("/:id", getContentById)
router.post("/", uploadImage.single("image"), saveContentDetails)
router.post("/episode", saveContentEpisode)

export default router
