const { prisma } = require("../config/client")

const getAllShows = async (req, res) => {
  // this one requires aggragation with groupy by ... probably also pagination
  try {
    const shows = await prisma.genre.findMany({
      select: {
        name: true,
        genre_has_show: {
          select: {
            shows: {
              select: {
                show_id: true,
                title: true,
                description: true,
              },
            },
          },
        },
      },
    })

    // filter empty ones
    const filteredShowList = shows.filter(
      (ele) => ele.genre_has_show.length > 0
    )

    return res.json(filteredShowList)
  } catch (err) {
    console.error(err)
    return res.status(500).send({ message: "Something went wrong in server" })
  }
}

const getShowEpisodes = async (req, res) => {
  try {
    let { showId, seasonNum } = req.params

    const episodes = await prisma.episodes.findMany({
      where: {
        AND: [
          {
            season: {
              season_id: parseInt(seasonNum),
            },
          },
          {
            season: {
              shows: {
                show_id: parseInt(showId),
              },
            },
          },
        ],
      },
    })

    return res.json(episodes)
  } catch (err) {
    console.error(err)
    return res.status(500).send({ message: "Something went wrong in server" })
  }
}

module.exports = {
  getAllShows,
  getShowEpisodes,
}
