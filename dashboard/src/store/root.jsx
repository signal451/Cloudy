import { configureStore } from "@reduxjs/toolkit"
import contentReducer from "../reducers/content/contentSlice"

export default configureStore({
  reducer: {
    content: contentReducer,
  },
})
