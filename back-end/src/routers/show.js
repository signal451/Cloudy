const express = require("express")
const { getAllShows, getShowEpisodes } = require("../controllers/shows")

const router = express.Router()

// CRUD OPERATIONS
router.get("/", getAllShows)
router.get("/:seasonNum/:showId", getShowEpisodes)

module.exports = router
