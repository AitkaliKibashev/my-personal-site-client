import React, {FC, useState} from 'react';
import OptionsBtn from "../common/OptionsBtn";
import PostOptions from "../common/PostOptions";
import Modal from "../Modal/Modal";
import ConfirmModal from "../Modal/ConfirmModal";
import './Project.scss'
import {Project} from "../../models/Project";
import Likes from "../common/Likes";
import {deleteProject, incrementProjectLike} from "../../store/reducers/actionCreators";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {projectSlice} from "../../store/reducers/ProjectSlice";
import {useNavigate} from "react-router-dom";

interface ProjectProps {
    project: Project
}

const ProjectComponent: FC<ProjectProps> = ({project}) => {
    const [isOpenOptions, setOpenOptions] = useState(false)
    const [isModalOpen, setModalOpen] = useState(false)
    const projectDate = new Date(project.published_date)
    const {isAdmin} = useAppSelector(state => state.adminReducer)
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const deleteBtnHandler = () => {
        setOpenOptions(false)
        setModalOpen(true)
    }

    const changeBtnHandler = () => {
        dispatch(projectSlice.actions.setEditingProject(project))
        navigate('/admin')
    }

    const deleteProjectHandler = () => {
        dispatch(deleteProject(project.id))
    }

    return (
        <div className='project'>
            {project.image &&
                <div className="project__image">
                    <img src={'https://api.kibashev.site' + project.image} alt={project.title}/>
                </div>
            }
            <div className="project__row-content">
                <div className="project__header">
                    <h2 className="project__title">{project.title}</h2>
                    <div className="project__header__end">
                        <p className="project__date">{projectDate.toLocaleDateString()}</p>
                        <Likes like={project.likes?.length} projectId={project.id} incrementLike={incrementProjectLike}/>
                        {isAdmin &&
                        <OptionsBtn
                            onClick={() => {setOpenOptions(!isOpenOptions)}}
                        />}

                        <PostOptions
                            isOpenOptions={isOpenOptions}
                            deleteBtnHandler={deleteBtnHandler}
                            changeBtnHandler={changeBtnHandler}
                        />
                    </div>
                </div>

                <p className="project__text" dangerouslySetInnerHTML={{__html: project.content}} />

                {project.link &&
                <div className="project__footer">
                    <a href={project.link} target='_blank' rel='noreferrer'>
                        Ссылка на проект
                    </a>
                </div>
                }
            </div>
            <Modal title={'Подтвердить действие'} setModalOpen={setModalOpen} isModalOpen={isModalOpen}>
                <ConfirmModal
                    title={"Вы действительно хотите удалить этот проект?"}
                    yesButtonHandler={deleteProjectHandler}
                    noButtonHandler={() => setModalOpen(false)}
                    setModalOpen={setModalOpen}
                />
            </Modal>
        </div>
    );
};

export default ProjectComponent;