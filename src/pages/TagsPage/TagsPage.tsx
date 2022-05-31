import React, {useEffect} from 'react';
import Tag from "../../components/common/Tag";
import {fetchTags} from "../../store/reducers/actionCreators";
import {postSlice} from "../../store/reducers/PostSlice";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import './TagsPage.scss'

const TagsPage = () => {
    const dispatch = useAppDispatch()
    const {tags} = useAppSelector(state => state.tagReducer)

    useEffect(() => {
        dispatch(fetchTags())

        return () => {
            dispatch(postSlice.actions.clearPosts())
        }
    }, [dispatch])

    return (
        <section className="tags-page">
            <div className="container">
                <h1 className="section-title">Тэги</h1>

                <div className="tags-page__tags">
                    {tags.map(tag => <Tag key={tag.id} title={tag.title} />)}
                </div>
            </div>
        </section>
    );
};

export default TagsPage;