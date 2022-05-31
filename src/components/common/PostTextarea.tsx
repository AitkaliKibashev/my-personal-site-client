import React, {ChangeEvent, useState} from 'react'
import './common.scss'

interface InputProps {
    onClick: (value: string) => void,
}

const PostTextarea:React.FC<InputProps> = ({onClick}) => {
    const [value, setValue] = useState('')

    const textareaHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
        const target = event.target
        setValue(target.value)
        if(target.scrollHeight > 48) {
            target.style.height = target.scrollHeight + 'px'
        }
    }

    const onBlur = (event: ChangeEvent<HTMLTextAreaElement>) => {
        const target = event.target

        if(!value) {
            target.style.height = 48 + 'px'
        }
    }

    const submitHandler = () => {
        if(value) {
            onClick(value)
            return setValue('')
        }
    }

    return (
        <div className="textarea-container">
            <div className="textarea-before" onClick={submitHandler}/>
            <textarea value={value} onChange={textareaHandler} onBlur={onBlur} className="textarea" placeholder="Напишите пост..."/>
        </div>
    )
}

export default PostTextarea;