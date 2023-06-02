const { prisma } = require("../config/client")

const getShowTotalSeason = async (req, res) => {
  try {
    const { showId } = req.params

    const seasons = await prisma.season.findMany({
      where: {
        show_id: parseInt(showId),
      },
      select: {
        season_id: true,
        num: true,
      },
      orderBy: {
        num: "asc",
      },
    })

    return res.json(seasons)
  } catch (err) {
    console.error(err)
    return res.status(500).send({ message: "Something went wrong in server" })
  }
}

const getSeasonEpisodes = async (req, res) => {
  try {
    const { showId, seasonNum } = req.params

    const episodes = await prisma.episodes.findMany({
      select: {
        title: true,
        file: true,
        thumbnail: true,
        created_at: true,
      },
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
    return res.status(500).send({
      message: "Something went wrong in server",
    })
  }
}

module.exports = {
  getShowTotalSeason,
  getSeasonEpisodes,
}
