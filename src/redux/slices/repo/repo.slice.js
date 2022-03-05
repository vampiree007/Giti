import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  repos: null,
  count: null
}

export const repoSlice = createSlice({
  name: 'repo',
  initialState,
  reducers: {
    setRepoData: (state, action) => {
      state.repos = action.payload?.items;
      state.count = action.payload?.total_count
    },
    addRepoData: (state, action) => {
      state.repos = [...state.repos, ...action.payload]
    }
  },
})

// Action creators are generated for each case reducer function
export const { setRepoData, addRepoData } = repoSlice.actions

export default repoSlice.reducer;