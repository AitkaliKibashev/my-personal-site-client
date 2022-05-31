import React, {ChangeEvent} from 'react';
import './ImageInput.scss'

interface ImageInputProps {
    setImage: (value: any) => void
}

const ImageInput:React.FC<ImageInputProps> = ({setImage}) => {

    const imageInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if(e.currentTarget.files) {
            return setImage(e.currentTarget.files[0])
        }
    }
    return (
        <div>
            <input
                className='image-input'
                type="file"
                accept='image/png, image/jpeg'
                id="image-input"
                alt="Image input"
                onChange={imageInputHandler}
            />
            <label htmlFor="image-input" className="home__add-post__file-btn">
                <svg width="29" height="31" viewBox="0 0 29 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M20.0399 3.1837C18.9782 3.1837 17.9601 3.60544 17.2094 4.35614L4.95604 16.6095C3.70496 17.8605 3.00212 19.5574 3.00212 21.3267C3.00212 23.096 3.70496 24.7928 4.95604 26.0439C6.20712 27.2949 7.90394 27.9978 9.67323 27.9978C11.4425 27.9978 13.1393 27.2949 14.3904 26.0439L26.6438 13.7905C27.1645 13.2698 28.0087 13.2698 28.5294 13.7905C29.0501 14.3112 29.0501 15.1554 28.5294 15.6761L16.276 27.9295C14.5249 29.6806 12.1498 30.6644 9.67323 30.6644C7.1967 30.6644 4.8216 29.6806 3.07042 27.9295C1.31925 26.1783 0.335449 23.8032 0.335449 21.3267C0.335449 18.8501 1.31925 16.475 3.07042 14.7239L15.3238 2.47052C16.5746 1.21972 18.271 0.517029 20.0399 0.517029C21.8088 0.517029 23.5052 1.21972 24.756 2.47052C26.0068 3.72132 26.7095 5.41776 26.7095 7.18666C26.7095 8.95556 26.0068 10.652 24.756 11.9028L12.4894 24.1561C11.739 24.9066 10.7212 25.3281 9.6599 25.3281C8.59864 25.3281 7.58085 24.9066 6.83042 24.1561C6.08 23.4057 5.65842 22.3879 5.65842 21.3267C5.65842 20.2654 6.08 19.2476 6.83042 18.4972L18.151 7.18996C18.672 6.66957 19.5162 6.67007 20.0366 7.19107C20.557 7.71208 20.5565 8.5563 20.0355 9.07669L8.71604 20.3828C8.46606 20.6331 8.32508 20.9729 8.32508 21.3267C8.32508 21.6807 8.46571 22.0202 8.71604 22.2705C8.96637 22.5208 9.30588 22.6615 9.6599 22.6615C10.0139 22.6615 10.3534 22.5208 10.6038 22.2705L22.8704 10.0172C23.6208 9.26653 24.0429 8.24807 24.0429 7.18666C24.0429 6.12501 23.6211 5.10684 22.8704 4.35614C22.1197 3.60544 21.1016 3.1837 20.0399 3.1837Z" fill="black"/>
                </svg>
            </label>
        </div>
    );
};

export default ImageInput;