import React, { useState } from 'react';
import { api } from '../../core/api';
import Modal from '../modal/Modal'
import './index.css'

function SignUp() {

    //--------------Modal fucns --------------------------------

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);

        //---------Clear form data ---------

        setAlreadyReg(false);
    };

    //--------------Form fucns --------------------------------

    const [user, setUser] = useState({
        login: "",
        password1: "",
        password2: ""
    })
    const [correct2Pass, setCorrect2Pass] = useState(true);
    const [alreadyReg, setAlreadyReg] = useState(false);
    const [Empty, setEmpty] = useState(false);

    const check2pass = () =>{
        if(user.password1 === user.password2) {
            setCorrect2Pass(true);
            return true;
        } else {
            setCorrect2Pass(false);
            return false;
        }
    }

    const isEmpty = () => {
        if (user.login === "" || user.password1 === "" || user.password2 === "") {
            setEmpty(true);
            return true;
        }
        else {
            setEmpty(false);
            return false;
        }
    }

    const sendData = async() => {
        const status1 = isEmpty();
        const status2 = check2pass();
        if (!status1 && status2) {
            try {
                const response = await api.post('/registration', { login: user.login, password: user.password1 });
                if (response.data.answer === 'user already exists') {
                    setAlreadyReg(true);
                } else if (response.data.answer === 'success') {
                    closeModal();
                    console.log('The user successfuly registrated!')
                }
            } catch (error) {
                console.log(error.message);
            }
        }
    }

    return (
        <div>
            <button onClick={openModal}>Sign Up</button>
            <Modal isOpen={isModalOpen} onClose={closeModal} head={'SIGN UP'}>
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
                            setUser((prevState => ({ ...prevState, password1: e.target.value })));
                        }}
                    />

                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="pass2SVG">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                    </svg>
                    <input
                        className="inputforms"
                        type="password"
                        name="confirm password"
                        placeholder='confirm password'
                        onChange={(e) => {
                            setUser((prevState => ({ ...prevState, password2: e.target.value })));
                        }}
                    />
                    {!correct2Pass && <p className='warning'>Пароли не совпадают!</p>}
                    {alreadyReg && <p className='warning'>Такой пользователь уже зарегистрирован!</p>}
                    {Empty && <p className='warning'>Заполните все поля формы!</p>}

                    <button
                        type="button"
                        className='SugnUp-Button'
                        onClick={() => {
                            setAlreadyReg(false);
                            sendData();
                        }}
                    >
                        Sign Up
                    </button>
                    <p>Are you already registered?<br /> Go to log in</p>
                </div>
            </Modal>
        </div>
    );
}

export default SignUp;
