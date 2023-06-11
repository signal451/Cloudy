const express = require("express")
const { libraryAddValidation } = require("../middlewares/Validate")
const { addShowToLibrary, getLibraryShows } = require("../controllers/library")

const router = express.Router()

router.get("/:clientId", getLibraryShows)
router.post("/", libraryAddValidation, addShowToLibrary)

module.exports = router
