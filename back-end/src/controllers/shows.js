const groupByGenre = (dt) => {
  let counter = 0
  const genres = []
  const showList = []

  for (const ele of dt) {
    const list = []
    const isGenreExist = genres.indexOf(ele.genre)
    if (isGenreExist < 0) {
      genres.push(ele.genre)
      counter++
      for (const j of dt) {
        if (ele.genre === j.genre) {
          list.push({
            id: j.id,
            title: j.title,
            description: j.description,
            featured_image: j.featured_image,
            cover_image: j.cover_image,
            trending_image: j.trending_image,
            visible: j.visible,
            status: j.status,
          })
        }
      }
      showList.push({
        id: counter,
        category: genres[counter - 1],
        contents: list,
      })
    }
  }
  return showList
}

const getAllShows = async (req, res) => {
  // change query string depending on what value ...
  pool
    .query("select * from get_all_shows_by_genre()")
    .then((response) => {
      const data = groupByGenre(response.rows)
      return res.send(data)
    })
    .catch((err) => {
      console.error("Error executing query")
      // kinda effie but idk ;-;
      return res.status(400).send("Error executing query")
    })
}

const getShowEpisodes = async (req, res) => {
  pool
    .query("select * from get_show_episodes($1, $2)", [
      req.params.showId,
      req.params.seasonId,
    ])
    .then((response) => {
      const data = response.rows
      return res.send(data)
    })
    .catch((err) => {
      console.error(err)
      return res.status(400).send("Error executing query")
    })
}

module.exports = {
  getAllShows,
  getShowEpisodes,
}
