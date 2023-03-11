import jwt from "jsonwebtoken"
import "dotenv/config"

const SECRET = process.env.SECRET_KEY

const auth = async (req, res, next) => {
  const token = req.header("auth-token")
  if (!token) {
    return res.status(403).send({
      message: "No token provided !",
    })
  }

  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized",
      })
    }
    next()
  })
}

export default auth
