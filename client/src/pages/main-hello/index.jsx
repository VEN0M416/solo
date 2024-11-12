import Header from "../../main-modules/header";
import './index.css';

export const Main = () => {
    return (
        <dir className="Main">
            <Header />
            <div className='Body-Main'>
                <div className="welcome-section">
                    <h1 className="welcome-title">Добро пожаловать на Главную страницу!</h1>
                    <p className="welcome-text">Исследуйте, общайтесь и наслаждайтесь своим путешествием вместе с нами!</p>
                    <button className="explore-button">Начать</button>
                </div>
            </div>
        </dir>
    );
}