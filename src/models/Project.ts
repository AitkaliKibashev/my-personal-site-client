export interface Project {
    id: number,
    title: string,
    content: string,
    likes: [
        {
            id: number,
            project: number,
            like: number
        }
    ],
    image: string,
    published_date: string,
    link: string
}