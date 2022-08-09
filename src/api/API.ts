import axios from 'axios'
import { PostNotification } from '../models/Post'

export const APIUrl = 'https://api.kibashev.site'

const adminInstance = axios.create({
    baseURL: APIUrl + '/api/',
    headers: {
        Authorization: `token ${localStorage.getItem('token')}`
    }
})

const instance = axios.create({
    baseURL: APIUrl + '/api/'
})

export const postAPI = {
    fetchPosts: (page: number) => {
        return instance.get(`post/?page=${page}`)
    },
    queryPosts: (page: number, query: string) => {
        return instance.get(`post/?page=${page}&query=${query}`)
    },
    fetchArchivedPosts: () => {
        return adminInstance.get('post-archived/')
    },
    addPost: (data: FormData) => {
        return adminInstance.post('post/', data, {
            headers: {
                'Content-type': 'multipart/form-data'
            }
        })
    },
    deletePost: (id: number | string) => {
        return adminInstance.delete(`post-detail/${id}/`)
    },
    updatePost: (data: FormData, id: number) => {
        return adminInstance.patch(`post-detail/${id}/`, data, {
            headers: {
                'Content-type': 'multipart/form-data'
            }
        })
    },
    getPost: (id: number | string) => {
        return instance.get(`post-detail/${id}/`)
    },
    incrementLike: (id: number) => {
        return instance.post('post-like/', { post: id })
    },
    createComment: (comment: { text: string, user: string, post: number }) => {
        return instance.post('post-comment/', comment)
    },
    deleteComment: (id: number) => {
        return adminInstance.delete(`post-comment-admin/${id}/`)
    }
}

export const tagAPI = {
    fetchTags: () => {
        return instance.get('tag/')
    },
    createTag: (data: { title: string, slug: string }) => {
        return adminInstance.post('tag/', data)
    }
}

export const projectAPI = {
    fetchProjects: (page: number) => {
        return instance.get(`project/?page=${page}`)
    },
    deleteProject: (id: number) => {
        return adminInstance.delete(`project-detail/${id}/`)
    },
    createProject: (data: FormData) => {
        return adminInstance.post('project/', data, {
            headers: {
                'Content-type': 'multipart/form-data'
            }
        })
    },
    updateProject: (data: FormData, id: number) => {
        return adminInstance.patch(`project-detail/${id}/`, data, {
            headers: {
                'Content-type': 'multipart/form-data'
            }
        })
    },
    incrementLike: (id: number) => {
        return instance.post('project-like/', { project: id })
    }
}

export const adminAPI = {
    adminLogin: (data: { username: string, password: string }) => {
        return instance.post('login/', data)
    },
    checkAdmin: () => {
        return adminInstance.get('check-admin/')
    }
}

export const postNotificationAPI = {
    fetchNotifications: () => {
        return adminInstance.get('post-notification-view/')
    },
    createNotifications: (data: PostNotification) => {
        return instance.post('post-notification/', data)
    },
    // eslint-disable-next-line
    patchNotification: (data: { is_read: boolean }, id: number) => {
        return adminInstance.patch(`post-notification-view/?id=${id}`, data)
    },
    deleteNotification: (id: number) => {
        return adminInstance.delete(`post-notification-view/?id=${id}`)
    }
}
