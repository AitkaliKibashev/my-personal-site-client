import React, {FC, useEffect, useRef, useState} from 'react';
import './Home.scss'
import Post from "../Post/Post";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {fetchPosts, fetchTags, queryPosts} from "../../store/reducers/actionCreators";
import Spinner from "../common/Spinner";
import {postSlice} from "../../store/reducers/PostSlice";
import AddPostBlock from "./AddPostBlock";
import {useNavigate} from "react-router-dom";

export interface HomeProps {
    setSidebarOpen: (value: boolean) => void,
    query?: string,
}

const Home:FC<HomeProps> = ({setSidebarOpen, query}) => {
    const dispatch = useAppDispatch()
    const {posts, isLoading, pages} = useAppSelector(state => state.postReducer)
    const {isAdmin} = useAppSelector(state => state.adminReducer)
    const {tags} = useAppSelector(state => state.tagReducer)
    const [page, setPage] = useState(1)
    const [postImage, setPostImage]:any = useState(null)
    const postsEndRef = useRef<any>(null)
    const observer = useRef<null | IntersectionObserver>(null)
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(fetchTags())

        return () => {
            dispatch(postSlice.actions.clearPosts())
        }
    }, [dispatch])

    useEffect(() => {
        if(query) {
            dispatch(postSlice.actions.clearPosts())
            dispatch(queryPosts(page, query))
        } else {
            dispatch(fetchPosts(page))
        }
    }, [page, dispatch, query])

    useEffect(() => {
        if(isLoading) return
        if(observer.current) observer.current.disconnect()
        const callback = (entries:any) => {
            if(entries[0].isIntersecting && page < pages) {
                setPage(page + 1)
            }
        }

        observer.current = new IntersectionObserver(callback)
        observer.current.observe(postsEndRef.current)
    }, [isLoading, page, pages])

    return (
        <section className="home" onClick={() => setSidebarOpen(false)}>
            <div className="container">
                <div className="home__inner">
                    <h1 className="section-title">{query ? 'Результаты поиска' : 'Все посты'}</h1>
                    {postImage && <p className="helper-text">Название изображения: {postImage?.name}</p>}
                    {isAdmin && <AddPostBlock postImage={postImage} setPostImage={setPostImage}/>}

                    <div className="posts">
                        {!posts.length && !isLoading ?
                            <div className="no-posts">
                                <h2 >Постов не найдено :(</h2>
                                <button className="btn" onClick={() => navigate(-1)}>Вернуться назад</button>
                            </div>
                            :
                            posts.map(post => <Post
                            key={post.id}
                            post={post}
                            tags={tags}
                            />)
                        }

                    </div>
                    {!isLoading && <div className="posts-end" ref={postsEndRef} />}
                    {isLoading && <Spinner />}
                </div>
            </div>
        </section>
    );
};

export default Home;