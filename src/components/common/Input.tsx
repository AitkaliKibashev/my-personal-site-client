import React, {ChangeEvent, FC} from 'react';
import './common.scss'

interface InputProps {
    type: string,
    placeholder: string,
    name?: string,
    isRequired: boolean,
    value: string,
    setValue: (value: string) => void
}

const Input: FC<InputProps> = ({type, placeholder, isRequired, name, setValue, value}) => {

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
       setValue(e.target.value)
    }

    return (
        <input
            className='input'
            type={type}
            placeholder={placeholder}
            value={value}
            required={isRequired}
            name={name}
            onChange={onChange}
        />
    )
}

export default Input