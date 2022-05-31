import React, {ChangeEvent, FC, useEffect, useRef, useState} from 'react';
import './Header.scss'
import {NavLink, useNavigate} from "react-router-dom";
import {useAppSelector} from "../../hooks/redux";

interface HeaderProps {
    setSidebarOpen: (value: boolean) => void,
    setQuery: (value: string) => void,
    onClick: (e: any) => void
}

const Header:FC<HeaderProps> = ({setSidebarOpen, setQuery, onClick}) => {
    const navigate = useNavigate()
    const {isAdmin} = useAppSelector(state => state.adminReducer)
    const [value, setValue] = useState('')
    const [isSearchInputVisible, setSearchInputVisible] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null)

    const searchInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
    }

    const search = () => {
        setQuery(value)
        if(!value) {
            return navigate('/')
        }
        navigate('/search')
    }

    const searchSubmitHandler = (e: any) => {
        if(e.code === 'Enter') {
            search()
        }
    }

    const searchButtonHandler = () => {
        if(!isSearchInputVisible) {
            return setSearchInputVisible(prevState => !prevState)
        }

        search()
    }

    useEffect(() => {
        if(isSearchInputVisible) {
            setTimeout(() => {
                inputRef.current?.focus()
            }, 10)
        }
    }, [isSearchInputVisible])

    return (
        <header className="header" onClick={onClick}>
            <div className="container">
                <div className="header__inner">
                    <button className="burger-menu-btn" onClick={() => setSidebarOpen(true)}>
                        <span />
                    </button>
                    <nav className="header__nav">
                        <ul>
                            <li><NavLink to={'/'}>Главная</NavLink></li>
                            <li><NavLink to={'/about-me/'}>Обо мне</NavLink></li>
                            <li><NavLink to={'/portfolio/'}>Портфолио</NavLink></li>
                            <li><NavLink to={'/tags/'}>Тэги</NavLink></li>
                            {isAdmin &&
                                <li><NavLink to={'/admin/'}>Админ панель</NavLink></li>
                            }
                        </ul>
                    </nav>
                    <button
                        className="search-btn"
                        onClick={searchButtonHandler}
                    />
                    <div className={"search-input-wrapper" + (isSearchInputVisible ? ' active' : '')}>
                        <input
                            type="text"
                            placeholder={'Поиск'}
                            className="input search-input"
                            value={value}
                            onKeyPress={searchSubmitHandler}
                            onChange={searchInputHandler}
                            ref={inputRef}
                        />
                        <button
                            className="close"
                            onClick={() => setSearchInputVisible(false)}
                        />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;