import Joi from "joi"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import User from "../models/user.js"
import { getCurrentDate } from "../helper/util.js"
import { json } from "express"

const logIn = async (req, res) => {
  const schema = Joi.object({
    email: Joi.string()
      .email({ tlds: { allow: ["com"] } })
      .required()
      .messages({
        "any.required": `email must be required`,
      }),
    password: Joi.string()
      .pattern(/^[a-zA-Z0-9_-]{6,21}$/)
      .required()
      .messages({
        "string.pattern.base": `password must be between 6 to 21 digit and no special characters`,
      }),
  })

  const { value, error } = schema.validate({
    email: req.body.email,
    password: req.body.password,
  })
  if (error) {
    // custom error message format ... when there's error in request
    return res.status(400).send(error)
  }

  const user = await User.findOne({ email: value.email })
  if (!user) {
    return res.status(404).send({ message: "User not found" })
  }

  const isMatch = await bcrypt.compare(value.password, user.password)
  if (!isMatch) {
    return res
      .status(401)
      .send({ accessToken: null, message: "Invalid passwords" })
  }

  const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
    expiresIn: 86400,
  })

  return res.status(200).json({
    id: user._id,
    username: user.username,
    phone_number: user.phone_number,
    email: user.email,
    subscription: user.subscription,
    accessToken: token,
  })
}

const signUp = async (req, res) => {
  const schema = Joi.object({
    username: Joi.string().required().min(3).max(30),
    phone_number: Joi.string()
      .pattern(/^[0-9]+$/)
      .required(),
    email: Joi.string()
      .email({ tlds: { allow: ["com"] } })
      .required()
      .messages({
        "any.required": `email must be required`,
      }),
    password: Joi.string()
      .pattern(/^[a-zA-Z0-9_-]{6,21}$/)
      .required()
      .messages({
        "string.pattern.base": `password must be between 6 to 21 digit and no special characters`,
      }),
  })
  try {
    const userData = await schema.validateAsync({
      username: req.body.username,
      phone_number: req.body.phone_number,
      email: req.body.email,
      password: req.body.password,
    })
    const saltRounds = 10
    const hash = bcrypt.hashSync(userData.password.trim(), saltRounds)

    userData.created_date = getCurrentDate()
    userData.password = hash
    userData.subscription = false

    const user = new User(userData)
    const isExist = await User.exists({ email: userData.email })

    if (isExist) {
      return res.status(400).send("user email already used")
    }

    user.save()
    return res.json(user)
  } catch (err) {
    // * format to custom error message
    console.error(err)
    res.status(400).send(err.message)
  }
}

export { signUp, logIn }
