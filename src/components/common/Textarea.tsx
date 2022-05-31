import React, {ChangeEvent, FC} from 'react';
import './common.scss'

interface TextareaProps {
    placeholder: string,
    name?: string,
    isRequired: boolean,
    value: string,
    setValue: (value: string) => void
}

const Textarea: FC<TextareaProps> = ({placeholder, isRequired, name, setValue, value}) => {
    const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
       setValue(e.target.value)
    }

    return (
        <textarea
            className='textarea'
            placeholder={placeholder}
            value={value}
            required={isRequired}
            name={name}
            onChange={onChange}
        />
    )
}

export default Textarea