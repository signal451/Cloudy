import mongoose, { version } from "mongoose"

const schema = new mongoose.Schema(
  {
    title: String,
    description: String,
    featured_image: {
      key: String,
      location: String,
    },
    episode: [
      {
        title: {
          type: String,
          required: true,
        },
        image: {
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
    created_date: Date,
  },
  { versionKey: false }
)

const content = mongoose.model("content", schema)

export default content
