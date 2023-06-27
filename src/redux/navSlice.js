import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: "",
}

export const navSlice = createSlice({
  name: 'nav',
  initialState,
  reducers: {
    updateNav: (state, action) => {
      state.value = action.payload
    }
  },
})

export const { updateNav } = navSlice.actions

export default navSlice.reducer