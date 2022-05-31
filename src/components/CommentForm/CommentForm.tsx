import React, {FormEvent, useState} from 'react';
import './CommentForm.scss'
import Input from "../common/Input";
import {useAppDispatch} from "../../hooks/redux";
import {addComment, addPostNotification} from "../../store/reducers/actionCreators";
import Textarea from "../common/Textarea";

interface CommentFormProps {
    postId: number,
    onFulfilled: (value: any) => void,
    postTitle: string,
    postImage: string
}

const CommentForm: React.FC<CommentFormProps> = ({postId, postImage, onFulfilled, postTitle}) => {
    const dispatch = useAppDispatch()
    const [userValue, setUserValue] = useState('')
    const [commentValue, setCommentValue] = useState('')

    const submit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const comment = {
            text: commentValue,
            post: postId,
            user: userValue
        }

        const notification: {post: number, message: string, image?: string} = {
            post: postId,
            message: `<span>${userValue}</span> оставил комментарий на пост <span>${postTitle}</span>`,
        }

        if(postImage) {
            notification.image = postImage
        }

        dispatch(addComment(comment)).then(() => {
            dispatch(addPostNotification(notification))
            setUserValue('')
            setCommentValue('')
            onFulfilled(true)
        })
    }

    return (
        <form className="comment-form" onSubmit={submit}>
            <Input
                type={'text'}
                placeholder={'Имя'}
                isRequired={true}
                name={'user'}
                value={userValue}
                setValue={setUserValue}
            />
            <Textarea
                placeholder={"Комментарий"}
                isRequired={true}
                name={'comment'}
                value={commentValue}
                setValue={setCommentValue}
            />

            <button className="btn">Оставить комментарий</button>
        </form>
    );
};

export default CommentForm;