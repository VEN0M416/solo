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


// start server
const PORT = 5000
app.listen(PORT, () => {
    console.log(`Server has started on port ${PORT}`)
})