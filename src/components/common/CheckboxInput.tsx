import React from 'react';
import './common.scss'

interface CheckboxInputProps {
    value: boolean,
    setValue: (value: boolean) => void
}

const CheckboxInput:React.FC<CheckboxInputProps> = ({value, setValue}) => {
    return (
        <label className="checkbox" htmlFor="published-checkbox">
            <input
                id='published-checkbox'
                type='checkbox'
                checked={value}
                onChange={() => setValue(!value)}
            />
            Опубликовано
        </label>
    );
};

export default CheckboxInput;