import {AppDispatch} from "../index";
import {postSlice} from "./PostSlice";
import {tagSlice} from "./TagSlice";
import {adminSlice} from "./AdminSlice";
import {projectSlice} from "./ProjectSlice";
import {adminAPI, postAPI, postNotificationAPI, projectAPI, tagAPI} from "../../api/API";
import {PostNotification} from "../../models/Post";

export const fetchPosts = (page: number) => async (dispatch: AppDispatch) => {
    try {
        dispatch(postSlice.actions.postsFetching())
        const response = await postAPI.fetchPosts(page)
        dispatch(postSlice.actions.postsSuccess(response.data))
    } catch (e) {
        dispatch(postSlice.actions.postsError('Error occured'))
        console.log(e)
    }
}

export const fetchArchivedPosts = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(postSlice.actions.postsFetching())
        const response = await postAPI.fetchArchivedPosts()
        console.log(response)
        dispatch(postSlice.actions.postsSuccess({posts: response.data}))
    } catch (e) {
        dispatch(postSlice.actions.postsError('Error occured'))
        console.log(e)
    }
}

export const queryPosts = (page: number, query: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(postSlice.actions.postsFetching())
        const response = await postAPI.queryPosts(page, query)
        dispatch(postSlice.actions.postsSuccess(response.data))
    } catch (e) {
        dispatch(postSlice.actions.postsError('Error occured'))
        console.log(e)
    }
}

export const addPost = (post: any, isPostFromAdmin: boolean = false) => async (dispatch: AppDispatch) => {
    try {
        const response = await postAPI.addPost(post)
        if(!isPostFromAdmin) {
            dispatch(postSlice.actions.addPost(response.data))
        }
    } catch (e) {
        dispatch(postSlice.actions.postsError('Error occured'))
        console.log(e)
    }
}

export const getPost = (id: number) => async (dispatch: AppDispatch) => {
    try {
        dispatch(postSlice.actions.postsFetching())
        const response = await postAPI.getPost(id)
        dispatch(postSlice.actions.setPost(response.data))
    } catch (e) {
        dispatch(postSlice.actions.postsError('Error occured'))
        console.log(e)
    }
}

export const deletePost = (id: number) => async (dispatch: AppDispatch) => {
    try {
        await postAPI.deletePost(id)
        dispatch(postSlice.actions.deletePost(id))
    } catch (e) {
        dispatch(postSlice.actions.postsError('Error occured'))
        console.log(e)
    }
}

export const changePost = (post: any, id: number) => async (dispatch: AppDispatch) => {
    try {
        await postAPI.changePost(post, id)
    } catch (e) {
        dispatch(postSlice.actions.postsError('Error occured'))
        console.log(e)
    }
}

export const fetchTags = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(tagSlice.actions.tagsFetching())
        const response = await tagAPI.fetchTags()
        dispatch(tagSlice.actions.tagsSuccess(response.data))
    } catch (e) {
        dispatch(tagSlice.actions.tagsError('Error occured'))
        console.log(e)
    }
}

export const addComment = (comment: {text: string, user: string, post: number}) => async (dispatch: AppDispatch) => {
    try {
        const response = await postAPI.addComment(comment)
        dispatch(postSlice.actions.addComment(response.data))
    } catch (e) {
        dispatch(postSlice.actions.postsError('Error occured'))
        console.log(e)
    }
}

export const adminLogin = (data: {username: string, password: string}) => async (dispatch: AppDispatch) => {
    try {
        const response = await adminAPI.adminLogin(data)
        localStorage.setItem('token', response.data.token)
        dispatch(adminSlice.actions.checkAdmin(true))
        return response
    } catch (e) {
        dispatch(adminSlice.actions.checkAdmin(false))
        console.log(e)
    }
}

export const checkAdmin = () => async (dispatch: AppDispatch) => {
    try {
        await adminAPI.checkAdmin()
        dispatch(adminSlice.actions.checkAdmin(true))
    } catch (e) {
        dispatch(adminSlice.actions.checkAdmin(false))
        console.log(e)
    }
}

export const fetchProjects = (page: number) => async (dispatch: AppDispatch) => {
    try {
        dispatch(projectSlice.actions.projectsFetching())
        const response = await projectAPI.fetchProjects(page)

        dispatch(projectSlice.actions.projectsFetchingSuccess(response.data))
    } catch (e) {
        dispatch(projectSlice.actions.projectsFetchingError('Error occured'))
        console.log(e)
    }
}

export const deleteProject = (id: number) => async (dispatch: AppDispatch) => {
    try {
        await projectAPI.deleteProject(id)

        dispatch(projectSlice.actions.deleteProject(id))
    } catch (e) {
        dispatch(projectSlice.actions.projectsFetchingError('Error occured'))
        console.log(e)
    }
}

export const addProject = (project: any) => async (dispatch: AppDispatch) => {
    try {
        await projectAPI.addProject(project)
    } catch (e) {
        dispatch(projectSlice.actions.projectsFetchingError('Error occured'))
        console.log(e)
    }
}

export const changeProject = (project: any, id: number) => async (dispatch: AppDispatch) => {
    try {
        await projectAPI.changeProject(project, id)
    } catch (e) {
        dispatch(projectSlice.actions.projectsFetchingError('Error occured'))
        console.log(e)
    }
}

export const incrementProjectLike = (id: number) => async (dispatch: AppDispatch) => {
    try {
        await projectAPI.incrementLike(id)
        dispatch(projectSlice.actions.incrementLike(id))
    } catch (e) {
        dispatch(projectSlice.actions.projectsFetchingError('Error occured'))
        console.log(e)
    }
}

export const incrementPostLike = (id: number) => async (dispatch: AppDispatch) => {
    try {
        await postAPI.incrementLike(id)
        dispatch(postSlice.actions.incrementLike(id))
    } catch (e) {
        dispatch(postSlice.actions.postsError('Error occured'))
        console.log(e)
    }
}

export const addPostNotification = (data: PostNotification) => async (dispatch: AppDispatch) => {
    try {
        const response = await postNotificationAPI.addNotifications(data)
        dispatch(postSlice.actions.addNotification(response.data))
    } catch (e) {
        dispatch(postSlice.actions.postsError('Error occured'))
        console.log(e)
    }
}

export const fetchNotifications = () => async (dispatch: AppDispatch) => {
    try {
        const response = await postNotificationAPI.getNotifications()
        dispatch(postSlice.actions.setNotifications(response.data))
    } catch (e) {
        dispatch(postSlice.actions.postsError('Error occured'))
        console.log(e)
    }
}

export const readNotifications = (data: {is_read: boolean}, id: number) => async (dispatch: AppDispatch) => {
    try {
        await postNotificationAPI.patchNotification(data, id)
        dispatch(postSlice.actions.readNotifications())
    } catch (e) {
        dispatch(postSlice.actions.postsError('Error occured'))
        console.log(e)
    }
}