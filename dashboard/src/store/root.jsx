import { configureStore } from "@reduxjs/toolkit"
import contentReducer from "../reducers/content/contentSlice"
import userReducer from "../reducers/user/userSlice"

export default configureStore({
  reducer: {
    content: contentReducer,
    user: userReducer,
  },
})
