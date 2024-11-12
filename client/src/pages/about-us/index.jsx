import Header from "../../main-modules/header";
import './index.css';

export const AboutUs = () => {
    return (
        <div className="AboutUs ">
            <Header />
            <div className='Body-AboutUs'>
                <div className="about-section">
                    <h1 className="about-title">О Нас</h1>
                    <p className="about-text">Мы - увлеченная команда, стремящаяся предоставить вам наилучший опыт. Узнайте больше о том, кто мы и чем занимаемся!</p>

                    <div className="info-cards">
                        <div className="card">
                            <h2>Наша Миссия</h2>
                            <p>Внедрять инновации и вдохновлять с помощью технологий, облегчая жизнь каждому.</p>
                        </div>
                        <div className="card">
                            <h2>Наша Команда</h2>
                            <p>Группа талантливых людей, стремящихся к совершенству и удовлетворению потребностей клиентов.</p>
                        </div>
                        <div className="card">
                            <h2>Наши Контакты</h2>
                            <p>Не стесняйтесь обращаться к нам через наши социальные сети или электронную почту.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
