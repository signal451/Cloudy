import express from "express"
import {
  getContentList,
  saveContentDetails,
  getContentById,
  getContentEpisodeBySeason,
  saveContentEpisode,
} from "../controllers/content.js"

const router = express.Router()
router.get("/", getContentList)
router.get("/:id", getContentById)
router.post("/", saveContentDetails)
router.get("/:id/:season", getContentEpisodeBySeason)
router.post("/season/", saveContentEpisode)

export default router
