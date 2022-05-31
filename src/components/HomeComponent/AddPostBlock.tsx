import React, {FC} from 'react';
import PostTextarea from "../common/PostTextarea";
import {addPost} from "../../store/reducers/actionCreators";
import {useAppDispatch} from "../../hooks/redux";
import ImageInput from "../ImageInput/ImageInput";

interface AddPostBlockProps {
    postImage: any,
    setPostImage: (value: any) => void
}

const AddPostBlock: FC<AddPostBlockProps> = ({postImage, setPostImage}) => {
    const dispatch = useAppDispatch()

    const addPostHandle = (textareaValue:string) => {
        const formData = new FormData()

        if(postImage) {
            formData.append('image', postImage)
        }
        formData.append('short_text', textareaValue)
        formData.append('short_post', 'True')
        formData.append('published', 'True')


        dispatch(addPost(formData)).then(() => {
            setPostImage(null)
        })
    }


    return (
        <div className="home__add-post">
            <PostTextarea onClick={addPostHandle}/>
            <ImageInput setImage={setPostImage} />
        </div>
    );
};

export default AddPostBlock;