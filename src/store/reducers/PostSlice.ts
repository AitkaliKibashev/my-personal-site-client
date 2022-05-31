import {Post, PostComment, PostNotification} from '../../models/Post'
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface PostState {
    posts: Post[],
    post: Post | null,
    postNotifications: PostNotification[],
    isLoading: boolean,
    error: null | string,
    pages: number
}

const initialState: PostState = {
    posts: [],
    postNotifications: [],
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
        setPost(state, action: PayloadAction<Post | null>) {
            state.isLoading = false
            state.post = action.payload
        },
        clearPosts(state) {
            state.posts = []
        },
        incrementLike(state, action: PayloadAction<number>) {
            state.posts.forEach(post => {
                if (post.id === action.payload ) {
                    post.likes.push({post: 1, like: 1, id: 4})
                }
            })
        },
        addComment(state, action: PayloadAction<PostComment>) {
            state.post?.comments?.unshift(action.payload)
        },
        setNotifications(state, action: PayloadAction<PostNotification[]>) {
            state.postNotifications = action.payload
        },
        addNotification(state, action: PayloadAction<PostNotification>) {
            state.postNotifications.unshift(action.payload)
        },
        readNotifications(state) {
            state.postNotifications.forEach(not => {
                if (not.is_read === false) {
                    not.is_read = true
                }
            })
        },
    }
})

export default postSlice.reducer