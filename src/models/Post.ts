export interface PostComment {
    post: number,
    id: number,
    user: string,
    text: string,
    created_date: string,
}

export interface PostNotification {
    post: number,
    id?: number,
    message: string,
    created_date?: string,
    is_read?: boolean,
    image?: string
}

export interface Post {
    id: number,
    title: string,
    content: string,
    likes: [
        {
            id: number,
            post: number,
            like: number
        }
    ],
    comments?: PostComment[],
    short_text: string,
    image: string,
    tags: number[],
    published_date: string,
    short_post: boolean,
    published: boolean
}