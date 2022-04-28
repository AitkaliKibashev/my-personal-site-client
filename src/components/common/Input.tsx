import React, {ChangeEvent, FC, useState} from 'react';
import './common.scss'

const Input: FC<any> = ({props}) => {
    const [value, setValue] = useState('')

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
       setValue(e.target.value)
    }

    return (
        <input className='input' {...props} value={value} onChange={onChange}/>
    )
}

export default Input