import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface AdminState {
    isAdmin: boolean
}

const initialState: AdminState = {
    isAdmin: false
}

export const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        checkAdmin(state, action: PayloadAction<boolean>) {
            state.isAdmin = action.payload
        },
    }
})

export default adminSlice.reducer