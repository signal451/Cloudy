import mongoose, { version } from "mongoose"

const schema = new mongoose.Schema(
  {
    seasonNum: Number,
    contentId: String,
    episode: [
      {
        title: String,
        image: {
          uid: String,
          name: String,
        },
        visible: Boolean,
        user_id: String,
        upload_date: Date,
        file: String,
        isPaid: false,
        subtitle: String,
      },
    ],
  },
  { versionKey: false }
)

const seasons = new mongoose.model("seasons", schema)

export default seasons
