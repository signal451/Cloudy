import mongoose, { version } from "mongoose"

// i don't need to have first_name, last_name field
const schema = new mongoose.Schema(
  {
    username: String,
    phone_number: String,
    password: String,
    email: { type: String, unique: true },
    role: String,
    profile_image: {
      name: String,
      location: String,
    },
    subscription: Boolean,
    created_date: Date,
  },
  { versionKey: false }
)

const user = mongoose.model("user", schema)

export default user
