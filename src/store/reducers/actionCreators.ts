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
    }
}

export const queryPosts = (page: number, query: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(postSlice.actions.postsFetching())
        const response = await postAPI.queryPosts(page, query)
        dispatch(postSlice.actions.postsSuccess(response.data))
    } catch (e) {
        dispatch(postSlice.actions.postsError('Error occured'))
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
    }
}

export const getPost = (id: number) => async (dispatch: AppDispatch) => {
    try {
        dispatch(postSlice.actions.postsFetching())
        const response = await postAPI.getPost(id)
        dispatch(postSlice.actions.setPost(response.data))
    } catch (e) {
        dispatch(postSlice.actions.postsError('Error occured'))
    }
}

export const deletePost = (id: number) => async (dispatch: AppDispatch) => {
    try {
        await postAPI.deletePost(id)
        dispatch(postSlice.actions.deletePost(id))
    } catch (e) {
        dispatch(postSlice.actions.postsError('Error occured'))
    }
}

export const changePost = (post: any, id: number) => async (dispatch: AppDispatch) => {
    try {
        await postAPI.updatePost(post, id)
    } catch (e) {
        dispatch(postSlice.actions.postsError('Error occured'))
    }
}

export const fetchTags = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(tagSlice.actions.tagsFetching())
        const response = await tagAPI.fetchTags()
        dispatch(tagSlice.actions.tagsSuccess(response.data))
    } catch (e) {
        dispatch(tagSlice.actions.tagsError('Error occured'))
    }
}

export const addComment = (comment: {text: string, user: string, post: number}) => async (dispatch: AppDispatch) => {
    try {
        const response = await postAPI.createComment(comment)
        dispatch(postSlice.actions.addComment(response.data))
    } catch (e) {
        dispatch(postSlice.actions.postsError('Error occured'))
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
    }
}

export const checkAdmin = () => async (dispatch: AppDispatch) => {
    try {
        await adminAPI.checkAdmin()
        dispatch(adminSlice.actions.checkAdmin(true))
    } catch (e) {
        dispatch(adminSlice.actions.checkAdmin(false))
    }
}

export const fetchProjects = (page: number) => async (dispatch: AppDispatch) => {
    try {
        dispatch(projectSlice.actions.projectsFetching())
        const response = await projectAPI.fetchProjects(page)

        dispatch(projectSlice.actions.projectsFetchingSuccess(response.data))
    } catch (e) {
        dispatch(projectSlice.actions.projectsFetchingError('Error occured'))
    }
}

export const deleteProject = (id: number) => async (dispatch: AppDispatch) => {
    try {
        await projectAPI.deleteProject(id)

        dispatch(projectSlice.actions.deleteProject(id))
    } catch (e) {
        dispatch(projectSlice.actions.projectsFetchingError('Error occured'))
    }
}

export const addProject = (project: any) => async (dispatch: AppDispatch) => {
    try {
        await projectAPI.createProject(project)
    } catch (e) {
        dispatch(projectSlice.actions.projectsFetchingError('Error occured'))
    }
}

export const changeProject = (project: any, id: number) => async (dispatch: AppDispatch) => {
    try {
        await projectAPI.updateProject(project, id)
    } catch (e) {
        dispatch(projectSlice.actions.projectsFetchingError('Error occured'))
    }
}

export const incrementProjectLike = (id: number) => async (dispatch: AppDispatch) => {
    try {
        await projectAPI.incrementLike(id)
        dispatch(projectSlice.actions.incrementLike(id))
    } catch (e) {
        dispatch(projectSlice.actions.projectsFetchingError('Error occured'))
    }
}

export const incrementPostLike = (id: number) => async (dispatch: AppDispatch) => {
    try {
        await postAPI.incrementLike(id)
        dispatch(postSlice.actions.incrementLike(id))
    } catch (e) {
        dispatch(postSlice.actions.postsError('Error occured'))
    }
}

export const addPostNotification = (data: PostNotification) => async (dispatch: AppDispatch) => {
    try {
        const response = await postNotificationAPI.createNotifications(data)
        dispatch(postSlice.actions.addNotification(response.data))
    } catch (e) {
        dispatch(postSlice.actions.postsError('Error occured'))
    }
}

export const fetchNotifications = () => async (dispatch: AppDispatch) => {
    try {
        const response = await postNotificationAPI.fetchNotifications()
        dispatch(postSlice.actions.setNotifications(response.data))
    } catch (e) {
        dispatch(postSlice.actions.postsError('Error occured'))
    }
}

export const readNotifications = (data: {is_read: boolean}, id: number) => async (dispatch: AppDispatch) => {
    try {
        await postNotificationAPI.patchNotification(data, id)
        dispatch(postSlice.actions.readNotifications())
    } catch (e) {
        dispatch(postSlice.actions.postsError('Error occured'))
    }
}

export const deleteNotification = (id: number) => async (dispatch: AppDispatch) => {
    try {
        await postNotificationAPI.deleteNotification(id)
        dispatch(postSlice.actions.deleteNotification(id))
    } catch (e) {
        dispatch(postSlice.actions.postsError('Error occured'))
    }
}

export const deleteComment = (id: number) => async (dispatch: AppDispatch) => {
    try {
        await postAPI.deleteComment(id)
        dispatch(postSlice.actions.deleteComment(id))
    } catch (e) {
        dispatch(postSlice.actions.postsError('Error occured'))
    }
}