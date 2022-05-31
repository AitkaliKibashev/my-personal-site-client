import React, {useEffect, useRef, useState} from 'react';
import './Portfolio.scss'
import Project from "../../components/Project/Project";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {fetchProjects} from "../../store/reducers/actionCreators";
import {projectSlice} from "../../store/reducers/ProjectSlice";
import Spinner from "../../components/common/Spinner";

const Portfolio = () => {
    const dispatch = useAppDispatch()
    const {pages, isLoading, projects} = useAppSelector(state => state.projectReducer)
    const [page, setPage] = useState(1)
    const projectsEndRef = useRef<any>(null)
    const observer = useRef<null | IntersectionObserver>(null)

    useEffect(() => {
        dispatch(fetchProjects(page))

        return () => {
            dispatch(projectSlice.actions.clearProjects())
        }
    }, [page, dispatch])

    useEffect(() => {
        if(isLoading) return
        if(observer.current) observer.current.disconnect()
        const callback = (entries:any) => {
            if(entries[0].isIntersecting && page < pages) {
                setPage(page + 1)
            }
        }

        observer.current = new IntersectionObserver(callback)
        observer.current.observe(projectsEndRef.current)
    }, [isLoading, page, pages])

    return (
        <section className="portfolio">
            {isLoading && <Spinner />}
            <div className="container">
                <div className="portfolio__inner">
                    <h1 className="section-title">Портфолио</h1>
                    <div className="projects">
                        {projects.map(project => <Project key={project.id} project={project}/>)}
                    </div>

                    {!isLoading && <div className="projects-end" ref={projectsEndRef}/>}
                    {isLoading && <Spinner />}
                </div>
            </div>
        </section>
    );
};

export default Portfolio;