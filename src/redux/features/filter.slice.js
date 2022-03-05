import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    activeFilterDate: Date.now() - 604800000,
    page: 1
}

export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setActiveFilterDate: (state, action) => {
            state.activeFilterDate = action.payload;
        },
        setFilterPage: (state, action) => {
            state.page = action.payload
        }
    },
})

// Action creators are generated for each case reducer function
export const { setActiveFilterDate, setFilterPage } = filterSlice.actions;

export default filterSlice.reducer;