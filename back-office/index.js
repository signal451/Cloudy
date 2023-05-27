require("dotenv").config()
require("./src/config/connect")

const express = require("express")
const cors = require("cors")
const router = require("./src/routers/router")

const PORT = process.env.PORT || 3000

const app = express()

app.use(express.json())
app.use(cors())

app.use("/api", router)

app.listen(PORT, () => {
  console.log(`Express server port running on ${PORT}`)
})
