import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Tag} from "../../models/Tag";

interface TagState {
    tags: Tag[],
    isLoading: boolean,
    error: null | string
}

const initialState: TagState = {
    tags: [],
    isLoading: false,
    error: null
}

export const tagSlice = createSlice({
    name: 'tag',
    initialState,
    reducers: {
        tagsFetching(state) {
            state.isLoading = true
        },
        tagsSuccess(state, action: PayloadAction<Tag[]>) {
            state.isLoading = false
            state.error = null
            state.tags = action.payload
        },
        tagsError(state, action: PayloadAction<string>) {
            state.error = action.payload
            state.isLoading = false
        }
    }
})

export default tagSlice.reducer