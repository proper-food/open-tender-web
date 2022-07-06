import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  topOffset: null,
  menuSection: null,
  menuPath: null,
}

const miscSlice = createSlice({
  name: 'misc',
  initialState,
  reducers: {
    setTopOffset: (state, action) => {
      state.topOffset = action.payload
    },
    setMenuSection: (state, action) => {
      state.menuSection = action.payload
    },
    setMenuPath: (state, action) => {
      state.menuPath = action.payload
    },
  },
})

export const { setTopOffset, setMenuSection, setMenuPath } = miscSlice.actions

export const selectTopOffset = (state) => state.misc.topOffset
export const selectMenuSection = (state) => state.misc.menuSection
export const selectMenuPath = (state) => state.misc.menuPath

export default miscSlice.reducer
