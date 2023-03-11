import mongoose, { version } from "mongoose"

const userSchema = new mongoose.Schema(
  {
    username: String,
    first_name: String,
    last_name: String,
    password: String,
    email: { type: String, unique: true },
    role: String,
    subscription: Boolean,
    created_date: Date,
  },
  { versionKey: false }
)

const user = mongoose.model("user", userSchema)

export default user
