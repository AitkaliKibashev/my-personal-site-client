import React, {FC, useState} from 'react';
import LikeBtn from "./LikeBtn";
import {useAppDispatch} from "../../hooks/redux";
import {AppDispatch} from "../../store";
import {addPostNotification} from "../../store/reducers/actionCreators";

interface LikesProps {
    like: number,
    postId?: number,
    projectId?: number,
    incrementLike: (itemId: number) => (dispatch: AppDispatch) => Promise<void>,
    postImage?: string,
    postTitle?: string
}

const Likes: FC<LikesProps> = ({
                                   like,
                                   postId,
                                   projectId,
                                   incrementLike,
                                   postImage,
                                   postTitle
                               }) => {
    const [isLikesOpen, setLikesOpen] = useState(false)
    const [isClicked, setClicked] = useState(false)
    const itemId = postId || projectId
    const dispatch = useAppDispatch()

    const clickHandler = () => {
        if (!isClicked && itemId) {
            dispatch(incrementLike(itemId))
            setClicked(true)

            if (postId) {
                const notification: { post: number, message: string, image?: string } = {
                    post: postId,
                    message: `Кто-то лайкнул пост <span>${postTitle || 'Быстрый пост'}</span>`,
                }

                if (postImage) {
                    notification.image = postImage
                }

                dispatch(addPostNotification(notification))
            }
        }
    }

    return (
        <div className='likes-wrapper'>
            <div className={"likes" + (isLikesOpen ? ' active' : '')}>{like}</div>
            <LikeBtn setLikesOpen={setLikesOpen} onClick={clickHandler}/>
        </div>
    );
};

export default Likes;