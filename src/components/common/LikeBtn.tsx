import React, {FC} from 'react';
import './common.scss'

interface LikeBtnProps {
    setLikesOpen: (value: boolean) => void,
    onClick: () => void,
}

const LikeBtn: FC<LikeBtnProps> = ({setLikesOpen, onClick}) => {

    const onMouseEnterHandler = () => {
        setLikesOpen(true)
    }

    const onMouseLeaveHandler = () => {
        setLikesOpen(false)
    }

    return (
        <button className="like-btn" onMouseEnter={onMouseEnterHandler} onMouseLeave={onMouseLeaveHandler} onClick={onClick}>
            <svg width="24" height="22" viewBox="0 0 24 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.8401 3.60999C20.3294 3.099 19.7229 2.69364 19.0555 2.41708C18.388 2.14052 17.6726 1.99817 16.9501 1.99817C16.2276 1.99817 15.5122 2.14052 14.8448 2.41708C14.1773 2.69364 13.5709 3.099 13.0601 3.60999L12.0001 4.66999L10.9401 3.60999C9.90843 2.5783 8.50915 1.9987 7.05012 1.9987C5.59109 1.9987 4.19181 2.5783 3.16012 3.60999C2.12843 4.64169 1.54883 6.04096 1.54883 7.49999C1.54883 8.95903 2.12843 10.3583 3.16012 11.39L4.22012 12.45L12.0001 20.23L19.7801 12.45L20.8401 11.39C21.3511 10.8792 21.7565 10.2728 22.033 9.60535C22.3096 8.93789 22.4519 8.22248 22.4519 7.49999C22.4519 6.77751 22.3096 6.0621 22.033 5.39464C21.7565 4.72718 21.3511 4.12075 20.8401 3.60999V3.60999Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        </button>
    );
};

export default LikeBtn;