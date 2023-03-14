import mongoose, { version } from "mongoose"

const schema = new mongoose.Schema(
  {
    title: String,
    description: String,
    featured_image: {
      uid: String,
      name: String,
    },
    isMovie: Boolean,
    PG: String,
  },
  { versionKey: false }
)

const content = mongoose.model("content", schema)

export default content
