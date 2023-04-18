import "dotenv/config"
import mongoose from "mongoose"
import express from "express"
import cors from "cors"
import routers from "./src/routers/router.js"

const app = express()

//middlewares
app.use(
  cors({
    origin: "http://localhost:5173",
  })
)
app.use(express.json())

const PORT = process.env.PORT || 3000
const ENV = process.env.NODE_ENV || "production"

mongoose.set("strictQuery", true)
mongoose
  .connect(process.env.DB_CONNECTION)
  .then((res) => {
    console.log(`Mongodb server running on PORT ${process.env.DB_PORT} ✨`)
  })
  .catch((err) => console.error(err))

// ROUTES
app.use("/api", routers)

app.listen(PORT, () => {
  console.log(`Server port ${PORT}`)
})
