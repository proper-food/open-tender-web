import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  topOffset: null,
}

const miscSlice = createSlice({
  name: 'misc',
  initialState,
  reducers: {
    setTopOffset: (state, action) => {
      state.topOffset = action.payload
    },
  },
})

export const { setTopOffset } = miscSlice.actions

export const selectTopOffset = (state) => state.misc.topOffset

export default miscSlice.reducer
