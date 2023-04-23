import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { requestOptions, getApiUrl } from "../../services/base"
import axios from "axios"
import { useToast } from "@chakra-ui/react"

const base = "content"

export const updateContent = createAsyncThunk(
  "content/updateContent",
  async (args) => {
    try {
      const response = await axios.post(`${getApiUrl()}${base}`, args, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      return response.data
    } catch (err) {
      console.error(err)
    }
  }
)

export const fetchContentDetails = createAsyncThunk(
  "content/fetchContentDetails",
  async (args) => {
    try {
      const response = await axios.get(`${getApiUrl()}${base}/details`)
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
    builder.addCase(updateContent.pending, (state, action) => {
      state.loading = true
    })
    builder.addCase(updateContent.fulfilled, (state, action) => {
      state.loading = false
      state.list.push(action.payload)
    })
    builder.addCase(fetchContentDetails.pending, (state, action) => {
      // how the fuck I'm gonna do loading animation shit ???
      state.loading = true
    })
    builder.addCase(fetchContentDetails.fulfilled, (state, action) => {
      state.loading = false
      state.list = action.payload
    })
  },
})

// export const { addContent } = contentSlice.actions

export default contentSlice.reducer
