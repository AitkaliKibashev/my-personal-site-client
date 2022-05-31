import React from 'react';
import spinner from '../../images/spinner.gif'
import './common.scss'

const Spinner = () => {
    return (
        <div className="spinner">
            <img src={spinner} alt="spinner"/>
        </div>
    );
};

export default Spinner;