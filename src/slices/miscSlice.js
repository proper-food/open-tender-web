import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  topOffset: null,
  menuSection: 'recents',
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
  },
})

export const { setTopOffset, setMenuSection } = miscSlice.actions

export const selectTopOffset = (state) => state.misc.topOffset
export const selectMenuSection = (state) => state.misc.menuSection

export default miscSlice.reducer
