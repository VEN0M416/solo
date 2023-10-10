import { useCookies } from 'react-cookie';
import { useNavigate } from "react-router-dom";

export default function LogOut() {
    const [, ,removeCookie] = useCookies(['sessionId', 'username']);
    const navigate = useNavigate();

    const logout = () => {
        try {
            removeCookie('sessionId', { path: '/', sameSite: 'Lax' });
            removeCookie('username', { path: '/', sameSite: 'Lax' });
            navigate('/', { replace: true });
            console.log('The user was log outed!');
        } catch (error) {
            console.log(error.message)
        }
    }

    return (<>
        <button
            onClick={() => {
                logout();
            }}
        >Log Out</button>
    </>)
}