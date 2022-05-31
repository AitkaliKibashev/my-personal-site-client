import axios from "axios"
import {PostNotification} from "../models/Post";

const url = 'https://api.kibashev.site/api'


export const postAPI = {
    fetchPosts: (page: number) => {
        return axios.get(`${url}/post/?page=${page}`)
    },
    queryPosts: (page: number, query: string) => {
        return axios.get(`${url}/post/?page=${page}&query=${query}`)
    },
    fetchArchivedPosts: () => {
        const token = localStorage.getItem('token')
        return axios.get(`${url}/post-archived/`, {
            headers: {
                'Authorization': `token ${token}`,
            }
        })
    },
    addPost: (data: any) => {
        const token = localStorage.getItem('token')
        return axios.post(`${url}/post/`, data, {
            headers: {
                'Content-type': `multipart/form-data`,
                'Authorization': `token ${token}`,
            }
        })
    },
    deletePost: (id: number) => {
        const token = localStorage.getItem('token')
        return axios.delete(`${url}/post-detail/${id}/`, {
            headers: {
                'Authorization': `token ${token}`
            }
        })
    },
    changePost: (post: any, id: number) => {
        const token = localStorage.getItem('token')
        return axios.patch(`${url}/post-detail/${id}/`, post, {
            headers: {
                'Content-type': `multipart/form-data`,
                'Authorization': `token ${token}`
            }
        })
    },
    getPost: (id: number) => {
        return axios.get(`${url}/post-detail/${id}/`)
    },
    incrementLike: (id: number) => {
        return axios.post(`${url}/post-like/`, {post: id})
    },
    addComment: (comment: {text: string, user: string, post: number}) => {
        return axios.post(`${url}/post-comment/`, comment)
    }
}

export const tagAPI = {
    fetchTags: () => {
        return axios.get(`${url}/tag/`)
    },
    addTag: (data: {title: string, slug: string}) => {
        const token = localStorage.getItem('token')
        return axios.post(`${url}/tag/`, data, {
            headers: {
                'Authorization': `token ${token}`
            }
        })
    }
}

export const projectAPI = {
    fetchProjects: (page: number) => {
        return axios.get(`${url}/project/?page=${page}`)
    },
    deleteProject: (id: number) => {
        const token = localStorage.getItem('token')
        return axios.delete(`${url}/project-detail/${id}/`, {
            headers: {
                'Authorization': `token ${token}`
            }
        })
    },
    addProject: (project: any) => {
        const token = localStorage.getItem('token')
        return axios.post(`${url}/project/`, project, {
            headers: {
                'Content-type': `multipart/form-data`,
                'Authorization': `token ${token}`
            }
        })
    },
    changeProject: (project: any, id: number) => {
        const token = localStorage.getItem('token')
        return axios.patch(`${url}/project-detail/${id}/`, project, {
            headers: {
                'Content-type': `multipart/form-data`,
                'Authorization': `token ${token}`
            }
        })
    },
    incrementLike: (id: number) => {
        return axios.post(`${url}/project-like/`, {project: id})
    },
}

export const adminAPI = {
    adminLogin: (data: {username: string, password: string}) => {
        return axios.post(`${url}/login/`, data)
    },
    checkAdmin: () => {
        const token = localStorage.getItem('token')
        return axios.get(`${url}/check-admin/`, {
            headers: {
                'Authorization': `token ${token}`
            }
        })
    }
}

export const postNotificationAPI = {
    getNotifications: () => {
        const token = localStorage.getItem('token')
        return axios.get(`${url}/post-notification-view/`, {
            headers: {
                'Authorization': `token ${token}`
            }
        })
    },
    addNotifications: (data: PostNotification) => {
        return axios.post(`${url}/post-notification/`, data)
    },
    patchNotification: (data: {is_read: boolean}, id: number) => {
        const token = localStorage.getItem('token')
        return axios.patch(`${url}/post-notification-view/?id=${id}`, data, {
            headers: {
                'Authorization': `token ${token}`
            }
        })
    }
}