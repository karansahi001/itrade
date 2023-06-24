import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: [],
}

export const portfolioSlice = createSlice({
  name: 'portfolio',
  initialState,
  reducers: {
    updatePortfolio: (state, action) => {
      state.value = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { updatePortfolio } = portfolioSlice.actions

export default portfolioSlice.reducer