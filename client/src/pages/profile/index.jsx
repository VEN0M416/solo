import Header from "../../main-modules/header";
import { useCookies } from 'react-cookie';
import './index.css';

export const Profile = () => {
    const [cookies,] = useCookies(['username']);

    return (
        <div className='Profile'>
            <Header />
            <div className="Body-Profile">
                <div className="profile-container">
                    <h1>Добро пожаловать, {cookies.username}!</h1>
                    <p className="profile-intro">Это страница вашего личного профиля, где вы можете управлять настройками своей учетной записи и просматривать свою активность.</p>

                    <div className="profile-info">
                        <h2>Your Details</h2>
                        <p><strong>Username:</strong> {cookies.username}</p>
                        <p><strong>Email:</strong> user@example.com</p> {/* Пример данных, можно заменить на реальные */}
                    </div>

                    <div className="profile-actions">
                        <button className="edit-profile-button">Изменить</button>
                    </div>
                </div>
            </div>
        </div>
    );
};
