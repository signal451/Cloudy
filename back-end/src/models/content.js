import mongoose, { version } from "mongoose"

const schema = new mongoose.Schema(
  {
    title: String,
    description: String,
    featured_image: {
      uid: String,
      name: String,
      url: String,
    },
    PG: Number,
    created_date: Date,
  },
  { versionKey: false }
)

const content = mongoose.model("content", schema)

export default content
