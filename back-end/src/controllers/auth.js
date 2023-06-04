const { prisma } = require("../config/client")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { getCurrentDate } = require("../util/util")

const saltRounds = 10

const checkUserExist = async (number) => {
  const user = await prisma.client.findFirst({
    where: {
      phone_number: number,
    },
  })
  return user
}

const signUp = async (req, res) => {
  try {
    const { username, phone_number, password } = req.body

    const isExist = await checkUserExist(phone_number)

    if (isExist == null) {
      const passwordHash = bcrypt.hashSync(password.trim(), saltRounds)
      const createdDate = getCurrentDate()

      const user = {
        username: username,
        phone_number: phone_number,
        client_password: passwordHash,
        role_id: 2,
        profile_image:
          "https://d2z1yxiqvuf8s3.cloudfront.net/profile/blank_user.jpg",
        created_at: createdDate,
      }

      await prisma.client.create({ data: user })

      return res.send({ message: "User successfully added" })
    }

    return res.status(400).json({
      message: "user already exist",
    })
  } catch (err) {
    console.error(err)
    return res.status(500).send({ message: "Something went wrong in server" })
  }
}

const logIn = async (req, res) => {
  try {
    const { phone_number, password } = req.body
    const user = await checkUserExist(phone_number)

    if (user == null) {
      return res.status(404).send({ message: "User not found" })
    }

    const isMatch = await bcrypt.compare(password, user.client_password)

    if (!isMatch) {
      return res
        .status(400)
        .send({ accessToken: null, message: "Invalid passwords" })
    }

    const token = jwt.sign({ id: user.client_id }, process.env.SECRET_KEY, {
      expiresIn: "5h",
    })

    const userData = Object.assign(user, {
      accessToken: token,
    })
    return res.json(userData)
  } catch (err) {
    console.error(err)
    return res.status(500).send({ message: "Something went wrong in server" })
  }
}

module.exports = {
  logIn,
  signUp,
}
