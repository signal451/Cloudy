import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { getApiUrl } from "../../services/base"
import axios from "axios"

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
      return
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
      console.log(err)
      return
    }
  }
)

export const deleteContent = createAsyncThunk(
  "content/deleteContent",
  async (payload) => {
    const { id, key } = payload
    try {
      const response = await axios.delete(`${getApiUrl()}${base}`, {
        data: {
          id: id,
          key: key,
        },
      })
      return response.data
    } catch (err) {
      console.error(err)
      return
    }
  }
)

const contentSlice = createSlice({
  name: "content",
  initialState: {
    list: [],
    loading: false,
    status: "",
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
      state.loading = true
    })
    builder.addCase(fetchContentDetails.fulfilled, (state, action) => {
      state.loading = false
      state.list = action.payload
    })
    builder.addCase(deleteContent.fulfilled, (state, action) => {
      state.status = "succeeded"
      const { id } = action.payload
      const oldContents = state.list.filter((content) => content._id !== id)
      state.list = oldContents
    })
    builder.addCase(deleteContent.rejected, (state, action) => {
      state.status = "failed"
    })
  },
})

// export const { addContent } = contentSlice.actions

export default contentSlice.reducer
