import Joi from "joi"
import Content from "../models/content.js"
import { json } from "express"
import { getCurrentDate } from "../helper/util.js"
import { s3 } from "../middleware/upload.js"
import { DeleteObjectCommand } from "@aws-sdk/client-s3"

// for mobile ???? aahhh
const getContentList = async (req, res) => {}

const getContentDetails = async (req, res) => {
  // query
  const pipeline = [
    {
      $project: {
        _id: 1,
        title: 1,
        description: 1,
        featured_image: 1,
        created_date: 1,
        totalEpisode: { $size: "$episode" },
      },
    },
  ]

  const contents = await Content.aggregate(pipeline).exec()
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

  console.log(req.file)

  const data = {
    title: req.body.title,
    description: req.body.description,
    featured_image: {
      key: req.file.key,
      location: req.file.location,
    },
    episode: [],
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
  try {
    const content = await Content.updateOne(
      {
        _id: req.body.contentId,
      },
      {
        $push: { episode: req.body.episode },
      }
    )
    return res.json({
      message: "Sucessfully add new episode to content",
    })
  } catch (err) {
    console.error(err)
    return res.status(500).json({
      message: "something went wrong while trying to upload new episode",
    })
  }
}

const deleteContent = async (req, res) => {
  const schema = Joi.object({
    id: Joi.string().required(),
  })
  const { error } = schema.validate({ id: req.body.id })
  if (error) {
    return res.status(400).send(error)
  }
  try {
    // this shit returns something
    const content = await Content.deleteOne({ _id: req.body.id })
    const input = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: req.body.key,
    }
    const command = new DeleteObjectCommand(input)
    await s3.send(command)

    return res.json({
      id: req.body.id,
    })
  } catch (err) {
    console.error(err)
    return res.status(400).send(error)
  }
}

export {
  getContentList,
  getContentDetails,
  saveContentDetails,
  getContentById,
  deleteContent,
  saveContentEpisode,
}
