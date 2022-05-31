import React, {createContext, useEffect, useState, lazy, Suspense} from 'react';
import './App.scss';
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import PostPage from "./pages/PostPage/PostPage";
import {useAppDispatch} from "./hooks/redux";
import {checkAdmin} from "./store/reducers/actionCreators";
import AboutMe from "./pages/AboutMe/AboutMe";
import Portfolio from "./pages/Portfolio/Portfolio";
import SearchPage from "./pages/SearchPage/SearchPage";
import HomePage from "./pages/Home/HomePage";
import Spinner from "./components/common/Spinner";
import TagsPage from "./pages/TagsPage/TagsPage";

const AdminPage = lazy(() => import('./pages/Admin/AdminPage'));

interface QueryContextValues {
    query: string,
    setQuery: (value: string) => void
}

export const QueryContext = createContext<QueryContextValues>({query: '', setQuery: (value: string) => {}})

function App() {
    const [isSidebarOpen, setSidebarOpen] = useState(false)
    const dispatch = useAppDispatch()
    const [query, setQuery] = useState('')

    useEffect(() => {
        dispatch(checkAdmin())
    }, [dispatch])

    const sidebarClickHandler = (e: any) => {
        e.stopPropagation()
    }

    return (
        <BrowserRouter>
            <QueryContext.Provider value={{query, setQuery}}>
                <div className="app" onClick={() => setSidebarOpen(false)}>
                    <Header setSidebarOpen={setSidebarOpen} setQuery={setQuery} onClick={sidebarClickHandler}/>
                    <Sidebar isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} onClick={sidebarClickHandler}/>
                    <Routes>
                        <Route path={'/search'} element={<SearchPage setSidebarOpen={setSidebarOpen} query={query}/>} />
                        <Route path={'/'} element={<HomePage setSidebarOpen={setSidebarOpen}/>} />
                        <Route path={'/post/:id'} element={<PostPage />} />
                        <Route path={'/about-me'} element={<AboutMe />} />
                        <Route path={'/portfolio'} element={<Portfolio />} />
                        <Route path={'/tags'} element={<TagsPage />} />
                        <Route path={'/admin'} element={
                            <Suspense fallback={<Spinner />}>
                                <AdminPage />
                            </Suspense>
                        } />
                    </Routes>
                </div>
            </QueryContext.Provider>
        </BrowserRouter>
    )
}

export default App
