import { NavLink } from "react-router-dom";
import SignUp from "../forms/signup";
import LogIn from '../forms/login'
import { useCookies } from 'react-cookie';
import LogOut from "./components/logout";
import { useState } from "react";
import './index.css'

export default function Header() {

    const [cookies, ] = useCookies(['username', 'sessionId']);

    const [showLogin, setShowLogin] = useState(false);
    const [showSingUp, setShowSignUp] = useState(false);

    const handleCloseLogin = () => {
        setShowLogin(false);
    };
    const handleCloseSignUp = () => {
        setShowSignUp(false);
    };

    return (
        <div className="Header">
            <div className="Navbar">
                <NavLink to="/" className='NavLink'><button className="btn-head">Главное</button></NavLink>
                <NavLink to="/about-us" className='NavLink'><button className="btn-head">О Нас</button></NavLink>
            </div>
            <div className="authorizations">
                {
                    (cookies.sessionId) ? (<>
                        <NavLink to="/profile" className='NavLink'><button button className="btn-head">{cookies.username}</button></NavLink>
                        <LogOut />
                    </>) : (<>
                        <button className="btn-head" onClick={() => setShowLogin(true)}>Войти</button>
                        {showLogin && <LogIn isOpen={showLogin} onClose={handleCloseLogin}/>}
                        <button className="btn-head" onClick={() => setShowSignUp(true)}>Зарегистрироваться</button>
                        {showSingUp && <SignUp isOpen={showSingUp} onClose={handleCloseSignUp}/>}
                    </>)
                }
            </div>
        </div>
    )
}