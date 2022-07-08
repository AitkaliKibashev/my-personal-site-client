import React, {useEffect, useState} from 'react';
import OptionsBtn from "../../components/common/OptionsBtn";
import './PostDetail.scss'
import {useLocation, useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {
    deletePost,
    fetchTags,
    getPost,
    incrementPostLike,
} from "../../store/reducers/actionCreators";
import TagComponent from "../../components/common/Tag";
import PostOptions from "../../components/common/PostOptions";
import Modal from "../../components/Modal/Modal";
import ConfirmModal from "../../components/Modal/ConfirmModal";
import Likes from "../../components/common/Likes";
import Spinner from "../../components/common/Spinner";
import Comment from "../../components/Comment/Comment";
import CommentForm from "../../components/CommentForm/CommentForm";
import {postSlice} from "../../store/reducers/PostSlice";
import {APIUrl} from "../../api/API";

const PostPage = () => {
    const location = useLocation()
    const postId = location.pathname.split('/')[2]
    const dispatch = useAppDispatch()
    const {post, isLoading} = useAppSelector(state => state.postReducer)
    const tags = useAppSelector(state => state.tagReducer.tags)
    let postDate:any = null
    const filteredTags = tags?.filter(tag => post?.tags.includes(tag.id))
    const [isOpenOptions, setOpenOptions] = useState(false)
    const [isModalOpen, setModalOpen] = useState(false)
    const {isAdmin} = useAppSelector(state => state.adminReducer)
    const [isCommentTabActive, setCommentTabActive] = useState(true)
    const navigate = useNavigate()

    if(post) {
        postDate = new Date(post.published_date)
    }

    useEffect(() => {
        dispatch(getPost(+postId))
        dispatch(fetchTags())

        return () => {
            dispatch(postSlice.actions.setPost(null))
        }
    }, [dispatch, postId])


    const deleteBtnHandler = () => {
        setOpenOptions(false)
        setModalOpen(true)
    }

    const changeBtnHandler = () => {
        dispatch(postSlice.actions.setPost(post))
        navigate('/admin')
    }

    if(isLoading) {
        return <section>
            <Spinner />
        </section>
    }

    return (
        <section className="post-detail">
            {post &&
                <div className="container">
                    <div className="post-detail__header">
                        <h1 className="section-title">{post.title || 'Быстрый пост'}</h1>
                        <div className="post-detail__header__end">
                            <p className="post-detail__date">{postDate?.toLocaleDateString()}</p>
                            <Likes
                                postId={post.id}
                                postImage={post.image}
                                postTitle={post.title}
                                like={post.likes.length}
                                incrementLike={incrementPostLike}
                            />
                            {isAdmin &&
                            <OptionsBtn onClick={() => setOpenOptions(!isOpenOptions)}/>
                            }
                            <PostOptions
                                changeBtnHandler={changeBtnHandler}
                                isOpenOptions={isOpenOptions}
                                deleteBtnHandler={deleteBtnHandler}
                            />
                        </div>
                    </div>
                    <div className="post-detail__tags">
                        {filteredTags?.map(tag => <TagComponent key={tag.id} title={tag.title} />)}
                    </div>
                    {post.image &&
                    <div className="post-detail__image">
                        <img src={APIUrl + post.image} alt={post.title}/>
                    </div>
                    }
                    {
                        post.content ?
                            <div className="post-detail__content" dangerouslySetInnerHTML={{__html: post.content}} />
                            :
                            <div className="post-detail__content">
                                {post.short_text}
                            </div>
                    }

                    <div className="post-detail__tabs">
                        <h2
                            className={"post-detail__tabs-title" + (isCommentTabActive ? ' active' : '')}
                            onClick={() => setCommentTabActive(true)}
                        >
                            Комментарии
                        </h2>
                        <h2
                            className={"post-detail__tabs-title" + (!isCommentTabActive ? ' active' : '')}
                            onClick={() => setCommentTabActive(false)}
                        >
                            Написать
                        </h2>
                    </div>

                    {
                        isCommentTabActive ?
                            (post.comments?.length ?
                                post.comments.map(comment => <Comment key={comment.id} comment={comment} />):
                                <p>Комментариев пока нет</p>)
                            :
                            <CommentForm
                                postId={post.id}
                                onFulfilled={setCommentTabActive}
                                postTitle={post.title}
                                postImage={post.image}
                            />
                    }

                </div>
            }

            <Modal title={'Подтвердить действие'} setModalOpen={setModalOpen} isModalOpen={isModalOpen}>
                <ConfirmModal
                    title={"Вы действительно хотите удалить этот пост?"}
                    yesButtonHandler={() => dispatch(deletePost(+postId))}
                    noButtonHandler={() => {setModalOpen(false)}}
                    setModalOpen={setModalOpen}
                />
            </Modal>
        </section>
    );
};

export default PostPage;