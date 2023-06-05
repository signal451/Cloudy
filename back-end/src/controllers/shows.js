const { prisma } = require("../config/client")

const filterData = (arr) => {
  console.time("shows data shape change")
  const filtered = []
  for (const ele of arr) {
    if (ele.genre_has_show.length > 0) {
      const tempShowsArr = []
      for (const j of ele.genre_has_show) {
        tempShowsArr.push(j.shows)
      }
      filtered.push({
        title: ele.name,
        shows: tempShowsArr,
      })
    }
  }
  console.timeEnd("shows data shape change")
  return filtered
}

const getAllShows = async (req, res) => {
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
                visible: true,
                featured_image: true,
                trending_image: true,
              },
            },
          },
        },
      },
    })
    const filtered = filterData(shows)

    return res.json(filtered)
  } catch (err) {
    console.error(err)
    return res.status(500).send({ message: "Something went wrong in server" })
  }
}

module.exports = {
  getAllShows,
}
