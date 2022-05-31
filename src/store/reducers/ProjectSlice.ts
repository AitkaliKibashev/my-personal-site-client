import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Project} from "../../models/Project";

interface ProjectState {
    projects: Project[],
    editingProject: Project | null,
    isLoading: boolean,
    error: null | string,
    pages: number
}

const initialState: ProjectState = {
    projects: [],
    editingProject: null,
    isLoading: false,
    error: null,
    pages: 1
}

export const projectSlice = createSlice({
    name: 'project',
    initialState,
    reducers: {
        projectsFetching(state) {
            state.isLoading = true
        },
        projectsFetchingSuccess(state, action: PayloadAction<any>) {
            state.isLoading = false
            state.error = null
            state.projects.push(...action.payload.projects)
            state.pages = action.payload.pages
        },
        projectsFetchingError(state, action: PayloadAction<string>) {
            state.error = action.payload
            state.isLoading = false
        },
        deleteProject(state, action: PayloadAction<number>) {
            state.projects = state.projects.filter(project => project.id !== action.payload)
        },
        addProject(state, action: PayloadAction<Project>) {
            state.projects.unshift(action.payload)
        },
        incrementLike(state, action: PayloadAction<number>) {
            state.projects.forEach(project => {
                if (project.id === action.payload ) {
                    project.likes.push({ project: 1, id: 4, like: 1})
                }
            })
        },
        clearProjects(state) {
            state.projects = []
        },
        setEditingProject(state, action: PayloadAction<Project | null>) {
            state.editingProject = action.payload
        }
    }
})

export default projectSlice.reducer