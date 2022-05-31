import React, {FormEvent, useState} from 'react';
import './AdminLogin.scss'
import Input from "../../components/common/Input";
import {useAppDispatch} from "../../hooks/redux";
import {adminLogin} from "../../store/reducers/actionCreators";
import {useNavigate} from "react-router-dom";

const AdminLogin = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const [usernameValue, setUsernameValue] = useState('')
    const [passwordValue, setPasswordValue] = useState('')

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const target = e.currentTarget
        const data = {username: target.username.value, password: target.password.value}
        dispatch(adminLogin(data)).then((res) => {
            if(res) {
                navigate('/')
            }
        })
    }

    return (
        <section className='admin-login'>
            <div className="container">
                <h1 className="section-title">Войти</h1>
                <form onSubmit={onSubmit}>
                    <Input
                        type={'text'}
                        placeholder={'Логин'}
                        isRequired={true}
                        name={'username'}
                        value={usernameValue}
                        setValue={setUsernameValue}
                    />
                    <Input
                        type={'password'}
                        placeholder={'Пароль'}
                        isRequired={true}
                        name={'password'}
                        setValue={setPasswordValue}
                        value={passwordValue}
                    />
                    <button className="btn">Войти</button>
                </form>
            </div>
        </section>
    );
};

export default AdminLogin;