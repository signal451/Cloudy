import User from "../models/user.js"
import { json } from "express"

const getUsers = async (req, res) => {
  const list = await User.find({})
  return res.json(list)
}

export { getUsers }
