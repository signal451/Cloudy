import Joi from "joi"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import User from "../models/user.js"

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
  const { email, password } = req.body
  const { data, error } = schema.validate({
    email: email,
    password: password,
  })
  if (error) {
    // custom error message format ... when there's error in request
    return res.status(400).send(error)
  }
  const user = await User.findOne({ email: email })
  if (!user) {
    return res.status(404).send({ message: "User not found" })
  }

  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) {
    return res
      .status(401)
      .send({ accessToken: null, message: "Invalid passwords" })
  }

  const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
    expiresIn: 86400,
  })
  res.status(200).json({
    id: user._id,
    username: user.username,
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    accessToken: token,
  })
}

const getCurrentDate = () => {
  const date = new Date()
  const formattedDate = date.toLocaleDateString()
  return formattedDate
}

const signUp = async (req, res) => {
  const schema = Joi.object({
    username: Joi.string().required().min(3).max(30),
    first_name: Joi.string().max(30).required(),
    last_name: Joi.string().max(30).required(),
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
      first_name: req.body.firstName,
      last_name: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
    })
    const saltRounds = 10
    const hash = bcrypt.hashSync(userData.password.trim(), saltRounds)

    userData.created_date = getCurrentDate()
    userData.password = hash

    const user = new User(userData)
    await User.exists({ email: userData.email }, (err, exist) => {
      if (exist) {
        res.status(400).send(`This email account already exist`)
      } else {
        user.save((err) => {
          if (err) {
            console.error(err)
            res.status(500).send(err)
          } else return res.json(user)
        })
      }
    })
  } catch (err) {
    // * format to custom error message
    console.error(err)
    res.status(400).send(err)
  }
}

export { signUp, logIn }
