const express = require("express")
const { getAllShows } = require("../controllers/shows")

const router = express.Router()

// CRUD OPERATIONS
router.get("/", getAllShows)

module.exports = router
