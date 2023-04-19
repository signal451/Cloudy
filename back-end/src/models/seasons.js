import mongoose, { Schema, version } from "mongoose"

const schema = new mongoose.Schema(
  {
    seasonNum: Number,
    contentId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "content",
    },
    episode: [
      {
        title: {
          type: String,
          required: true,
        },
        image: {
          uid: String,
          name: String,
          url: String,
        },
        visible: Boolean,
        user_id: {
          type: String,
          required: true,
        },
        upload_date: Date,
        file: {
          type: String,
          required: true,
        },
        isPaid: Boolean,
        subtitle: String,
      },
    ],
  },
  { versionKey: false }
)

const seasons = new mongoose.model("seasons", schema)

export default seasons
