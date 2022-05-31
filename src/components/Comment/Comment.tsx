import React from 'react';
import './Comment.scss'
import {PostComment} from "../../models/Post";

interface CommentProps {
    comment: PostComment
}

const Comment:React.FC<CommentProps> = ({comment}) => {
    const commentDate = new Date(comment.created_date)
    const avaColors = ['#D4FFD3', '#FEFFD3', '#FFD3D3', '#D3FFFC', '#D3DDFF', '#FCD3FF']
    const randomNumber = Math.floor(Math.random() * avaColors.length)

    return (
        <div className="comment">
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