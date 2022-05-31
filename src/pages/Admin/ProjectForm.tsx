import React, {FormEvent, useEffect, useState} from 'react';
import Input from "../../components/common/Input";
import {CKEditor} from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import {useAppDispatch} from "../../hooks/redux";
import {addProject, changeProject} from "../../store/reducers/actionCreators";
import ImageInput from "../../components/ImageInput/ImageInput";
import {Project} from "../../models/Project";
import {projectSlice} from "../../store/reducers/ProjectSlice";

interface ProjectFormProps {
    project?: Project | null
}

const ProjectForm: React.FC<ProjectFormProps> = ({project}) => {
    const [editorState, setEditorState] = useState('');
    const [projectImage, setProjectImage]:any = useState(null)
    const [titleValue, setTitleValue] = useState('')
    const [linkValue, setLinkValue] = useState('')
    const dispatch = useAppDispatch()

    useEffect(() => {
        if(project) {
            setTimeout(() => {
                setEditorState(project.content)
                setTitleValue(project.title)
                if(project.link) {
                    setLinkValue(project.link)
                }
            }, 10)
        }

        return () => {
            dispatch(projectSlice.actions.setEditingProject(null))
        }
    }, [project, dispatch])

    const submit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData()

        const clearForm = () => {
            setLinkValue('')
            setTitleValue('')
            setProjectImage(null)
            setEditorState('')
        }

        if(projectImage) {
            formData.append('image', projectImage)
        }
        formData.append('title', titleValue)
        formData.append('link', linkValue)
        formData.append('content', editorState)

        if(project) {
            return dispatch(changeProject(formData, project.id)).then(() => {
                clearForm()
            })
        }

        dispatch(addProject(formData)).then(() => {
            clearForm()
        })
    }

    return (
        <form className="add-form" onSubmit={submit}>
            <h2>{project ? 'Изменить' : 'Добавить'} проект</h2>
            {projectImage && <p>{projectImage.name}</p>}
            <div className="form-header">
                <Input
                    type={'text'}
                    placeholder={'Заголовок проекта'}
                    isRequired={true}
                    name={'projectTitle'}
                    value={titleValue}
                    setValue={setTitleValue}
                />
                <ImageInput setImage={setProjectImage} />
            </div>
            <div className="editor-wrapper">
                <CKEditor
                    editor={ClassicEditor}
                    data={editorState}
                    onChange={(event, editor) => setEditorState(editor.getData())}
                />
            </div>
            <Input
                type={'text'}
                placeholder={'Ссылка на проект'}
                isRequired={false}
                value={linkValue}
                setValue={setLinkValue}
            />

            <button className="btn">{project ? 'Изменить' : 'Добавить'} проект</button>
        </form>
    );
};

export default ProjectForm;