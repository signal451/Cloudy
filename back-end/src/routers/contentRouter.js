import express from "express"
import {
  getContentList,
  saveContentDetails,
  getContentById,
  getContentEpisodeBySeason,
  saveContentEpisode,
} from "../controllers/content.js"

import { uploadImage } from "../middleware/upload.js"

const router = express.Router()
router.get("/", getContentList)
router.get("/:id", getContentById)
router.post("/", uploadImage.single("image"), saveContentDetails)
router.get("/:id/:season", getContentEpisodeBySeason)
router.post("/season", saveContentEpisode)

export default router
