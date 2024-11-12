import React, { useState } from 'react';
import { api } from '../../core/api';
import { useCookies } from 'react-cookie';
import Modal from '../modal/Modal'
import './index.css'

function LogIn({ isOpen, onClose }) {
    //--------------Modal fucns --------------------------------

    /* const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);

        //---------Clear form data ---------


    }; */

    //--------------Form fucns --------------------------------
    const [, setCookie] = useCookies(['sessionId', 'username']);
    const [user, setUser] = useState({
        login: "",
        password: "",
    })
    const [Empty, setEmpty] = useState(false);
    const [notFound, setNotFound] = useState(false);
    const [wrongPass, setWrongPass] = useState(false);

    const isEmpty = () => {
        if (user.login === "" || user.password === "") {
            setEmpty(true);
            return true;
        }
        else {
            setEmpty(false);
            return false;
        }
    }

    const sendData = async () => {
        const status = isEmpty();
        if (!status) {
            try {
                const response = await api.post('/authorization', { login: user.login, password: user.password });
                if (response.data.answer === 'user not found') {
                    setNotFound(true);
                } else if (response.data.answer === 'wrong password') {
                    setWrongPass(true);
                } else if (response.data.answer === 'success') {
                    onClose();
                    console.log(`The user with id = ${response.data.key} successfuly authorizated!`);
                    setCookie('sessionId', response.data.key, { path: '/', sameSite: 'Lax' });
                    setCookie('username', user.login, { path: '/', sameSite: 'Lax' });
                }
            } catch (error) {
                console.log(error.message);
            }
        }
    }

    return (
        <div>
            {/* <button className="btn-head" onClick={openModal}>Войти</button> */}
            <Modal isOpen={isOpen} onClose={onClose} head={'Вход'}>
                <div className='child'>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="userSVG">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                    </svg>
                    <input
                        className="inputforms"
                        type="text"
                        placeholder='login'
                        onChange={(e) => {
                            setUser((prevState => ({ ...prevState, login: e.target.value })));
                        }}
                    />
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="pass1SVG">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                    </svg>
                    <input
                        className="inputforms"
                        type="password"
                        name="password"
                        placeholder='password'
                        onChange={(e) => {
                            setUser((prevState => ({ ...prevState, password: e.target.value })));
                        }}
                    />

                    {Empty && <p className='warning'>Заполните все поля формы!</p>}
                    {notFound && <p className='warning'>Такого пользователя не существует!</p>}
                    {wrongPass && <p className='warning'>Неверный пароль!</p>}

                    <button
                        type="button"
                        className='LogIn-Button'
                        onClick={() => {
                            setNotFound(false);
                            setWrongPass(false);
                            sendData();
                        }}
                    >
                        Войти
                    </button>
                    <p>Вы еще не зарегистрированы?<br />Перейдите на окно регистрации</p>
                </div>
            </Modal>
        </div>
    );
}

export default LogIn;
