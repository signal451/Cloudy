import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { requestOptions, getApiUrl } from "../../services/base"
import axios from "axios"

const base = "content"

export const updateContent = createAsyncThunk(
  "content/updateContent",
  async (args) => {
    console.log(args)
    try {
      const response = await axios.post(`${getApiUrl()}${base}`, args, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      return response.data
    } catch (err) {
      console.error(err)
    }
  }
)

const contentSlice = createSlice({
  name: "content",
  initialState: {
    list: [],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(updateContent.fulfilled, (state, action) => {
      console.log("Successfully add content data")
      // state.list.push(action.payload)
    })
  },
})

// export const { addContent } = contentSlice.actions

export default contentSlice.reducer
