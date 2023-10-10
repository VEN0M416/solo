import { NavLink } from "react-router-dom";
import SignUp from "../forms/signup";
import LogIn from '../forms/login'
import './index.css'

export default function Header() {

    return (
        <div className="Header">
            <div className="Navbar">
                <NavLink to="/" className='NavLink'>Main</NavLink>
                <NavLink to="/profile" className='NavLink'>Profile</NavLink>
                <NavLink to="/about-us" className='NavLink'>About Us</NavLink>
            </div>
            <div className="authorizations">
                <SignUp/>
                <LogIn />
            </div>
        </div>
    )
}