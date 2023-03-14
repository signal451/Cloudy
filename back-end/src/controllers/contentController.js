import Joi from "joi"
import Content from "../models/content.js"
import { json } from "express"

const getContentDetails = (req, res) => {
  res.send("heya")
}

const saveContentDetails = (req, res) => {}

export { getContentDetails, saveContentDetails }
