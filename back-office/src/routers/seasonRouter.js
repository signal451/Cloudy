const express = require("express")
const { getShowTotalSeason } = require("../controllers/season")
getShowTotalSeason

const router = express.Router()

// CRUD OPERATION
router.get("/:showId", getShowTotalSeason)

module.exports = router
