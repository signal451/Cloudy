const addShowToLibrary = async (req, res) => {
  try {
  } catch (err) {
    console.error(err)
    return res.status(500).send({ message: "Error executing query" })
  }
}

const getLibraryShows = async (req, res) => {
  try {
  } catch (err) {
    console.error(err)
    return res.status(500).send({ message: "Error executing query" })
  }
}

module.exports = {
  addShowToLibrary,
}
