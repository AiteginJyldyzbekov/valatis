import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { type PaginationSchema } from '../types/PaginationSchema'


const initialState: PaginationSchema = {
    offset: 0,
    limit: 50,
    page: 1
}

export const paginationSlice = createSlice({
    name: 'pagination',
    initialState,
    reducers: {
        nextPage: (state) => {
            state.offset = (state.page * state.limit);
            state.page += 1;
        },
        prevPage: (state) => {
            state.page -= 1;
            if (state.page < 1) {
                state.page = 1;
            }
            state.offset = ((state.page - 1) * state.limit);
        },
    },
})

export const { actions: paginationActions } = paginationSlice
export const { reducer: paginationReducer } = paginationSlice
