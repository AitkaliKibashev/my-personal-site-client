import React from 'react';
import './Comment.scss'
import {PostComment} from "../../models/Post";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {deleteComment} from "../../store/reducers/actionCreators";

interface CommentProps {
    comment: PostComment
}

const Comment:React.FC<CommentProps> = ({comment}) => {
    const dispatch = useAppDispatch()
    const {isAdmin} = useAppSelector(state => state.adminReducer)
    const commentDate = new Date(comment.created_date)
    const avaColors = ['#D4FFD3', '#FEFFD3', '#FFD3D3', '#D3FFFC', '#D3DDFF', '#FCD3FF']
    const randomNumber = Math.floor(Math.random() * avaColors.length)

    const deleteBtnHandler = (event: any) => {
        dispatch(deleteComment(comment.id))
    }

    return (
        <div className="comment">
            {isAdmin &&
            <span className="comment__delete" onClick={deleteBtnHandler}>
                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 6L6 18" stroke="#333333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M6 6L18 18" stroke="#333333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </span>
            }

            <div className="comment__header">
                <div className="comment__ava" style={{background: avaColors[randomNumber]}}>
                    {comment.user[0]}
                </div>
                <div className="comment__header__row">
                    <h3 className="comment__author">
                        {comment.user}
                    </h3>
                    <p className="comment__date">
                        {commentDate.toLocaleDateString()}
                    </p>
                </div>
            </div>
            <div className="comment__content">
                {comment.text}
            </div>
        </div>
    );
};

export default Comment;