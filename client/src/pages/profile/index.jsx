import Header from "../../main-modules/header";
import { useCookies } from 'react-cookie';
import { useState, useEffect } from 'react';
import { api } from "../../main-modules/core/api";
import './index.css';

export const Profile = () => {
    const [cookies, setCookie] = useCookies(['username', 'sessionId']);
    const [isEditing, setIsEditing] = useState(false);
    const [login, setUsername] = useState(cookies.username || '');
    const [email, setEmail] = useState(''); // Initial state will be empty
    const user_id = cookies.sessionId; // Assuming sessionId is the user ID

    const [usernameAlreadyTaken, setUsernameAlreadeTaken] = useState(false);

    // Fetch user data on component mount
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await api.get(`/user/${user_id}`);
                setUsername(response.data.login);
                (response.data.email != null) ? setEmail(response.data.email) : setEmail("example@exmp.ru");
            } catch (error) {
                console.log('Error fetching user data:', error.message);
            }
        };
        fetchUserData();
    }, [user_id]);

    // Save changes to user data
    const handleSave = async () => {
        try {
            const response = await api.put(`/edit_data`, {
                user_id,
                login,
                email
            });

            if (response.data.answer === 'update successful') {
                // Update cookies if username changed
                setCookie('username', login, { path: '/', sameSite: 'Lax' });
                console.log('update successful');
                /* console.log(response.data); */
                setIsEditing(false); // Exit editing mode
                setUsernameAlreadeTaken(false);
            } else if (response.data.answer === 'username already taken') {
                console.log('username already taken');
                setUsernameAlreadeTaken(true);
            } else {
                console.log('Failed to update user data');
            }
        } catch (error) {
            console.log('Error updating user data:', error.message);
        }
    };

    return (
        <div className='Profile'>
            <Header />
            <div className="Body-Profile">
                <div className="profile-container">
                    <h1>Добро пожаловать, {login}!</h1>
                    <p className="profile-intro">Это страница вашего личного профиля, где вы можете управлять настройками своей учетной записи и просматривать свою активность.</p>

                    <div className="profile-info">
                        <h2 className="Head">Ваши данные</h2>

                        {isEditing ? (
                            <>
                                <label>
                                    <strong>Имя:</strong>
                                    <input
                                        type="text"
                                        value={login}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                </label>
                                <label>
                                    <strong>Почта:</strong>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </label>
                            </>
                        ) : (
                            <>
                                <h2><strong>Имя:</strong> {login}</h2>
                                <h2><strong>Почта:</strong> {email}</h2>
                            </>
                        )}
                    </div>
                    <p className="warning">{usernameAlreadyTaken && 'Пользователь с таким именем уже существует!'}</p>
                    <div className="profile-actions">
                        {isEditing ? (
                            <>
                                <button className="save-profile-button" onClick={handleSave}>Сохранить</button>
                                <button className="cancel-profile-button" onClick={() => setIsEditing(false)}>Отмена</button>
                            </>
                        ) : (
                            <button className="edit-profile-button" onClick={() => setIsEditing(true)}>Изменить</button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
