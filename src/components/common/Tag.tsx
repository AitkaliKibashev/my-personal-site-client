import React, {FC, useContext} from 'react';
import './common.scss'
import {useNavigate} from "react-router-dom";
import {QueryContext} from "../../App";

interface TagProps {
    title: string
}

const Tag: FC<TagProps> = ({title}) => {
    const navigate = useNavigate()
    const queryState = useContext(QueryContext)

    const onClick = () => {
        console.log('tag:'.concat(title))
        queryState.setQuery('tag:'.concat(title))
        navigate('/search')
    }

    return (
        <p className="tag" onClick={onClick}>#{title}</p>
    );
};

export default Tag;