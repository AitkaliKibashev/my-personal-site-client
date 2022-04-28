import {Post} from '../../models/Post'
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface PostState {
    posts: Post[],
    post: Post | null,
    isLoading: boolean,
    error: null | string
}

const initialState: PostState = {
    posts: [],
    post: null,
    isLoading: false,
    error: null
}

export const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        postsFetching(state) {
            state.isLoading = true
        },
        postsSuccess(state, action: PayloadAction<Post[]>) {
            state.isLoading = false
            state.error = null
            state.posts = action.payload
        },
        postsError(state, action: PayloadAction<string>) {
            state.error = action.payload
            state.isLoading = false
        },
        addPost(state, action: PayloadAction<Post>) {
            state.posts.push(action.payload)
        },
        setPost(state, action: PayloadAction<Post>) {
            state.isLoading = false
            state.post = action.payload
        }
    }
})

export default postSlice.reducer