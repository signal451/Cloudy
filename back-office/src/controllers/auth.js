const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { pool } = require("../config/connect")
const { getCurrentDate } = require("../util/util")

const saltRounds = 10

const signUp = async (req, res) => {
  try {
    const user = await pool.query("select * from findone($1)", [
      req.body.phone_number,
    ])
    if (user.rowCount === 0) {
      const { username, phone_number, password } = req.body

      const hash = bcrypt.hashSync(password.trim(), saltRounds)
      const created_at = getCurrentDate()

      await pool.query("call client_register($1, $2, $3, $4, $5, $6)", [
        username,
        phone_number,
        hash,
        3,
        "https://d2z1yxiqvuf8s3.cloudfront.net/profile/blank_user.jpg",
        created_at,
      ])
      return res.send({ message: "User successfully added" })
    } else {
      return res
        .status(400)
        .send({ message: "Phone number already exist in system" })
    }
  } catch (err) {
    console.error(err)
    return res.status(500).send({ message: "Something went wrong in server" })
  }
}

const logIn = async (req, res) => {
  try {
    const { phone_number, password } = req.body
    const user = await pool.query("select * from findone($1)", [phone_number])
    if (user.rowCount === 0) {
      return res.status(404).send({ message: "User not found" })
    }
    const isMatch = await bcrypt.compare(password, user.rows[0].secret)
    if (!isMatch) {
      return res
        .status(400)
        .send({ accessToken: null, message: "Invalid passwords" })
    }

    const token = jwt.sign({ id: user.rows[0].id }, process.env.SECRET_KEY, {
      expiresIn: "5h",
    })

    return res.json({
      id: user.rows[0].id,
      username: user.rows[0].username,
      phone: user.rows[0].phone_number,
      image: user.rows[0].image,
      accessToken: token,
    })
  } catch (err) {
    console.error(err)
    return res.status(500).send({ message: "Something went wrong in server" })
  }
}

module.exports = {
  logIn,
  signUp,
}
