import {combineReducers, configureStore} from "@reduxjs/toolkit";
import postReducer from  './reducers/PostSlice'
import tagReducer from  './reducers/TagSlice'
import adminReducer from  './reducers/AdminSlice'
import projectReducer from  './reducers/ProjectSlice'

const rootReducer = combineReducers({
    postReducer,
    tagReducer,
    adminReducer,
    projectReducer
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']