import Joi from "joi"
import Content from "../models/content.js"
import Seasons from "../models/seasons.js"
import { json } from "express"

const getContentDetails = async (req, res) => {
  // will be add pagination smh
  const list = await Content.find({})
  return res.json(list)
}

const getContentById = async (req, res) => {
  try {
    const content = await Content.findById(req.params.id)
    if (content === null) {
      return res.status(400).json({})
    }
    return res.json(content)
  } catch (err) {
    console.error(err)
    return res.status(400).json({
      message: "content didn't even exist dudex",
    })
  }
}

const saveContentDetails = (req, res) => {
  // image save and upload to s3 bucket
  const schema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
  })
  const { value, error } = schema.validate({
    title: req.body.title,
    description: req.body.description,
  })

  if (error) {
    return res.status(400).send(error)
  }

  const data = {
    title: req.body.title,
    description: req.body.description,
    featured_image: req.body.featured_image,
    isMovie: req.body.isMovie,
    PG: req.body.PG,
  }
  const content = new Content(data)
  try {
    content.save()
    return res.json(content)
  } catch (err) {
    console.error(err)
    return res.json("something went wrong in server")
  }
}

const saveContentEpisode = async (req, res) => {
  // I will be add some logic to it ensure to validate format..
  const count = await Seasons.where({
    contentId: req.body.contentId,
    seasonNum: req.body.seasonNum,
  }).count()
  if (count === 0) {
    const data = {
      seasonNum: req.body.seasonNum,
      contentId: req.body.contentId,
      episode: req.body.episode,
    }
    const episode = new Seasons(data)
    try {
      episode.save()
      return res.json(episode)
    } catch (err) {
      console.error(err)
      return res.status(500).json({
        message: "something went wrong while trying to upload",
      })
    }
  }
  try {
    await Seasons.updateOne(
      { seasonNum: req.body.seasonNum, contentId: req.body.contentId },
      { $push: { episode: req.body.episode } }
    )
    return res.json({
      message: "new episode successfully added",
    })
  } catch (err) {
    console.error(err)
    return res.status(500).json({
      message: "something went wrong while trying to upload new episode",
    })
  }
}

// groupBySeason
const getContentEpisodeBySeason = (req, res) => {}

export {
  getContentDetails,
  saveContentDetails,
  getContentById,
  getContentEpisodeBySeason,
  saveContentEpisode,
}
