import React, {FC} from 'react';
import avaImage from '../../images/ava.jpg'
import './Sidebar.scss'
import {NavLink} from "react-router-dom";
import {useAppSelector} from "../../hooks/redux";

interface SidebarProps {
    isSidebarOpen: boolean,
    setSidebarOpen: (value: boolean) => void,
    onClick: (e: any) => void
}

const Sidebar:FC<SidebarProps> = ({isSidebarOpen, setSidebarOpen, onClick}) => {
    const {isAdmin} = useAppSelector(state => state.adminReducer)

    return (
        <aside className={"sidebar" + (isSidebarOpen ? ' active' : '')} onClick={onClick}>

            <div className="profile">
                <div className="profile__image">
                    <img src={avaImage} alt="ava"/>
                </div>
                <h2 className="profile__name">Айткали Кибашев</h2>
                <p className="profile__text">
                    Привет, я начинающий Frontend разработчик, который любит свою профессию.
                    <br/><br/>
                    В целом мне интересно все, что
                    связано с технологиями.
                </p>
            </div>
            <nav className="sidebar__nav">
                <ul onClick={() => setSidebarOpen(false)}>
                    <li><NavLink to={'/'}>Главная</NavLink></li>
                    <li><NavLink to={'/about-me/'}>Обо мне</NavLink></li>
                    <li><NavLink to={'/portfolio/'}>Портфолио</NavLink></li>
                    <li><NavLink to={'/tags/'}>Тэги</NavLink></li>
                    {isAdmin &&
                    <li><NavLink to={'/admin/'}>Админ панель</NavLink></li>
                    }
                </ul>
            </nav>
            <div className="sidebar__links">
                <a href="https://github.com/AitkaliKibashev">github</a>
                <a href="https://t.me/hazylazyboy">telegram</a>
            </div>
        </aside>
    )
}

export default Sidebar;