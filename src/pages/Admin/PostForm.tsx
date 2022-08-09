import React, {ChangeEvent, FormEvent, useEffect, useState} from 'react';
import Input from "../../components/common/Input";
import Textarea from "../../components/common/Textarea";
import {CKEditor} from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {addPost, changePost, fetchTags} from "../../store/reducers/actionCreators";
import ImageInput from "../../components/ImageInput/ImageInput";
import {Post} from "../../models/Post";
import CheckboxInput from "../../components/common/CheckboxInput";
import {postSlice} from "../../store/reducers/PostSlice";

interface PostFormProps {
    post: Post | null
}

const PostForm: React.FC<PostFormProps> = ({post}) => {
    const [editorState, setEditorState] = useState('');
    const tags = useAppSelector(state => state.tagReducer.tags)
    const [selectedTags, setTags] = useState<number[]>([])
    const [postImage, setPostImage]:any = useState(null)
    const [titleValue, setTitleValue] = useState('')
    const [shortTextValue, setShortTextValue] = useState('')
    const [isPublished, setPublished] = useState(false)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if(post) {
            if(post.content) {
                setEditorState(post.content)
                setTitleValue(post.title)
            }

            setShortTextValue(post.short_text)
            setPublished(post.published)
            if(post.tags) {
                setTags(post.tags)
            }
        }
        dispatch(fetchTags())

        return () => {
            dispatch(postSlice.actions.setPost(null))
        }
    }, [dispatch, post])

    const submit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData()

        const clearForm = () => {
            setTitleValue('')
            setPostImage(null)
            setShortTextValue('')
            setEditorState('')
            setTags([])
        }

        if(postImage) {
            formData.append('image', postImage)
        }
        formData.append('title', titleValue)
        formData.append('short_text', shortTextValue)
        formData.append('content', editorState)
        if(isPublished) {
            formData.append('published', 'true')
        }

        for (let i = 0; i < selectedTags.length; i++) {
            formData.append('tags', selectedTags[i].toString())
        }

        if(post) {
            return dispatch(changePost(formData, post.id)).then(() => {
                clearForm()
            })
        }

        dispatch(addPost(formData, true)).then(() => {
            clearForm()
        })
    }

    const selectTag = (e: ChangeEvent<HTMLInputElement>) => {
        if(e.target.checked) {
            setTags([...selectedTags, +e.target.value])
        } else {
            setTags(selectedTags.filter(tag => tag !== +e.target.value))
        }
    }

    return (
        <form className="add-form" onSubmit={submit}>
            <h2>{post ? 'Изменить' : 'Добавить'} пост</h2>
            {postImage && <p>{postImage.name}</p>}

            <div className="form-header">
                <Input
                    type={'text'}
                    placeholder={'Заголовок поста'}
                    isRequired={false}
                    name={'postTitle'}
                    value={titleValue}
                    setValue={setTitleValue}
                />
                <ImageInput setImage={setPostImage} />
            </div>
            <Textarea
                placeholder={'Краткий содержание поста'}
                isRequired={true}
                name={'shortText'}
                value={shortTextValue}
                setValue={setShortTextValue}
            />
            <div className="editor-wrapper">
                <CKEditor
                    editor={ClassicEditor}
                    data={editorState}
                    onChange={(event, editor) => setEditorState(editor.getData())}
                />
            </div>

            <h3>Тэги</h3>
            <div className="tags-wrapper">
                {tags.map(tag =>
                    <label key={tag.id} className="tag">
                        <input type="checkbox" checked={selectedTags.includes(tag.id)} value={tag.id} onChange={selectTag}/>
                        {tag.title}
                    </label>
                )}
            </div>

            <CheckboxInput value={isPublished} setValue={setPublished} />

            <button className="btn">{post ? 'Изменить' : 'Добавить'} пост</button>
        </form>
    );
};

export default PostForm;