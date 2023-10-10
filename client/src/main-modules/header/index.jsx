import { NavLink } from "react-router-dom";
import SignUp from "../forms/signup";
import LogIn from '../forms/login'
import { useCookies } from 'react-cookie';
import LogOut from "./components/logout";
import './index.css'

export default function Header() {

    const [cookies, ] = useCookies(['username', 'sessionId']);


    return (
        <div className="Header">
            <div className="Navbar">
                <NavLink to="/" className='NavLink'>Main</NavLink>
                <NavLink to="/profile" className='NavLink'>Profile</NavLink>
                <NavLink to="/about-us" className='NavLink'>About Us</NavLink>
            </div>
            <div className="authorizations">
                {
                    (cookies.sessionId) ? (<>
                        <p>user: {cookies.sessionId}</p>
                        <LogOut />
                    </>) : (<>
                        <SignUp />
                        <LogIn />
                    </>)
                }
            </div>
        </div>
    )
}