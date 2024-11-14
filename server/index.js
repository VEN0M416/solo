const express = require('express')
const app = express()
const cors = require('cors')
const pool = require('./db')

//middleware
app.use(cors())
app.use(express.json())

//ROUTES//

//registration

app.post('/registration', async (req, res) => {

    const { login, password } = req.body;

    try {
        const newLogin = await pool.query('SELECT login FROM users WHERE login = $1',
            [login]
        );
        if (newLogin.rowCount == 0) {
            const newUser = await pool.query('INSERT INTO users (login, password)  VALUES($1, $2)',
                [login, password]
            );

            res.json({ answer: "success" });
        }
        else
            res.json({ answer: "user already exists" });
    } catch (error) {
        console.log(error.message);
    }

})

//authorization

app.post('/authorization', async (req, res) => {

    const { login, password } = req.body;

    try {
        const signup = await pool.query('SELECT user_id, password FROM users WHERE login = $1',
            [login]
        );

        if (signup.rowCount !== 0) {    // проверка на существование
            const newPassword = signup.rows[0].password;

            if (newPassword == password) {     // проверка пароля
                res.json({ answer: "success", key: signup.rows[0].user_id });
            }
            else res.json({ answer: "wrong password" });
        }
        else res.json({ answer: "user not found" });

    } catch (error) {
        console.log(error.message);
    }
})

// get the information by id
app.get('/user/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const user = await pool.query('SELECT login, email FROM users WHERE user_id = $1', [id]);
        if (user.rowCount > 0) {
            res.json(user.rows[0]);
        } else {
            res.status(404).json({ error: "User not found" });
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Server error" });
    }
});

// update user data
app.put('/edit_data', async (req, res) => {
    const { user_id, login, email } = req.body;

    try {
        // Проверка на существование пользователя с новым логином (кроме текущего пользователя)
        const existingUser = await pool.query(
            'SELECT login FROM users WHERE login = $1 AND user_id != $2',
            [login, user_id]
        );

        if (existingUser.rowCount > 0) {
            return res.json({ answer: "username already taken" });
        }

        // Обновление данных пользователя
        await pool.query(
            'UPDATE users SET login = $1, email = $2 WHERE user_id = $3',
            [login, email, user_id]
        );

        // Отправка ответа клиенту
        res.json({ answer: "update successful" });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ answer: "server error" });
    }
});





// start server
const PORT = 5000
app.listen(PORT, () => {
    console.log(`Server has started on port ${PORT}`)
})