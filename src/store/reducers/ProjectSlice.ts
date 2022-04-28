import {Post} from '../../models/Post'
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface PostState {
    posts: Post[],
    post: Post | null,
    isLoading: boolean,
    error: null | string,
    pages: number
}

const initialState: PostState = {
    posts: [],
    post: null,
    isLoading: false,
    error: null,
    pages: 1
}

export const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        postsFetching(state) {
            state.isLoading = true
        },
        postsSuccess(state, action: PayloadAction<any>) {
            state.isLoading = false
            state.error = null
            state.posts.push(...action.payload.posts)
            state.pages = action.payload.pages
        },
        postsError(state, action: PayloadAction<string>) {
            state.error = action.payload
            state.isLoading = false
        },
        addPost(state, action: PayloadAction<Post>) {
            state.posts.unshift(action.payload)
        },
        deletePost(state, action: PayloadAction<number>) {
            state.posts = state.posts.filter(post => post.id !== action.payload)
        },
        setPost(state, action: PayloadAction<Post>) {
            state.isLoading = false
            state.post = action.payload
        },
        clearPosts(state) {
            state.posts = []
        }
    }
})

export default postSlice.reducer