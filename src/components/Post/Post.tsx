import React, {FC, useState} from 'react';
import './Post.scss'
import {Post} from "../../models/Post";
import {Tag} from "../../models/Tag";
import OptionsBtn from "../common/OptionsBtn";
import TagComponent from '../common/Tag';
import {NavLink, useNavigate} from "react-router-dom";
import PostOptions from "../common/PostOptions";
import Modal from "../Modal/Modal";
import ConfirmModal from "../Modal/ConfirmModal";
import {deletePost, incrementPostLike} from "../../store/reducers/actionCreators";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import Likes from "../common/Likes";
import {postSlice} from "../../store/reducers/PostSlice";
import {APIUrl} from "../../api/API";

interface PostProps {
    post: Post,
    tags?: Tag[],
}

const PostItem: FC<PostProps> = ({post, tags}) => {
    const postDate = new Date(post.published_date)
    const filteredTags = tags?.filter(tag => post.tags.includes(tag.id))
    const [isOpenOptions, setOpenOptions] = useState(false)
    const [isModalOpen, setModalOpen] = useState(false)
    const {isAdmin} = useAppSelector(state => state.adminReducer)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const deleteBtnHandler = () => {
        setOpenOptions(false)
        setModalOpen(true)
    }

    const deletePostHandler = () => {
        dispatch(deletePost(post.id))
    }

    const changeBtnHandler = () => {
        dispatch(postSlice.actions.setPost(post))
        navigate('/admin')
    }


    return (
        <div className="post">

            {post.image &&
            <div className="post__image">
                <img src={APIUrl + post.image} alt={post?.title}/>
            </div>}

            <div className="post__row-content">
                <div className="post__header">
                    <h2 className="post__title">{post.title ? post.title : 'Быстрый пост'}</h2>
                    <div className="post__header__end">
                        <p className="post__date">{postDate.toLocaleDateString()}</p>
                        <Likes
                            postId={post.id}
                            postImage={post.image}
                            postTitle={post.title}
                            like={post.likes?.length}
                            incrementLike={incrementPostLike}
                        />
                        {isAdmin &&
                        <OptionsBtn onClick={() => {
                            setOpenOptions(!isOpenOptions)
                        }}/>
                        }

                        <PostOptions
                            changeBtnHandler={changeBtnHandler}
                            isOpenOptions={isOpenOptions}
                            deleteBtnHandler={deleteBtnHandler}
                        />
                    </div>
                </div>

                <p className="post__text">
                    {post.short_text}
                </p>

                <div className="post__footer">
                    <div className="post__tags">
                        {filteredTags?.map(tag => <TagComponent key={tag.id} title={tag.title}/>)}
                    </div>
                    {!post.short_post &&
                    <NavLink to={'/post/' + post.id}>
                        <button className="btn">Читать</button>
                    </NavLink>}
                </div>
            </div>

            <Modal title={'Подтвердить действие'} setModalOpen={setModalOpen} isModalOpen={isModalOpen}>
                <ConfirmModal
                    title={"Вы действительно хотите удалить этот пост?"}
                    yesButtonHandler={deletePostHandler}
                    noButtonHandler={() => setModalOpen(false)}
                    setModalOpen={setModalOpen}
                />
            </Modal>
        </div>
    );
};

export default PostItem;