import React, {useState} from 'react';

interface InputProps {
    onChange: () => void,
}

const Input:React.FC<InputProps> = ({onChange}) => {
    const [value, setValue] = useState('')
    return (
        <>
            <textarea className="textarea" placeholder="Напишите пост..."/>
        </>
    );
};

export default Input;