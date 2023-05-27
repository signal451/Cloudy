import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { getApiUrl } from "../../services/base"
import axios from "axios"

const base = "user"

export const updateUserDetails = createAsyncThunk(
  "user/updateUserDetauls",
  async (args) => {
    try {
      const response = await axios.post(`${getApiUrl()}auth/signup`, args, {
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

export const fetchUserList = createAsyncThunk(
  "user/fetchUserList",
  async (args) => {
    try {
      const response = await axios.get(`${getApiUrl()}/${base}`)
      return response.data
    } catch (err) {
      console.error(err)
    }
  }
)

const userSlice = createSlice({
  name: "user",
  initialState: {
    list: [],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(updateUserDetails.pending, (state, action) => {
      state.loading = true
    })
    builder.addCase(updateUserDetails.fulfilled, (state, action) => {
      state.loading = false
      // I need find way to trigger fetch request ... idk
      state.list.push(action.payload)
    })
    builder.addCase(fetchUserList.pending, (state, action) => {
      state.loading = true
    })
    builder.addCase(fetchUserList.fulfilled, (state, action) => {
      state.loading = false
      state.list = action.payload
    })
  },
})

export default userSlice.reducer
