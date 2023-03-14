import mongoose, { version } from "mongoose"

// i don't need to have first_name, last_name field
const userSchema = new mongoose.Schema(
  {
    username: String,
    phone_number: String,
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
