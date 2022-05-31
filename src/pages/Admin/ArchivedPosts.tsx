import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {deletePost, fetchArchivedPosts} from "../../store/reducers/actionCreators";
import {postSlice} from "../../store/reducers/PostSlice";
import {Post} from "../../models/Post";
import OptionsBtn from "../../components/common/OptionsBtn";
import PostOptions from "../../components/common/PostOptions";
import Modal from "../../components/Modal/Modal";
import ConfirmModal from "../../components/Modal/ConfirmModal";

interface ArchivedPostsProps {
    setCurrentTab: (value: number) => void
}

interface ArchivedPostProps extends ArchivedPostsProps {
    post: Post,
}

const ArchivedPost: React.FC<ArchivedPostProps> = ({post, setCurrentTab}) => {
    const [isOpenOptions, setOpenOptions] = useState(false)
    const [isModalOpen, setModalOpen] = useState(false)
    const dispatch = useAppDispatch()

    const deleteBtnHandler = () => {
        setOpenOptions(false)
        setModalOpen(true)
    }

    const deletePostHandler = () => {
        dispatch(deletePost(post.id))
    }

    const changeBtnHandler = () => {
        dispatch(postSlice.actions.setPost(post))
        setCurrentTab(1)
    }

    return (
        <div className="archived-post" key={post.id}>
            {post.image &&
                <div className="archived-post__image">
                    <img src={"https://api.kibashev.site" + post.image} alt={post.title}/>
                </div>
            }

            <div className="archived-post__content">
                <div className="archived-post__header">
                    <h2>{post.title ? post.title : 'Быстрый пост'}</h2>

                    <OptionsBtn onClick={() => setOpenOptions(!isOpenOptions)} />
                    <PostOptions
                        isOpenOptions={isOpenOptions}
                        deleteBtnHandler={deleteBtnHandler}
                        changeBtnHandler={changeBtnHandler}
                    />
                </div>
                <p>{post.short_text}</p>
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
    )
}

const ArchivedPosts: React.FC<ArchivedPostsProps> = ({setCurrentTab}) => {
    const dispatch = useAppDispatch()
    const {posts} = useAppSelector(state => state.postReducer)

    useEffect(() => {
        dispatch(fetchArchivedPosts())

        return () => {
            dispatch(postSlice.actions.clearPosts())
        }
    }, [dispatch])

    return (
        <div className="archived-posts">
            {posts.map(post => <ArchivedPost post={post} setCurrentTab={setCurrentTab}/>)}
        </div>
    );
};

export default ArchivedPosts;