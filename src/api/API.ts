import axios from "axios"
import {PostNotification} from "../models/Post";

export const APIUrl = 'https://octopus-app-hljps.ondigitalocean.app'


export const postAPI = {
    fetchPosts: (page: number) => {
        return axios.get(`${APIUrl}/api/post/?page=${page}`)
    },
    queryPosts: (page: number, query: string) => {
        return axios.get(`${APIUrl}/api/post/?page=${page}&query=${query}`)
    },
    fetchArchivedPosts: () => {
        const token = localStorage.getItem('token')
        return axios.get(`${APIUrl}/api/post-archived/`, {
            headers: {
                'Authorization': `token ${token}`,
            }
        })
    },
    addPost: (data: any) => {
        const token = localStorage.getItem('token')
        return axios.post(`${APIUrl}/api/post/`, data, {
            headers: {
                'Content-type': `multipart/form-data`,
                'Authorization': `token ${token}`,
            }
        })
    },
    deletePost: (id: number) => {
        const token = localStorage.getItem('token')
        return axios.delete(`${APIUrl}/api/post-detail/${id}/`, {
            headers: {
                'Authorization': `token ${token}`
            }
        })
    },
    changePost: (post: any, id: number) => {
        const token = localStorage.getItem('token')
        return axios.patch(`${APIUrl}/api/post-detail/${id}/`, post, {
            headers: {
                'Content-type': `multipart/form-data`,
                'Authorization': `token ${token}`
            }
        })
    },
    getPost: (id: number) => {
        return axios.get(`${APIUrl}/api/post-detail/${id}/`)
    },
    incrementLike: (id: number) => {
        return axios.post(`${APIUrl}/api/post-like/`, {post: id})
    },
    addComment: (comment: {text: string, user: string, post: number}) => {
        return axios.post(`${APIUrl}/api/post-comment/`, comment)
    },
    deleteComment: (id: number) => {
        const token = localStorage.getItem('token')
        return axios.delete(`${APIUrl}/api/post-comment-admin/${id}/`, {
            headers: {
                'Authorization': `token ${token}`
            }
        })
    }
}

export const tagAPI = {
    fetchTags: () => {
        return axios.get(`${APIUrl}/api/tag/`)
    },
    addTag: (data: {title: string, slug: string}) => {
        const token = localStorage.getItem('token')
        return axios.post(`${APIUrl}/api/tag/`, data, {
            headers: {
                'Authorization': `token ${token}`
            }
        })
    }
}

export const projectAPI = {
    fetchProjects: (page: number) => {
        return axios.get(`${APIUrl}/api/project/?page=${page}`)
    },
    deleteProject: (id: number) => {
        const token = localStorage.getItem('token')
        return axios.delete(`${APIUrl}/api/project-detail/${id}/`, {
            headers: {
                'Authorization': `token ${token}`
            }
        })
    },
    addProject: (project: any) => {
        const token = localStorage.getItem('token')
        return axios.post(`${APIUrl}/api/project/`, project, {
            headers: {
                'Content-type': `multipart/form-data`,
                'Authorization': `token ${token}`
            }
        })
    },
    changeProject: (project: any, id: number) => {
        const token = localStorage.getItem('token')
        return axios.patch(`${APIUrl}/api/project-detail/${id}/`, project, {
            headers: {
                'Content-type': `multipart/form-data`,
                'Authorization': `token ${token}`
            }
        })
    },
    incrementLike: (id: number) => {
        return axios.post(`${APIUrl}/api/project-like/`, {project: id})
    },
}

export const adminAPI = {
    adminLogin: (data: {username: string, password: string}) => {
        return axios.post(`${APIUrl}/api/login/`, data)
    },
    checkAdmin: () => {
        const token = localStorage.getItem('token')
        return axios.get(`${APIUrl}/api/check-admin/`, {
            headers: {
                'Authorization': `token ${token}`
            }
        })
    }
}

export const postNotificationAPI = {
    getNotifications: () => {
        const token = localStorage.getItem('token')
        return axios.get(`${APIUrl}/api/post-notification-view/`, {
            headers: {
                'Authorization': `token ${token}`
            }
        })
    },
    addNotifications: (data: PostNotification) => {
        return axios.post(`${APIUrl}/api/post-notification/`, data)
    },
    patchNotification: (data: {is_read: boolean}, id: number) => {
        const token = localStorage.getItem('token')
        return axios.patch(`${APIUrl}/api/post-notification-view/?id=${id}`, data, {
            headers: {
                'Authorization': `token ${token}`
            }
        })
    },
    deleteNotification: (id: number) => {
        const token = localStorage.getItem('token')
        return axios.delete(`${APIUrl}/api/post-notification-view/?id=${id}`, {
            headers: {
                'Authorization': `token ${token}`
            }
        })
    }
}