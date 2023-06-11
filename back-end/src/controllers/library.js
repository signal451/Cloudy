const { prisma } = require("../config/client")
const { getCurrentDate } = require("../util/util")

const checkShowExist = async (clientId, showId) => {
  const show = await prisma.my_library.findFirst({
    where: {
      AND: [
        {
          client_id: clientId,
        },
        {
          show_id: showId,
        },
      ],
    },
  })
  return show
}

const changeDataShape = (arr) => {
  const libraryShows = arr.map((element) => {
    return element.shows
  })
  return libraryShows
}

const addShowToLibrary = async (req, res) => {
  try {
    const { client_id, show_id } = req.body

    const isExist = await checkShowExist(parseInt(client_id), parseInt(show_id))

    if (isExist == null) {
      const addedShow = await prisma.my_library.create({
        data: {
          client_id: parseInt(client_id),
          show_id: parseInt(show_id),
          created_at: getCurrentDate(),
        },
      })
      return res.json(addedShow)
    }

    return res.status(202).send({
      message: "Show already exists",
    })
  } catch (err) {
    console.error(err)
    return res.status(500).send({ message: "Error executing query" })
  }
}

const getLibraryShows = async (req, res) => {
  try {
    const { clientId } = req.params
    const myLibraryShows = await prisma.my_library.findMany({
      select: {
        shows: {
          select: {
            show_id: true,
            title: true,
            description: true,
            visible: true,
            cover_image: true,
            featured_image: true,
          },
        },
      },
      where: {
        client_id: parseInt(clientId),
      },
      orderBy: {
        created_at: "desc",
      },
    })
    const list = changeDataShape(myLibraryShows)
    return res.json(list)
  } catch (err) {
    console.error(err)
    return res.status(500).send({ message: "Error executing query" })
  }
}

module.exports = {
  addShowToLibrary,
  getLibraryShows,
}
