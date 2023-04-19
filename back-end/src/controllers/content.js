import Joi from "joi"
import Content from "../models/content.js"
import Seasons from "../models/seasons.js"
import { json } from "express"
import { getCurrentDate } from "../helper/util.js"

const getContentList = async (req, res) => {
  const contents = await Seasons.aggregate([
    {
      $lookup: {
        from: "contents",
        localField: "contentId",
        foreignField: "_id",
        as: "content",
      },
    },
    {
      $unwind: "$content",
    },
    {
      $group: {
        _id: "$contentId",
        contents: {
          $push: {
            seasonNum: "$seasonNum",
            episode: "$episode",
          },
        },
        content: {
          $first: "$content",
        },
      },
    },
    {
      $project: {
        title: "$content.title",
        description: "$content.description",
        featured_image: "$content.featured_image",
        totalEpisode: {
          $sum: {
            $map: {
              input: "$contents",
              as: "season",
              in: {
                $size: "$$season.episode",
              },
            },
          },
        },
      },
    },
  ]).exec()
  return res.json(contents)
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
      message: "content didn't even exist dude",
    })
  }
}

const saveContentDetails = (req, res) => {
  // handle data with multer
  // image save and upload to s3 bucket

  console.log(req.body)
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
    created_date: getCurrentDate(),
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
const getContentEpisodeBySeason = async (req, res) => {
  const content = await Seasons.find({
    contentId: req.params.id,
    seasonNum: req.params.season,
  })

  if (content.length === 0) {
    return res.status(404).json({
      message: "couldn't find episode",
    })
  }

  return res.json(content)
}

export {
  getContentList,
  saveContentDetails,
  getContentById,
  getContentEpisodeBySeason,
  saveContentEpisode,
}
