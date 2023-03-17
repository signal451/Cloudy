import express from "express"
import {
  getContentDetails,
  saveContentDetails,
  getContentById,
  getContentEpisodeBySeason,
  saveContentEpisode,
} from "../controllers/content.js"

const router = express.Router()
router.get("/", getContentDetails)
router.get("/:id", getContentById)
router.post("/", saveContentDetails)
router.get("/episode", getContentEpisodeBySeason)
router.post("/episode", saveContentEpisode)

export default router
