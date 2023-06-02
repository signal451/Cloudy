const express = require("express")
const {
  getShowTotalSeason,
  getSeasonEpisodes,
} = require("../controllers/season")
getShowTotalSeason

const router = express.Router()

// CRUD OPERATION
router.get("/:showId", getShowTotalSeason)
router.get("/:showId/:seasonNum", getSeasonEpisodes)

module.exports = router
